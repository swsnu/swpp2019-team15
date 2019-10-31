from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseNotAllowed, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Profile, Question, Answer, Location
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, get_user
from django.views import generic
from django.views.decorators.http import require_http_methods
from functools import wraps
from pywebpush import webpush, WebPushException
from time import sleep


def check_login_required(views_func):
    @wraps(views_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return views_func(request, *args, **kwargs)
        else:
            return HttpResponse(status=401)
    return wrapper

def check_request(views_func):
    @wraps(views_func)
    def wrapper(*args, **kwargs):
        try:
            return views_func(*args, **kwargs)
        except (KeyError, ValueError) as e:
            return HttpResponseBadRequest(str(e))
    return wrapper

def check_user_owner(views_func):
    @wraps(views_func)
    def wrapper(request, *args, **kwargs):
        if 'username' not in kwargs.keys():
            return HttpResponseBadRequest()
        else:
            user_name = kwargs["username"]
            if user_name == request.user.username:
                return HttpResponseForbidden()
    return wrapper


@check_user_owner
@check_login_required
@check_request
def UserProfile(request, username):
    user = get_object_or_404(Profile, username=username)
    return render(request, 'users/user.html', {'user': user})

@check_login_required
@check_request
def Main(request, username):
    question_user = get_object_or_404(Profile, username=username)
    question_list = [question for question in Question.objects.filter(author = question_user).values()]
    return render(request, 'users/main.html', {'user': question_user, 'question_list': question_list})
    
# Displays detailed question page
@check_login_required
@check_request
def Details(request, question_id):
    question_to_answer = get_object_or_404(Question, id = question_id)
    # questions to answers are one to many
    answer_list = [answer for answer in Answer.objects.filter(question = question_to_answer).values()]
    return render(request, 'users/detail.html', {'question': question_to_answer, 'answer_list': answer_list})
    
@check_login_required
@check_request
@require_http_methods(["POST"])
@csrf_exempt
def questions(request):
    req_data = json.loads(request.body.decode())
    location = req_data['target_location']
    content = req_data['content']
    user = get_user(request)

    location, _ = Location.objects.get_or_create(name=location['name'],
                                                 latitude=location['latitude'],
                                                 longitude=location['longitude'])

    question = Question(author=user, location_id=location,
                        content=content)
    question.save()
    response_dict = {'id': question.id}
    return JsonResponse(response_dict, status=201)

@check_request
@csrf_exempt
@require_http_methods(["POST"])
def sign_up(request):
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']
    new_user = User.objects.create_user(username=username, password=password)
    response_dict = {'id': new_user.id}
    return JsonResponse(response_dict, status=201)

@check_request
@csrf_exempt
@require_http_methods(["POST"])
def sign_in(request):
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        response_dict = {'id': user.id}
        return JsonResponse(response_dict, status=201)
    else:
        return JsonResponse({}, status=401)

@check_request
@csrf_exempt
@require_http_methods(["POST"])
def save_subscription(request):
    req_data = json.loads(request.body.decode())
    # the request body should at least hold the following
    endpoint = req_data['endpoint']
    keys = req_data['keys']
    user = get_user(request)
    profile = get_object_or_404(Profile, user=user)
    profile.subscription = req_data
    profile.save()
    # try:
        # webpush(user.sbscription,
                # json.dumps({'body': "HI"}),
                # vapid_private_key="LhJWR3cBwqckwjYMC1vQoCLXmI8d3qXK6LOUMZ-6LzY",
                # vapid_claims={"sub": "mailto:indiofish@naver.com"})
    # except WebPushException as ex:
        # print("I'm sorry, Dave, but I can't do that: {}", repr(ex))
        # # Mozilla returns additional information in the body of the response.
        # if ex.response and ex.response.json():
            # extra = ex.response.json()
            # print("Remote service replied with a {}:{}, {}",
                  # extra.code,
                  # extra.errno,
                  # extra.message
                  # )
    return JsonResponse({'data':{'success': True}}, status=201)

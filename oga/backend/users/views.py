from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Profile, Question, Answer, Location
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, get_user
from django.views import generic
from functools import wraps

def login_required(views_func):
    @wraps(views_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return views_func(request, *args, **kwargs)
        else:
            return HttpResponse(status=400)
    return wrapper

def check_request(views_func):
    @wraps(views_func)
    def wrapper(request, *args, **kwargs):
        try:
            return views_func
        except (KeyError, ValueError) as e:
            return HttpResponse(status=400)
    return wrapper

# def index(request):
#     return HttpResponse('Hello World!')

@login_required
@check_request
def UserProfile(request, username):
    if not (request.user.username == username):
        return HttpResponse(status=403)
    user = get_object_or_404(Profile, username=username)
    return render(request, 'users/user.html', {'user': user})

@login_required
@check_request
def Main(request, username):
    question_user = get_object_or_404(Profile, username=username)
    question_list = [question for question in Question.objects.filter(author = question_user).values()]
    return render(request, 'users/main.html', {'user': question_user, 'question_list': question_list})
    
# Displays detailed question page
@login_required
@check_request
def Details(request, question_id):
    if not (Question.objects.filter(id==question_id).exists()):
        return HttpResponse(status=404)
    question_to_answer = get_object_or_404(Question, id = question_id)
    # questions to answers are one to many
    answer_list = [answer for answer in Answer.objects.filter(question = question_to_answer).values()]
    return render(request, 'users/detail.html', {'question': question_to_answer, 'answer_list': answer_list})
    
@login_required
@check_request
@csrf_exempt
def questions(request):
    if request.method == 'POST':
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
    else:
        return HttpResponse(status=405)

@check_request
@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        new_user = User.objects.create_user(username=username, password=password)
        response_dict = {'id': new_user.id}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

@check_request
@csrf_exempt
def sign_in(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            response_dict = {'id': user.id}
            return JsonResponse(response_dict, status=204)
        else:
            return JsonResponse({}, status=401)
    else:
        return HttpResponse(status=405)
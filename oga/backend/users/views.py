"""functional views api for the models"""
import json
from functools import wraps

# from django.shortcuts import get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, get_user
from django.views.decorators.http import require_http_methods

from .models import Question, Location


def check_login_required(views_func):
    """checks if user has logged in"""
    @wraps(views_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return views_func(request, *args, **kwargs)
        else:
            return HttpResponse(status=401)
    return wrapper

def check_request(views_func):
    """checks if request body is valid json"""
    @wraps(views_func)
    def wrapper(*args, **kwargs):
        try:
            return views_func(*args, **kwargs)
        except (KeyError, ValueError) as ex:
            return HttpResponseBadRequest(str(ex))
    return wrapper

def check_user_owner(views_func):
    """checks if user is owner of the model"""
    @wraps(views_func)
    def wrapper(request, *args, **kwargs):
        if 'username' not in kwargs.keys():
            return HttpResponseBadRequest()
        else:
            user_name = kwargs["username"]
            if user_name == request.user.username:
                return HttpResponseForbidden()
            else:
                return views_func(request, *args, **kwargs)

    return wrapper


@check_login_required
@check_request
@require_http_methods(["POST"])
@csrf_exempt
def questions(request):
    """questions api"""
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
    """sign up api"""
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
    """sign in api"""
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

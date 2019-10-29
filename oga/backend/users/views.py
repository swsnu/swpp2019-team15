from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Profile, Question, Answer, Location
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, get_user
from django.views import generic

from webpush import send_group_notification, send_user_notification


def UserProfile(request, username):
    user = get_object_or_404(Profile, username=username)
    return render(request, 'users/user.html', {'user': user})

def Main(request, username):
    question_user = get_object_or_404(Profile, username=username)
    question_list = [question for question in Question.objects.filter(author = question_user).values()]
    return render(request, 'users/main.html', {'user': question_user, 'question_list': question_list})
    
# Displays detailed question page
def Details(request, question_id):
    question_to_answer = get_object_or_404(Question, id = question_id)
    # questions to answers are one to many
    answer_list = [answer for answer in Answer.objects.filter(question = question_to_answer).values()]
    return render(request, 'users/detail.html', {'question': question_to_answer, 'answer_list': answer_list})
    

@csrf_exempt
def questions(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            location = req_data['target_location']
            content = req_data['content']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        user = get_user(request)
        location, _ = Location.objects.get_or_create(name=location['name'],
                                                     latitude=location['latitude'],
                                                     longitude=location['longitude'])
        question = Question(author=user, location_id=location,
                            content=content)
        question.save()
        response_dict = {'id': question.id}
        return JsonResponse(response_dict, status=201)

@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        new_user = User.objects.create_user(username=username, password=password)
        response_dict = {'id': new_user.id}
        return JsonResponse(response_dict, status=201)

@csrf_exempt
def sign_in(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            response_dict = {'id': user.id}
            return JsonResponse(response_dict, status=201)
        else:
            return JsonResponse({}, status=401)

# send notifications to a specific group
def send_group_notification(request):
    payload = {"head": "A Question for You!",
                "body": "Hello World!"}
    # TODO: add pictogram
    # "icon": "images/image_location.png"
    # TODO: add url to redirect to question/answer when notification clicked    
    # "url": "<int:question_id>/detail"
    # TODO: define group object to be passed
    send_group_notification(group_name='my_group', payload=payload, ttl=1000) 
    # web push server stores the data for maximum of 1000 seconds if user is not online

# send notification to a specific user
def send_user_notification(request):
    payload = {'head': 'A Question for You!', 
                'body': 'Hello World!'}
    # TODO: add pictogram
    # "icon": "images/image_location.png"
    # TODO: add url to redirect to question/answer when notification clicked    
    # "url": "<int:question_id>/detail"
    # TODO: define user object to be passed 
    user = request.user
    send_user_notification(user=user, payload=payload, ttl=1000)
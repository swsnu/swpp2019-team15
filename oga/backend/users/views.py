from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, Question, Answer, Location
from django.views import generic


def index(request):
    return HttpResponse('Hello World!')

def UserProfile(request, username):
    user = get_object_or_404(User, username=username)
    return render(request, 'users/user.html', {'user': user})

def Main(request, username):
    question_user = get_object_or_404(User, username=username)
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
            body = request.body.decode()
            # username = json.loads(body)['name']
            # location = json.loads(body)['location']
            content = json.loads(body)['content']
            print(body)
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest()
        # FIXME: should use real data from body
        user = get_object_or_404(User, username="hiboy")
        location = get_object_or_404(Location, name="ome")
        print(location)
        question = Question(author=user, location_id=location,
                            content=content)
        question.save()
        response_dict = {'id': question.id}
        return JsonResponse(response_dict, status=201)

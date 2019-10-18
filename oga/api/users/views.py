from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import User, Question, Answer
from django.views import generic


def index(request):
    return HttpResponse('Hello World!')

def UserProfile(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return render(request, 'users/user.html', {'user': user})

def Main(request, user_id):
    question_user = get_object_or_404(User, id=user_id)
    question_list = [question for question in Question.objects.filter(user = question_user).values()]
    return render(request, 'users/main.html', {'user': question_user, 'question_list': question_list})
    
# Displays detailed question page
def Details(request, question_id):
    question_to_answer = get_object_or_404(Question, id=question_id)
    # questions to answers are one to many
    answer_list = [answer for answer in Answer.objects.filter(question = question_to_answer).values()]
    return render(request, 'users/detail.html', {'question': question_to_answer, 'answer_list': answer_list})
    
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import User, Question

# Create your views here.
def index(request):
    return HttpResponse('Hello World!')

def user_profile(request, user_id):
    # user = User(id=0, username='bugsbunny', password='lovescarrots', location_id=0 )
    user = get_object_or_404(User, id=user_id)
    # get_list_or_404() uses filter() instead of get(). It raises Http404 if the list is empty
    return render(request, 'users/user.html', {'user': user})
    # return HttpResponse('{}' .format(user))

def user_main(request, user_id):
    question_user = get_object_or_404(User, id=user_id)

    question_list = [question for question in Question.objects.filter(user = question_user).values()]

    # return render(request, 'users/main.html', context) #shortcut for HttpResponse load template
    return HttpResponse('My Questions:\n{}' .format(question_list))


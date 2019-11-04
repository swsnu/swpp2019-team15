"""exposed api urls of the backend"""
from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.questions, name='questions'),
    path('question/<int:question_id>/',
         views.question_detail, name='question_detail'),
    path('signup/', views.sign_up, name='sign_up'),
    path('signin/', views.sign_in, name='sign_in'),
    path('is-authed/', views.is_logged_in, name='is_logged_in'),
    path('save-subscription/', views.save_subscription, name='save-subscription'),
    path('location/', views.locations, name='set_location'),
<<<<<<< HEAD
    path('reply/<int:question_or_answer_id>/',
         views.get_or_create_answer, name='get_or_create_answer'),
    path('replies/<int:question_id>/', views.get_answers, name='get_answers')
=======
    path('reply/<int:question_id>/', views.create_answer, name='create_answer'),
    path('follow/<int:question_id>/', views.follow_question,
         name='follow_question'),
>>>>>>> 17e178b5bdde50c3e861621a4816508b6013a352
]

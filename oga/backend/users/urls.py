"""exposed api urls of the backend"""
from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.get_profile, name='get_profile'),
    path('profile/questions/', views.get_user_questions,
         name='get_user_questions'),
    path('profile/questions/<str:username>/', views.get_single_user_questions,
         name='get_single_user_questions'),
    path('profile/answers/', views.get_user_answers, name='get_user_answers'),
    path('profile/answers/<str:username>',
         views.get_single_user_answers, name='get_single_user_answers'),
    path('profile/<str:username>/',
         views.get_user_profile, name='get_user_profile'),

    path('questions/', views.questions, name='questions'),
    path('question/<int:question_id>/',
         views.question_detail, name='question_detail'),
    path('signup/', views.sign_up, name='sign_up'),
    path('signin/', views.sign_in, name='sign_in'),
    path('is-authed/', views.is_logged_in, name='is_logged_in'),
    path('save-subscription/', views.save_subscription, name='save-subscription'),
    path('location/', views.locations, name='set_location'),
    path('reply/<int:question_or_answer_id>/',
         views.get_or_create_answer, name='get_or_create_answer'),
    path('replies/<int:question_id>/', views.get_answers, name='get_answers'),
    path('follow/<int:question_id>/', views.follow_question,
         name='follow_question'),
    path('un-authed/', views.logged_out, name='logged_out'),
    path('rate/is_rated/<int:answer_id>/',
         views.check_rating, name='check_rating'),
    path('rate/up/<int:answer_id>/', views.rate_up_answer, name='rate_up'),
    path('rate/down/<int:answer_id>/', views.rate_down_answer, name='rate_down'),
]

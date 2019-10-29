from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.questions, name='questions'),
    path('signup/', views.sign_up, name='sign_up'),
    path('signin/', views.sign_in, name='sign_in'),
    path('<str:username>/', views.UserProfile, name='user_profile'),
    path('<str:username>/main/', views.Main, name='user_main'),
    path('<int:question_id>/detail/', views.Details, name='details'),
    path('send_question', views.send_question_push_notification, name='send_question'),
    path('send_answer', views.send_answer_notification, name='send_answer'),
]

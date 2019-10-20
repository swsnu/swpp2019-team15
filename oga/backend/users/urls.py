from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('<str:username>/', views.UserProfile, name='user_profile'),
    path('<str:username>/main/', views.Main, name='user_main'),
    path('<int:question_id>/detail/', views.Details, name='details'),
]

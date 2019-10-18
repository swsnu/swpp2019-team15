from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('<int:user_id>/', views.UserProfile, name='user_profile'),
    path('<int:user_id>/main/', views.Main, name='user_main'),
    path('<int:question_id>/detail/', views.Details, name='details'),
]

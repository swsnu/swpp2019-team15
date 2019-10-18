from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('<int:user_id>/', views.user_profile, name='user_profile'),
    path('<int:user_id>/main/', views.user_main, name='user_main'),
]

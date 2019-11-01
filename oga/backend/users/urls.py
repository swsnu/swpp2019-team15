"""exposed api urls of the backend"""
from django.urls import path
from .views import views_question, views_auth, views_answer

urlpatterns = [
    path('questions/', views_question.questions, name='questions'),
    path('question/<int:question_id>/', views_question.get_question, name='question'),
    path('signup/', views_auth.sign_up, name='sign_up'),
    path('signin/', views_auth.sign_in, name='sign_in'),
    path('reply/<int:question_id>/', views_answer.create_answer, name='create_answer'),
#    path('save-subscription/', views_auth.save_subscription, name='save-subscription'),
]
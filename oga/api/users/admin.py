from django.contrib import admin
from .models import User, Question, Answer

admin.register(User, Question, Answer)(admin.ModelAdmin)
from django.contrib import admin
from .models import User, Question, Answer,Location

admin.register(User, Question, Answer, Location)(admin.ModelAdmin)

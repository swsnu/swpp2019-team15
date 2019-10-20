from django.contrib import admin
from .models import Profile, Question, Answer,Location

admin.register(Profile, Question, Answer, Location)(admin.ModelAdmin)

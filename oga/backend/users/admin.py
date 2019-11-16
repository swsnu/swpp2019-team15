"""used to show certain models in the admin page"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile, Question, Answer, Location


class ProfileInline(admin.StackedInline):
    """ Display uesr profile inline """
    model = Profile
    can_delete = True
    verbose_name = 'Profile'


class UserAdmin(BaseUserAdmin):
    """ redefine user admin """
    inlines = (ProfileInline,)


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.register(Question, Answer, Location)(admin.ModelAdmin)

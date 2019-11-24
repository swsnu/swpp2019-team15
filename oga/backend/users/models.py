"""
models used in our oga apps: Location, Profile, Question, Answer
"""
from django.db import models
from django.contrib.auth.models import User
from .custommodels.json_field import JSONField


class Location(models.Model):
    """
    Location model with names, and long/lang
    """
    name = models.CharField(max_length=100)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    """
    Question model
    """
    id = models.AutoField(primary_key=True)
    # each Question is related to a single user
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=100, default="LONG LINE")
    publish_date_time = models.DateTimeField(auto_now=True)
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE)
    is_answered = models.BooleanField(default=False)

    def __str__(self):
        return self.content

    class Meta:
        ordering = ('publish_date_time',)


class Profile(models.Model):
    """
    Profile model that extends django user model
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE,
                                    blank=True, null=True)
    subscription = JSONField(blank=True, null=True)
    follows = models.ManyToManyField(Question, related_name='followers')

    def __str__(self):
        return self.user.username


class Answer(models.Model):
    """
    Answer model that has onetoone with question
    """
    # each Answer is related to a single question
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    question_type = models.TextField(max_length=100, default="LINE")
    publish_date_time = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=100)

    def __str__(self):
        return self.content

    class Meta:
        ordering = ('publish_date_time',)


class Rating(models.Model):
    """
    Rating model that has onetoone with answer
    """
    # each Rating is related to a single answer
    connected_answer = models.ForeignKey(Answer, null=True, on_delete=models.CASCADE)
    is_rated = models.BooleanField(default=False)
    is_up = models.BooleanField(default=True)
    
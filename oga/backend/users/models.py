from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Location(models.Model):
    name = models.CharField(max_length=100)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # id = models.AutoField(primary_key=True)
    # username = models.CharField(max_length=20)
    # password = models.CharField(max_length=20) 
    # can use Pointfield to store location coordinates
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE,
                                    blank=True, null=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    #each Question is related to a single user
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    publish_date_time = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=100)
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE)
    is_answered = models.BooleanField(default=False)

    def __str__(self):
        return self.content
    
    class Meta:
        ordering = ('publish_date_time',)

class Answer(models.Model):
    #each Answer is related to a single question
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)

    publish_date_time = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=100)
    
    def __str__(self):
        return self.content
    
    class Meta:
        ordering = ('publish_date_time',)

"""signals and appropriate actions"""
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Profile, Question
from .utils.send_push import send_push

# pylint: disable=unused-argument
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """called upon user creation"""
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """called upon user update / save"""
    instance.profile.save()


@receiver(post_save, sender=Question)
def notify_new_question(sender, instance, created, **kwargs):
    """upon saving a new question, find relevant users and send push
    notificaiton"""
    if created:
        profiles = Profile.objects.all()
        for profile in profiles:
            if instance.author != profile.user:
                send_push(profile, {"text": "newquestion!", "tag": "question"})

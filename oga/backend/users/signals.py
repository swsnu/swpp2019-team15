"""signals and appropriate actions"""
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Profile, Question, Answer, Location
from .utils.send_push import send_push
from .utils.haversine import haversine

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
        qs_l = Location.objects.get(id=instance.location_id)
        profiles = Profile.objects.all()
        for profile in profiles:
            rc_l = Location.objects.get(id=profile.location_id)
            if instance.author != profile.user:
                if haversine(qs_l.longitude, qs_l.latitude, rc_l.longitude, rc_l.latitude) <= 0.3:
                    send_push(profile, {"text": "newquestion!", "tag": "question"})


@receiver(post_save, sender=Answer)
def notify_new_answer(sender, instance, created, **kwargs):
    """upon saving a new answer, find owner of question and send push
    notificaiton"""
    if created:
        qs_sender_id = instance.question.author
        profile = Profile.objects.get(user=qs_sender_id)
        send_push(profile, {"text": "newAnswer!", "tag": "answer"})
"""signals and appropriate actions"""
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Profile, Question, Answer
from .utils.send_push import send_push
from .utils.haversine import distance
from .utils.recommender import add_item

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
    notification"""
    if created:
        qs_l = instance.location_id
        profiles = Profile.objects.all()
        data = {'text': instance.content, 'location': qs_l.name, 'id': instance.id, 'tag': 'q'}
        for profile in profiles:
            rc_l = profile.location_id
            if (instance.author != profile.user and
                    profile.location_id and
                    distance(qs_l, rc_l) <= 0.3):
                send_push(profile, data)

@receiver(post_save, sender=Question)
def add_question(sender, instance, created, **kwargs):
    if created:
        location = instance.location_id.id
        username = instance.author.username
        add_item(username, location)

@receiver(post_save, sender=Answer)
def notify_new_answer(sender, instance, created, **kwargs):
    """upon saving a new answer, find owner of question and send push
    notification"""
    if created:
        question = instance.question
        profile = question.author.profile
        location = question.location_id.name
        data = {'text': instance.content, 'location': location, 'id': instance.id, 'tag': 'a'}
        send_push(profile, data)

        # do the same for all the followers
        for profile in question.followers.all():
            send_push(profile, data)


@receiver(post_save, sender=Answer)
def mark_question_as_answered(sender, instance, created, **kwargs):
    """upon saving a new answer, the mark the question as answered"""
    if created:
        instance.question.is_answered = True
        instance.question.save()

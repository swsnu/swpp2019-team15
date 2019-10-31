"""signals and appropriate actions"""
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Profile

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

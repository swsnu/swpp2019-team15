from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as __init__(self, *args, **kwargs):


class UsersConfig(AppConfig):
    name = 'users'
    verbose_name = _('users')

    def ready(self):
        import users.signals
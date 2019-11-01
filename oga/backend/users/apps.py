"""
Appconfiguration for users
"""
from django.apps import AppConfig


class UsersConfig(AppConfig):
    """
    import signals in ready, to avoid cyclic imports and use signals
    """
    name = 'users'

    def ready(self):
        # pylint: disable=import-outside-toplevel, unused-import
        import users.signals

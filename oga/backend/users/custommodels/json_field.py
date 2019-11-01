"""
JSONField class, that allows use of storing json in DB, just like postgresql
"""
import json
from django.db import models
from django.core.serializers.json import DjangoJSONEncoder

class JSONField(models.TextField):
    """ Extends charfield so that it can be naturally used like a JSONfield """
    def to_python(self, value):
        """to python dictionary"""
        if value == "":
            return None

        try:
            if isinstance(value, str):
                return json.loads(value)
        except ValueError:
            pass
        return value

    # pylint: disable=unused-argument
    def from_db_value(self, value, *args):
        """to db """
        return self.to_python(value)

    def get_db_prep_save(self, value, connection):
        """to save"""
        if value == "":
            return None
        if isinstance(value, dict):
            value = json.dumps(value, cls=DjangoJSONEncoder)
        return value

from unittest.mock import Mock, patch
from django.test import TestCase
from users.utils.haversine import distance
from ..models import Location

class HaversineTestCase(TestCase):
    """ tests regarding notification api """

    def test_same_location(self):
        location = Location.objects.create(name='home',
                                           longitude=38.123,
                                           latitude=127.39)
        location.save()
        """_send_push is called with subscribed profile"""
        self.assertEqual(distance(location, location), 0)

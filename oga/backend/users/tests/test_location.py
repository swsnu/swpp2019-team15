"""
tests
"""
import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model

class LocationTestCase(TestCase):
    """ tests regarding location creation """
    csrftoken = 0
    sessionid = 0
    client = Client()

    def setUp(self):
        user = get_user_model()
        user = user.objects.create_user(username='test', password='1234')
        user.save()

        self.client.login(username='test', password='1234')

    def tearDown(self):
        self.csrftoken = 0
        self.sessionid = 0
        self.client.logout()

    def test_post_location(self):
        """ test adding questions """
        location = {'name':'school', 'longitude':27.123, 'latitude':23.234,
                    'place_type': 'cafe'}
        response = self.client.post('/api/location/',
                                    json.dumps(location),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['success'], True)

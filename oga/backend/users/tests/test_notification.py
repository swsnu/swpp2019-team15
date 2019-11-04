"""
tests
"""
import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model

class NotificationTestCase(TestCase):
    """ tests regarding notification api """
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

    def test_save_invalid_subscription(self):
        """ test adding questions """
        location = {'name':'school', 'longitude':27.123, 'latitude':23.234}
        response = self.client.post('/api/save-subscription/',
                                    json.dumps(location),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_save_valid_subscription(self):
        """ test adding questions """
        location = {'endpoint': '123', 'keys':{'p256dh':'123', 'auth':'123'}}
        response = self.client.post('/api/save-subscription/',
                                    json.dumps(location),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)

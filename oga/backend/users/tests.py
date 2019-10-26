from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from .models import Location, Profile, Question
import json
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, get_user
from django.views import generic

class OgaTestCase(TestCase):
    csrftoken = 0
    sessionid = 0
    client = Client()

    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user(username='test', password='1234')
        user.save()
        location = Location.objects.create(name='home',
                                           longitude=38.123,
                                           latitude=127.39)
        location.save()
        question = Question.objects.create(author=user, content='rains?',
                                           location_id=location)
        question.save()
        profile = Profile.objects.get(user=user)
        profile.location = location


        self.client.login(username='test', password='1234')

    def tearDown(self):
        self.csrftoken = 0
        self.sessionid = 0
        self.client.logout()

    def test_signup(self):
        userinfo = {'username': 'foo', 'password':'bar'}
        response = self.client.post('/api/signup/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['id'], 2)

    def test_signup_bad_request(self):
        userinfo = {'usename': 'foo', 'password':'bar'}
        response = self.client.post('/api/signup/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signin(self):
        userinfo = {'username': 'test', 'password':'1234'}
        response = self.client.post('/api/signin/', json.dumps(userinfo),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['id'], 1)

    def test_add_questions(self):
        location = {'name':'school', 'longitude':27.123, 'latitude':23.234}
        question_data = {'target_location': location,
                         'content': 'raining??'}
        response = self.client.post('/api/questions/', 
                                    json.dumps(question_data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['id'], 2)

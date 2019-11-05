"""
tests
"""
import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from ..models import Location, Profile, Question


class QuestionTestCase(TestCase):
    """ tests regarding question creation """
    csrftoken = 0
    sessionid = 0
    client = Client()

    def setUp(self):
        user = get_user_model()
        self.user = user.objects.create_user(username='test', password='1234')
        self.user.save()
        location = Location.objects.create(name='home',
                                           longitude=38.123,
                                           latitude=127.39)
        location.save()
        question = Question.objects.create(author=self.user, content='rains?',
                                           location_id=location)
        question.save()
        profile = Profile.objects.get(user=self.user)
        profile.location = location

        self.client.login(username='test', password='1234')

    def tearDown(self):
        self.csrftoken = 0
        self.sessionid = 0
        self.client.logout()

    def test_add_questions(self):
        """ test adding questions """
        location = {'name': 'school', 'longitude': 27.123, 'latitude': 23.234}
        question_data = {'target_location': location,
                         'content': 'raining??'}
        response = self.client.post('/api/questions/',
                                    json.dumps(question_data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['id'], 2)

    def test_get_question(self):
        """ test getting single question based on question id """
        response = self.client.get(reverse('question_detail', args=[1]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['content'], 'rains?')

    def test_get_question_list(self):
        """ test getting question list """
        second_location = Location(
            name='school', latitude=1.2525, longitude=-0.5)
        second_location.save()
        second_question = Question(
            author=self.user, content='seats?', location_id=second_location)
        second_question.save()
        response = self.client.get('/api/questions/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['content'], 'rains?')
        self.assertEqual(response.json()[1]['content'], 'seats?')

    def test_get_question(self):
        """ test getting single question based on question id """
        response = self.client.get(reverse('question_detail', args=[1]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['content'], 'rains?')

    def test_follow_question(self):
        """ test follow question api """
        response = self.client.get('/api/follow/1/')
        question = Question.objects.get(pk=1)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(question.followers.all()), 1)

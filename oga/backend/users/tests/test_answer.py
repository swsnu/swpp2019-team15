"""
tests
"""
import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from ..models import Location, Profile, Question, Answer


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
        question = Question.objects.create(id=1, author=self.user, content='rains?',
                                           location_id=location)
        question.save()
        profile = Profile.objects.get(user=self.user)
        answer = Answer.objects.create(id=1,question=question,
                                       author=profile,
                                       question_type='rain?',
                                       content='no')
        answer.save()

        profile.location = location

        self.client.login(username='test', password='1234')

    def tearDown(self):
        self.csrftoken = 0
        self.sessionid = 0
        self.client.logout()

    def test_add_answers(self):
        """ test posting answers """
        answer = {'question_type': 'rain?', 
                  'answer_content': 'no'}
        response = self.client.post('/api/reply/1/',
                                    json.dumps(answer),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['question_id'], 1)

    def test_get_answer(self):
        """ test getting an answer """
        answer = {'question_type': 'rain?', 
                  'answer_content': 'no'}
        response = self.client.post('/api/reply/1/',
                                    json.dumps(answer),
                                    content_type='application/json')
        response = self.client.get('/api/reply/1/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['content'], 'no')

    def test_get_answers(self):
        """ test getting every answers for a question"""
        response = self.client.get('/api/replies/1/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['content'], 'no')

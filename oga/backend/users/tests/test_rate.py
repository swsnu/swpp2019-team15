"""
Rating tests
"""
import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from ..models import Location, Profile, Question, Answer


class RatingTestCase(TestCase):
    """ tests regarding answer creation """
    csrftoken = 0
    sessionid = 0
    client = Client()

    def setUp(self):
        user = get_user_model()
        self.user = user.objects.create_user(username='test', password='1234')
        self.user.save()
        self.location = Location.objects.create(name='home',
                                                longitude=38.123,
                                                latitude=127.39)
        self.location.save()
        self.question = Question.objects.create(author=self.user, content='rains?',
                                                location_id=self.location)
        self.question.save()
        profile = Profile.objects.get(user=self.user)
        profile.location_id = self.location
        profile.save()
        self.answer = Answer.objects.create(id=1, question=self.question,
                                            author=profile,
                                            question_type='rain?',
                                            content='no')
        self.answer.save()

        self.client.login(username='test', password='1234')

    def tearDown(self):
        self.csrftoken = 0
        self.sessionid = 0
        self.client.logout()

    def test_initial_rating(self):
        """ test initial rating """
        # default user rating should be zero
        self.assertEqual(self.answer.author.rate_up, 0)
        self.assertEqual(self.answer.author.rate_down, 0)

    def test_rate_up_answer(self):
        """ test rating up an answer """
        response = self.client.put('/api/rate/up/1/')
        self.assertEqual(response.status_code, 201)

    def test_rate_down_answer(self):
        """ test rating down an answer """
        response = self.client.put('/api/rate/up/1/')
        self.assertEqual(response.status_code, 201)

"""
tests
"""
import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from ..models import Location, Profile, Question, Answer


class AnswerTestCase(TestCase):
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
        self.question = Question.objects.create(id=1, author=self.user, content='rains?',
                                                location_id=self.location)
        self.question.save()
        profile = Profile.objects.get(user=self.user)
        profile.location_id = self.location
        profile.save()
        answer = Answer.objects.create(id=1, question=self.question,
                                       author=profile,
                                       question_type='rain?',
                                       content='no')
        answer.save()
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

    def test_get_user_answer_list(self):
        """ test getting answer list of currently logged in user """
        # create a second user
        other_user = get_user_model()
        other_user = other_user.objects.create_user(
            username='other_user', password='1234')
        other_user.save()
        # create other user profile
        profile = Profile.objects.get(user=other_user)
        profile.save()
        # New answer created by another user
        other_answer = Answer(
            author=profile, content='many', question=self.question)
        other_answer.save()

        # fetch answer list of currently logged in user
        response = self.client.get('/api/profile/answers/')
        self.assertEqual(response.status_code, 200)
        # should omit answers made by other users
        self.assertEqual(len(response.json()), 1)

    def test_get_single_users_answer_list(self):
        """ 
        Test getting answer list of another user's profile.
        """
        # create another user
        new_user = get_user_model()
        new_user = new_user.objects.create_user(
            username='new_user', password='1234')
        new_user.save()
        # create other user profile
        profile = Profile.objects.get(user=new_user)
        profile.location_id = self.location
        profile.save()

        """ List should be empty before other user posts an answer """
        response = self.client.get('/api/profile/answers/new_user/')
        self.assertEqual(response.status_code, 200)
        # question list should be empty
        self.assertEqual(len(response.json()), 0)

        """ Should retrieve answer list made by new_user only """
        # Other user creates new answer
        other_answer = Answer(
            author=profile, content='many', question=self.question)
        other_answer.save()
        # fetch question list of "other_user"
        response = self.client.get('/api/profile/answers/new_user/')
        # question list should contain new question
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['content'], 'many')

    def test_if_initial_answer_is_rated(self):
        """ test if initial answer is rated """
        # Answer initially unrated
        response = self.client.get('/api/rate/is_rated/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['is_rated'], False)

    def test_when_answer_is_rated(self):
        """ test when answer has been rated """
        # Rate answer
        response = self.client.put('/api/rate/up/1/')
        self.assertEqual(response.status_code, 201)

        # Answer should be rated
        response = self.client.get('/api/rate/is_rated/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['is_rated'], True)

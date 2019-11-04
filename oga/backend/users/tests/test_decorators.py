"""
tests
"""
from unittest.mock import Mock
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.http import HttpResponse, HttpResponseBadRequest
from users.views.decorators import *



class DecoratorTestCase(TestCase):
    """ tests regarding notification api """
    csrftoken = 0
    sessionid = 0
    client = Client()
    m = Mock()
    m.user.is_authenticated = False
    m.user.username = "john"

    def setUp(self):
        user = get_user_model()
        user = user.objects.create_user(username='test', password='1234')
        user.save()

        self.client.login(username='test', password='1234')

    def tearDown(self):
        
        self.csrftoken = 0
        self.sessionid = 0
        self.client.logout()

    def test_check_request_valid(self):
        @check_request
        def test():
            username = {'username':'hi'}['username']
            return -1
        self.assertEqual(test(), -1)

    def test_check_request_invalid(self):
        @check_request
        def test():
            username = {'name':'hi'}['username']
            return -1
        print(test())
        self.assertEqual(test().status_code, 400)

    def test_check_login_required(self):
        @check_login_required
        def test(request):
            return -1
        self.assertEqual(test(self.m).status_code, 401)

    def test_check_user_owner_no_username(self):
        @check_user_owner
        def test(request, username="foo"):
            return -1
        self.assertEqual(test(self.m).status_code, 400)

    def test_check_user_owner_is_owner(self):
        @check_user_owner
        def test(request, username="john"):
            return -1
        self.assertEqual(test(self.m, username="john"), -1)

    def test_check_user_owner_not_owner(self):
        @check_user_owner
        def test(request, username=""):
            return -1
        self.assertEqual(test(self.m, username="foo").status_code, 403)

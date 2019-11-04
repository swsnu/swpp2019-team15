from pywebpush import WebPushException
from unittest.mock import Mock, patch
from django.test import TestCase
from users.utils.send_push import send_push, _send_push, background

def throw_error(x,y,vapid_private_key,vapid_claims):
    raise WebPushException("error")

def throw_my_error(x,y,vapid_private_key,vapid_claims):
    extra = Mock()
    extra.code = 1
    extra.errno = 3
    extra.message = "HI"
    m = Mock()
    m.json.return_value = extra
    raise WebPushException("error", response=m)


class SendPushTestCase(TestCase):
    """ tests regarding notification api """

    m = Mock()
    m.profile = Mock()
    m.profile.subscription = {'key': 'hi'}

    @patch('users.utils.send_push._send_push')
    def test_send_push_invalid(self, f):
        """_send_push is called with subscribed profile"""
        self.m.profile.subscription = False
        send_push(self.m.profile, {"text": "HI"})
        f.assert_not_called()

    @patch('users.utils.send_push._send_push')
    def test_send_push_valid(self, f):
        """_send_push is called with subscribed profile"""
        self.m.profile.subscription = {'key':"HI"}
        send_push(self.m.profile, {"text": "HI"})
        f.assert_called_once()


    # @patch('users.utils.send_push.background')
    # @patch('users.utils.send_push.webpush', side_effect=throw_error)
    # def test_error_in_send_push(self, f, b):
        # """webpush is called"""
        # self.assertRaises(WebPushException, _send_push({'key': "HI"}, {"text":"HI"}))

    # @patch('users.utils.send_push.background')
    # @patch('users.utils.send_push.webpush', side_effect=throw_my_error)
    # def test_more_error_in_send_push(self, f, b):
        # """webpush is called"""
        # self.assertRaises(WebPushException, _send_push({'key':"HI"}, {"text":"HI"}))

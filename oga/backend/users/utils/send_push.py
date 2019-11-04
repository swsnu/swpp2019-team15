"""wrapper for webpush"""
import json
from pywebpush import webpush, WebPushException
from background_task import background

def send_push(profile, body):
    """
    given a subscription of a user (a Profile)
    send an appropriate notification with body (a dictionary object) notification

    how to use:
    send_push(profile, {'title': 'hi', 'text': 'hi'})
    """
    if profile.subscription:
        return _send_push(profile.subscription, body)

@background
def _send_push(subscription, body):
    """
    a utility function that runs as a seperate task.
    the arguments to a background function has to serializable(it is stored in
    DB); so send_push passes profile.subscription to this function.
    """
    try:
        webpush(subscription,
                json.dumps(body),
                # encoded as a hard string as of now
                vapid_private_key="LhJWR3cBwqckwjYMC1vQoCLXmI8d3qXK6LOUMZ-6LzY",
                vapid_claims={"sub": "mailto:indiofish@naver.com"})
    except WebPushException as ex:
        print(": {}", repr(ex))
        # Mozilla returns additional information in the body of the response.
        if ex.response and ex.response.json():
            extra = ex.response.json()
            print("Remote service replied with a {}:{}, {}",
                  extra.code,
                  extra.errno,
                  extra.message)

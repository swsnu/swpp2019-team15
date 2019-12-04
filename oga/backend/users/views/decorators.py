"""decorators used to check validity of requests"""
from functools import wraps
from django.http import HttpResponse, HttpResponseBadRequest
from django.http import HttpResponseForbidden

def check_request(views_func):
    """checks if request body is valid json"""
    @wraps(views_func)
    def wrapper(*args, **kwargs):
        try:
            return views_func(*args, **kwargs)
        except (KeyError, ValueError) as ex:
            return HttpResponseBadRequest(str(ex))
    return wrapper

def check_login_required(views_func):
    """checks if user has logged in"""
    @wraps(views_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return views_func(request, *args, **kwargs)
        else:
            return HttpResponse(status=401)
    return wrapper

def check_user_owner(views_func):
    """checks if user is owner of the model"""
    @wraps(views_func)
    def wrapper(request, *args, **kwargs):
        if 'username' not in kwargs.keys():
            return HttpResponseBadRequest()
        else:
            user_name = kwargs["username"]
            if user_name != request.user.username:
                return HttpResponseForbidden()
            else:
                return views_func(request, *args, **kwargs)

    return wrapper
        
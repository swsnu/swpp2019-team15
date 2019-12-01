"""functional views api for the models"""
import json

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout, get_user
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from users.models import Profile
from users.views.decorators import check_request, check_login_required


@check_request
@require_http_methods(["POST"])
def sign_up(request):
    """sign up api"""
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']
    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "The username already exists"},
                            status=401)
    else:
        new_user = User.objects.create_user(
            username=username, password=password)
        response_dict = {'id': new_user.id}
        return JsonResponse(response_dict, status=201)


@check_request
@require_http_methods(["POST"])
def sign_in(request):
    """sign in api"""
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        response_dict = {'id': user.id}
        return JsonResponse(response_dict, status=201)
    else:
        return JsonResponse({}, status=401)


@check_login_required
@ensure_csrf_cookie
@require_http_methods(["GET"])
def is_logged_in(request):
    """
    a method that tests if user is logged in or not.
    if this function passes the @check_login_required,
    it means the user is logged in so we can
    just return a OK response
    """
    return JsonResponse({}, status=201)


@check_login_required
@ensure_csrf_cookie
@require_http_methods(["GET"])
def logged_out(request):
    """
    a method that get user to log out.
    if this function passes the @check_login_required,
    it means the user is logged in so we can
    just get user to log out
    """
    logout(request)
    return JsonResponse({}, status=204)


@check_login_required
@ensure_csrf_cookie
@require_http_methods(["GET"])
def get_profile(request):
    """
    get profile details of currently logged in user
    """
    user = get_user(request)
    profile = Profile.objects.get(user=user)
    location_name = "Location unknown"
    coordinates = ""
    if(profile.location_id):
        location_name = profile.location_id.name
        coordinates = "(", round(profile.location_id.latitude, 2), ",", round(
            profile.location_id.longitude, 2), ")"

    response_dict = {
        'id': profile.id,
        'username': profile.user.username,
        'location': location_name,
        'coordinates': coordinates
    }
    return JsonResponse(response_dict)


@check_login_required
@ensure_csrf_cookie
@require_http_methods(["GET"])
def get_user_profile(request, username):
    """
    get profile details of specific user based on username
    """
    user = User.objects.get(username=username)
    profile = Profile.objects.get(user=user)
    response_dict = {
        'id': profile.id,
        'username': profile.user.username,
        'location': profile.location_id.name,
        'location_lat': round(profile.location_id.latitude, 2),
        'location_long': round(profile.location_id.longitude, 2),
    }
    return JsonResponse(response_dict)

"""profile related views"""
import json

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout, get_user
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie
from users.models import Profile
from users.views.decorators import check_request, check_login_required

@check_login_required
@ensure_csrf_cookie
@require_http_methods(["GET"])
def get_profile(request, username=''):
    """
    get profile details of a user based on username
    """
    if username != "":
        # get profile details of currently logged in user
        user = User.objects.get(username=username)
    else:
        user = get_user(request)
    profile = Profile.objects.get(user=user)
    location_name = "Location unknown"
    coordinates = ""

    if profile.location_id:
        location_name = profile.location_id.name
        coordinates = "(" + str(round(profile.location_id.latitude, 2)) + \
            ", " + str(round(profile.location_id.longitude, 2)) + ")"

    response_dict = {
        'id': profile.id,
        'username': profile.user.username,
        'location': location_name,
        'coordinates': coordinates
    }
    return JsonResponse(response_dict, status=200)
    
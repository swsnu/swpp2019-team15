"""functional views api for user notifications"""
import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponseBadRequest
from django.contrib.auth import get_user
from django.views.decorators.http import require_http_methods
from users.views.decorators import check_request, check_login_required
from users.models import Profile

@check_login_required
@check_request
@require_http_methods(["POST"])
def save_subscription(request):
    """store user push server to profile"""
    req_data = json.loads(request.body.decode())
    # the request body should at least hold the following
    if ('endpoint' not in req_data or
            'keys' not in req_data):
        return HttpResponseBadRequest('invalid')

    user = get_user(request)
    profile = get_object_or_404(Profile, user=user)
    profile.subscription = req_data
    profile.save()
    return JsonResponse({'data':{'success': True}}, status=201)

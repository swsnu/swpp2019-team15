"""location related views"""
import json
from django.contrib.auth import get_user

from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from users.views.decorators import check_request, check_login_required
from users.models import Location, Profile

@check_login_required
@check_request
@require_http_methods(["POST"])
@csrf_exempt
def locations(request):
    """on post, store user's location in profile"""
    req_data = json.loads(request.body.decode())
    print(req_data)
    location, _ = Location.objects.get_or_create(name=req_data['name'],
                                                 latitude=req_data['latitude'],
                                                 longitude=req_data['longitude'])
    user = get_user(request)
    profile = get_object_or_404(Profile, user=user)
    profile.location_id = location
    profile.save()
    response_dict = {'success': True}
    return JsonResponse(response_dict, status=201)

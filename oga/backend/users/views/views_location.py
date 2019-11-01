"""location related views"""
from django.contrib.auth import get_user

from users.views.decorators import check_request, check_login_required
from users.models import Location

@check_login_required
@check_request
@require_http_methods(["POST"])
@csrf_exempt
def locations(request):
    """on post, store user's location"""
    req_data = json.loads(request.body.decode())
    location = req_data['location']
    location, _ = Location.objects.get_or_create(name=location['name'],
                                                 latitude=location['latitude'],
                                                 longitude=location['longitude'])
    user = get_user(request)
    user.location = location
    user.save()
    response_dict = {'success': True}
    return JsonResponse(response_dict, status=201)

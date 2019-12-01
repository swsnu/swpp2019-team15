"""functional views api for the models"""

from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from ..models import Answer, Profile
from ..views.decorators import check_request, check_login_required


@check_login_required
@check_request
@require_http_methods(["PUT"])
@csrf_exempt
def rate_up_answer(request, answer_id):
    """
    function to rate up the answer which corresponding to answer_id 
    PUT: rate_up_answer api
    """

    answer = Answer.objects.get(id=answer_id)
    if answer.is_rated is True:
        return HttpResponse(status=403)
    answer.is_rated = True
    answer.is_up = True
    answer.save()
    user = get_user(request)
    profile = Profile.objects.get(user=user)
    profile.rate_up += 1
    profile.save()
    response_dict = {
        'answer_id': answer_id,
        'rate_up': profile.rate_up,
        'rate_down': profile.rate_down
    }
    return JsonResponse(response_dict, status=201)


@check_login_required
@check_request
@require_http_methods(["PUT"])
@csrf_exempt
def rate_down_answer(request, answer_id):
    """
    function to rate down the answer which corresponding to answer_id
    PUT: rate_down_answer api
    """

    answer = Answer.objects.get(id=answer_id)
    if answer.is_rated is True:
        return HttpResponse(status=403)
    answer.is_rated = True
    answer.is_up = False
    answer.save()
    user = get_user(request)
    profile = Profile.objects.get(user=user)
    profile.rate_down += 1
    profile.save()
    response_dict = {
        'answer_id': answer_id,
        'rate_up': profile.rate_up,
        'rate_down': profile.rate_down
    }
    return JsonResponse(response_dict, status=201)

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
    answer.numbers_rated_up += 1
    answer.users_rated_up_answers.add(user)
    answer.save()
    user = get_user(request)
    profile = Profile.objects.get(user=user)
    profile.rate_up += 1
    profile.save()
    response_dict = {
        'answer_id': answer_id,
        'rate_up': answer.numbers_rated_up,
        'rate_down': answer.numbers_rated_down
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
    answer.numbers_rated_down += 1
    answer.users_rated_down_answers.add(user)
    answer.save()
    user = get_user(request)
    profile = Profile.objects.get(user=user)
    profile.rate_down += 1
    profile.save()
    response_dict = {
        'answer_id': answer_id,
        'rate_up': answer.numbers_rated_up,
        'rate_down': answer.numbers_rated_down
    }
    return JsonResponse(response_dict, status=201)


@check_login_required
@check_request
@require_http_methods(["GET"])
def get_rated_answer(request):
    """return rated_answers done by the user"""
    user = get_user(request)
    users = User.objects.get(rated_up_answers__in=user)
    users += User.objects.get(rated_down_answers__in=user)
    if users.count() > 1:
        return HttpResponse(status=404)
    response_dict = [{
        'users_id_rating': usr.id
    } for usr in users]
    return JsonResponse(response_dict, status=201)

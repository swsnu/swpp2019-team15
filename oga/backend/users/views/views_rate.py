"""functional views api for the models"""

from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from ..models import User, Answer, Profile
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
    user = get_user(request)
    answer = get_object_or_404(Answer, id=answer_id)
    rated_up_list = answer.users_rated_up_answers.all()
    rated_down_list = answer.users_rated_down_answers.all()
    if user in (rated_up_list or rated_down_list):
        return HttpResponse(status=403)
    answer.numbers_rated_up += 1
    answer.users_rated_up_answers.add(user)
    answer.save()
    profile = answer.author
    profile.rate_up += 1
    profile.save()
    response_dict = {
        'answer_id': answer_id,
        'rated_up': answer.numbers_rated_up,
        'rated_down': answer.numbers_rated_down,
    }
    return JsonResponse(response_dict, safe=False, status=201)


@check_login_required
@check_request
@require_http_methods(["PUT"])
@csrf_exempt
def rate_down_answer(request, answer_id):
    """
    function to rate down the answer which corresponding to answer_id
    PUT: rate_down_answer api
    """
    user = get_user(request)
    answer = get_object_or_404(Answer, id=answer_id)
    rated_up_list = answer.users_rated_up_answers.all()
    rated_down_list = answer.users_rated_down_answers.all()
    if user in (rated_up_list or rated_down_list):
        return HttpResponse(status=403)
    answer.numbers_rated_down += 1
    answer.users_rated_down_answers.add(user)
    answer.save()
    profile = answer.author
    profile.rate_down += 1
    profile.save()
    response_dict = {
        'answer_id': answer_id,
        'rated_up': answer.numbers_rated_up,
        'rated_down': answer.numbers_rated_down
    }
    return JsonResponse(response_dict, safe=False, status=201)


@check_login_required
@check_request
@require_http_methods(["GET"])
@csrf_exempt
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
    return JsonResponse(response_dict, safe=False, status=201)

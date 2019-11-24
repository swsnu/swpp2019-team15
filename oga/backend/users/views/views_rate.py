"""functional views api for the models"""
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user
from django.views.decorators.http import require_http_methods
from users.models import Question, Answer, Profile, Rating
from users.views.decorators import check_request, check_login_required

@check_login_required
@check_request
@require_http_methods(["get"])
@csrf_exempt
def check_rating(request, answer_id):
    """function to check if the answer which corresponding to answer_id was rated
        GET: check_rating api"""
    
    answer = Answer.objects.get(id=answer_id)
    rate = Rating.objects.get_or_create(connected_answer=answer)
    response_dict = {'is_rated': rate.is_rated,
                     'is_up': rate.is_up,
                    }
    return JsonResponse(response_dict, status=200)


@check_login_required
@check_request
@require_http_methods(["PUT"])
@csrf_exempt
def rate_up_answer(request, answer_id):
    """function to rate up the answer which corresponding to answer_id
        PUT: rate_up_answer api"""
    
    answer = Answer.objects.get(id=answer_id)
    rate = Rating.objects.get_or_create(connected_answer=answer)
    rate = Rating(is_rated=True, is_up=True)
    response_dict = {'is_rated': rate.is_rated,
                     'is_up': rate.is_up,
                    }
    return JsonResponse(response_dict, status=201)


@check_login_required
@check_request
@require_http_methods(["PUT"])
@csrf_exempt
def rate_down_answer(request, answer_id):
    """function to rate down the answer which corresponding to answer_id
        PUT: rate_down_answer api"""
    
    answer = Answer.objects.get(id=answer_id)
    rate = Rating.objects.get_or_create(connected_answer=answer)
    rate = Rating(is_rated=True, is_up=False)
    response_dict = {'is_rated': rate.is_rated,
                     'is_up': rate.is_up,
                    }
    return JsonResponse(response_dict, status=201)

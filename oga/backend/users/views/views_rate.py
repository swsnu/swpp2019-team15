"""functional views api for the models"""

from math import log10, sqrt
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from ..models import Profile, Question, Answer
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
    profile = answer.author

    # Get list of users who rated this answer
    rated_up_list = answer.users_rated_up_answers.all()
    rated_down_list = answer.users_rated_down_answers.all()

    if user in rated_up_list:
        return HttpResponse(status=400)

    if user in rated_down_list:
        # Remove previous rate down
        profile.rate_down -= 1
        answer.numbers_rated_down -= 1
        answer.users_rated_down_answers.remove(user)
        answer.save()

    # Add user to rated up list
    answer.numbers_rated_up += 1
    answer.users_rated_up_answers.add(user)
    answer.save()

    profile.rate_up += 1
    profile.reliability = calculate_reliability(profile, profile.rate_up, profile.rate_down)
    profile.save()
    n_ans = Answer.objects.all().count()
    n_qus = Question.objects.all().count()
    profile.rank_score = calculate_score(profile.reliability, n_ans, n_qus)
    profile.save()
    response_dict = parse_rating(answer, True)

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
    profile = answer.author

    # Get list of users who rated this answer
    rated_up_list = answer.users_rated_up_answers.all()
    rated_down_list = answer.users_rated_down_answers.all()

    if user in rated_down_list:
        # User already rated down this answer
        return HttpResponse(status=400)

    if user in rated_up_list:
        # Remove previous rate up
        profile.rate_up -= 1
        answer.numbers_rated_up -= 1
        answer.users_rated_up_answers.remove(user)
        answer.save()

    # Add user to rated down list
    answer.numbers_rated_down += 1
    answer.users_rated_down_answers.add(user)
    answer.save()

    profile.rate_down += 1
    profile.reliability = calculate_reliability(profile.rate_up, profile.rate_down)
    profile.save()
    n_ans = Answer.objects.all().count()
    n_qus = Question.objects.all().count()
    profile.rank_score = calculate_score(profile.reliability, n_ans, n_qus)
    profile.save()
    response_dict = parse_rating(answer, False)

    return JsonResponse(response_dict, safe=False, status=201)


def parse_rating(answer, is_up):
    """
    Single function to parse user rating
    into Json response dict
    """
    rating_dict = {
        'answer_id': answer.id,
        'rated_up': answer.numbers_rated_up,
        'rated_down': answer.numbers_rated_down,
        'is_up': is_up,
    }
    return rating_dict


def calculate_score(reliability, num_ans, num_qus):
    """
    calculate rank score
    """
    return reliability * (num_ans / (1+log10(num_qus)))


def calculate_reliability(ups, downs):
    """
    Calculate reliability of user
    from https://stackoverflow.com/questions/10029588/
    python-implementation-of-the-wilson-score-interval
    """
    n = ups + downs

    if n == 0:
        return 0

    z_val = 1.96 #1.44 = 85%, 1.96 = 95%
    phat = float(ups) / n
    val = ((phat + z_val*z_val/(2*n) - z_val * sqrt((phat*(1-phat)+z_val*z_val/(4*n))/n))/(1+z_val*z_val/n))
    return round(val, 2)





# @check_login_required
# @check_request
# @require_http_methods(["GET"])
# @csrf_exempt
# def get_rated_answer(request):
#     """return rated_answers done by the user"""
#     user = get_user(request)
#     users = User.objects.get(rated_up_answers__in=user)
#     users += User.objects.get(rated_down_answers__in=user)
#     if users.count() > 1:
#         return HttpResponse(status=404)
#     response_dict = [{
#         'users_id_rating': user.id
#     } for user in users]
#     return JsonResponse(response_dict, safe=False, status=201)

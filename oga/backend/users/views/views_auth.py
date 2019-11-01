"""functional views api for the models"""
import json

# from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.views.decorators.http import require_http_methods

from users.views.decorators import check_request

@check_request
@csrf_exempt
@require_http_methods(["POST"])
def sign_up(request):
    """sign up api"""
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']
    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "The username already exists"}, status=401)
    else:
        new_user = User.objects.create_user(username=username, password=password)
        response_dict = {'id': new_user.id}
        return JsonResponse(response_dict, status=201)

@check_request
@csrf_exempt
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

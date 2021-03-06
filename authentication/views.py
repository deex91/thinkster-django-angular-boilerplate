# -*- coding: utf-8 -*-

from rest_framework import permissions, viewsets

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer

import json

from django.contrib.auth import authenticate, login

from rest_framework import status, views
from rest_framework.response import Response

from django.contrib.auth import logout

from rest_framework import permissions

class AccountViewSet(viewsets.ModelViewSet):	#ViewSet for Account
    lookup_field = 'username'	#Lookup criterion
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):	#If permit to call update or delete
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):	#Create user
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
	    		'status': 'Bad request',
	    		'message': 'Konto nie może zostać utworzone.'
	    	}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

###################################################################################################

class LoginView(views.APIView):		#View for login
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'Konto jest nieaktywne.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Niepoprawny email/hasło.'
            }, status=status.HTTP_401_UNAUTHORIZED)

###################################################################################################

class LogoutView(views.APIView):        #View for logout
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)



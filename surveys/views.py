from rest_framework import permissions, viewsets
from rest_framework.response import Response

from surveys.models import Survey
from surveys.permissions import IsAuthorOfSurvey
from surveys.serializers import SurveySerializer


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.order_by('-created_at')
    serializer_class = SurveySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfSurvey(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)
        return instance



class AccountSurveysViewSet(viewsets.ViewSet):
    queryset = Survey.objects.select_related('author').all()
    serializer_class = SurveySerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class SurveyIdViewSet(viewsets.ViewSet):
    queryset = Survey.objects.select_related('id').all()
    serializer_class = SurveySerializer

    def retrieve(self, request, pk=None):
        queryset = self.queryset.filter(id=pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
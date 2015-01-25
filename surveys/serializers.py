from rest_framework import serializers

from authentication.serializers import AccountSerializer
from surveys.models import Survey


class SurveySerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Survey

        fields = ('id', 'author', 'title', 'created_at')
        read_only_fields = ('id', 'created_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(SurveySerializer, self).get_validation_exclusions()

        return exclusions + ['author']
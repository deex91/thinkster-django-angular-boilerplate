from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account

#################################################################################################

class AccountSerializer(serializers.ModelSerializer):	#Serializer for Account model
    password = serializers.CharField(write_only=True, required=False)			#To make required
    confirm_password = serializers.CharField(write_only=True, required=False)	#false

    class Meta:		#Metadata of serializer
        model = Account		#Model to serialize: model->JSON
        fields = ('id', 'email', 'username', 'created_at', 'updated_at',	#Serialized fields
                  'first_name', 'last_name', 'password',
                  'confirm_password',)
        read_only_fields = ('created_at', 'updated_at',)	#self-updating fields

    def create(self, validated_data):	#Deserialization: JSON->model
        return Account.objects.create(**validated_data)

    def update(self, instance, validated_data):		#Deserialization
        instance.username = validated_data.get('username', instance.username)	#Update username

        instance.save()

    #Update password if it's in JSON
        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

        #Authenticate user again
        update_session_auth_hash(self.context.get('request'), instance)

        return instance

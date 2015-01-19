from django.conf.urls import include, patterns, url

from thinkster_django_angular_boilerplate.views import IndexView

from rest_framework_nested import routers

from authentication.views import AccountViewSet
from authentication.views import LoginView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

#URL patterns
urlpatterns = patterns(
    '',

	url(r'^api/v1/', include(router.urls)),	#URL for accounts

	url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),	#URL for login

    url('^.*$', IndexView.as_view(), name='index'),
)

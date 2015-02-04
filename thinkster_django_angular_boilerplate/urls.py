from django.conf.urls import include, patterns, url

from thinkster_django_angular_boilerplate.views import IndexView

from rest_framework_nested import routers

from authentication.views import AccountViewSet
from authentication.views import LoginView
from authentication.views import LogoutView
from surveys.views import AccountSurveysViewSet, SurveyViewSet, SurveyIdViewSet

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

router.register(r'surveys', SurveyViewSet)

router.register(r'survey', SurveyIdViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'surveys', AccountSurveysViewSet)

#URL patterns
urlpatterns = patterns(
    '',

	url(r'^api/v1/', include(router.urls)),	#URL for accounts, surveys

    url(r'^api/v1/', include(accounts_router.urls)),    #URL for accounts_surveys

	url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),	#URL for login

    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'), #URL for logout

    url('^.*$', IndexView.as_view(), name='index'),
)

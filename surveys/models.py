from django.db import models

from authentication.models import Account

class Survey(models.Model):
    author = models.ForeignKey(Account)
    title = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return '{0}'.format(self.title)

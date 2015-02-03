from django.db import models

from authentication.models import Account

class Survey(models.Model):
    author = models.ForeignKey(Account)
    title = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return '{0}'.format(self.title)


class Question(models.Model):
    survey = models.ForeignKey(Survey, related_name='questions')
    content = models.TextField()

    def __unicode__(self):
        return '{0}'.format(self.content)


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers')
    content = models.TextField()

    def __unicode__(self):
        return '{0}'.format(self.content)
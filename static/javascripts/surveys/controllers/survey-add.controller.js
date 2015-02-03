/**
* SurveyAddController
* @namespace thinkster.surveys.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.surveys.controllers')
    .controller('SurveyAddController', SurveyAddController);

  SurveyAddController.$inject = [
    '$scope', '$location', 'Authentication', 'Surveys', 'Snackbar'
  ];

  /**
  * @namespace SurveyAddController
  */
  function SurveyAddController($scope, $location, Authentication, Surveys, Snackbar) {
    var vm = this;

    vm.add = add;
    vm.addQuestion = addQuestion;
    vm.addAnswer = addAnswer;

    vm.questions = [{id: 0}];
    vm.questions[0].answers = [{id: 0}];

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf thinkster.surveys.controllers.SurveyAddController
    */
    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();

      // Redirect if not logged in
      if (!authenticatedAccount) {
        $location.url('/');
        Snackbar.error('Brak autoryzacji.');
      }
    }

    function addQuestion() {
        var newItemNo = vm.questions.length;
        vm.questions.push({'id':newItemNo});
        vm.questions[newItemNo].answers = [{'id': 0}];
    }

    function addAnswer(questionId) {
        var currentAnswers = vm.questions[questionId].answers;
        var newItemNo = currentAnswers.length;
        currentAnswers.push({'id':newItemNo});
    }

    function validate() {
        if(vm.title == undefined || vm.title=='')
            return false;

        var i, j;
        for(i = 0; i < vm.questions.length; ++i) {
            if(vm.questions[i].content == undefined || vm.questions[i].content=='')
                return false;
            for(j = 0; j < vm.questions[i].answers.length; ++j) {
                if(vm.questions[i].answers[j].content == undefined || vm.questions[i].answers[j].content=='')
                    return false;
            }
        }

        return true;
    }

    function add() {
        if(validate() == false) {
            Snackbar.error('Uzupełnij wszystkie pola');
            return;
        }

        $scope.$broadcast('survey.created', {
            title: vm.title,
            author: {
            username: Authentication.getAuthenticatedAccount().username
            }
        });

        Surveys.create(vm.title, vm.questions).then(createSurveySuccessFn, createSurveyErrorFn);

        /**
        * @name createSurveySuccessFn
        * @desc Show snackbar with success message
        */
        function createSurveySuccessFn(data, status, headers, config) {
          Snackbar.show('Ankieta została utworzona.');
          $location.url('/')
        }


        /**
        * @name createSurveyErrorFn
        * @desc Propogate error event and show snackbar with error message
        */
        function createSurveyErrorFn(data, status, headers, config) {
          $scope.$broadcast('survey.created.error');
          Snackbar.error(data.error);
        }
    }
  }
})();

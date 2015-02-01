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
    '$location', 'Authentication', 'Surveys', 'Snackbar'
  ];

  /**
  * @namespace SurveyAddController
  */
  function SurveyAddController($location, Authentication, Surveys, Snackbar) {
    var vm = this;

    vm.add = add;
    vm.addQuestion = addQuestion;
    vm.addAnswer = addAnswer;

    vm.title = '';

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

    function add() {
        addQuestion();
    }
  }
})();

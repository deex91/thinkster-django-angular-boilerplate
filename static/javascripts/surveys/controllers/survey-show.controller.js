/**
* SurveyShowController
* @namespace thinkster.surveys.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.surveys.controllers')
    .controller('SurveyShowController', SurveyShowController);

  SurveyShowController.$inject = [
    '$routeParams', '$scope', '$location', 'Authentication', 'Surveys', 'Snackbar'
  ];

  /**
  * @namespace SurveyShowController
  */
  function SurveyShowController($routeParams, $scope, $location, Authentication, Surveys, Snackbar) {
    var vm = this;

    vm.submit = submit;
    vm.showStats = showStats;

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf thinkster.surveys.controllers.SurveyShowController
    */
    function activate() {
        var id = $routeParams.id;

        Surveys.show(id).then(surveySuccessFn, surveyErrorFn);

        function surveySuccessFn(data, status, headers, config) {
          if(data.data.length == 1) {
              vm.survey = data.data[0];
              makeStats();
          }
          else {
            $location.url('/');
            Snackbar.error('Nieznany błąd.');
          }

          function makeStats() {
              var i, j;
              vm.stats = [];
              for(i = 0; i < vm.survey.questions.length; ++i) {
                  for(j = 0; j < vm.survey.questions[i].answers.length; ++j) {
                      Surveys.stats(vm.survey.questions[i].answers[j].id).then(statsSuccessFn, statsErrorFn);
                  }
              }

              function statsSuccessFn(data, status, headers, config) {
                  vm.stats.push(data.data);
              }

              function statsErrorFn(data, status, headers, config) {
                  $location.url('/');
                  Snackbar.error('Nieznany błąd.');
              }
          }

        }

        function surveyErrorFn(data, status, headers, config) {
          $location.url('/');
          Snackbar.error('Podana ankieta nie istnieje.');
        }
    }

    function showStats(id) {

        return id;
    }

    function validate() {
        var i;
        for(i = 0; i < vm.survey.questions.length; ++i) {
            if(vm.survey.questions[i].selected == undefined)
                return false;
        }

        return true;
    }

    function submit() {
        if(validate() == false) {
            Snackbar.error('Odpowiedz na wszystkie pytania.');
            return;
        }

        var answers = [];
        var i;
        for(i = 0; i < vm.survey.questions.length; ++i) {
            answers.push({'answer_id':vm.survey.questions[i].selected.id});
        }

        Surveys.answer(answers).then(createSolutionSuccessFn, createSolutionErrorFn);

        /**
        * @name createSolutionSuccessFn
        * @desc Show snackbar with success message
        */
        function createSolutionSuccessFn(data, status, headers, config) {
          Snackbar.show('Odpowiedź została wysłana.');
          $location.url('/')
        }


        /**
        * @name createSolutionErrorFn
        * @desc Propogate error event and show snackbar with error message
        */
        function createSolutionErrorFn(data, status, headers, config) {
            Snackbar.error(data.error);
        }
    }

  }
})();

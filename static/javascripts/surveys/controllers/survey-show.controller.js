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
          if(data.data.length == 1)
            vm.survey = data.data[0];
          else {
            $location.url('/');
            Snackbar.error('Nieznany błąd.');
          }
        }

        function surveyErrorFn(data, status, headers, config) {
          $location.url('/');
          Snackbar.error('Podana ankieta nie istnieje.');
        }
    }

    function submit() {
        Snackbar.show('Submit');
    }

  }
})();

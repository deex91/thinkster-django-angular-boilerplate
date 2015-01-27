/**
* NewSurveyController
* @namespace thinkster.surveys.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.surveys.controllers')
    .controller('NewSurveyController', NewSurveyController);

  NewSurveyController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Surveys'];

  /**
  * @namespace NewSurveyController
  */
  function NewSurveyController($rootScope, $scope, Authentication, Snackbar, Surveys) {
    var vm = this;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Survey
    * @memberOf thinkster.surveys.controllers.NewSurveyController
    */
    function submit() {
      $rootScope.$broadcast('survey.created', {
        title: vm.title,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        }
      });

      $scope.closeThisDialog();

      Surveys.create(vm.title).then(createSurveySuccessFn, createSurveyErrorFn);


      /**
      * @name createSurveySuccessFn
      * @desc Show snackbar with success message
      */
      function createSurveySuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Survey created.');
      }


      /**
      * @name createSurveyErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createSurveyErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('survey.created.error');
        Snackbar.error(data.error);
      }
    }
  }
})();
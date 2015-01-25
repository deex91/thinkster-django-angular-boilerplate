/**
* IndexController
* @namespace thinkster.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 'Surveys', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Authentication, Surveys, Snackbar) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.surveys = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.layout.controllers.IndexController
    */
    function activate() {
      Surveys.all().then(surveysSuccessFn, surveysErrorFn);

      $scope.$on('survey.created', function (event, survey) {
        vm.surveys.unshift(survey);
      });

      $scope.$on('survey.created.error', function () {
        vm.surveys.shift();
      });


      /**
      * @name surveysSuccessFn
      * @desc Update surveys array on view
      */
      function surveysSuccessFn(data, status, headers, config) {
        vm.surveys = data.data;
      }


      /**
      * @name surveysErrorFn
      * @desc Show snackbar with error
      */
      function surveysErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();
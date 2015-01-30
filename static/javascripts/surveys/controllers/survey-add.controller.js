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
  }
})();

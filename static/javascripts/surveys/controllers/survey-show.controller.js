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
    '$scope', '$location', 'Authentication', 'Surveys', 'Snackbar'
  ];

  /**
  * @namespace SurveyShowController
  */
  function SurveyShowController($scope, $location, Authentication, Surveys, Snackbar) {
    var vm = this;

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated.
    * @memberOf thinkster.surveys.controllers.SurveyShowController
    */
    function activate() {

    }

  }
})();

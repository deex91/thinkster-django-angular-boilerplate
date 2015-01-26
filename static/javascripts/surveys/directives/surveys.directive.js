/**
* Surveys
* @namespace thinkster.surveys.directives
*/
(function () {
  'use strict';

  angular
    .module('thinkster.surveys.directives')
    .directive('surveys', surveys);

  /**
  * @namespace Surveys
  */
  function surveys() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf thinkster.surveys.directives.Surveys
    */
    var directive = {
      controller: 'SurveysController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        surveys: '='
      },
      templateUrl: '/static/templates/surveys/surveys.html'
    };

    return directive;
  }
})();
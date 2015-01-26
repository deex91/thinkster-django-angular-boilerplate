/**
* Survey
* @namespace thinkster.surveys.directives
*/
(function () {
  'use strict';

  angular
    .module('thinkster.surveys.directives')
    .directive('survey', survey);

  /**
  * @namespace Survey
  */
  function survey() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf thinkster.surveys.directives.Survey
    */
    var directive = {
      restrict: 'E',
      scope: {
        survey: '='
      },
      templateUrl: '/static/templates/surveys/survey.html'
    };

    return directive;
  }
})();
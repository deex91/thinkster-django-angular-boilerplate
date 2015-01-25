(function () {
  'use strict';

  angular
    .module('thinkster.surveys', [
      'thinkster.surveys.controllers',
      'thinkster.surveys.directives',
      'thinkster.surveys.services'
    ]);

  angular
    .module('thinkster.surveys.controllers', []);

  angular
    .module('thinkster.surveys.directives', ['ngDialog']);

  angular
    .module('thinkster.surveys.services', []);
})();
(function () {
  'use strict';

  angular	//Define thinkster.authentication module
    .module('thinkster.authentication', [
      'thinkster.authentication.controllers',
      'thinkster.authentication.services'
    ]);

  angular	//Define thinkster.authentication.controllers module
    .module('thinkster.authentication.controllers', []);

  angular
    .module('thinkster.authentication.services', ['ngCookies']);
})();

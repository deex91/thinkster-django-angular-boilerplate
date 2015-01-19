(function () {
  'use strict';

  angular
    .module('thinkster.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/register', {	//Add routing for /register
      controller: 'RegisterController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/register.html'	//Destination
    }).otherwise('/');
  }
})();

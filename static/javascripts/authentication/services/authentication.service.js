/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.services')
    .factory('Authentication', Authentication);

  /* Inject dependencies */
  Authentication.$inject = ['$cookies', '$http'];

  /**
  * Define the factory
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      login: login,
	  register: register
    };

    return Authentication;

    ////////////////////

    /**
	* Register user
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      });
    }

	/**
	 * Login user
	 * @name login
	 * @desc Try to log in with email `email` and password `password`
	 * @param {string} email The email entered by the user
	 * @param {string} password The password entered by the user
	 * @returns {Promise}
	 * @memberOf thinkster.authentication.services.Authentication
	 */
	function login(email, password) {
	  return $http.post('/api/v1/auth/login/', {
		email: email, password: password
	  });
	}

  }
})();





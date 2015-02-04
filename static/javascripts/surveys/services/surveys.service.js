/**
* Surveys
* @namespace thinkster.surveys.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.surveys.services')
    .factory('Surveys', Surveys);

  Surveys.$inject = ['$http'];

  /**
  * @namespace Surveys
  * @returns {Factory}
  */
  function Surveys($http) {
    var Surveys = {
      all: all,
      create: create,
      get: get,
      show: show
    };

    return Surveys;

    ////////////////////

    /**
    * @name all
    * @desc Get all Surveys
    * @returns {Promise}
    * @memberOf thinkster.surveys.services.Surveys
    */
    function all() {
      return $http.get('/api/v1/surveys/');
    }


    /**
    * @name create
    * @desc Create a new Survey
    * @param {string} title The title of the new Survey
    * @returns {Promise}
    * @memberOf thinkster.surveys.services.Surveys
    */
    function create(title, questions) {
      return $http.post('/api/v1/surveys/', {
        title: title,
        questions: questions
      });
    }

    /**
     * @name get
     * @desc Get the Surveys of a given user
     * @param {string} username The username to get Surveys for
     * @returns {Promise}
     * @memberOf thinkster.surveys.services.Surveys
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/surveys/');
    }

    function show(id) {
      return $http.get('/api/v1/survey/' + id + '/');
    }
  }
})();
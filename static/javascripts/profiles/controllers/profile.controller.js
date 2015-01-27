/**
* ProfileController
* @namespace thinkster.profiles.controllers
*/
(function () {
  'use strict';

  angular
    .module('thinkster.profiles.controllers')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$location', '$routeParams', 'Surveys', 'Profile', 'Snackbar'];

  /**
  * @namespace ProfileController
  */
  function ProfileController($location, $routeParams, Surveys, Profile, Snackbar) {
    var vm = this;

    vm.profile = undefined;
    vm.surveys = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.profiles.controllers.ProfileController
    */
    function activate() {
      var username = $routeParams.username.substr(1);

      Profile.get(username).then(profileSuccessFn, profileErrorFn);
      Surveys.get(username).then(surveysSuccessFn, surveysErrorFn);

      /**
      * @name profileSuccessProfile
      * @desc Update `profile` on viewmodel
      */
      function profileSuccessFn(data, status, headers, config) {
        vm.profile = data.data;
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('Podany użytkownik nie istnieje.');
      }

      /**
      * @name surveysSuccessFn
      * @desc Update `surveys` on viewmodel
      */
      function surveysSuccessFn(data, status, headers, config) {
        vm.surveys = data.data;
      }


      /**
        * @name surveysErrorFn
        * @desc Show error snackbar
        */
      function surveysErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
    }
  }
})();
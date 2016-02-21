'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;


    /*
    * Mock logic
    * */
    $scope.range = 32;
    $http.get('/api/users/stuff').then(function (response) {
      console.log(response.data);
      $scope.stuff = response.data;
    }, function (error) {
      console.log(error);
    });

    var give = 1,
      receive = 2,
      collaborate = 4;

    $scope.checkGive = function (value) {
      return value & give;
    };
    $scope.checkReceive = function (value) {
      return value & receive;
    };
    $scope.checkCollaborate = function (value) {
      return value & collaborate;
    };

    /*
    * End of mock logic
    * */


    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);

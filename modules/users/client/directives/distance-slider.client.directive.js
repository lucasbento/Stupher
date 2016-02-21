'use strict';

angular.module('users').directive('distanceSlider', [
  function () {
    return {
      templateUrl: 'modules/users/client/views/templates/distance-slider.client.html',
      restrict: 'AE',
      controller: function ($scope) {
        $scope.minSlider = {
          options: {
            floor: 30,
            ceil: 120,
            step: 1
          }
        };
      },
      scope: {
        parentRange: '=range'
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  }
]);


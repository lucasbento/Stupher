'use strict';

angular.module('users').directive('distanceSlider', [
  function () {
    return {
      templateUrl: 'modules/users/client/views/templates/distance-slider.client.html',
      restrict: 'AE',
      controller: function ($scope) {
        //Slider with selection bar
        $scope.distanceSliderOptions = {
          options: {
            floor: 30,
            ceil: 120,
            step: 1,
            showSelectionBar: true
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


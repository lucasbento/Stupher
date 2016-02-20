(function () {
  'use strict';

  angular
    .module('users')
    .factory('locationService', locationService);

  locationService.$inject = ['$window'];

  function locationService($window) {
    function getReverseGeocodedLocation(location) {
      var geocoder = new window.google.maps.Geocoder();
      var coordinates = new window.google.maps.LatLng(location.coords.latitude, location.coords.longitude);

      var response = 'Address not availabe';
      geocoder.geocode({ 'latLng': coordinates }, function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            return results[0].formatted_address;
          }
        }
      });
    }

    function getUserLocation() {
      $window.navigator.geolocation.getCurrentPosition(
        function (location) {
          return {
            code: 1,
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            },
            address: getReverseGeocodedLocation(location)
          };
        },
        function (err) {
          return { code: 0, message: 'User location not available.' };
        }
      );
    }

    return {
      getUserLocation: getUserLocation
    };
  }
})();

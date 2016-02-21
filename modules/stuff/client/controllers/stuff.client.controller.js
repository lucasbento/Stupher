(function() {
  'use strict';

  angular
    .module('stuff')
    .controller('StuffController', StuffController);

  StuffController.$inject = ['stuffService', '$http'];

  function StuffController(stuffService, $http) {
    var vm = this;

    vm.getStuff = getStuff;

    function getStuff(value) {
      // var stuff = stuffService.findStuff(value);
return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: value,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
      // stuff.error(function(response) {
      //   response = [{
      //     "name": "Cooking",
      //     "slug": "cooking",
      //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.",
      //     "type": 4,
      //     "matchType": 6
      //   }]

      //   return response.data.results.map(function(item){
      //     return item.name;
      //   });
      // });
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('stuff')
    .controller('StuffController', StuffController);

  StuffController.$inject = ['stuffService'];

  function StuffController(stuffService) {
    var vm = this;

    getStuff('test');

    function getStuff(value) {
      var stuff = stuffService.findStuff(value, );

      stuff.success(function(response) {
        vm.list = response;
      });
    };
  }
})();

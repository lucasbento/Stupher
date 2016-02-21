(function () {
  'use strict';

  //Setting up route
  angular
    .module('stuff')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Stuff state routing
    $stateProvider
      .state('stuff', {
        url: '/stuff',
        templateUrl: 'modules/stuff/client/views/stuff.client.view.html',
        controller: 'StuffController',
        controllerAs: 'vm'
      });
  }
})();

(function () {
  'use strict';

  angular
    .module('stuff')
    .factory('stuffService', stuffService);

  stuffService.$inject = [/*Example: '$state', '$window' */];

  function stuffService(/*Example: $state, $window */) {
//     GET /api/users/stuff?:skip - get currently logged in users's stuff; skip - how many to skip
// returns Array object of current user's stuff:
// POST /api/users/stuff - Add new stuff to currently logged in user's stuff
// takes a JSON with one or several of the following properties of stuff (name is mandatory):
// returns Array object of current user's updated stuff:
// GET /api/users/stuff/:slug - get details of user's stuff (trait) by its slug
// slug has to have spaces replaced by _, URL-encoded and transformed to lower case, so Read children books would become read_children_books. name length is limited on the server to be at most 256 symbols for now, so no truncation transformation is yet required. There might not be two traits with the same name in one user's profile.
// returns JSON with stuff (trait) details:
//   GET /api/users/stuff/origami =>
// PUT /api/users/stuff/:slug - update details of user's stuff (trait) by its slug
// takes a JSON with one or several of the following properties of stuff:
//   PUT /api/users/stuff/origami =>

// returns JSON updated details:

// If slug or the trait has been changed, it is no longer accessible by it's old name

// IMPORTANT: slug is automatically created from stuff's name on the server side. They are in sync, and name is the source of synchronization. If slug is sent in JSON, it will be ignored and replaced with generated one.

// DELETE /api/users/stuff/:slug - remove user's stuff (trait) by its slug
    return {
      getStuff: getStuff,
      addStuff: addStuff,
      
    };
  }
})();

'use strict';

module.exports = function(app) {
  // Routing logic   
  var stuff = require('../controllers/stuff.server.controller');

  // Setting up routes for stupp API
  app.route('/api/users/stuff')
    .get(stuff.list)
    .post(stuff.create);
  app.route('/api/users/stuff/:slug')
    .get(stuff.read)
    .put(stuff.update)
    .delete(stuff.delete);

  // Typeahead
  app.route('/api/stuff').post(stuff.autocomplete);
};

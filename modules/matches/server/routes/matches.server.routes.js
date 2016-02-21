'use strict';

module.exports = function(app) {
  // Routing logic   
  var matches = require('../controllers/matches.server.controller');

  // Search API
  app.route('/api/search/:stuff_slug').post(matches.findOne);

  // Setting up for matches API
  app.route('/api/users/new_matches').get(matches.listNew);
  app.route('/api/users/matches').get(matches.list);
  app.route('/api/users/matches/:user_id')
    .post(matches.create)
    .get(matches.read)
    .delete(matches.delete);
};

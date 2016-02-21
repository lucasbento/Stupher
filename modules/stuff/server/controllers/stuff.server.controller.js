'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  s = require('underscore.string'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  Stuff = mongoose.model('Stuff');

/**
 * Create a Stuff
 */
exports.create = function (req, res) {
  var user = req.user;

  if (user) {
    var newUserStuff = {};
    _.extend(newUserStuff, req.body);

    if (!newUserStuff.name) {
      return res.status(400).send({
        message: 'No stuff name provided!'
      });
    }

    newUserStuff.name = s(newUserStuff.name).humanize().value();
    newUserStuff.slug = s(newUserStuff.name).slugify().value();

    user.stuff.push(newUserStuff);
    user.stuffOrder.push(newUserStuff.slug);

    user.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        Stuff
          .findOne({ slug: newUserStuff.slug })
          .populate('locations')
          .exec(function(err, stuff) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              if (!stuff) {
                // it's a completely new item, let's create it
                stuff = new Stuff({
                  name: newUserStuff.name,
                  slug: newUserStuff.slug,
                  locations: [user.location]
                });
              } else {
                stuff.locations.push(user.location);
              }

              return stuff.save(function(err) {
                if (err) {
                  return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                  });
                } else {
                  var orderedResult = [];
                  _.map(user.stuffOrder, function(slug) {
                    orderedResult.push(user.stuff[
                      _.findIndex(user.stuff, { slug: slug })
                      ]);
                  });

                  return res.jsonp(orderedResult);
                }
              });
            }
          });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }

  res.jsonp([
    {
      'name': 'Cooking',
      'slug': 'cooking',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.',
      'type': 4,
      'matchType': 6
    },
    {
      'name': 'Biking in mountains',
      'slug': 'biking_in_mountains',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'type': 4,
      'matchType': 4
    },
    {
      'name': 'Read children books',
      'slug': 'read_children_books',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      'type': 1,
      'matchType': 2
    },
    {
      'name': 'Origami',
      'slug': 'origami',
      'description': 'Lorem ipsum dolor sit amet...',
      'type': 5,
      'matchType': 6
    }
  ]);
};

/**
 * Show the current
 */
exports.read = function (req, res) {
  var user = req.user;

  if (user) {

  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }

  // TODO: link underscore.string here
  res.jsonp({
    'name': req.params.slug,
    'slug': req.params.slug,
    'description': 'Lorem ipsum dolor sit amet...',
    'type': 5,
    'matchType': 6
  });
};

/**
 * Update a Stuff
 */
exports.update = function (req, res) {
  var user = req.user;

  if (user) {

  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }

  res.jsonp({
    'name': 'Origami pigeons',
    'slug': 'origami_pigeons',
    'description': 'Let\'s make pigeons together!',
    'type': 4,
    'matchType': 4
  });
};

/**
 * Delete a Stuff
 */
exports.delete = function (req, res) {
  var user = req.user;

  if (user) {

  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }

  res.status(200).end();
};

/**
 * List of Stuff
 */
exports.list = function (req, res) {
  var user = req.user,
    skip = req.query.skip || 0;

  if (user) {
    return res.jsonp(user.stuff);
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Autocomplete of Stuff
 */
exports.autocomplete = function (req, res) {
  var user = req.user;

  if (user) {

  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }

  res.jsonp([
    {
      'name': 'Cooking',
      'slug': 'cooking',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.',
      'type': 4,
      'matchType': 6
    },
    {
      'name': 'Biking in mountains',
      'slug': 'biking_in_mountains',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'type': 4,
      'matchType': 4
    },
    {
      'name': 'Read children books',
      'slug': 'read_children_books',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      'type': 1,
      'matchType': 2
    }
  ]);
};
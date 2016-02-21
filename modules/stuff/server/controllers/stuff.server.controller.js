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

    user.stuff[newUserStuff.slug] = newUserStuff;
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
                  return res.jsonp(newUserStuff);
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
};

/**
 * Show the current
 */
exports.read = function (req, res) {
  var user = req.user,
    slug = req.params.slug;

  if (user) {
    if (!slug) {
      return res.status(400).send({
        message: 'No slug was provided'
      });
    }

    return res.jsonp(user.stuff[slug]);
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Update a Stuff
 */
exports.update = function (req, res) {
  var user = req.user,
    slug = req.params.slug;

  var _self = this;

  if (user) {
    if (!slug) {
      return res.status(400).send({
        message: 'No slug was provided'
      });
    }
    if (!user.stuff[slug]) {
      return res.status(400).send({
        message: 'No stuff with this slug found for the user'
      });
    }

    var updatedUserStuff = {};
    _.extend(updatedUserStuff, user.stuff[slug], req.body);

    if (!updatedUserStuff.name) {
      return res.status(400).send({
        message: 'No stuff name provided!'
      });
    }

    updatedUserStuff.name = s(updatedUserStuff.name).humanize().value();
    updatedUserStuff.slug = s(updatedUserStuff.name).slugify().value();

    if (updatedUserStuff.slug !== slug) { // stuff has been renamed
      // delete old stuff
      delete user.stuff[slug];
      var index = user.stuff.indexOf(slug);if (index !== -1) {
        user.stuff.splice(index, 1);
      }
    } else {
      user.stuff[slug] = updatedUserStuff;
    }

    return user.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        if (updatedUserStuff.slug !== slug) {
          // old stuff is deleted from user, so we need to create new stuff
          return _self.create(req, res);
        } else {
          return res.jsonp(updatedUserStuff);
        }
      }
    })
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Delete a Stuff
 */
exports.delete = function (req, res) {
  var user = req.user;

  if (user) {
    if (!slug) {
      return res.status(400).send({
        message: 'No slug was provided'
      });
    }
    if (!user.stuff[slug]) {
      return res.status(400).send({
        message: 'No stuff with this slug found for the user'
      });
    }

    // delete old stuff
    delete user.stuff[slug];
    var index = user.stuff.indexOf(slug);if (index !== -1) {
      user.stuff.splice(index, 1);
    }

    return user.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.status(200).end();
      }
    });
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
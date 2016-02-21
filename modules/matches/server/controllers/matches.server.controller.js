'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  Location = mongoose.model('Location'),
  User = mongoose.model('User'),
  geolib = require('geolib');

/**
 * Create a match
 */
exports.create = function (req, res) {
  res.status(200).end();
};

/**
 * Show the current match
 */
exports.read = function (req, res) {
  res.jsonp({
    'id': '7a9261f2-a8a0-4132-9ce4-b485c98248e1',
    'email': 'johndoe@email.com',
    'name': 'John Doe',
    'about': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.',
    'contacts': {
      'facebook': 'http://someurl',
      'whatsapp': 'http://someotherurl'
      // additional custom fields can be added
    },
    'location': [-71.06, 42.36],
    'searchRadius': 80,
    'pictures': ['110ec58a-a0f2-4ac4-8393-c866d813b8d1.png', '6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg', '6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif'],
    'titlePicture': '6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif',
    'stuff': [
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
    ]
  });
};


/**
 * Delete a match
 */
exports.delete = function (req, res) {
  res.status(200).end();
};

/**
 * List of confirmed matches
 */
exports.list = function (req, res) {
  res.jsonp([]);
};

/**
 * List of unconfirmed matches
 */
exports.listNew = function (req, res) {
  res.jsonp([]);
};

exports.findOne = function (req, res) {
  var user = req.user,
    slug = req.params.stuff_slug,
    location = req.body,
    prevMatch = req.query.prev_match;

  if (user) {
    if (!slug) {
      return res.status(400).send({
        message: 'No slug was provided'
      });
    }

    if (!location || !location.coordinates || !location.searchRadius) {
      return res.status(400).send({
        message: 'No location coordinates or search radius for search was provided'
      });
    }

    var query = User.findOne({
        '$and': [
          {
            'stuff.slug': slug
          }, {
            '$or': [
              { 'stuff.myType.give': user.stuff[slug].matchType.give },
              { 'stuff.myType.receive': user.stuff[slug].matchType.receive },
              { 'stuff.myType.connect': user.stuff[slug].matchType.connect }
            ]
          }
        ]
    })
      .where('location')
      .near({
        center: location.coordinates,
        maxDistance: location.searchRadius / 6378.1, // Earth radius in Km. In miles it would be 3963.2
        spherical: true
      });

    if (prevMatch) {
      query = query.where('_id').ne(prevMatch);
    }

    query.exec(function(err, foundUser) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        var retUser = {};
        if (foundUser) {
          foundUser.stuff = foundUser.getStuffObject();
          retUser = {
            _id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            displayName: foundUser.displayName,
            about: foundUser.about,
            pictures: foundUser.pictures,
            titlePicture: foundUser.titlePicture,
            stuff: foundUser.stuff
          };

          retUser.distance = geolib.getDistance({
            longitude: location.coordinates[0],
            latitude: location.coordinates[1]
          }, {
            longitude: foundUser.location[0],
            latitude: foundUser.location[1]
          });

          for (var stuffSlug in retUser.stuff) {
            if (user.stuff[stuffSlug]) {
              retUser[stuffSlug].matched = !!(user.stuff[stuffSlug].matchType.give === retUser.stuff[stuffSlug].myType.give ||
                                              user.stuff[stuffSlug].matchType.receive === retUser.stuff[stuffSlug].myType.receive ||
                                              user.stuff[stuffSlug].matchType.connect === retUser.stuff[stuffSlug].myType.connect);
            } else {
              retUser[stuffSlug].matched = false;
            }
            retUser[stuffSlug].type = {};
            _.extend(retUser[stuffSlug].type, retUser[stuffSlug].myType);

            delete retUser[stuffSlug].myType;
            delete retUser[stuffSlug].matchType;
          }
        }

        if (user.location[0] !== location.coordinates[0] ||
            user.location[1] !== location.coordinates[1]) {
          // need to update the location

          user.location = location.coordinates;

          user.save(function(err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              Location
                .findOne({ '_id': user.locationRef })
                .exec(function(err, foundLocation) {
                  if (err) {
                    return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                    });
                  } else {
                    if (!foundLocation) {
                      foundLocation = new Location({
                        coordinates: foundLocation.coordinates
                      });
                    } else {
                      foundLocation.coordinates = location.coordinates;
                    }

                    foundLocation.save(function(err) {
                      if (err) {
                        return res.status(400).send({
                          message: errorHandler.getErrorMessage(err)
                        });
                      } else {
                        res.jsonp(retUser);
                      }
                    });
                  }
                })
            }
          });
        }
      }
    })
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

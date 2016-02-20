'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash');

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
    "id": "7a9261f2-a8a0-4132-9ce4-b485c98248e1",
    "email": "johndoe@email.com",
    "name": "John Doe",
    "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
    "contacts": {
      "facebook": "http://someurl",
      "whatsapp": "http://someotherurl"
      // additional custom fields can be added
    },
    "location": [-71.06, 42.36],
    "searchRadius": 80,
    "pictures": ["110ec58a-a0f2-4ac4-8393-c866d813b8d1.png", "6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg", "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif"],
    "titlePicture": "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif",
    "stuff": [
      {
        "name": "Cooking",
        "slug": "cooking",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.",
        "type": 4,
        "matchType": 6
      },
      {
        "name": "Biking in mountains",
        "slug": "biking_in_mountains",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "type": 4,
        "matchType": 4
      },
      {
        "name": "Read children books",
        "slug": "read_children_books",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "type": 1,
        "matchType": 2
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

/**
 * Find one new match
 */
exports.findOne = function (req, res) {
  res.jsonp({
    "id": "e86bd3fe-7de9-4041-a7c7-9d24aabb1451",
    "name": "Mark Smith",
    "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
    "pictures": ["110ec58a-a0f2-4ac4-8393-c866d813b8d1.png", "6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg", "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif"],
    "titlePicture": "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif",
    "stuff": [
      {
        "name": "Cooking",
        "slug": "cooking",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.",
        "type": 4,
        "matched": true
      },
      {
        "name": "Biking in mountains",
        "slug": "biking_in_mountains",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "type": 4,
        "matched": true
      },
      {
        "name": "Programming",
        "slug": "programming",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "type": 4,
        "matched": false
      }
    ]
  });
};

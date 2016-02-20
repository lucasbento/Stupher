'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash');

/**
 * Create a Stuff
 */
exports.create = function (req, res) {
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
  res.status(200).end();
};

/**
 * List of Stuff
 */
exports.list = function (req, res) {
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

/**
 * Autocomplete of Stuff
 */
exports.autocomplete = function (req, res) {
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
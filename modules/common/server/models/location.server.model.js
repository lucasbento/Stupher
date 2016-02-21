'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
  // Location model fields
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  type: {
    type: String,
    default: 'Point',
    trim: true,
    required: 'Type cannot be blank'
  },
  coordinates: {
    type: [ Number ],
    index: '2dsphere',
    required: 'Coordinates cannot be blank',
    validate: [validateCoordinates, '{PATH} must contain exactly two coordinates, [longitude, latitude]']
  }
});

function validateCoordinates(val) {
  return val.length === 2;
}

/**
 * Find location nearby
 */
LocationSchema.methods.findNear = function(location, cb) {
  var query = this.findOne();

  query = query.where('coordinates').near({
    center: location.coordinates,
    maxDistance: location.searchRadius / 6378.1, // Earth radius in Km. In miles it would be 3963.2
    spherical: true
  });
  query.exec(cb);
};

mongoose.model('Location', LocationSchema);

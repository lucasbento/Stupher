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
    type: [{
      type: Number,
      default: 0
    }],
    required: 'Coordinates cannot be blank',
    validate: [validateCoordinates, '{PATH} must contain exactly two coordinates, [longitude, latitude]']
  }
});

function validateCoordinates(val) {
  return val.length === 2;
}

mongoose.model('Location', LocationSchema);

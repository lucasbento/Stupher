'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Stuff Schema
 */
var StuffSchema = new Schema({
  // Stuff model fields
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  slug: {
    type: String,
    default: '',
    trim: true,
    required: 'Slug cannot be blank'
  },
  locations: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Location'
    }],
    required: true,
    validate: [validateLocations, '{PATH} must contain at least one Location']
  }
});

function validateLocations(val) {
  return !!val.length;
}

mongoose.model('Stuff', StuffSchema);

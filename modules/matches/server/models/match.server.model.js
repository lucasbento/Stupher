'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Match Schema
 */
var MatchSchema = new Schema({
  // Match model fields
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  inviter: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Inviter cannot be blank'
  },
  invitee: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Invitee cannot be blank'
  },
  pair: {
    type: [{
      type: Schema.ObjectId,
      ref: 'User'
    }],
    required: 'Inviter-Invitee pair cannot be blank',
    validate: [validatePair, '{PATH} must contain exactly two Users']
  },
  status: {
    type: Number,
    required: 'Status cannot be blank',
    default: -1
  },
  message: {
    type: String,
    default: ''
  }
});

function validatePair(val) {
  return val.length === 2;
}

mongoose.model('Match', MatchSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator'),
  generatePassword = require('generate-password'),
  owasp = require('owasp-password-strength-test'),
  _ = require('lodash');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name']
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: 'User with this email already exists',
    lowercase: true,
    trim: true,
    required: 'Please fill in an email',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  about: {
    type: String,
    trim: true
  },
  contacts: {
    type: [{
      name: {
        type: String,
        required: 'Contact name cannot be blank',
        default: ''
      },
      value: {
        type: String,
        required: 'Contact value cannot be blank',
        default: ''
      }
    }]
  },
  locationRef: {
    type: Schema.ObjectId,
    ref: 'Location',
    required: 'Location cannot be blank'
  },
  location: {
    type: [ Number ],
    index: '2dsphere',
    required: 'Coordinates cannot be blank',
    validate: [validateCoordinates, '{PATH} must contain exactly two coordinates, [longitude, latitude]']
  },
  searchRadius: {
    type: Number,
    required: 'Search radius cannot be empty',
    default: 30
  },
  pictures: {
    type: [{
      type: String,
      required: 'Picture name cannot be blank'
    }]
  },
  titlePicture: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  stuffOrder: {
    type: [{
      type: String
    }]
  },
  stuff: {
    type: [{
      name: {
        type: String,
        required: 'Stuff name cannot be blank'
      },
      slug: {
        type: String,
        required: 'Stuff slug cannot be blank'
      },
      description: {
        type: String,
        required: 'Stuff slug cannot be blank'
      },
      myType: {
        type: {
          give: {
            type: Boolean,
            default: false
          },
          receive: {
            type: Boolean,
            default: false
          },
          connect: {
            type: Boolean,
            default: false
          }
        },
        required: 'Type cannot be blank'
      },
      matchType: {
        type: {
          give: {
            type: Boolean,
            default: false
          },
          receive: {
            type: Boolean,
            default: false
          },
          connect: {
            type: Boolean,
            default: false
          }
        },
        required: 'Type cannot be blank'
      }
    }]
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  //profileImageURL: {
  //  type: String,
  //  default: 'modules/users/client/img/profile/default.png'
  //},
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

function validateCoordinates(val) {
  return val.length === 2;
}

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  // transform stuff to array if required
  if (!Array.isArray(this.stuff)) {
    var stuffArray = [];
    for (var i = 0; i < this.stuffOrder.length; i++) {
      stuffArray.push(this.stuff[this.stuffOrder[i]]);
    }
    this.stuff = stuffArray;
  }

  next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchema.pre('validate', function (next) {
  if (this.provider === 'local' && this.password && this.isModified('password')) {
    var result = owasp.test(this.password);
    if (result.errors.length) {
      var error = result.errors.join(' ');
      this.invalidate('password', error);
    }
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

/**
 * Get stuff as an object (mongose does not know how to store them)
 */
UserSchema.methods.getStuffObject = function() {
  if (!Array.isArray(this.stuff) && typeof this.stuff === 'object') {
    return this.stuff;
  }

  var stuffObject = {};
  for (var i = 0; i < this.stuffOrder.length; i++) {
    stuffObject[this.stuffOrder[i]] = _.find(this.stuff, { slug: this.stuffOrder[i] });
  }
  return stuffObject;
};

///**
// * Find possible not used username
// */
//UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
//  var _this = this;
//  var possibleUsername = username.toLowerCase() + (suffix || '');
//
//  _this.findOne({
//    username: possibleUsername
//  }, function (err, user) {
//    if (!err) {
//      if (!user) {
//        callback(possibleUsername);
//      } else {
//        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
//      }
//    } else {
//      callback(null);
//    }
//  });
//};

/**
* Generates a random passphrase that passes the owasp test.
* Returns a promise that resolves with the generated passphrase, or rejects with an error if something goes wrong.
* NOTE: Passphrases are only tested against the required owasp strength tests, and not the optional tests.
*/
UserSchema.statics.generateRandomPassphrase = function () {
  return new Promise(function (resolve, reject) {
    var password = '';
    var repeatingCharacters = new RegExp('(.)\\1{2,}', 'g');

    // iterate until the we have a valid passphrase. 
    // NOTE: Should rarely iterate more than once, but we need this to ensure no repeating characters are present.
    while (password.length < 20 || repeatingCharacters.test(password)) {
      // build the random password
      password = generatePassword.generate({
        length: Math.floor(Math.random() * (20)) + 20, // randomize length between 20 and 40 characters
        numbers: true,
        symbols: false,
        uppercase: true,
        excludeSimilarCharacters: true,
      });

      // check if we need to remove any repeating characters.
      password = password.replace(repeatingCharacters, '');
    }

    // Send the rejection back if the passphrase fails to pass the strength test
    if (owasp.test(password).errors.length) {
      reject(new Error('An unexpected problem occured while generating the random passphrase'));
    } else {
      // resolve with the validated passphrase
      resolve(password);
    }
  });
};

mongoose.model('User', UserSchema);

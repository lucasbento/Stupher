'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  User = mongoose.model('User'),
  Location = mongoose.model('Location'),
  grid = require('gridfs-stream'),
  uuid = require('uuid');

grid.mongo = mongoose.mongo;

/**
 * Update profile picture
 */
exports.uploadProfilePicture = function (req, res) {
  var user = req.user,
    setAsTitle = req.query.set_as_title === 'true';

  var upload = multer(config.uploads.profileUpload).single('newProfilePicture');
  // Filtering to upload only images
  upload.fileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  if (user) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        var fileExtensionMatch = req.file.filename.match(/\.(\w+)$/);

        if (!fileExtensionMatch || !fileExtensionMatch[1]) {
          fs.unlinkSync(config.uploads.profileUpload.dest + req.file.filename);
          return res.status(400).send({
            message: 'No file extension was found! Expected an image file'
          });
        }

        var gfs = grid(mongoose.connection.db),
          writeStream = gfs.createWriteStream({
            filename: uuid.v4() + '.' + fileExtensionMatch[1]
          });
        fs.createReadStream(config.uploads.profileUpload.dest + req.file.filename)
          .pipe(writeStream);

        writeStream.on('close', function(file) {
          console.log(file.filename + ' has been written to database');

          if (setAsTitle) {
            user.titlePicture = file.filename;
          }
          user.pictures.unshift(file.filename);

          fs.unlinkSync(config.uploads.profileUpload.dest + req.file.filename);

          user.save(function (saveError) {
            if (saveError) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(saveError)
              });
            } else {
              req.login(user, function (err) {
                if (err) {
                  res.status(400).send(err);
                } else {
                  res.json(user);
                }
              });
            }
          });
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
 * Get picture from gridFS
 */
exports.getPicture = function (req, res) {
  var user = req.user,
    imgName = req.params.name;

  if (user) {
    if (!imgName) {
      return res.status(400).send({
        message: 'No image name was provided!'
      });
    }

    var imgExtensionMatch = imgName.match(/\.(\w+)$/);
    if (!imgExtensionMatch || !imgExtensionMatch[1]) {
      return res.status(400).send({
        message: 'No image extension was found!'
      });
    }

    var contentType = 'image/' + imgExtensionMatch[1].replace('jpg', 'jpeg');

    var gfs = grid(mongoose.connection.db),
      options = { filename: imgName };

    gfs.exist(options, function (err, found) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      if (found) {
        var readStream = gfs.createReadStream(options);

        res.set('Content-Type', contentType);
        readStream.pipe(res);
      } else {
        return res.status(404).send({
          message: 'File with name "' + imgName + '" not found!'
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
 * Delete picture
 */
exports.deletePicture = function (req, res) {
  var user = req.user,
    imgName = req.params.name;

  if (user) {
    if (!imgName) {
      return res.status(400).send({
        message: 'No image name was provided!'
      });
    }

    var gfs = grid(mongoose.connection.db),
      options = { filename: imgName };

    gfs.exist(options, function (err, found) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      if (found) {
        gfs.remove(options, function (err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }

          res.status(200).end();
        });
      } else {
        return res.status(404).send({
          message: 'File with name "' + imgName + '" not found!'
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};
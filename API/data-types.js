{
  "StuffType": {
    "give": 1,
    "recieve": 2,
    "connect": 4
  },
  /*
  // Searching for coordinates in GeoJSON looks like this
  db.c.find({
    location: {
      $near: {
        $geometry: {
            type: "Point",
            coordinates: [ 12.3, 32.1 ]
        },
        $maxDistance: 777
      }
    }
  });
  */
  "User": {
    "email": String,
    "name": String,
    "about": String,
    "contacts": {
      "facebook": String(URL),
      "whatsapp": String(URL)
      // additional custom fields can be added
    },
    "location": ObjectId(Location),
    "searchDistance": Number,
    "photos": [String(UUID)],
    "titlePhoto": String(UUID),
    "stuffOrder": [String], // an array with fully encoded stuff names, like "reading_children_books", that defines the order of them in user's profile
    "stuff": {
      String: { // fully encoded stuff names, like "reading_children_books"
        "name": String, // non-encoded stuff name, like "Reading children books" or even "ReAdInG CHILdreN boOKs"; Most likely will be translated into normal form though
        "slug": String, // slugified name for search
        "description": String,
        "type": Number(StuffType), // can be bitwise linked
        "matchType": Number(StuffType)
      }
    }
  },
  "Match": {
    "inviter": String(ObjectId), // User Id
    "invitee": String(ObjectId), // User Id
    "pair": [String(ObjectId), String(ObjectId)], // to simplify search for existing matches
    "status": Number, // Can be 1 for Yay, 0 for Nay and -1 for new match; removing a Yay match transforms it into Nay; to completely delete a match, DELETE must be called
    "message": String // a message, sent by the inviter to the invitee, when Yay was clicked
  },
  "Location": {
    "type": "Point",
    "coordinates": [Number, Number] //  longitude, latitude - reverse order of what google maps give you
  },
  "Stuff": { // database for typeahead suggestions, denormalization of User profile
    "name": String,
    "slug": String,
    "locations": [ObjectId(Location)] // an array of location references for this stuff
  }
}

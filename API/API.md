* User
    * POST `/api/auth/signup` - post something to create a user
      
      returns the profile of newly created user:
      
          {
            "id": "7a9261f2-a8a0-4132-9ce4-b485c98248e1",
            "email": "johndoe@email.com",
            "name": "John Doe",
            "about": "",
            "location": [],
            "searchRadius": 80,
            "pictures": ["110ec58a-a0f2-4ac4-8393-c866d813b8d1.png", "6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg", "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif"],
            "titlePicture": "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif",
            "stuff": {}
          }
      
    * GET `/api/users/me` - get profile of currently logged in user
      
      returns `JSON` object of current user:
      
          {
            "id": "7a9261f2-a8a0-4132-9ce4-b485c98248e1",
            "email": "johndoe@email.com",
            "name": "John Doe",
            "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
            "contacts": [
              {
                "name": "Facebook",
                "value": "http://someurl"
              }, {
                "name": "WhatsApp",
                "value": "http://someotherurl"
              }
              // additional custom fields can be added
            ],
            "location": [-71.06, 42.36],
            "searchRadius": 80,
            "pictures": ["110ec58a-a0f2-4ac4-8393-c866d813b8d1.png", "6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg", "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif"],
            "titlePicture": "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif",
            "stuff": {
              "cooking": {
                "name": "Cooking",
                "slug": "cooking",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.",
                "type": 4,
                "matchType": 6
              },
              "biking_in_mountains": {
                "name": "Biking in mountains",
                "slug": "biking_in_mountains",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "type": 4,
                "matchType": 4
              },
              "read_children_books": {
                "name": "Read children books",
                "slug": "read_children_books",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                "type": 1,
                "matchType": 2
              }
            }
          }
      
      Mind, that both `type` and `matchType` are in fact bitwise combinations of 1 (give), 2 (receive) and 4 (connect). Please, see data structure document
    * PUT `/api/users` - update profile of currently logged in user
      
      takes a `JSON` with one or several of the following properties of the current user:
      
          {
            "about": "Some different description here.",
            "location": [-46.167538, 78.047977],
            "searchRadius": 20,
            "titlePicture": "6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg"
          }
      
      and returns the `JSON` object of updated user:
      
          {
            "id": "7a9261f2-a8a0-4132-9ce4-b485c98248e1",
            "email": "johndoe@email.com",
            "name": "John Doe",
            "about": "Some different description here.",
            "location": [-46.167538, 78.047977],
            "searchRadius": 20,
            "pictures": ["110ec58a-a0f2-4ac4-8393-c866d813b8d1.png", "6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg", "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif"],
            "titlePicture": "6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg",
            "stuff": {
              "cooking": {
                "name": "Cooking",
                "slug": "cooking",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.",
                "type": 4,
                  "matchType": 6
              },
              "biking_in_mountains": {
                "name": "Biking in mountains",
                "slug": "biking_in_mountains",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "type": 4,
                "matchType": 4
              },
              "read_children_books": {
                "name": "Read children books",
                "slug": "read_children_books",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                "type": 1,
                "matchType": 2
              }
            }
          }
      
  * DELETE `/api/users` - unregister current user and delete the account **IMPORTANT** Disabled temprorary
* User's pictures
  * GET `/api/users/pictures/:name` - get image stream (can be used to just show the images on the page out of GridFS)
  * POST `/api/users/pictures?set_as_title=(true|false)` - upload new user's picture to picture collection
  * DELETE `/api/users/pictures/:name` - delete user's picture by name
    
    If current title picture is deleted, the first picture in array is set as the new title picture is set.
    
    Returns name of the title picture: `"110ec58a-a0f2-4ac4-8393-c866d813b8d1.png"`
* User's stuff
  * GET `/api/users/stuff?:skip` - get currently logged in users's stuff; `skip` - how many to skip
          
    returns `Object` object of current user's stuff:
      
          {
            "cooking": {
              "name": "Cooking",
              "slug": "cooking",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.",
              "type": 4,
                "matchType": 6
            },
            "biking_in_mountains": {
              "name": "Biking in mountains",
              "slug": "biking_in_mountains",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              "type": 4,
              "matchType": 4
            },
            "read_children_books": {
              "name": "Read children books",
              "slug": "read_children_books",
              "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
              "type": 1,
              "matchType": 2
            }
          }
      
  * POST `/api/users/stuff` - Add new stuff to currently logged in user's stuff
    
    takes a `JSON` with one or several of the following properties of stuff (`name` is mandatory):
      
          {
            "name": "Origami",
            "description": "Lorem ipsum dolor sit amet...",
            "type": 5,
            "matchType": 6
          }
      
    returns `Object` object of freshly created stuff:
      
          {
            "name": "Origami",
            "slug": "origami",
            "description": "Lorem ipsum dolor sit amet...",
            "type": 5,
            "matchType": 6
          }
      
  * GET `/api/users/stuff/:slug` - get details of user's stuff (trait) by its `slug`
    
    `slug` has to have spaces replaced by `_`, URL-encoded and transformed to lower case, so `Read children books` would become `read_children_books`. `name` length is limited on the server to be at most **256 symbols** for now, so no truncation transformation is yet required. There might not be two traits with the same name in one user's profile.
  
    returns `JSON` with stuff (trait) details:
    
          GET /api/users/stuff/origami =>
        
          {
            "name": "Origami",
            "slug": "orginami",
            "description": "Lorem ipsum dolor sit amet...",
            "type": 5,
            "matchType": 6
          }
        
      
  * PUT `/api/users/stuff/:slug` - update details of user's stuff (trait) by its `slug`
    
    takes a `JSON` with one or several of the following properties of stuff:
    
          PUT /api/users/stuff/origami =>
      
          {
            "name": "Origami pigeons",
            "description": "Let's make pigeons together!",
            "type": 4,
            "matchType": 4
          }
      
    
    returns `JSON` updated details:
    
          {
            "name": "Origami pigeons",
            "slug": "origami_pigeons",
            "description": "Let's make pigeons together!",
            "type": 4,
            "matchType": 4
          }
        
    If `slug` or the trait has been changed, it is no longer accessible by it's old name

    **IMPORTANT**: `slug` is automatically created from stuff's `name` on the server side. They are in sync, and `name` is the source of synchronization. If `slug` is sent in JSON, it will be ignored and replaced with generated one.
  * DELETE `/api/users/stuff/:slug` - remove user's stuff (trait) by its `slug`
* Search
  * POST `/api/search/:stuff_slug?prev_match` - search for a match by given stuff name; `prev_match` is optional, user id; if specified, it assures, that the previous match would not be returned again
      
    takes a `JSON` with current user's search preferences and location:
      
          {
            "location": [-46.167538, 78.047977],
            "searchRadius": 20
          }
    
    If the location in the user's profile differs from the one sent with this search request, profile is updated with the new location. Returns `JSON` of a matching user:
      
          POST /api/search/cooking 
          {
            "location": [-46.167538, 78.047977],
            "searchRadius": 20
          } =>
          
          {
            "id": "e86bd3fe-7de9-4041-a7c7-9d24aabb1451",
            "name": "Mark Smith",
            "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
            "pictures": ["110ec58a-a0f2-4ac4-8393-c866d813b8d1.png", "6fdf6ffc-ed77-94fa-407e-a7b86ed9e59d.jpeg", "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif"],
            "titlePicture": "6c84fb90-12c4-11e1-840d-7b25c5ee775a.gif",
            "stuff": {
              "cooking": {
                "name": "Cooking",
                "slug": "cooking",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.",
                "type": 4,
                "matched": true
              },
              "biking_in_mountains": {
                "name": "Biking in mountains",
                "slug": "biking_in_mountains",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "type": 4,
                "matched": true
              },
              "programming": {
                "name": "Programming",
                "slug": "programming",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                "type": 4,
                "matched": false
              }
            }
          }
      
      For stuff, that was matched between current user and the resulting one, an additional field `matched=(true|false)` is added
      Mind, that `contacts` section is not returned for the freshly searched user
* Matches
  * POST `/api/users/matches/:user_id?decline` - accept (or decline, if optional `decline=true` is specified) a match; returns nothing
    
    optionally, `JSON` `{ "message": "Some message" }` can be specified to add message to match
  * GET `/api/users/matches?skip` - returns a list of matches; `skip`- how many matches to skip
  * GET `/api/users/new_matches?:skip` - returns a list of new matches; `skip`- how many matches to skip; A match is considered `new` if the current user is `invitee` in this match and has not accepted or declined it
  * GET `/api/users/matches/:user_id` - get the match by `:user_id`
     
    returns `JSON` object of the matched user:
      
          {
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
            "stuff": {
              "cooking": {
                "name": "Cooking",
                "slug": "cooking",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique ultricies felis, sed tristique nisi rhoncus a.",
                "type": 4,
                "matched": true
              },
              "biking_in_mountains": {
                "name": "Biking in mountains",
                "slug": "biking_in_mountains",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "type": 4,
                "matched": true
              },
              "programming": {
                "name": "Programming",
                "slug": "programming",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                "type": 4,
                "matched": false
              }
            }
          }
      
      Mind that `contacts` section is returned only if both users are linked in an accepted match. If match is declined, no contacts section is returned. If there is no match with this user, `403` error is returned.
  * DELETE `/api/users/matches/:user_id` - completely delete the match, resetting it
* Stuff autocomplete
  * POST `/api/stuff?partial_name` - takes a `JSON` with current user's search preferences and location; returns a list of stuff found for partial name in this location; if no `partial_name` is specified, most popular items for area are returned
   
          POST /api/stuff?partial_name 
          {
            "location": [-46.167538, 78.047977],
            "searchRadius": 20
          }

var User = require('../models/user');
var Location = require('../models/location');

//============TEMP NEW USER FOR TESTING UNTIL WE HAVE AUTHENTICATION=================
// function usersNew(req, res) {
//     var user = new User(req.body);
//       user.save(function(err,user){
//         if (err) return res.status(500).json({ error: 'Error'});
//           res.json(user)
//     });
//   }
///////////////////////////////////////////////////////////////////////////////////////

function usersIndex(req, res) {
  User.find(function(err, users) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ users: users });
  });
}

function usersShow(req, res) {

  var id = req.params.id;

  User.findById({ _id: id }).populate("locations").exec(function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);

    res.status(200).send(user);
  })
}

function usersUpdate(req, res) {
  User.findOneAndUpdate({_id: req.params.id} , req.body, {new: true} , function(err, user){
    if (err) return res.status(500).json({ error: 'Error'});
      res.json(user)
  });
}

function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}

function addLocation(req, res) {
  Location.findById(req.body.locations, function(err, location) {

    if(err) return res.status(500).json({ message: err });
    if(!location) return res.status(404).json({message: "Could not find location"});
      User.findById( req.params.id, function(err, user) {
        if((user.locations).indexOf(location.id) > -1){
        return res.status(500).json({message: "This location already exists"});
        } else {
          user.locations.push(location);
          user.save(function(err,user){
            if(err) return res.json(err);
              res.json(user);
          });
        } 
      });
  });
}
// this means accept friend
function addFriend(req, res) {
  User.findById(req.body.friends, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    User.findByIdAndUpdate(req.params.id,{
      $push: {"friends": user}},
      {safe: true, upsert: true, new : true},
      function(err, user) {
        if(!user) return res.status(404).json({message: "Could not add that friend"});
        return res.status(200).json({ user: user});
      }
    );
  });
  User.findById(req.params.id, function(err, user) {
    User.findByIdAndUpdate(req.body.friends,{
      $push: {"friends": user}},
      {safe: true, upsert: true, new : true},
      function(err, user) {
      }
    );
  });
}

function requestFriend(req, res) {
  // console.log(req.body.requester.id)
  // console.log(req.body.requestee.id)
  User.findById(req.body.requestee.id, function(err, requestee) {
    if(err) return res.status(500).json({ message: err });
    User.findById(req.body.requester.id, function(err, requester){
      if(!requestee) return res.status(404).json({message: "Could not request a nonexistent user as a friend"});
      // return res.json(requester.friend_requests);
      // return res.json(requestee.id);
      if((requester.friend_requests).indexOf(requestee.id) > -1){
        return res.status(500).json({message: "You have already requested that friend"});
      } else {
        requester.friend_requests.push(requestee);
        requester.save(function(err, requester){
          if(err) return res.json(err);
          res.json(requester);
        });
      }
    });
    User.findById(req.body.requester.id, function(err, requester) {
      User.findByIdAndUpdate(req.body.requestee.id,{
        $push: {"friends_requested": requester}},
        {safe: true, upsert: true, new : true},
        function(err, requester) {
        }
      );
    });
  });
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete,
  addLocation: addLocation,
  addFriend: addFriend,
  requestFriend: requestFriend,
};
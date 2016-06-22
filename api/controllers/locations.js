var User = require('../models/user');
var Location = require('../models/location');

function locationsCreate(req, res) {
    var location = new Location(req.body.location);
    console.log("LOCATIONNNNNN" + location)
      location.save(function(err,location){
        if (err) return res.status(500).json({ error: 'Error'});
          res.json(location);
          User.findById( req.params.id, function(err, user) {
            if (err) return res.status(500).json({ error: 'Error'});

            user.locations.push(location)
            //BUG TO FIX LATER
            user.save()
            console.log(user);
            // else {
            //   user.locations.push(location);
            //   user.save(function(err,user){
            //     if(err) return res.json(err);
            //       res.json(user);
            //   });
            // } 
          });
    });
}
//mishal test
function locationsByUser(req, res) {

  User.findById( req.params.id, function(err, user) {
    if (err) return res.status(500).json({ error: 'Error'});
    }).populate('locations')
      .exec(function(err, user){
          if (err) return res.status(500).json({ error: 'Error'});
          res.json(user);
          console.log("test");
    })

}





























function locationsIndex(req, res) {
  Location.find(function(err, locations) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ locations: locations });
  });
}

function locationsShow(req, res) {
  Location.findById(req.params.id, function(err, location) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ location: location });
  });
}

function locationsUpdate(req, res) {
  Location.findOneAndUpdate({_id: req.params.id} , req.body, {new: true} , function(err, location){
    if (err) return res.status(500).json({ error: 'Error'});
      res.json(location)
  });
}

function locationsDelete(req, res) {
  Location.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}

module.exports = {
  create: locationsCreate,
  index: locationsIndex,
  show: locationsShow,
  update: locationsUpdate,
  delete: locationsDelete,
  locationsCreate: locationsCreate,
  locationsByUser: locationsByUser
};
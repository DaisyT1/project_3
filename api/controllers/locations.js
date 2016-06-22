
var Location = require('../models/location');

function locationsCreate(req, res) {
    var location = new Location(req.body);
      location.save(function(err,location){
        if (err) return res.status(500).json({ error: 'Error'});
          res.json(location)
    });
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
  delete: locationsDelete
};
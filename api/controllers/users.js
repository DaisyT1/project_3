var User = require('../models/user');

//============TEMP NEW USER FOR TESTING UNTIL WE HAVE AUTHENTICATION=================
function usersNew(req, res) {
    var user = new User(req.body);
      user.save(function(err,user){
        if (err) return res.status(500).json({ error: 'Error'});
          res.json(user)
    });
  }
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

module.exports = {
  new: usersNew,
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
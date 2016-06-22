var router = require('express').Router();
var usersController = require('../controllers/users');
var locationsController = require('../controllers/locations');
var authenticationController = require('../controllers/authentication');
var jwt = require('jsonwebtoken');
var secret = require('./tokens').secret;


function checkForToken(req, res, next){

  if(!req.headers.authorisation) return res.status(401).json({ message: 'Unathorized' });

  var token = req.headers.authorisation.replace('Bearer ', '');
  
  jwt.verify(token, secret, function(err,user) {
    if(!user) return res.status(401).json({message: 'Invalid token'});

    req.user = user;
    next();
  });
}

router.get('/users', checkForToken, usersController.index);
// router.route('/users')
//       .get(usersController.checkForToken);
//       .get(usersController.index);
//       .post(usersController.new);

router.route('/users/:id')
 .all(checkForToken)
 .get(usersController.show)
 .put(usersController.update)
 .delete(usersController.delete);


router.route('/users/:id/locations')
  .all(checkForToken)
  .post(usersController.addLocation);

router.route('/users/:id/friends')
  .all(checkForToken)
  .post(usersController.addFriend)

router.route('/users/:id/reqfriends')
  .all(checkForToken)
  .post(usersController.requestFriend);

router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);


router.route('/locations')
      .get(locationsController.index)
      // .post(locationsController.create);

router.route('/:id/locations')
      .get(locationsController.locationsByUser)
      .post(locationsController.locationsCreate);

router.route('/locations/:id')
  .get(locationsController.show)
  .put(locationsController.update)
  .delete(locationsController.delete);

module.exports = router;
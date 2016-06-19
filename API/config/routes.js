var router = require('express').Router();
var usersController = require('../controllers/users');
var locationsController = require('../controllers/locations');

router.route('/users')
      .get(usersController.index)
      .post(usersController.new);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

router.route('/locations')
      .get(locationsController.index)
      .post(locationsController.create);

router.route('/locations/:id')
  .get(locationsController.show)
  .put(locationsController.update)
  .delete(locationsController.delete);

module.exports = router;
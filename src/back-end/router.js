var express = require('express');
var router = express.Router();
var user_controller = require('../back-end/controllers/user_controller');

router.get('/find/:username', user_controller.find);

router.get('/register', user_controller.register);

router.get('/findEmail/:email', user_controller.findEmail);



module.exports = router;
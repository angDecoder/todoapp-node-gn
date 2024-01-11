const { Router } = require('express');
const router = Router();
const registerValidator = require('./validators/registerValidator');
const registerController = require('./controllers/registerController');
const loginValidator = require('./validators/loginValidators');
const loginController = require('./controllers/loginController');

router.post('/register',registerValidator,registerController);
router.post('/login',loginValidator,loginController);

module.exports = router;
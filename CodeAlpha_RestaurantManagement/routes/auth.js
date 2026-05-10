const express = require('express');
const router = express.Router();
const { register, login, registerUser, loginUser } = require('../controllers/authController');

router.get('/', register);
router.get('/login', login);
router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
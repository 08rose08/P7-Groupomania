
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

try{
    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.get('/:id', auth, userCtrl.seeMyProfile);
    router.delete('/:id', auth, userCtrl.deleteUser);
    router.put('/:id', auth, userCtrl.updateUser);
}catch (error){
    console.log(error);
}

module.exports = router;
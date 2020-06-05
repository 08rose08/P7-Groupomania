
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

try{
    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.get('/:id', userCtrl.seeMyProfile);
    router.delete('/:id', userCtrl.deleteUser);
    //router.put('/:id', userCtrl.updateUser);
}catch (error){
    console.log(error);
}

module.exports = router;
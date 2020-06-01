const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');
try{
    router.get('/', postsCtrl.getAllPosts);
    router.post('/', postsCtrl.createPost);

    router.get('/:id/comments', postsCtrl.getComments);
    router.get('/comments', postsCtrl.countComments);
    //router.put('/:id', postsCtrl.updatePost);
    //router.delete('/:id', auth, postsCtrl.deletePost);

    //router.post('/:id/like', auth, postsCtrl.likePost);

    //router.post('/:id/comments', auth, postsCtrl.createComment);

    //router.put('/:id/comments/:id', auth, postsCtrl.updateComment);
    //router.delete('/:id/comments/:id', auth, postsCtrl.deleteComment); 
}catch (error){
    console.log(error);
}

module.exports = router;





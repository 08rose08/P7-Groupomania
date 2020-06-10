const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');

try{
    router.get('/', postsCtrl.getAllPosts);
    router.post('/', postsCtrl.createPost);
    router.put('/:id', postsCtrl.updatePost);
    router.delete('/:id', postsCtrl.deletePost); 

    
    router.get('/likes', postsCtrl.getAllLikes);
    router.post('/:id/like', postsCtrl.postLike);

    //router.get('/comments', postsCtrl.countComments);
    router.get('/:id/comments', postsCtrl.getComments);
    router.post('/:id/comments', postsCtrl.createComment);
    router.put('/comments/:id', postsCtrl.updateComment);
    router.delete('/comments/:id', postsCtrl.deleteComment); 

}catch (error){
    console.log(error);
} 

module.exports = router;





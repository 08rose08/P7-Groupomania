const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const PostsManager = require ('../managers/PostsManager.js')

let postsManager = new PostsManager();

    //let token = req.headers.authorization.split(' ')[1];
    //let decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //let userId = decodedToken.userId;
    //let postObject = JSON.parse(req.body.post);

    //let updatedPost = JSON.parse(req.body.post);
    //let title = updatedPost.title;
    //let content = updatedPost.content;


// POSTS

exports.getAllPosts = (req, res, next) => {
    postsManager.getAllPosts()
        .then((response) => {
            //console.log(response);
            res.status(200).json(JSON.stringify(response));
        });
}
exports.createPost = (req, res, next) => { 
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlInserts = [userId, title, content];
    postsManager.createPost(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
}
exports.updatePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;

    let sqlInserts1 = [postId];
    let sqlInserts2 = [title, content, postId, userId];
    postsManager.updatePost(sqlInserts1, sqlInserts2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    //console.log(userId);
    let postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [postId, userId];
    postsManager.deletePost(sqlInserts1, sqlInserts2)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}


// COMMENTS

exports.getComments = (req, res, next) => {
    let postId = req.params.id;
    let sqlInserts = [postId];
    postsManager.getComments(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
}
exports.createComment = (req, res, next) => { 
    //console.log("dans create comment");
    let postId = req.params.id;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlInserts = [userId, postId, content];
    postsManager.createComment(sqlInserts)
        .then((response) =>{
            res.status(201).json(JSON.stringify(response));
        })
}
/*exports.updateComment = (req, res, next) => {
    let content = req.body.content;
    let commentId = req.params.id;
    let sqlInserts = [content, commentId];
    postsManager.updateComment(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
}*/
exports.updateComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    
    let content = req.body.content;
    let commentId = req.params.id;

    let sqlInserts1 = [commentId];
    let sqlInserts2 = [content, commentId, userId];
    postsManager.updatePost(sqlInserts1, sqlInserts2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}
exports.deleteComment = (req, res, next) => {
    let commentId = req.params.id;
    let sqlInserts = [commentId];
    postsManager.deleteComment(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
}
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    //console.log(userId);
    let commentId = req.params.id;
    let sqlInserts1 = [commentId];
    let sqlInserts2 = [commentId, userId];
    postsManager.deletePost(sqlInserts1, sqlInserts2)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}


// LIKES

exports.getAllLikes = (req, res, next) =>{
     postsManager.getAllLikes()
        .then((response) =>{
            //console.log(response)
            res.status(200).json(JSON.stringify(response));
        })
}
exports.postLike = (req, res, next) => {
    //console.log(req.body);
    let userId = req.body.userId;
    let nbLikes = req.body.nbLikes;
    let postId = req.body.postId;
    let sqlInserts1 = [postId, userId];
    let sqlInserts2 = [nbLikes,postId];
    postsManager.postLike(sqlInserts1, sqlInserts2, req.body.liked)
        .then((response) =>{
            res.status(201).json(JSON.stringify(response))
        }) 
}


/*exports.countComments = (req, res, next) => {
    let sql = "SELECT posts.id, COUNT(comments.id) AS nbComments FROM comments RIGHT JOIN posts ON comments.postId = posts.id GROUP BY posts.id";
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        //console.log(result);
        res.status(200).json(result);
    })
}*/




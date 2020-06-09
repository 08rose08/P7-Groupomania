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
            res.status(200).json(response);
        });
}
exports.createPost = (req, res, next) => { 
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlInserts = [userId, title, content];
    postsManager.createPost(sqlInserts)
        .then((response) => {
            res.status(201).json(response);
        })
}
exports.updatePost = (req, res, next) => {
    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;
    let sqlInserts = [title, content, postId];
    postsManager.updatePost(sqlInserts)
        .then((response) => {
            res.status(201).json(response);
        })
}
exports.deletePost = (req, res, next) => {
    let postId = req.params.id;
    let sqlInserts = [postId];
    postsManager.deletePost(sqlInserts)
        .then((response) =>{
            res.status(200).json(response);
        })
}


// COMMENTS

exports.getComments = (req, res, next) => {
    let postId = req.params.id;
    let sqlInserts = [postId];
    postsManager.getComments(sqlInserts)
        .then((response) =>{
            res.status(200).json(response);
        })
}
exports.createComment = (req, res, next) => { 
    let postId = req.params.id;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlInserts = [userId, postId, content];
    postsManager.createComment(sqlInserts)
        .then((response) =>{
            res.status(201).json(response);
        })
}
exports.updateComment = (req, res, next) => {
    let content = req.body.content;
    let commentId = req.params.id;
    let sqlInserts = [content, commentId];
    postsManager.updateComment(sqlInserts)
        .then((response) =>{
            res.status(200).json(response);
        })
}
exports.deleteComment = (req, res, next) => {
    let commentId = req.params.id;
    let sqlInserts = [commentId];
    postsManager.deleteComment(sqlInserts)
        .then((response) =>{
            res.status(200).json(response);
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




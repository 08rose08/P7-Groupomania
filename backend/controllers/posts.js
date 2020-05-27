const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


exports.createPost = (req, res, next) => { 
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let userId = decodedToken.userId;
    let postObject = JSON.parse(req.body.post);
    let title = postObject.title;
    let content = postObject.content;
    let sql = "INSERT INTO posts VALUES(NULL, ?, ?, ?, NULL, NULL)";
    let sqlInserts = [userId, title, content];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        res.statut(201).json({message : 'New post !'});
    })
}

// et le nombre de commentaires par post ? et le nom/prenom lié à l'userId
exports.getAllPosts = (req, res, next) => {
    // ORDER BY descending ou ascending ? DESC = la plus vielle la plus en bas ?
    console.log("consoleLog du back dans getAllPosts");
    //let sql = "SELECT * FROM posts ORDER BY date DESC";
    let sql = "SELECT posts.id, posts.title, posts.content, posts.date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
    connectdb.query(sql, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        res.status(200).json(result);
    });
}

exports.getOnePost = (req, res, next) => {
    let postId = req.params.id;
    //let sql = "SELECT * FROM posts WHERE id = ?";
    let sql = "SELECT * FROM posts LEFT JOIN comments ON posts.id = comments.postId WHERE posts.id = ? ORDER BY comments.date";
    let sqlInserts = [postId];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    })
}

exports.updatePost = (req, res, next) => {
    let updatedPost = JSON.parse(req.body.post);
    let title = updatedPost.title;
    let content = updatedPost.content;
    let postId = updatedPost.id;
    let sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    let sqlInserts = [title, content, postId];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        res.status(200).json({message : 'Post updated !'});
    })
}

exports.deletePost = (req, res, next) => {
    let postId = req.params.id;
    let sql = "DELETE FROM posts WHERE id = ?";
    let sqlInserts = [postId];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        res.status(200).json({message : 'Post deleted !'});
    })
}

exports.createComment = (req, res, next) => { 
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let userId = decodedToken.userId;
    let commentObject = JSON.parse(req.body.comment);
    let postId = commentObject.postId;
    let content = commentObject.content;
    let sql = "INSERT INTO comments VALUES(NULL, ?, ?, NULL, ?)";
    let sqlInserts = [userId, postId, content];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        res.statut(201).json({message : 'New comment !'});
    })
}

exports.deleteComment = (req, res, next) => {
    let commentId = req.params.id;
    let sql = "DELETE FROM comments WHERE id = ?";
    let sqlInserts = [commentId];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        res.status(200).json({message : 'Comment deleted !'});
    })
}
const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


exports.createPost = (req, res, next) => { 
    //let token = req.headers.authorization.split(' ')[1];
    //let decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //let userId = decodedToken.userId;
    //let postObject = JSON.parse(req.body.post);
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;
    let sql = "INSERT INTO posts VALUES(NULL, ?, ?, ?, NOW(), 0)";
    let sqlInserts = [userId, title, content];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.status(201).json({message : 'New post !'});
    })
}

// et le nombre de commentaires par post ?
exports.getAllPosts = (req, res, next) => {
    //console.log("consoleLog du back dans getAllPosts");
    //let sql = "SELECT * FROM posts ORDER BY date DESC";
    let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, posts.date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
    connectdb.query(sql, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        res.status(200).json(result);
    });
}

exports.getComments = (req, res, next) => {
    let postId = req.params.id;
    //let sql = "SELECT * FROM posts WHERE id = ?";
    let sql = "SELECT comments.comContent, comments.date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id WHERE postId = ? ORDER BY date";
    let sqlInserts = [postId];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        //console.log(result);
        res.status(200).json(result);
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
    let postId = req.params.id;
    let userId = req.body.userId;
    let content = req.body.content;
    let sql = "INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?)";
    let sqlInserts = [userId, postId, content];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        res.status(201).json({message : 'New comment !'});
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

exports.updateComment = (req, res, next) => {
    
    let content = req.body.content;
    let commentId = req.params.id;
    let sql = "UPDATE comments SET comContent = ? WHERE id = ?";
    let sqlInserts = [content, commentId];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function (err, result, fields){
        if (err) throw err;
        res.status(200).json({message : 'Comment updated !'});
    })
}
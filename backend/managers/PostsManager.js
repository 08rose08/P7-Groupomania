const connectdb = require('../connectdb.js');
const mysql = require('mysql');

class PostsManager {
    constructor() {
        console.log('coucou du PostsManager')
    }
    

//POSTS

    getAllPosts(){
        let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, posts.date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    }
    createPost(sqlInserts){
        let sql = "INSERT INTO posts VALUES(NULL, ?, ?, ?, NOW(), 0)";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve({message : 'New post !'});
            })       
        })
    }
    updatePost(sqlInserts){
        let sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Post updated !'});
            })
        })
    }
    deletePost(sqlInserts){
        let sql = "DELETE FROM posts WHERE id = ?";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Post deleted !'});
            })
        })
    }

// COMMENTS

    getComments(sqlInserts){
        let sql = "SELECT comments.comContent, comments.date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id WHERE postId = ? ORDER BY date";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        
        })
    }
    createComment(sqlInserts){
        let sql = "INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?)";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'New comment !'})
            })
        })
    }
    updateComment(sqlInserts){
        let sql = "UPDATE comments SET comContent = ? WHERE id = ?";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Comment updated !'});
            })
        })
    }
    deleteComment(sqlInserts){
        let sql = "DELETE FROM comments WHERE id = ?";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Comment deleted !'});
            })
        })
    }


// LIKES
    
    getAllLikes(){
        let sql = "SELECT * FROM likes"
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    }
    postLike(sqlInserts1, sqlInserts2, liked){
        let sql1 = "INSERT INTO likes VALUES (?, ?)"; 
        sql1 = mysql.format(sql1, sqlInserts1);
        let sql2 = "UPDATE posts SET likes = ? WHERE id = ?";
        sql2 = mysql.format(sql2, sqlInserts2);
        let sql3 = "DELETE FROM likes WHERE postId = ? AND userId = ?";
        sql3 = mysql.format(sql3, sqlInserts1);
        return new Promise((resolve) =>{
            connectdb.query(sql2, function (err, result, fields){
                if (err) throw err;
                
            });
            if(liked === false){
                connectdb.query(sql1, function (err, result, fields){
                    if (err) throw err;
                    resolve({ message: 'Like !'})
                })
            }
            if(liked === true){
                connectdb.query(sql3, function(err, result, fields){
                    if(err) throw err;
                    resolve({ mesage : 'Like canceled!' })
                })
            }
        })

    }
};

module.exports = PostsManager;
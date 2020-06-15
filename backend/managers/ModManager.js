const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class ModManager {
    constructor() {
        console.log('coucou du ModManager')
    }

    getAllPosts(){
        let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, posts.date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                //console.log(result);
                resolve(result)
            });
        })
    };
    deletePost(sqlInserts){
        let sql = "DELETE FROM posts WHERE id = ?";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Post deleted !'});
            })
        })
    };
    getAllComments(){
        let sql = "SELECT comments.comContent, comments.date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id ORDER BY date DESC";
        //sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        
        })
    };
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

}


module.exports = ModManager;
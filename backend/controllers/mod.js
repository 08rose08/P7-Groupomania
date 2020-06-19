const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const ModManager = require ('../managers/ModManager.js');

let modManager = new ModManager();

exports.getAllPosts = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const mod = decodedToken.moderation;
    if(mod == 1){
        modManager.getAllPosts()
            .then((response) => {
                //console.log(response);
                res.status(200).json(JSON.stringify(response));
            })
            /*.catch((error) =>{
                res.status(400).json(error)
            });*/
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const mod = decodedToken.moderation;
    console.log(mod);
    if(mod == 1){
        let postId = req.params.id;
        let sqlInserts = [postId];
        modManager.deletePost(sqlInserts)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
            /*.catch((error) =>{
                res.status(400).json(error)
            });*/
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}
exports.getAllComments = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const mod = decodedToken.moderation;
    if(mod == 1){
        modManager.getAllComments()
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const mod = decodedToken.moderation;
    if(mod == 1){
        let commentId = req.params.id;
        let sqlInserts = [commentId];
        modManager.deleteComment(sqlInserts)
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    }else{
        res.status(400).json({error: 'Requête non authorisée'})
    }
}

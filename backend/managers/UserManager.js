const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



class UserManager {
    constructor() {
        console.log('coucou du UserManager')
    }
    signup(sqlInserts){
        let sql = "INSERT INTO users VALUES(NULL, ?, ?, ?, ?)";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) reject({error : 'Erreur dans l\'inscription'});
                resolve({message : 'New user !'})
            })
        })
        

    }
    login(sqlInserts, password){
        let sql = "SELECT * FROM users WHERE email = ?";
        sql = mysql.format(sql, sqlInserts);
        
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) reject({ err });
                // envoyer message utilisateur inexistant ?;
                console.log(result[0]);
                if (!result[0]){
                    reject ({ error : 'Utilisateur introuvable !'});
                } else {
                    bcrypt.compare(password, result[0].password) // result.password ?? result[0].password ?
                        .then(valid => { 
                            if (!valid) return reject({ error: 'Incorrect password !' });
                            //console.log('après le if !valid');
                            resolve({
                                userId: result[0].id, // result[0].id?
                                token: jwt.sign(
                                    { userId: result[0].id,
                                    moderation: result[0].moderation },
                                    //{ moderation: result[0].moderation }, //result[0].id ??
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' } //+/- journée de travail 8+1h
                                ),
                                moderation: result[0].moderation
                            });
                        })
                        .catch(error => reject({ error }));
                }
            })
        
        })
    }
    seeMyProfile(sqlInserts){
        let sql = "SELECT firstName, lastName, email FROM users WHERE id = ?"; // sans le password 
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                //console.log('avant le if err');
                if (err) return reject({error : 'page indisponible'});
                //console.log('après le if err');
                resolve(result);
            }) 

        })
    
    }
    updateUser(sqlInserts){
        let sql = "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?"
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                //console.log('avant le if err');
                if (err) return reject({error : 'fonction indisponible'});
                //console.log('après le if err'); 
                resolve({message : 'User updated.'});
            }) 

        })
    }
    deleteUser(sqlInserts){
        let sql = "DELETE FROM users WHERE id = ?"; 
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql, function(err, result){
                if (err) return reject({error : 'fonction indisponible'});
                resolve({message : 'User deleted.'});
            }) 

        })
    
    }
}

module.exports = UserManager;

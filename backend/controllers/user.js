const bcrypt = require('bcrypt');
//à changer avec passeport-jwt ? http://www.passportjs.org/packages/passport-jwt/
const jwt = require('jsonwebtoken');
const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const UserManager = require ('../managers/UserManager.js')

let userManager = new UserManager();


exports.signup = (req, res, next) => {
    //let signupData = JSON.parse(req.body)
    let email = req.body.email;
	let password = req.body.password;
	let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    bcrypt.hash(password, 10)
        .then (hash => {
            let sqlInserts = [lastName, firstName, email, hash];
            userManager.signup(sqlInserts)
                .then((response) =>{
                    res.status(201).json(response)
                })
                .catch((error) =>{
                    console.error(error);
                    res.status(400).json({error})
                })
        })
        .catch(error => res.status(500).json(error)) 
};

exports.login = (req, res, next) => {
    //console.log(req.body);
    //let loginData = JSON.parse(req.body);
    //console.log(loginData);
    let email = req.body.email;
    //if (email === undefined){res.status(400).json({error: 'Undefined email'})};
    let password = req.body.password;
    //if (password === undefined){res.status(400).json({error: 'Undefined password'})};
    let sqlInserts = [email];
    userManager.login(sqlInserts, password)
        .then((response) =>{
            //console.log(response);
            res.status(200).json(response)
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
    /*connectdb.query(sql, function(err, result){
        if (err) throw err;
        // envoyer message utilisateur inexistant ?;
        bcrypt.compare(password, result[0].password) // result.password ?? result[0].password ?
            .then(valid => { 
                if (!valid) {return res.status(400).json({ error: 'Incorrect password !' })}
                res.status(200).json({
                    userId: result[0].id, // result[0].id?
                    token: jwt.sign(
                        { userId: result[0].id }, //result[0].id ??
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' } //+/- journée de travail 8+1h
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })*/
}
exports.seeMyProfile = (req, res, next) => {
    let userId = req.params.id;
    let sqlInserts = [userId];
    //console.log('avant le manager');
    userManager.seeMyProfile(sqlInserts)
        .then((response) =>{
            res.status(200).json(response)
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
}   
exports.updateUser = (req, res, next) => {
    let userId = req.params.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlInserts = [firstName, lastName, email, userId];
    userManager.updateUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(response)
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}
 
exports.deleteUser = (req, res, next) => {
    let userId = req.params.id;
    let sqlInserts = [userId];
    userManager.deleteUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(response)
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
} 
 
/*exports.uptadeUser= (req, res, next) => {

}*/


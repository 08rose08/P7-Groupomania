const bcrypt = require('bcrypt');
//à changer avec passeport-jwt ? http://www.passportjs.org/packages/passport-jwt/
const jwt = require('jsonwebtoken');
const connectdb = require('../connectdb.js');
const mysql = require('mysql');

exports.signup = (req, res, next) => {
    let email = req.body.email;
	let password = req.body.password;
	let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    //console.log(lastName);  // !!!!!! ne fonctionne pas sans
    bcrypt.hash(password, 10)
        .then (hash => {
            let sql = "INSERT INTO users VALUES(NULL, ?, ?, ?, ?)";
            let sqlInserts = [lastName, firstName, email, hash];
            sql = mysql.format(sql, sqlInserts);
            //pourquoi passer par mysql.format ? plutot que mettre inserts direct dans connectdb.query ? cf https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
            connectdb.query(sql, function(err, result){
                if (err) throw err;
                //console.log('New user !');
                //est-ce que mon res va pas se faire à la suite de l'erreur ?
                //est-ce que ce format de res est possible ? différent de console.log ? sortir res.statut de connectdb.query ?
                res.status(201).json({message : 'New user !'})
            })
        })
        .catch(error => res.status(500).json({error})) 
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    if (email===undefined){res.status(400).json({error: 'Undefined email'})};
    let password = req.body.password;
    if (password===undefined){res.status(400).json({error: 'Undefined password'})};
    let sql = "SELECT * FROM users WHERE email=?";
    let sqlInserts = [email];
    sql = mysql.format(sql, sqlInserts);
    connectdb.query(sql, function(err, result){
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
    })
}

exports.seeMyProfile = (req, res, next) => {
    //let userId = dans le token ? decodeToken ?
    // récupérer le userID puis aller chercher la ligne correspondante et la renvoyer
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let userId = decodedToken.userId;
    let sql = "SELECT * FROM users WHERE id=?"; // sans le password ?
    let sqlInserts = [userId];
    sql = mysql.format(sql,sqlInserts);
    connectdb.query(sql, function(err, result){
        if (err) throw err;
        res.status(200).json(result);
    })    
}

exports.deleteUser = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    let userId = decodedToken.userId;
    // conditions de delete, posts, comments (clé)
    let sql = "DELETE FROM users WHERE id=?"; 
    let sqlInserts = [userId];
    sql = mysql.format(sql,sqlInserts);
    connectdb.query(sql, function(err, result){
        if (err) throw err;
        res.status(200).json({message : 'User deleted.'});
    }) 
}


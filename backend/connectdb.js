const mysql = require('mysql');
console.log("connectdb");
let connectdb = mysql.createConnection({ 
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "groupomania", 
});
connectdb.connect(function(err) { 
    if (err) throw err;
    console.log("Connected!") 
});

module.exports = connectdb;
const config = require('./config');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host     : config.dbhost,
    user     : config.dbusername,
    password : config.dbpassword,
    database : config.db,
    multipleStatements : true
});
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
module.exports = conn;

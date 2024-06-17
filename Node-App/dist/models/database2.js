"use strict";
var mysql = require("mysql2");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@258",
    database: "main",
    dateStrings: "true",
});
con.connect((err) => {
    if (err)
        throw err;
    console.log("connected!!");
});
module.exports = con;
//# sourceMappingURL=database2.js.map
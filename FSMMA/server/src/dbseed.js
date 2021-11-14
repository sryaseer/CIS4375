const mysql = require("mysql");

//you can connect, just make sure you are not using root user
// const con = mysql.createConnection({
//   host: "test-database.chhxjp6se8lk.us-east-1.rds.amazonaws.com",
//   user: "alextesting",
//   password: "alextestingpwd"
// })
//
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.end();
// });

const connection = mysql.createConnection({
  host: "test-database.chhxjp6se8lk.us-east-1.rds.amazonaws.com",
  user: "alextesting",
  database: "testdatabase1",
  password: "alextestingpwd",
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
});

connection.connect();
module.exports = connection;

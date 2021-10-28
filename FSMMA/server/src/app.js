const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      accountRouter = require('./router/router')
      mysql = require('mysql');
      PORT = process.env.PORT || 5562;

const app = express()
//allowing front end to interact with backend if traffic coming from:
var corsOptions = {origin: "http://localhost:8080"};

app.use(cors(corsOptions))
app.use(express.json())
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(accountRouter)


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});


//THIS IS FOR TESTING
app.post('/users', (req, res) => {
  const con = mysql.createConnection(connection);
  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      if (req.query.email && req.query.password){
        console.log('Request Received!');
          con.query(`INSERT INTO testdatabase1.Test_Table (email, password) VALUES ('${req.query.email}', '${req.query.password}')`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) {
              res.send({email: req.query.email, password: req.query.password})
              console.log("Entered " + req.query.email + " into the DB.");
            };
          })
        }
      con.end();
  });
});
//END OF TESTIN

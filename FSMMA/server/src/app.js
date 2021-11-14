const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  accountRouter = require("./router/router");
mysql = require("mysql");
PORT = process.env.PORT || 5562;

const app = express();
//allowing front end to interact with backend if traffic coming from:
var corsOptions = { origin: "http://localhost:8080" };

app.use(cors(corsOptions));
app.use(express.json());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(accountRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

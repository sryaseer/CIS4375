const express = require("express"),
  router = new express.Router();

const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/users.js");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "test-database.chhxjp6se8lk.us-east-1.rds.amazonaws.com",
  user: "alextesting",
  database: "testdatabase1",
  password: "alextestingpwd",
  port: 3306,
});

//CONNECTON TO DATABASE!
const db = require("../dbseed.js");
//post /account        create
//get /acount          retrieve
//get /account/:id      retrieve
//put /account/:id      update
//delete /account/:id   delete

//STUDENT SIGN UP
router.post("/student-sign-up", (req, res, next) => {
  db.query(
    `SELECT * FROM Student_Account WHERE email = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This email username is already in use.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            db.query(
              `INSERT INTO Student_Account (first_name, last_name, email, password, phone, dob,
            address, city, state, postal_code, student_type_id, goal_id, sport_id, location_id, session_credits,
            waiver_signed_date, account_created_date) VALUES
            (${db.escape(req.body.first_name)}, ${db.escape(
                req.body.last_name
              )}, ${db.escape(req.body.email)},
            ${db.escape(hash)}, ${db.escape(req.body.phone)}, ${db.escape(
                req.body.dob
              )}, ${db.escape(req.body.address)},
            ${db.escape(req.body.city)}, ${db.escape(
                req.body.state
              )}, ${db.escape(req.body.postal_code)}, 1,
            ${db.escape(req.body.goal_id)}, ${db.escape(
                req.body.sport_id
              )}, 1, 0, current_date(), current_date())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Registered!",
                });
              }
            );
          }
        });
      }
    }
  );
});

//Getting fitness goals from db
router.get("/get-fitness-goals", (req, res, next) => {
  let selectQuery = "SELECT goal_id, goal_desc FROM Goal";
  let query = mysql.format(selectQuery);
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    console.log(result);
    res.status(200).send(result);
  });
});

//Getting sports from db
router.get("/get-sports", (req, res, next) => {
  let selectQuery = "SELECT sport_id, sport_desc FROM Sport";
  let query = mysql.format(selectQuery);
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    console.log(result);
    res.status(200).send(result);
  });
});

//STUDENT LOG IN
router.post("/student-login", (req, res, next) => {
  db.query(
    `SELECT * FROM Student_Account WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }

          if (bResult) {
            const token = jwt.sign(
              {
                email: result[0].email,
                userId: result[0].id,
              },
              "SECRETSTUDENTKEY",
              {
                expiresIn: "2000",
              }
            );
            //db.query(
            //`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            //  );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

//ADMIN LOGIN
router.post("/admin-login", (req, res, next) => {
  db.query(
    `SELECT * FROM Admin WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }

          if (bResult) {
            const token = jwt.sign(
              {
                email: result[0].email,
              },
              "ADMINSTUDENTKEY",
              {
                expiresIn: "2000",
              }
            );
            //db.query(
            //`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            //  );
            return res.status(200).send({
              msg: "Logged in!",
              token,
              admin: result[0],
            });
          }
          return res.status(401).send({
            msg: "Username or password is incorrect!",
          });
        }
      );
    }
  );
});

// ADMIN VIEW STUDENT - GET ALL STUDENTS
router.get("/admin-view-student-search", (req, res, next) => {
  let selectQuery =
    "SELECT student_id, first_name, last_name, dob FROM Student_Account";
  let query = mysql.format(selectQuery);
  pool.query(query, (err, result) => {
    if (err) {
      throw err;
      return res.status(400).send({
        msg: err,
      });
    } else {
      res.status(200).send(result);
      console.log(result);
    }
  });
});

// ADMIN VIEW STUDENT - GET SELECTED STUDENT BY ID
router.get("/admin-view-student/:id", (req, res, next) => {
  let selectQuery =
    "SELECT first_name, last_name, email, phone, dob, address, city, state, postal_code, account_created_date, waiver_signed_date, session_credits FROM Student_Account WHERE student_id = ?";
  let query = mysql.format(selectQuery, [req.params.id]);

  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    console.log(result);
    res.status(200).send(result[0]);
  });
});

//ADMIN VIEW SCHEDULE
router.get("/admin-view-schedule", (req, res, next) => {
  let selectQuery =
    "SELECT S.session_id, S.date, S.time, I.first_name AS i_first_name, I.last_name AS i_last_name," +
    "I.instructor_id, SST.session_status_desc, SA.first_name, SA.last_name, SA.student_id " +
    "FROM Session S " +
    "JOIN Instructor I ON S.instructor_id = I.instructor_id " +
    "JOIN Session_Student SS ON S.session_id = SS.session_id " +
    "JOIN Student_Account SA ON SA.student_id = SS.student_id " +
    "JOIN Session_status SST ON SST.session_status_id = S.session_status_id " +
    "WHERE S.date BETWEEN (DATE_ADD(NOW(), INTERVAL -35 DAY)) AND (DATE_ADD(NOW(), INTERVAL 45 DAY));";
  let query = mysql.format(selectQuery);

  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    console.log(result);
    res.status(200).send(result);
  });
});

router.get("/student-view-schedule", (req, res, next) => {
  let selectQuery =
    "SELECT S.session_id, S.date, S.time, I.first_name AS i_first_name, I.last_name AS i_last_name," +
    "I.instructor_id, SST.session_status_desc, SA.first_name, SA.last_name, SA.student_id " +
    "FROM Session S " +
    "LEFT JOIN Instructor I ON S.instructor_id = I.instructor_id " +
    "LEFT JOIN Session_Student SS ON S.session_id = SS.session_id " +
    "LEFT JOIN Student_Account SA ON SA.student_id = SS.student_id " +
    "LEFT JOIN Session_status SST ON SST.session_status_id = S.session_status_id " +
    "WHERE S.date BETWEEN (DATE_ADD(NOW(), INTERVAL -35 DAY)) AND (DATE_ADD(NOW(), INTERVAL 45 DAY));";
  let query = mysql.format(selectQuery);
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    console.log(result);
    res.status(200).send(result);
  });
});

router.post("/student-cancels-signup", (req, res, next) => {
  console.log("in router");
  let selectQuery =
    "DELETE FROM Session_Student " +
    "WHERE student_id = ? AND session_id = ? AND attendance = 0 ;";
  console.log("step 1: ");
  let query = mysql.format(selectQuery, [
    req.body.student_id,
    req.body.session_id,
  ]);
  console.log(
    "student id " + req.body.student_id + "session id " + req.body.session_id
  );
  console.log("query done ");
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    console.log(result);
    res.status(200).send(result);
  });
});

/*
router.post('/add-student-note', (req, res, next){
  let selectQuery ='INSERT INTO Notes (student_id, notes, date) '+
                    'VALUES (?, ?, sysdate());'
let query = mysql.format(selectQuery, [req.params.student_id], [req.params.notes]);
  pool.query(query, (err, result) => {
    if (err){
      console.error(err);
      throw err;
      return res.status(400).send({
        msg: err });
    }
    console.log(result);
    res.status(200).send(result);

})
*/

router.get("/student-secret-route", (req, res, next) => {
  res.send("This is the secret content. Only logged in students can see that!");
});

router.get("/admin-secret-route", (req, res, next) => {
  res.send("This is the secret content. Only logged in admins can see that!");
});

router.get("/", async (req, res) => {
  console.log("in home :)");
  res.send("Hi you made it to home page.");
});

router.get("/student", async (req, res) => {
  console.log("at atudent page.");
  res.send("Now you are in student page.");
});

//very important to export router or express won't route!

module.exports = router;

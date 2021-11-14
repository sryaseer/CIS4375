const express = require("express"),
  router = new express.Router();

const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/users.js");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");

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

router.post("/change-password", (req, res, next) => {
  console.log("Changing password");
  console.log(req.body);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({
        msg: err,
      });
    } else {
      let query = `UPDATE Student_Account SET password = ${db.escape(
        hash
      )} WHERE student_id = ${db.escape(req.body.id)};`;
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send({
            msg: err,
          });
        }
        return res.status(201).send({
          msg: "Password changed!!",
        });
      });
    }
  });
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

// ADMIN VIEW STUDENT - GET ALL INSTUCTORS
router.get("/admin-view-instructor-search", (req, res, next) => {
  let selectQuery =
    "SELECT instructor_id, first_name, last_name FROM Instructor";
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

router.get("/admin-view-instructor/:id", (req, res, next) => {
  let selectQuery =
    "SELECT first_name, last_name, email, phone, title, account_created_date, rate_per_session, location_name " +
    "FROM Instructor I " +
    "JOIN Location L ON L.location_id = I.location_id " +
    "WHERE instructor_id = ?;";
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
    "I.instructor_id, SST.session_status_desc, SST.session_status_desc, SA.first_name, SA.last_name, SA.student_id " +
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

//STUDENT VIEW OF THE CALENDER
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

//PULLING ALL THE SESSION FOR THE INSTRUCTOR (DISREGARDING IF SIGNED UP OR NOT)
router.post("/instructor-view-schedule", (req, res, next) => {
  console.log("in IVS");
  let selectQuery =
    "SELECT S.session_id, S.date, S.time, I.first_name AS i_first_name, I.last_name AS i_last_name," +
    "I.instructor_id, SST.session_status_desc, SA.first_name, SA.last_name, SA.student_id " +
    "FROM Session S " +
    "LEFT JOIN Instructor I ON S.instructor_id = I.instructor_id " +
    "LEFT JOIN Session_Student SS ON S.session_id = SS.session_id " +
    "LEFT JOIN Student_Account SA ON SA.student_id = SS.student_id " +
    "LEFT JOIN Session_status SST ON SST.session_status_id = S.session_status_id " +
    "WHERE S.date BETWEEN (DATE_ADD(NOW(), INTERVAL -35 DAY)) AND (DATE_ADD(NOW(), INTERVAL 45 DAY)) AND " +
    "I.instructor_id = ?;";
  let query = mysql.format(selectQuery, [req.body.instructor_id]);
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

//pulling all the session for the instructor where student's signed up
router.post("/instructor-signedup-schedule", (req, res, next) => {
  console.log(req.body);
  let selectQuery =
    "SELECT S.session_id, S.date, S.time, I.first_name AS i_first_name, I.last_name AS i_last_name," +
    "I.instructor_id, SST.session_status_desc, SA.first_name, SA.last_name, SA.student_id " +
    "FROM Session S " +
    "JOIN Instructor I ON S.instructor_id = I.instructor_id " +
    "JOIN Session_Student SS ON S.session_id = SS.session_id " +
    "JOIN Student_Account SA ON SA.student_id = SS.student_id " +
    "JOIN Session_status SST ON SST.session_status_id = S.session_status_id " +
    "WHERE S.date BETWEEN (DATE_ADD(NOW(), INTERVAL -35 DAY)) AND (DATE_ADD(NOW(), INTERVAL 45 DAY)) AND " +
    "I.instructor_id = ?;";
  let query = mysql.format(selectQuery, [req.body.instructor_id]);
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

//REMOVING FROM SESSION
router.post("/student-cancels-signup", (req, res, next) => {
  console.log("sent to server");
  let selectQuery =
    "DELETE FROM Session_Student " +
    "WHERE student_id = ? AND session_id = ? AND attendance = 0 ;";
  let query = mysql.format(selectQuery, [
    req.body.student_id,
    req.body.session_id,
  ]);
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

//REGISTERING FOR A SESSION
router.post("/set-schedule-signup", (req, res, next) => {
  let selectQuery = "INSERT INTO Session_Student " + "VALUES (?,?,0);";
  let query = mysql.format(selectQuery, [
    req.body.session_id,
    req.body.student_id,
  ]);
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

//POST - ADDING A NOTE
router.post("/add-student-note", (req, res, next) => {
  console.log("reqest went through");
  let selectQuery =
    "INSERT INTO Notes (student_id, notes, date) " +
    "VALUES (?, ?, sysdate());";
  let query = mysql.format(selectQuery, [req.body.student_id, req.body.notes]);
  console.log("Query went through");
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

//POST - Create a Session from Admin Level
router.post("/create-new-session", (req, res, next) => {
  console.log("request went through");
  let selectQuery = "INSERT INTO Session " + "VALUES (0, ? , ?, 1, ?, ?);";
  console.log(req.body.startDate);
  console.log(req.body.startTime);
  console.log(req.body.instructor_id);
  console.log(req.body.session_status_id);
  let query = mysql.format(selectQuery, [
    req.body.startDate,
    req.body.startTime,
    req.body.instructor_id,
    req.body.session_status_id,
  ]);
  console.log("Query went through");
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

//RETURNS SESSIONS IN THE PAST FOR STUDENT
router.post("/student-get-past-sessions", (req, res, next) => {
  let selectQuery =
    "SELECT S.date, S.time, I.first_name, I.last_name, SS.attendance, SST.session_status_desc " +
    "FROM Session S " +
    "JOIN Instructor I ON I.instructor_id = S.instructor_id " +
    "JOIN Session_Student SS ON SS.session_id = S.session_id " +
    "JOIN Session_status SST ON SST.session_status_id = S.session_status_id " +
    "WHERE SS.student_id = ? AND S.date < CURDATE() " +
    "ORDER BY S.date desc;";
  let query = mysql.format(selectQuery, [req.body.student_id]);
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

// RETURNS FUTURE SESSIONS FOR STUDENTS
router.post("/student-get-future-sessions", (req, res, next) => {
  let selectQuery =
    "SELECT S.date, S.time, I.first_name, I.last_name, SST.session_status_desc " +
    "FROM Session S " +
    "JOIN Instructor I ON I.instructor_id = S.instructor_id " +
    "JOIN Session_Student SS ON SS.session_id = S.session_id " +
    "JOIN Session_status SST ON SST.session_status_id = S.session_status_id " +
    "WHERE SS.student_id = ? AND S.date > CURDATE() " +
    "ORDER BY S.date;";
  let query = mysql.format(selectQuery, [req.body.student_id]);
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    res.status(200).send(result);
  });
});

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

//SEVICE TO FORGET PASSWORD
router.post("/forgot-password", (req, res) => {
  console.log("Forgot password");
  db.query(
    `SELECT * FROM Student_Account WHERE email = ${db.escape(req.body.email)};`,
    async (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: "User with this email not found",
        });
      }

      let password = Math.random().toString(36).substr(2, 10);
      console.log("New password: " + password);

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            msg: err,
          });
        } else {
          let query = `UPDATE Student_Account SET password = ${db.escape(
            hash
          )} WHERE email = ${db.escape(req.body.email)};`;
          db.query(query, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).send({
                msg: err,
              });
            }
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "mw1996white@gmail.com",
                pass: "*Morgan12345white`",
              },
              tls: {
                rejectUnauthorized: false,
              },
            });

            let mailOptions = {
              from: "mw1996white@gmail.com",
              to: req.body.email,
              subject: "Forgot Password",
              text: `Here is your new password: ${password}. Login and change it ASAP!`,
            };

            transporter.sendMail(mailOptions, function (err, success) {
              if (err) {
                console.log(err);
              } else {
                console.log("Email sent succesfully ");
              }
            });
          });
        }
      });
    }
  );
});

//MAILSERVICE OUT OF SESSIONS
/*
router.post("/mail-service-request", async (req, res) => {
  console.log("request works.");

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mw1996white@gmail.com",
      pass: "*Morgan12345white`",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "mw1996white@gmail.com",
    to: "lippmanry@gmail.com",
    subject: "testing",

    html: ({path: './src/emailTemplate/emailTemplate.html'}),

  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent succesfully ");
    }
  });
});
*/

//MAILSERVICE REMINDER (this one is the current problem child)
router.post("/mail-service-request", async (req, res) => {
  var info = `SELECT Session_Student.session_id, Session_Student.student_id, date, time, email, first_name
  FROM Session_Student 
  JOIN Session 
  ON Session_Student.session_id = Session.session_id
  JOIN Student_Account 
  ON Session_Student.student_id = Student_Account.student_id
  WHERE Session.date = DATE(CURRENT_DATE()+1) AND
  Session.session_status_id = 1;  `;
  var name = [];
  var to = [];
  var aDate = [];
  var aTime = [];

  db.query(info, function (err, email, fields) {
    for (k in email) {
      to.push(email[k].email);
    }
  });

  db.query(info, function (err, first_name, fields) {
    for (k in first_name) {
      name.push(first_name[k].first_name);
    }
  });

  db.query(info, function (err, date, time, fields) {
    for (k in date) {
      aDate.push(date[k].date);
    }
    for (k in time) {
      aTime.push(time[k].time);
    }
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mw1996white@gmail.com",
      pass: "*Morgan12345white`",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "mw1996white@gmail.com",
    to: to,
    subject: `${name}, a friendly reminder about your session`,

    html: `Hi  ${name},this is just a reminder that you have an upcoming session on ${aDate} at ${aTime}.`,
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent succesfully ");
    }
  });
});

//MAILSERVICE PROMOTION (mail service not made yet)
router.post("/promotion-email", async (req, res) => {
  var emails = `SELECT * FROM Student_Account;`;
  var to_list = [];

  db.query(emails, function (err, email, fields) {
    for (k in email) {
      to_list.push(email[k].email);
    }
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mw1996white@gmail.com",
      pass: "*Morgan12345white`",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "mw1996white@gmail.com",
    to: to_list,
    subject: "Check out this deal!",

    html: { path: "./src/emailTemplate/promotionHTML.html" },
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent succesfully ");
    }
  });
});

//MAILSERVICE OUT OF SESSIONS
router.post("/out-of-session", async (req, res) => {
  var emails = `SELECT first_name, last_name, email FROM Student_Account WHERE session_credits = 0;`;
  var to_list = [];

  db.query(emails, function (err, email, fields) {
    for (k in email) {
      to_list.push(email[k].email);
    }
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mw1996white@gmail.com",
      pass: "*Morgan12345white`",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "mw1996white@gmail.com",
    to: to_list,
    subject: "You're out of sessions!",

    html: { path: "./src/emailTemplate/sessionsHTML.html" },
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent succesfully ");
    }
  });
});

//MAILSERVICE GENERAL
/*
router.post("/mail-service-request", async (req, res) => {
  console.log("request works.");

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mw1996white@gmail.com",
      pass: "*Morgan12345white`",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "mw1996white@gmail.com",
    to: "lippmanry@gmail.com",
    subject: "testing",

    html: ({path: './src/emailTemplate.html'}),

  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent succesfully ");
    }
  });
});
*/
//ADMIN SIDE - GRAB MONTHS OF MEMBERSHIP (ALL STUDENTS)
router.get("/student-get-months-membership", (req, res, next) => {
  let selectQuery =
    "SELECT first_name, last_name, email, phone, dob, account_created_date, " +
    'TIMESTAMPDIFF(MONTH,account_created_date, CURRENT_DATE()) as "Months Active" ' +
    "FROM testdatabase1.Student_Account " +
    "WHERE account_created_date IS NOT NULL; ";
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

//STUDENT SIDE - GRAB MONTHS OF MEMBERSHIP BASED ON STUDENT ID
router.post("/studentid-get-months-membership", (req, res, next) => {
  let selectQuery =
    "SELECT first_name, last_name, " +
    'TIMESTAMPDIFF(MONTH,account_created_date, CURRENT_DATE()) as "Months Active" ' +
    "FROM testdatabase1.Student_Account " +
    "where student_id = ? AND account_created_date IS NOT NULL; ";
  let query = mysql.format(selectQuery, [req.body.student_id]);
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

//VERY IMPORTANT TO EXPORT ROUTER OR EXPRESS WON'T ROUTE!
module.exports = router;

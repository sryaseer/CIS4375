const express = require('express'),
router = new express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/users.js');



//CONNECTON TO DATABASE!
const db = require('../dbseed.js');
//post /account        create
//get /acount          retrieve
//get /account/:id      retrieve
//put /account/:id      update
//delete /account/:id   delete

//STUDENT SIGN UP
router.post('/student-sign-up', (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = LOWER(${db.escape(req.body.email)});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This email username is already in use.'
        });
      }
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err){
            return res.status(500).send({
              msg: err });
          }
          else {
            db.query( `INSERT INTO users (email, password) VALUES
            (${db.escape(req.body.email)}, ${db.escape(hash)})`,
            (err, result) => {
              if (err) {
                throw err;
                return res.status(400).send({
                  msg: err
                });
              }
              return res.status(201).send({
                msg: 'Registered!'
              });
            }
          );
          }
        });
      }
    }
  );
});

//STUDENT LOG IN
router.post('/student-login', (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect! 1'
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect! 2'
            });
          }

          if (bResult) {
            const token = jwt.sign({
                email: result[0].email,
                userId: result[0].id
              },
              'SECRETSTUDENTKEY', {
                expiresIn: '1d'
              }
            );
            //db.query(
              //`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
          //  );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect! 3' + req.body.email + " " + req.body.password + "  " +
            result[0].email + " " + bResult
          });
        }
      );
    }
  );
});

router.get('/secret-route', (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});



router.get('/', async (req,res) => {
  console.log('in home :)')
  res.send('Hi you made it to home page.')
})

router.get('/student', async (req,res) => {
  console.log('at atudent page.')
  res.send('Now you are in student page.')
})


//very important to export router or express won't route!

module.exports = router

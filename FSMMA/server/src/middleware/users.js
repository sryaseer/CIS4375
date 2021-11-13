const jwt = require("jsonwebtoken");


module.exports = {
  isStudentLoggedIn: (req, res, next) => {
    next()
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        'SECRETSTUDENTKEY'
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  }
}

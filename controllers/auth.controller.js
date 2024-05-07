const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { admin } = require("../models/index");

const secret = "oke";

const authenticate = async (req, res) => {
  let dataLogin = {
    email: req.body.email,
    password: md5(req.body.password),
  };

  let dataadmin = await admin.findOne({ where: dataLogin });

  if (dataadmin) {
    let payLoad = JSON.stringify(dataadmin);
    let token = jwt.sign(payLoad, secret);

    return res.json({
      success: true,
      logged: true,
      message: "Authenticate Success",
      token: token,
      data: dataadmin,
    });
  }
  return res.json({
    success: false,
    logged: false,
    message: "Authenticate failed. Invalid email or Password",
  });
};

const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    let verifiedadmin = jwt.verify(token, secret);
    if (!verifiedadmin) {
      return res.json({
        success: false,
        auth: false,
        message: "admin Unauthorized",
      });
    }

    req.admin = verifiedadmin;
    next();
  } else {
    return res.json({
      success: false,
      auth: false,
      message: "admin Unauthorized",
    });
  }
};

module.exports = {
  authenticate,
  authorize
};
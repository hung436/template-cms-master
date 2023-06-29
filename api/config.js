const jwt = require('jsonwebtoken');
const storage = require('node-sessionstorage')
const config = {
  authSecret: 'eo]|R{W|~OA}z(;lLmcFPHl+h)pkc0',
  publickey : `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArtFHqu1mmHa8q0o53oUT
  5z7XHZPWG6qUc//qtwabCizRObewJeNZI5o8BGZzJ6NaEWfppe8woAD7u1mA9Z7c
  X1N385ntKHbgVebJIWa6p4LBFTWXPJ13OtqyQH1E+uCoKe5tzNgBaaE5eGulpo2p
  azfozhLnhriKFwbDEdloSyA5fWjb1hrS0TQPBpbAgVZrXTEFP2z3o/P8Dzx3rR2a
  Sv+AP4wV50ERZwfjQtbkjuIv5JIj+rY1zqCJkONLCJK+vp+Rd0cfOL/Pidm6In8k
  PMmgPQSc0TXbJtm+EwcWIXDT1IdWNFkQIG/+Z/LYaOcueKBkzZXP4fbc3qTuVwdU
  qwIDAQAB
  -----END PUBLIC KEY-----`
}

module.exports = config

// check if user logged in
module.exports.isAuthenticated = function (req, res, next) {
  let token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function (err, decoded) {
      if (err) {
        return res.status(401).json({message: 'unauthorized'})
      } else {
        return next();
      }
    });
  } else {
    return res.status(401).json({message: 'unauthorized'})
  }
}

const jwt = require('jsonwebtoken');

function GenerateToken(user) {
  return jwt.sign({
    data: user
  }, process.env.SECRET_JWT, { expiresIn: 60 * 60 * 24 * 15});
}


module.exports = GenerateToken;

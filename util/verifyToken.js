const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    (err, decodedUserToken) => {
      if (err) {
        return false;
      } else {
        return decodedUserToken;
      }
    }
  );
};

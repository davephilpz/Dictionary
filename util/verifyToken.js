const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    (err, decodedUserToken) => {
      if (err) {
        return "Token has expired or is invalid.";
      } else {
        return decodedUserToken;
      }
    }
  );
};

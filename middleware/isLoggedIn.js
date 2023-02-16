const { getTokenFromHeader } = require("../util/getTokenFromHeader");
const { verifyToken } = require("../util/verifyToken");

exports.isLoggedIn = (req, res, next) => {
  //retrieve token
  const token = getTokenFromHeader(req);
  console.log("token from header in logged in middleware:", token);

  //verify token
  const verifiedUserToken = verifyToken(token);
  console.log("verified token in logged in middleware:", verifiedUserToken);

  //check to see if token was returned from verification
  if (!verifiedUserToken) {
    return res.status(401).render("401", {
      pageTitle: "Unauthorized",
      contentTitle: "You are not authorized to view this content",
      message: "Token is invalid or has expired. Please login again.",
      session: "",
    });
  } else {
    //save user into req object
    req.userAuthId = verifiedUserToken?.id;
    console.log("req user auth id set::::::::", req.userAuthId);
    next();
  }
};

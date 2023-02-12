exports.getTokenFromHeader = (req) => {
  //get token from header
  // const token = req?.headers?.authorization?.split(" ")[1];
  const token = req.cookies.jwt;

  console.log("get token from header:", token);
  if (token === undefined) {
    return "No token found";
  } else {
    return token;
  }
};

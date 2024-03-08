const jwt = require("jsonwebtoken");
const generateError = require("./generateError");

module.exports = isAuth = (req, res, next) => {
  try {
    // const authToken = req.cookies.authToken;
    const bearer = req.get("Authorization");
    if (!bearer) generateError("Not authorized", 401);
    const authToken = bearer.split(" ")[1];
    const isMatch = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    if (!isMatch) generateError("Not authorized", 401);
    req.userId = isMatch.userId;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

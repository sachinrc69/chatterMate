const jwt = require("jsonwebtoken");

module.exports = generateWebToken = (userId, res) => {
  try {
    data = { userId: userId };
    authToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    res.cookie("authToken", authToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
  } catch (error) {
    next(error);
  }
  return authToken;
  //   res.status(200).json({ message: "cookie set success" });
};

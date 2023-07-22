import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export default validateToken;

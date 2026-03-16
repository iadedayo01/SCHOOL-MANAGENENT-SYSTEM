import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const messageTemplate =
    process.env.NODE_ENV === "development" ? "Token not found" : "Unauthorized";

  try {
    // Extract token from Authorization Header
    const token = req.headers.authorization?.split(" ")[1];

    // Confirm token is sent by client
    if (!token) {
      return res.status(401).json({
        message: messageTemplate,
      });
    }

    // verify and decode the token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token",decodeToken)

    const user = decodeToken.user;

    // Attach user information to the request object for further use
    req.user = user


    next()

  } catch (error) {

    console.log(error);

    return res.status(500).json({
        message: "Something went wrong"
    })
  }
};

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Unauthorized - Token does not exist"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return next(new Error("Unauthorized - Token is invalid or expired"));
    }

    const user = await User.findById(decoded.userId).select("-hashedPassword");
    if (!user) {
      return next(new Error("User not exist"));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.error("ERROR when verify JWT in socketMiddleware", error);
    next(new Error("Unauthorized"));
  }
};

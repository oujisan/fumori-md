import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const PASSWORD_HASH = process.env.PASSWORD_HASH || "";

export const checkPassword = async (req: Request, res: Response, next: NextFunction) => {
  const password = req.headers["x-password"] as string;

  if (!password) {
    return res.status(401).json({ error: "Password required" });
  }

  const isMatch = await bcrypt.compare(password, PASSWORD_HASH);
  
  if (!isMatch) {
    return res.status(403).json({ error: "Invalid password" });
  }

  next();
};

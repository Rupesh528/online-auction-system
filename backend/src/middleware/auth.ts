import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

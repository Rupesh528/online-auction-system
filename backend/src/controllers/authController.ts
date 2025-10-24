import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ msg: "User already exists" });

		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, password: hashed });
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
			expiresIn: "1d",
		});
		res.json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

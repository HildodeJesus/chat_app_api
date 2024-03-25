import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createCustomApiError } from "../error/CustomError";
import User from "../entities/User";

export default function auth(req: Request, res: Response, next: NextFunction) {
	try {
		const authorization = req.headers["authorization"];

		if (authorization == undefined)
			throw createCustomApiError("Autorização negada", 401);

		const token = authorization?.split(" ")[1];
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		req.user.id = payload.id;
		req.user.name = payload.name;
		req.user.phone = payload.phone;

		next();
	} catch (error) {
		next(error);
	}
}

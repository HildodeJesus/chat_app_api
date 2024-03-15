import { NextFunction, Request, Response } from "express";
import User from "../entities/User";
import UserRepo from "../repositories/UserRepo";

export default class UserController {
	async loginInAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const { phone, name } = req.body;

			const userRepo = new UserRepo();

			const userExists = await userRepo.getUserByPhone(phone);

			if (userExists == null) {
				const newUser = new User({ phone, name });
				await userRepo.store(newUser);

				return res.status(200).json({ id: newUser.id, phone, name });
			}

			return res.status(200).json();
		} catch (error) {
			next(error);
		}
	}
}

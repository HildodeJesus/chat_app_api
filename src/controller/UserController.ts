import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import UserRepo from "../repositories/UserRepo";
import User from "../entities/User";
import generateRandomNumber from "../utils/generateRandomNumber";
import ValidationCodeOfUserRepo from "../repositories/ValidationCodeOfUserRepo";
import { createCustomApiError } from "../error/CustomError";
import IagenteMail from "../service/IagenteMail";

export default class UserController {
	async loginInAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const { phone } = req.body;
			const userRepo = new UserRepo();

			let user;
			user = await userRepo.getUserByPhone(phone);

			if (user == null) {
				user = new User(phone);
				await userRepo.store(user);
			}

			await new IagenteMail({
				sendMethod: "envio",
				toPhone: phone,
				message: `Seu código de validação: ${generateRandomNumber()}`,
			}).sendSMS();

			const payload = {
				id: user.id,
				name: user.name,
				phone: user.phone,
			};

			return res
				.status(200)
				.json({ token: jwt.sign(payload, process.env.JWT_SECRET as string) });
		} catch (error) {
			next(error);
		}
	}

	async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const phone = req.params["phone"];

			const userRepo = new UserRepo();
			const user = await userRepo.getUserByPhone(phone);

			return res.status(200).json({
				id: user.id,
				name: user.name,
				phone: user.phone,
			});
		} catch (error) {
			next(error);
		}
	}

	async validateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { code } = req.body;

			const validationCodeOfUserRepo = new ValidationCodeOfUserRepo();

			const validationCode = await validationCodeOfUserRepo.getCodeByPhone(
				req.user.phone
			);

			if (validationCode == null || validationCode.expire < Date.now())
				throw createCustomApiError(
					"Error na validação do número! Tente novamente!",
					500
				);

			if (validationCode.code !== code)
				throw createCustomApiError("Código errado!", 403);

			return res.status(201);
		} catch (error) {
			next(error);
		}
	}
}

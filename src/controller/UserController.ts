import { NextFunction, Request, Response } from "express";

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

			const code = generateRandomNumber();

			const userRepo = new UserRepo();

			const userExists = await userRepo.getUserByPhone(phone);
			if (userExists == null) {
				const newUser = new User(phone);
				await userRepo.store(newUser);
			}

			new IagenteMail({
				sendMethod: "envio",
				toPhone: phone,
				message: `Seu código de validação: ${code}`,
			});

			return res.status(201);
		} catch (error) {
			next(error);
		}
	}

	async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { phone } = req.body;

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
			const { code, phone } = req.body;

			const validationCodeOfUserRepo = new ValidationCodeOfUserRepo();

			const validationCode = await validationCodeOfUserRepo.getCodeByPhone(
				phone
			);

			if (validationCode == null || validationCode.expire < Date.now())
				throw createCustomApiError(
					"Error na validação do número! Tente novamente!",
					500
				);

			if (validationCode.code !== code)
				throw createCustomApiError("Código errado!", 400);

			return res.status(201);
		} catch (error) {
			next(error);
		}
	}
}

import validator from "validator";
import DB from "../database";
import User from "../entities/User";
import { createCustomApiError } from "../error/CustomError";

export default class UserRepo {
	async store(user: User) {
		this.validate(user);
		await DB.table("users").insert(user);
		return;
	}
	async getUserByPhone(phone: string) {
		const users: User[] = await DB.table("users")
			.select()
			.where({ phone: phone });

		return users[0];
	}

	validate(user: User) {
		if (validator.isEmpty(user.name))
			throw createCustomApiError("Nome não informado", 400);
		if (validator.isMobilePhone(user.phone, "pt-BR"))
			throw createCustomApiError("Telefone inválido", 400);
	}
}

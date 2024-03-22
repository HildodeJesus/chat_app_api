import DB from "../database";
import ValidationCode from "../entities/ValidationCode";

export default class ValidationCodeOfUSerRepo {
	async store(phoneAndCode: ValidationCode) {
		await DB.table("validations_codes").insert(phoneAndCode);
		return;
	}

	async getCodeByPhone(phone: string) {
		const users: ValidationCode[] = await DB.table("validations_codes")
			.select()
			.where({ phone: phone });

		return users[0];
	}
}

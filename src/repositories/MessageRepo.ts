import validator from "validator";
import DB from "../database";
import Message from "../entities/Message";
import { createCustomApiError } from "../error/CustomError";

export default class MessageRepo {
	async store(message: Message) {
		this.validate(message);

		await DB.table("messages").insert(message);

		return;
	}
	async delete(id: string) {
		await DB.table("messages").delete().where({ id: id });

		return;
	}
	async getAll(userId1: string, userId2: string) {
		const messages1 = await DB.table("messages").where({
			from: userId1,
			to: userId2,
		});

		const messages2 = await DB.table("messages").where({
			from: userId2,
			to: userId1,
		});

		const handledMessages = [...messages1, ...messages2].sort((a, b) => {
			if (a.created_at < b.created_at) return 1;
			else if (a.created_at > b.created_at) return -1;
			else return 0;
		});

		return handledMessages;
	}

	validate(message: Message) {
		if (validator.isEmpty(message.from))
			throw createCustomApiError("Destinatário não informado", 400);
		if (validator.isEmpty(message.to))
			throw createCustomApiError("Destinatário não informado", 400);
		if (validator.isEmpty(message.content))
			throw createCustomApiError("Destinatário não informado", 400);
	}
}

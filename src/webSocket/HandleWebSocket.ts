import { Socket } from "socket.io";

import Message from "../entities/Message";
import MessageRepo from "../repositories/MessageRepo";
import UserRepo from "../repositories/UserRepo";

export default class HandleWebSocket {
	private messageRepo: MessageRepo;
	private userRepo: UserRepo;
	private socket: Socket;

	constructor(socket: Socket) {
		this.messageRepo = new MessageRepo();
		this.userRepo = new UserRepo();
		this.socket = socket;
	}

	async newMessage() {
		this.socket.on(
			"new message",
			async (message: Omit<Message, "id" | "created_at">) => {
				const newMessage = new Message(message);

				const userExists = await this.userRepo.getUserByPhone(message.to);

				if (userExists == null)
					return this.socket.emit(
						`error:${message.from}`,
						"Número não existe no nosso chat"
					);

				await this.messageRepo.store(newMessage);
				this.socket.emit(message.to, message.content);
				return;
			}
		);

		return;
	}

	async handleDisconnect() {
		this.socket.on("disconnect", () => {
			console.log(`User ${this.socket.id} disconnected`);
		});

		return;
	}
}

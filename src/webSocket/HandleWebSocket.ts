import { Socket } from "socket.io";

import Message from "../entities/Message";
import MessageRepo from "../repositories/MessageRepo";
import UserRepo from "../repositories/UserRepo";
import { Server as HttpServer } from "node:http";
import { Server } from "socket.io";

export default class HandleWebSocket {
	private messageRepo: MessageRepo;
	private userRepo: UserRepo;
	private io: Server;

	constructor(httpServer: HttpServer) {
		this.messageRepo = new MessageRepo();
		this.userRepo = new UserRepo();
		this.io = new Server(httpServer);

		this.start();
	}

	start() {
		this.io.on("connection", socket => {
			console.log(`User ${socket.id} connected`);

			this.handleDisconnect(socket);
			this.newMessage(socket);
		});
	}

	async newMessage(socket: Socket) {
		socket.on(
			"new message",
			async (message: Omit<Message, "id" | "created_at">) => {
				const newMessage = new Message(message);

				const userExists = await this.userRepo.getUserByPhone(message.to);

				if (userExists == null)
					return socket.emit(
						`error:${message.from}`,
						"Número não existe no nosso chat"
					);

				await this.messageRepo.store(newMessage);
				socket.emit(message.to, message.content);
				return;
			}
		);

		return;
	}

	async handleDisconnect(socket: Socket) {
		socket.on("disconnect", () => {
			console.log(`User ${socket.id} disconnected`);
		});

		return;
	}
}

import "dotenv/config";

import express, { Express } from "express";
import { createServer, Server as HttpServer } from "node:http";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";
import HandleWebSocket from "./webSocket/HandleWebSocket";

class App {
	app: Express;
	httpServer: HttpServer;

	constructor() {
		this.app = express();
		this.httpServer = createServer(this.app);
		this.middlewares();
		this.routes();
		this.webSocket();
	}

	middlewares() {
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(helmet());
	}

	routes() {}

	webSocket() {
		const io = new Server(this.httpServer);

		io.on("connection", socket => {
			console.log(`User ${socket.id} connected`);
			const handleWebSocket = new HandleWebSocket(socket);
			handleWebSocket.handleDisconnect();
			handleWebSocket.newMessage();
		});
	}
}

export default new App().httpServer;

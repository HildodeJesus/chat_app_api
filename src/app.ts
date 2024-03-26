import "dotenv/config";

import express, { Express } from "express";
import { createServer, Server as HttpServer } from "node:http";
import cors from "cors";
import helmet from "helmet";

import HandleWebSocket from "./webSocket/HandleWebSocket";
import userRouter from "./routes/userRoutes";

class App {
	app: Express;
	httpServer: HttpServer;

	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
		new HandleWebSocket(createServer(this.app)).start();
	}

	middlewares() {
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(helmet());
	}

	routes() {
		this.app.use("/api/user", userRouter);
	}
}

export default new App().httpServer;

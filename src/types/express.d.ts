import User from "../entities/User";

declare module "express" {
	export interface Request {
		user: Omit<User, "created_at" | "updated_at">;
	}
}

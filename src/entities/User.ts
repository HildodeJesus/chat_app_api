import { v4 } from "uuid";

export default class User {
	public id: string;
	public name: string;
	public phone: string;
	public created_at: Date;
	public updated_at: Date;

	constructor(props: Omit<User, "id" | "created_at" | "updated_at">) {
		this.id = v4();
		this.name = props.name;
		this.phone = props.phone;
		this.created_at = new Date();
		this.updated_at = new Date();
	}
}

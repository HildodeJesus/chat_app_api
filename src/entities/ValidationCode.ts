import { v4 } from "uuid";

export default class ValidationCode {
	public id: string;
	public code: string;
	public user_phone: string;
	public expire: number;
	public created_at: Date;

	constructor(props: Omit<ValidationCode, "id" | "created_at" | "expire">) {
		this.id = v4();
		this.code = props.code;
		this.user_phone = props.user_phone;
		this.expire = Date.now() + 1000 * 60 * 15;
		this.created_at = new Date();
	}
}

import { v4 } from "uuid";

export default class Message {
	public id: string;
	public from: string;
	public to: string;
	public content: string;
	public created_at: Date;

	constructor(props: Omit<Message, "created_at" | "id">) {
		this.id = v4();
		this.from = props.from;
		this.to = props.to;
		this.content = props.content;
		this.created_at = new Date();
	}
}

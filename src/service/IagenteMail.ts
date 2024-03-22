import axios from "axios";

type IagenteMailConstructorType = Omit<
	IagenteMail,
	"iagentePassword" | "iagenteUrl" | "iagenteUser" | "sendSMS"
>;

export default class IagenteMail {
	private iagenteUser: string;
	private iagentePassword: string;
	private iagenteUrl?: string;
	public sendMethod: "envio" | "lote";
	public toPhone: number;
	public message: string;

	constructor(props: IagenteMailConstructorType) {
		this.iagenteUser = process.env.IAGENTE_USER as string;
		this.iagentePassword = process.env.IAGENTE_PASSWORD as string;
		this.sendMethod = props.sendMethod;
		this.toPhone = props.toPhone;
		this.message = encodeURIComponent(props.message);
		this.configIagentUrl();
	}

	private configIagentUrl() {
		this.iagenteUrl = `https://api.iagentesms.com.br/webservices/http.php?metodo=${this.sendMethod}&usuario=${this.iagenteUser}&senha=${this.iagentePassword}&celular=${this.toPhone}&mensagem=${this.message}`;

		return;
	}

	async sendSMS() {
		const response = await axios.get(this.iagenteUrl as string);

		console.log(response);
	}
}

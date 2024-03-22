import crypto from "crypto";

export default function generateRandomNumber() {
	var array = new Uint32Array(1);
	crypto.getRandomValues(array);

	return array[0].toString().substring(-4);
}

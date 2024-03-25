import "dotenv/config";

const config = {
	development: {
		client: "mysql",
		connection: {
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
		},

		migrations: {
			extension: "ts",
			directory: "./src/database/migrations",
		},
	},

	production: {
		client: "mysql",
		connection: {
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
		},

		pool: {
			min: 2,
			max: 10,
		},

		migrations: {
			extension: "ts",
			directory: "./src/database/migrations",
		},
	},
};

module.exports = config;

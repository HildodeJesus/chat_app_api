import knex from "knex";

const DB = knex({
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
		directory: "./migrations",
	},
});

export default DB;

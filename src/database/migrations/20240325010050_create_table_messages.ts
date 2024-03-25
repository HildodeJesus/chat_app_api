import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("messages", table => {
		table.string("id").primary();
		table.string("from").notNullable();
		table.string("to").notNullable();
		table.string("content").notNullable();
		table.datetime("created_at").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("messages");
}

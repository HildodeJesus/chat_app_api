import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("users", table => {
		table.string("id").primary();
		table.string("name");
		table.string("phone").notNullable().unique();
		table.datetime("created_at").notNullable();
		table.datetime("updated_at").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("users");
}

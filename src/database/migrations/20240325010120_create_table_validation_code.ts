import type { Knex } from "knex";

// public id: string;
// public code: string;
// public user_phone: string;
// public expire: number;
// public created_at: Date;

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("validations_codes", table => {
		table.string("id").primary();
		table.string("code").notNullable();
		table.string("user_phone").notNullable();
		table.string("expire").notNullable();
		table.datetime("created_at").notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("validations_codes");
}

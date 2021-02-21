exports.up = function (knex) {
	return knex.schema
		.createTable('users', (table) => {
			table.increments('id').primary();
			table.string('username').notNullable().unique();
			table.string('email').notNullable().unique();
			table.string('password').notNullable();
			table.timestamps();
		})
		.createTable('tithes', (table) => {
			table.increments('id').primary();
			table.decimal('amount').notNullable();
			table.dateTime('date').notNullable();
			table.string('description');
			table.integer('userId').unsigned().references('id').inTable('users');
			table.boolean('isPaid');
			table.timestamps();
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users').dropTableIfExists('tithes');
};

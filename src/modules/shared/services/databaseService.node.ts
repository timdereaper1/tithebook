import knex from 'knex';

export function getDBConnection<T>() {
	const connectionURI = `${process.env.DATABASE_URL}`;
	return knex<T>(connectionURI);
}

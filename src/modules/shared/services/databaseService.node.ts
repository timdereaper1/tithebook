import knex from 'knex';
import config from '../../../../knexfile';

export function getDBConnection<T>() {
	const options = config[process.env.NODE_ENV ?? 'development'];
	return knex<T>(options);
}

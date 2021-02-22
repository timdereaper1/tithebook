import bcryptjs from 'bcryptjs';
import { LoginCredentials } from '../../auth/login/@types';
import { SignUpCredentials } from '../../auth/signup/@types';
import { getDBConnection } from '../../shared/services/databaseService.node';
import { createAuthorizationError } from '../../shared/services/errorService';
import type { DBUser } from '../@types';

export async function findUserByEmailAndPassword({ email, password }: LoginCredentials) {
	const knex = getDBConnection<DBUser>();
	const [user] = await knex('users')
		.select('email', 'id', 'password', 'username')
		.where('email', email);
	if (!user) throw createAuthorizationError('User does not exist');
	const matches = await bcryptjs.compare(password, user.password);
	if (!matches) throw createAuthorizationError('User does not exist');
	const { password: notNeededPassword, ...other } = user;
	return other;
}

export async function createNewUser(args: SignUpCredentials) {
	const knex = getDBConnection();
	return knex.transaction(async (transaction) => {
		const [id] = await transaction<DBUser>('users').insert(args);
		const [user] = await transaction<DBUser>('users')
			.select('username', 'email', 'id')
			.where('id', id);
		return user;
	});
}

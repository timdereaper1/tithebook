import type { NextApiRequest, NextApiResponse } from 'next';
import type { LoginCredentials } from '../../../modules/auth/login/@types';
import { AuthenticatedUser } from '../../../modules/shared/@types';
import { createSignedToken } from '../../../modules/shared/services/authService.node';
import { wrapRoute } from '../../../modules/shared/services/middlewareService.node';
import { findUserByEmailAndPassword } from '../../../modules/users/services/dbService.node';

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
	const credentials: LoginCredentials = req.body.data;
	const user = await findUserByEmailAndPassword(credentials);
	const token = createSignedToken(user);
	const { id, ...other } = user;
	const data: AuthenticatedUser = { token, ...other };
	res.status(201).json({ data });
}

export default wrapRoute(loginHandler, 'POST', { authorized: false });

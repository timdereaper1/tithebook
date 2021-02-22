import bcryptjs from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { SignUpCredentials } from '../../../modules/auth/signup/@types';
import { AuthenticatedUser } from '../../../modules/shared/@types';
import { createSignedToken } from '../../../modules/shared/services/authService.node';
import { wrapRoute } from '../../../modules/shared/services/middlewareService.node';
import { createNewUser } from '../../../modules/users/services/dbService.node';

async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
	const credentials: SignUpCredentials = req.body.data;
	const HASH_SALT = 10;
	const newUser = await createNewUser({
		...credentials,
		password: await bcryptjs.hash(credentials.password, HASH_SALT)
	});
	const token = createSignedToken(newUser);
	const { id, ...other } = newUser;
	const data: AuthenticatedUser = { ...other, token };
	res.status(201).json({ data });
}

export default wrapRoute(signUpHandler, 'POST', { authorized: false });

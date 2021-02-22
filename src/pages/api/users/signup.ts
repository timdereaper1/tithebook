import bcryptjs from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { SignUpCredentials } from '../../../modules/auth/signup/@types';
import { createSignedToken } from '../../../modules/shared/services/authService.node';
import { wrapRoute } from '../../../modules/shared/services/middlewareService.node';
import { createNewUser } from '../../../modules/users/services/dbService.node';

async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
	const credentials: SignUpCredentials = req.body.data;
	const password = bcryptjs.hashSync(credentials.password, 10);
	console.log(password);
	const newUser = await createNewUser({ ...credentials, password });
	console.log(newUser);
	const token = createSignedToken(newUser);
	console.log(token);
	const { id, ...other } = newUser;
	res.status(201).json({ data: { ...other, token } });
}

export default wrapRoute(signUpHandler, 'POST', { authorized: false });

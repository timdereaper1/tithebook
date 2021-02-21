import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { DBUser } from '../../users/@types';
import { STATUS } from '../errors';
import { decodeSignedToken } from './authService.node';
import { createAuthorizationError } from './errorService';

type AuthorizedUser = Pick<DBUser, 'email' | 'id' | 'username'>;
export type AuthorizedRequest = NextApiRequest & { user: AuthorizedUser };

type RouteHandler = (req: AuthorizedRequest, res: NextApiResponse) => Promise<void>;
type RouteMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RouteOptions {
	authorized?: boolean;
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: (req: any, res: any, next: (err?: any) => void) => any
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) return reject(result);
			return resolve(result);
		});
	});
}

export function wrapRoute(
	handler: RouteHandler,
	methods: RouteMethod | RouteMethod[] = 'GET',
	options: RouteOptions = { authorized: true }
) {
	const cors = Cors({ methods });
	return async function (req: AuthorizedRequest, res: NextApiResponse) {
		try {
			await runMiddleware(req, res, cors);
			if (options?.authorized) {
				req.user = verifyRequestAuthorization(req.headers.authorization);
			}
			await handler(req, res);
		} catch (error) {
			const statusCode = error.status ?? STATUS.SERVER_ERROR;
			console.error(error);
			res.status(statusCode).json({ data: error.message });
		}
	};
}

function verifyRequestAuthorization(authorization?: string) {
	if (!authorization) throw createAuthorizationError();
	const [, token] = authorization.split(' ');
	const user = decodeSignedToken<AuthorizedUser>(token);
	if (!user) throw createAuthorizationError();
	return user;
}

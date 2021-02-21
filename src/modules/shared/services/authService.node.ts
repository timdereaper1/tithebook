import jwt from 'jsonwebtoken';

export function createSignedToken<T>(args: T) {
	const secretKey = `${process.env.SECRET_KEY}`;
	return jwt.sign(JSON.parse(JSON.stringify(args)), secretKey);
}

export function decodeSignedToken<T = unknown>(token: string): T | null {
	try {
		const data: any = jwt.decode(token);
		return data ?? null;
	} catch (error) {
		return null;
	}
}

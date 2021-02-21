import type { AxiosError } from 'axios';
import { ERRORS, STATUS } from '../errors';

export function processErrorResponse(error: AxiosError) {
	// verify that the error is an axios error, if not
	// set the error status to unknown
	let status: number = error.isAxiosError ? error.request.status : STATUS.UNKNOWN;

	// check if the error message is a network failed message,
	// then set the status to network
	if (error.message.indexOf('Network Failed') !== -1) status = STATUS.NETWORK;

	// construct the error message from the status code, if the message does not
	// exist, the show the default error message
	const message = ERRORS[status] ?? error.message;

	console.error(message);

	return { error: status };
}

export function createBadRequestError(message = ERRORS[STATUS.BAD_REQUEST]) {
	return {
		status: STATUS.BAD_REQUEST,
		message
	};
}

export function createAuthorizationError(message = ERRORS[STATUS.FORBIDDEN]) {
	return {
		status: STATUS.FORBIDDEN,
		message
	};
}

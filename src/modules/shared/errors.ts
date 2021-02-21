export const STATUS = {
	UNKNOWN: 777,
	NETWORK: 999,
	BAD_REQUEST: 400,
	SERVER_ERROR: 500,
	FORBIDDEN: 403
};

export const ERRORS = {
	[STATUS.NETWORK]: 'Sorry there is a network issue. Please try again',
	[STATUS.UNKNOWN]: 'Sorry an unknown issue has occurred. We are looking into it',
	[STATUS.BAD_REQUEST]: 'Invalid request',
	[STATUS.SERVER_ERROR]:
		'Sorry an error has occurred on our end. Relax, we are currently looking into it.',
	[STATUS.FORBIDDEN]: "Sorry you don't have the privileges to access the request"
};

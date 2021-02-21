import * as yup from 'yup';

export const SIGN_UP_SCHEMA = yup.object().shape({
	username: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required()
});

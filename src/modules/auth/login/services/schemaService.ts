import * as yup from 'yup';

export const LOGIN_SCHEMA = yup.object().shape({
	email: yup.string().required(),
	password: yup.string().required()
});

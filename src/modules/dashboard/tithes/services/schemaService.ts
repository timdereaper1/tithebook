import * as yup from 'yup';

export const TITHE_SCHEMA = yup.object().shape({
	amount: yup.number().moreThan(0).required(),
	date: yup.string().required(),
	description: yup.string().nullable()
});

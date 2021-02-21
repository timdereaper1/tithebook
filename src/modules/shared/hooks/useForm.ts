import { FormikConfig, getIn, useFormik } from 'formik';

function useForm<T>(config: FormikConfig<T>) {
	const formik = useFormik(config);

	function getError(key: string) {
		const touched = getIn(formik.touched, key);
		const error = getIn(formik.errors, key);
		return touched && error ? error : undefined;
	}

	return { ...formik, getError };
}

export default useForm;

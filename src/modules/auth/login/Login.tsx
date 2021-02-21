import { useRouter } from 'next/router';
import { Button, Container, Form } from 'semantic-ui-react';
import useAuth from '../../shared/hooks/useAuth';
import useForm from '../../shared/hooks/useForm';
import type { LoginCredentials } from './@types';
import { authenticateAndLogin } from './services/loginService';
import { LOGIN_SCHEMA } from './services/schemaService';

function Login() {
	const { setUser } = useAuth();
	const { push } = useRouter();
	const form = useForm<LoginCredentials>({
		initialValues: { email: '', password: '' },
		onSubmit,
		validationSchema: LOGIN_SCHEMA,
		validateOnMount: true,
		validateOnChange: false
	});

	async function onSubmit(values: LoginCredentials) {
		form.setSubmitting(true);
		const response = await authenticateAndLogin(values);
		form.setSubmitting(false);
		if (response.data) {
			setUser(response.data);
			push('/tithes');
		}
	}

	return (
		<Container>
			<Form onSubmit={form.handleSubmit} loading={form.isSubmitting}>
				<Form.Input
					type="email"
					required
					onChange={form.handleChange}
					name="email"
					label="Email"
					placeholder="user@gmail.com"
					onBlur={form.handleBlur}
					error={form.getError('email')}
					value={form.values.email}
				/>
				<Form.Input
					type="password"
					required
					label="Password"
					placeholder="password"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					name="password"
					error={form.getError('password')}
					value={form.values.password}
				/>
				<Form.Field>
					<Button
						content="Login"
						disabled={!form.isValid}
						type="submit"
						loading={form.isSubmitting}
					/>
				</Form.Field>
			</Form>
		</Container>
	);
}

export default Login;

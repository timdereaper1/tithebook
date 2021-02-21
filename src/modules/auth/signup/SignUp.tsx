import { useRouter } from 'next/router';
import { Button, Container, Form } from 'semantic-ui-react';
import useAuth from '../../shared/hooks/useAuth';
import useForm from '../../shared/hooks/useForm';
import type { SignUpCredentials } from './@types';
import { SIGN_UP_SCHEMA } from './services/schemaService';
import { createAndAuthenticateUser } from './services/signUpService';

function SignUp() {
	const { setUser } = useAuth();
	const { push } = useRouter();
	const form = useForm<SignUpCredentials>({
		initialValues: {
			email: '',
			password: '',
			username: ''
		},
		onSubmit,
		validateOnMount: true,
		validationSchema: SIGN_UP_SCHEMA,
		validateOnChange: false
	});

	async function onSubmit(values: SignUpCredentials) {
		form.setSubmitting(true);
		const response = await createAndAuthenticateUser(values);
		form.setSubmitting(false);
		if (response.data) {
			setUser(response.data);
			push('/tithes');
		}
	}

	return (
		<Container>
			<Form onSubmit={form.handleSubmit}>
				<Form.Input
					name="username"
					label="Username"
					placeholder="username"
					required
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.getError('username')}
					value={form.values.username}
				/>
				<Form.Input
					name="email"
					label="Email"
					placeholder="user@gmail.com"
					required
					type="email"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.getError('email')}
					value={form.values.email}
				/>
				<Form.Input
					name="password"
					label="Password"
					placeholder="password"
					required
					type="password"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					error={form.getError('password')}
					value={form.values.password}
				/>
				<Form.Field>
					<Button
						content="Sign Up"
						disabled={!form.isValid}
						loading={form.isSubmitting}
						type="submit"
					/>
				</Form.Field>
			</Form>
		</Container>
	);
}

export default SignUp;

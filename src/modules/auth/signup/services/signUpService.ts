import type { AuthenticatedUser } from '../../../shared/@types';
import { apiPost } from '../../../shared/services/apiService';
import type { SignUpCredentials } from '../@types';

export function createAndAuthenticateUser(args: SignUpCredentials) {
	return apiPost<AuthenticatedUser>('/api/users/signup', args, {
		tokenRequired: false,
		returnExpectedData: true
	});
}

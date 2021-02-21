import type { AuthenticatedUser } from '../../../shared/@types';
import { apiPost } from '../../../shared/services/apiService';
import type { LoginCredentials } from '../@types';

export function authenticateAndLogin(args: LoginCredentials) {
	return apiPost<AuthenticatedUser>('/api/users/login', args, {
		tokenRequired: false,
		returnExpectedData: true
	});
}

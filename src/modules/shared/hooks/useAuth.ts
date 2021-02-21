import { useEffect, useState } from 'react';
import type { AuthenticatedUser } from '../@types';
import { getStoredAuthUser, setToken } from '../services/authService.web';
import { setItemInLocalStorage } from '../services/storageService.web';

function useAuth() {
	const [user, setUser] = useState<AuthenticatedUser | null>(null);
	const [loading, setLoading] = useState(false);

	const [isAuthenticated, setAuthentication] = useState<boolean | null>(null);

	useEffect(() => {
		setLoading(true);
		const authUser = getStoredAuthUser();
		setUser(authUser);
		setAuthentication(Boolean(authUser));
		setLoading(false);
	}, []);

	function storeAndSetAuthUser(authUser: AuthenticatedUser | null) {
		if (!authUser) {
			setAuthentication(false);
			return;
		}
		setToken(authUser.token);
		setItemInLocalStorage('@storage/auth-user', authUser);
		setUser(authUser);
		setAuthentication(true);
	}

	return {
		user,
		setUser: storeAndSetAuthUser,
		loading,
		isAuthenticated
	};
}

export default useAuth;

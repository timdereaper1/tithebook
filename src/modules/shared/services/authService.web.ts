import { AuthenticatedUser } from '../@types';
import { getItemInLocalStorage, setItemInLocalStorage } from './storageService.web';

export function getToken() {
	return getItemInLocalStorage<string>('@storage/auth-token', false);
}

export function getStoredAuthUser() {
	return getItemInLocalStorage<AuthenticatedUser>('@storage/auth-user');
}

export function setToken(token: string) {
	setItemInLocalStorage('@storage/auth-token', token);
}

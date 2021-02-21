import axios from 'axios';
import { getToken } from './authService.web';
import { processErrorResponse } from './errorService';

interface ApiOptions {
	tokenRequired?: boolean;
	returnExpectedData?: boolean;
}

interface ApiResponse<T> {
	data?: T;
	success?: boolean;
	error?: number;
}

export function getSecureAxios(tokenRequired = true) {
	function instance(authToken: string) {
		return axios.create({
			headers: { authorization: `Bearer ${authToken}` }
		});
	}
	const token = getToken();
	if (tokenRequired && !token) {
		throw new Error(
			`Sorry, you were attempting to access a secure api connection. 
            Please ensure that you have logged in before accessing this route`
		);
	}
	return instance(token ?? '');
}

export async function apiPost<T>(
	url: string,
	args: unknown,
	options?: ApiOptions
): Promise<ApiResponse<T>> {
	try {
		const axiosInstance = getSecureAxios(options?.tokenRequired);
		const { data } = await axiosInstance.post(url, { data: args });
		if (options?.returnExpectedData) {
			return { success: true, data: data.data };
		}
		return { success: true };
	} catch (error) {
		return processErrorResponse(error);
	}
}

export async function apiGet<T>(url: string, options?: ApiOptions): Promise<ApiResponse<T>> {
	try {
		const axiosInstance = getSecureAxios(options?.tokenRequired);
		const { data } = await axiosInstance.get(url);
		return { success: true, data: data.data };
	} catch (error) {
		return processErrorResponse(error);
	}
}

export async function apiPut<T>(
	url: string,
	args: unknown,
	options?: ApiOptions
): Promise<ApiResponse<T>> {
	try {
		const axiosInstance = getSecureAxios(options?.tokenRequired);
		const { data } = await axiosInstance.put(url, { data: args });
		if (options?.returnExpectedData) {
			return { success: true, data: data.data };
		}
		return { success: true };
	} catch (error) {
		return processErrorResponse(error);
	}
}

export async function apiDelete<T>(url: string, options?: ApiOptions): Promise<ApiResponse<T>> {
	try {
		const axiosInstance = getSecureAxios(options?.tokenRequired);
		await axiosInstance.delete(url);
		return { success: true };
	} catch (error) {
		return processErrorResponse(error);
	}
}

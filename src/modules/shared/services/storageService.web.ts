export function setItemInLocalStorage<T>(key: string, data: T) {
	if (!window) return;
	const dataToStore = typeof data === 'string' ? data : JSON.stringify(data);
	window.localStorage.setItem(key, dataToStore);
}

export function getItemInLocalStorage<T>(key: string, decode = true): T | null {
	if (!window) return null;
	try {
		const encodedData = window.localStorage.getItem(key);
		return decode ? (encodedData ? JSON.parse(encodedData) : null) : encodedData;
	} catch (error) {
		return null;
	}
}

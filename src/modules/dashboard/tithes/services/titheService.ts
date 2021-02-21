import { apiDelete, apiGet, apiPost, apiPut } from '../../../shared/services/apiService';
import type { AddTithe, Tithe } from '../@types';

export function saveTithe(tithe: AddTithe, id?: number) {
	if (id) return updateTithe(tithe, id);
	return addTithe(tithe);
}

export function addTithe(tithe: AddTithe) {
	return apiPost('/api/tithes', tithe);
}

export function getTithes() {
	return apiGet<Tithe[]>('/api/tithes');
}

export function updateTithe(tithe: AddTithe, id: number) {
	return apiPut(`/api/tithes?id=${id}`, tithe);
}

export function removeTithe(id: number) {
	return apiDelete(`/api/tithes?id=${id}`);
}

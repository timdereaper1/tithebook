import type { AddTithe, DBTithe, Tithe } from '../@types';

export function getTitheFormInitialValues(tithe: Tithe | null): AddTithe {
	return {
		amount: tithe?.amount ?? 0,
		date: tithe?.date ?? '',
		description: tithe?.description,
		isPaid: tithe?.isPaid ?? true
	};
}

export function formatDate(args: string) {
	if (!args) return '';
	const date = new Date(args);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate();
	return `${year}-${month}-${day}`;
}

export function formatTitheEntryForDB(tithe: Partial<DBTithe>) {
	const value = { ...tithe, isPaid: Boolean(tithe.isPaid) };
	if (value.date) value.date = formatDate(value.date);
	return value;
}

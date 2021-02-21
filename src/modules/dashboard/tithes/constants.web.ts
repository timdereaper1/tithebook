import type { TableColumn } from '../../shared/components/GenericTable';
import type { Tithe } from './@types';
import ActionButtons from './ActionButtons';
import PaidLabel from './PaidLabel';

export const TITHE_COLUMNS: TableColumn<Tithe>[] = [
	{
		key: 'amount',
		title: 'Amount (GHS)'
	},
	{
		key: 'date',
		title: 'Date'
	},
	{
		key: 'description',
		title: 'Notes'
	},
	{
		key: 'isPaid',
		title: 'Paid',
		as: PaidLabel
	},
	{
		key: 'id',
		title: '',
		as: ActionButtons
	}
];

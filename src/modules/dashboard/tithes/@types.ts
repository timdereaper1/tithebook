export interface AddTithe {
	amount: number;
	date: string;
	description?: string | null;
	isPaid: boolean;
}

export interface DBTithe {
	id: number;
	amount: number;
	date: string;
	created_at: string;
	updated_at: string;
	description: string | null;
	userId: number;
	isPaid: boolean;
}

export type Tithe = Omit<DBTithe, 'userId'>;

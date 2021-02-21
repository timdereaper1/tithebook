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
	createdAt: string;
	updatedAt: string;
	description: string | null;
	userId: number;
	isPaid: boolean;
}

export type Tithe = Omit<DBTithe, 'userId'>;

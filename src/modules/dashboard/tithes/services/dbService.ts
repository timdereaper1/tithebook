import { getDBConnection } from '../../../shared/services/databaseService.node';
import type { AddTithe, DBTithe } from '../@types';
import { formatTitheEntryForDB } from './utilities';

export async function createNewTitheEntry(data: AddTithe, userId: number) {
	const knex = getDBConnection();
	const newTitheEntry = formatTitheEntryForDB({ ...data, userId });
	return knex<DBTithe>('tithes').insert(newTitheEntry);
}

export async function findTitheEntriesForUser(userId: number) {
	const knex = getDBConnection();
	const tithes = await knex<DBTithe>('tithes')
		.select('id', 'description', 'date', 'createdAt', 'updatedAt', 'amount', 'isPaid')
		.where('userId', userId)
		.orderBy('createdAt', 'desc');
	return tithes.map(formatTitheEntryForDB);
}

export async function findAndUpdateTitheEntryForUser(data: AddTithe, id: number, userId: number) {
	const knex = getDBConnection();
	const titheToUpdate = formatTitheEntryForDB(data);
	return knex<DBTithe>('tithes').update(titheToUpdate).where('id', id).andWhere('userId', userId);
}

export async function findAndDeleteTitheEntryForUser(id: number, userId: number) {
	const knex = getDBConnection();
	return knex<DBTithe>('tithes').delete().where('id', id).andWhere('userId', userId);
}

import type { NextApiResponse } from 'next';
import type { AddTithe } from '../../modules/dashboard/tithes/@types';
import {
	createNewTitheEntry,
	findAndDeleteTitheEntryForUser,
	findAndUpdateTitheEntryForUser,
	findTitheEntriesForUser
} from '../../modules/dashboard/tithes/services/dbService';
import type { AuthorizedRequest } from '../../modules/shared/services/middlewareService.node';
import { wrapRoute } from '../../modules/shared/services/middlewareService.node';

type Handlers = Record<string, (req: AuthorizedRequest, res: NextApiResponse) => Promise<void>>;

async function addNewTitheEntryHandler(req: AuthorizedRequest, res: NextApiResponse) {
	const titheToAdd: AddTithe = req.body.data;
	await createNewTitheEntry(titheToAdd, req.user.id);
	res.status(201).json({ data: { success: true } });
}

async function getUserTitheEntriesHandler(req: AuthorizedRequest, res: NextApiResponse) {
	const tithes = await findTitheEntriesForUser(req.user.id);
	res.status(200).json({ data: tithes });
}

async function updateTitheEntryHandler(req: AuthorizedRequest, res: NextApiResponse) {
	const tithe: AddTithe = req.body.data;
	const id = parseInt(req.query.id as string);
	await findAndUpdateTitheEntryForUser(tithe, id, req.user.id);
	res.status(200).json({ data: { success: true } });
}

async function deleteTitheEntryHandler(req: AuthorizedRequest, res: NextApiResponse) {
	const id = parseInt(req.query.id as string);
	await findAndDeleteTitheEntryForUser(id, req.user.id);
	res.status(200).json({ data: { success: true } });
}

async function routeController(req: AuthorizedRequest, res: NextApiResponse) {
	const handlers: Handlers = {
		get: getUserTitheEntriesHandler,
		post: addNewTitheEntryHandler,
		put: updateTitheEntryHandler,
		delete: deleteTitheEntryHandler
	};
	const method = req.method?.toLowerCase();
	if (!method || !(method in handlers)) throw new Error('invalid method');
	return handlers[method](req, res);
}

export default wrapRoute(routeController, ['POST', 'GET']);

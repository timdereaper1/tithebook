import { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { emitReload } from '../../shared/services/eventService';
import type { Tithe } from './@types';
import { removeTithe } from './services/titheService';

interface DeleteTitheProps {
	tithe: Tithe | null;
	onClose: () => void;
	active: boolean;
}

function DeleteTithe({ active, onClose, tithe }: DeleteTitheProps) {
	const [loading, setLoading] = useState(false);

	async function handleConfirm() {
		if (!tithe) return;
		setLoading(true);
		const response = await removeTithe(tithe.id);
		setLoading(false);
		if (response.success) {
			emitReload();
			onClose();
		}
	}

	function handleClose() {
		if (loading) return;
		onClose();
	}

	return (
		<Modal open={active} onClose={handleClose}>
			<Modal.Content>Do you want to delete the tithe record?</Modal.Content>
			<Modal.Actions>
				<Button content="No" basic onClick={handleClose} />
				<Button content="Yes" color="red" onClick={handleConfirm} loading={loading} />
			</Modal.Actions>
		</Modal>
	);
}

export default DeleteTithe;

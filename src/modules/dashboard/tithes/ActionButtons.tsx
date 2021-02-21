import { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import type { Tithe } from './@types';
import { TitheContext } from './services/titheContext';

interface ActionButtonsProps {
	item: Tithe;
}

function ActionButtons({ item }: ActionButtonsProps) {
	const { handleDelete, handleEdit } = useContext(TitheContext);

	return (
		<>
			<Button size="mini" content="Edit" onClick={() => handleEdit(item)} />
			<Button content="Delete" size="mini" onClick={() => handleDelete(item)} />
		</>
	);
}

export default ActionButtons;

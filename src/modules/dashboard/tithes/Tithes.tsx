import { useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import GenericTable from '../../shared/components/GenericTable';
import useReload from '../../shared/hooks/useReload';
import { Tithe } from './@types';
import { TITHE_COLUMNS } from './constants.web';
import DeleteTithe from './DeleteTithe';
import { Provider } from './services/titheContext';
import { getTithes } from './services/titheService';
import TitheForm from './TitheForm';

function Tithes() {
	const [modalVisible, setModalVisibility] = useState('none');
	const [tithes, setTithes] = useState<Tithe[] | null>(null);
	const [tithe, setTithe] = useState<Tithe | null>(null);

	useReload(() => {
		async function fetchTithes() {
			const { data } = await getTithes();
			setTithes(data ?? null);
		}
		fetchTithes();
	}, []);

	function handleEdit(tithe: Tithe) {
		setTithe(tithe);
		setModalVisibility('form');
	}

	function handleClose() {
		setModalVisibility('none');
		setTithe(null);
	}

	function handleDelete(tithe: Tithe) {
		setTithe(tithe);
		setModalVisibility('delete');
	}

	function renderContent() {
		if (!tithes) return null;
		return <GenericTable data={tithes} columns={TITHE_COLUMNS} />;
	}

	return (
		<Provider value={{ handleDelete, handleEdit }}>
			<Container>
				<Button content="Add Tithe" onClick={() => setModalVisibility('form')} />
				{renderContent()}
				<TitheForm active={modalVisible === 'form'} tithe={tithe} onClose={handleClose} />
				<DeleteTithe
					active={modalVisible === 'delete'}
					tithe={tithe}
					onClose={handleClose}
				/>
			</Container>
		</Provider>
	);
}

export default Tithes;

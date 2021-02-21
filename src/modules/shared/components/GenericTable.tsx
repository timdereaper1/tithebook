import { Children, ComponentType, memo } from 'react';
import { Table } from 'semantic-ui-react';

export interface TableColumn<T> {
	key: keyof T;
	title: string;
	as?: ComponentType<{ item: T; value: any }>;
}

interface GenericTableProps<T> {
	data: T[];
	columns: TableColumn<any>[];
	onSelect?: (item: any) => void;
}

function GenericTable<T>({ data, columns, onSelect }: GenericTableProps<T>) {
	function renderHeaderCell(column: TableColumn<T>) {
		const { title } = column;
		return <Table.HeaderCell>{title}</Table.HeaderCell>;
	}

	function renderBodyRow(item: T) {
		function renderRowCell(column: TableColumn<T>) {
			const { key, as: Component } = column;

			function renderContent() {
				if (Component) return <Component value={item[key]} item={item} />;
				return item[key];
			}

			return <Table.Cell>{renderContent()}</Table.Cell>;
		}

		function handleClick() {
			if (!onSelect) return;
			onSelect(item);
		}

		return (
			<Table.Row onClick={handleClick}>
				{Children.toArray(columns.map(renderRowCell))}
			</Table.Row>
		);
	}

	return (
		<Table>
			<Table.Header>
				<Table.Row>{Children.toArray(columns.map(renderHeaderCell))}</Table.Row>
			</Table.Header>
			<Table.Body>{Children.toArray(data.map(renderBodyRow))}</Table.Body>
		</Table>
	);
}

export default memo(GenericTable);

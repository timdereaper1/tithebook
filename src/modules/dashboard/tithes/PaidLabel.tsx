import { Label } from 'semantic-ui-react';
import type { Tithe } from './@types';

interface PaidLabelProps {
	item: Tithe;
	value: boolean;
}

function PaidLabel({ value }: PaidLabelProps) {
	return <Label color={value ? 'green' : 'red'}>{value ? 'Paid' : 'Not Paid'}</Label>;
}

export default PaidLabel;

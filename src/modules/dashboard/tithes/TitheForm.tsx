import { FormEvent, useMemo } from 'react';
import { Button, CheckboxProps, Form, Label, Modal } from 'semantic-ui-react';
import useForm from '../../shared/hooks/useForm';
import { emitReload } from '../../shared/services/eventService';
import type { AddTithe, Tithe } from './@types';
import { TITHE_SCHEMA } from './services/schemaService';
import { saveTithe } from './services/titheService';
import { getTitheFormInitialValues } from './services/utilities';

interface TitheFormProps {
	active: boolean;
	onClose: () => void;
	tithe: Tithe | null;
}

function TitheForm({ active, onClose, tithe }: TitheFormProps) {
	const initialValues = useMemo(() => getTitheFormInitialValues(tithe), [tithe]);
	const form = useForm<AddTithe>({
		initialValues,
		onSubmit,
		validationSchema: TITHE_SCHEMA,
		validateOnChange: false,
		enableReinitialize: true,
		validateOnMount: true
	});

	async function onSubmit(values: AddTithe) {
		form.setSubmitting(true);
		const response = await saveTithe(values, tithe?.id);
		form.setSubmitting(false);
		if (response.success) {
			// showSuccessMessage
			emitReload();
			handleClose();
		}
	}

	function handleClose() {
		onClose();
		form.resetForm();
	}

	function handleRadioChange(_: FormEvent<HTMLInputElement>, data: CheckboxProps) {
		form.setFieldValue('isPaid', data.value === 'yes');
	}

	return (
		<Modal open={active} onClose={handleClose}>
			<Modal.Content>
				<Form onSubmit={form.handleSubmit}>
					<Form.Input
						name="amount"
						type="number"
						placeholder="0.00"
						label="Enter amount (GHS)"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.amount}
						error={form.getError('amount')}
					/>
					<Form.Input
						name="description"
						placeholder="Small note on tithe"
						label="Description"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.description ?? ''}
						error={form.getError('description')}
					/>
					<Form.Input
						name="date"
						type="date"
						label="Select date"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.date}
						error={form.getError('date')}
					/>
					<Form.Field inline>
						<Label basic>Is Tithe paid?</Label>
						<Form.Radio
							name="isPaid"
							inline
							value="yes"
							checked={form.values.isPaid}
							onChange={handleRadioChange}
							label="Yes"
							onBlur={form.handleBlur}
							id="isPaid"
						/>
						<Form.Radio
							name="isPaid"
							inline
							value="no"
							checked={!form.values.isPaid}
							id="isPaid"
							onChange={handleRadioChange}
							label="No"
							onBlur={form.handleBlur}
						/>
					</Form.Field>
					<Modal.Actions>
						<Button
							content="Submit"
							disabled={!form.isValid || !form.dirty}
							loading={form.isSubmitting}
							type="submit"
						/>
					</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
	);
}

export default TitheForm;

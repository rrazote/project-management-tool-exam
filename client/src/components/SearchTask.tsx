import React, { useState } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Divider,
	MenuItem,
	Box,
	FormControl,
	InputLabel,
	Select,
	type SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useAppContext } from '../context/AppContext';

interface SearchTaskProps {
	open: boolean;
	closeDialog: () => void;
}

const SearchTask: React.FC<SearchTaskProps> = ({ open, closeDialog }) => {
	const [project, setProject] = useState<number | '' | undefined>('');
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [endDate, setEndDate] = useState<Dayjs | null>(null);
	const { projects, fetchTasks } = useAppContext();

	const handleProjectChange = (event: SelectChangeEvent<number | ''>) => {
		setProject(event.target.value as number | '');
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		fetchTasks({
			project,
			start_due_date: startDate ? new Date(startDate.format('YYYY/MM/DD')).toISOString() : null,
			end_due_date: endDate ? new Date(endDate.format('YYYY/MM/DD')).toISOString() : null,
		});
		setProject('');
		setStartDate(null);
		setEndDate(null);
		closeDialog();
	};

	return (
		<Dialog open={open} onClose={closeDialog} fullWidth maxWidth='sm'>
			<DialogTitle>Search Task</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
						{/* Project Select */}
						<FormControl fullWidth>
							<InputLabel id='project-label'>Project</InputLabel>
							<Select labelId='project-label' value={project} onChange={handleProjectChange} label='Project'>
								<MenuItem value=''>
									<em>None</em>
								</MenuItem>
								{projects.map((p) => (
									<MenuItem key={p.id} value={p.id}>
										{p.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<Divider orientation='horizontal' flexItem />

						{/* Start Due Date */}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label='Start Due Date'
								value={startDate}
								onChange={(newValue) => setStartDate(newValue)}
								slotProps={{ textField: { fullWidth: true } }}
							/>
						</LocalizationProvider>

						{/* End Due Date */}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label='End Due Date'
								value={endDate}
								onChange={(newValue) => setEndDate(newValue)}
								slotProps={{ textField: { fullWidth: true } }}
								disabled={startDate === null}
								minDate={startDate || undefined}
							/>
						</LocalizationProvider>
					</Box>
				</DialogContent>

				<DialogActions sx={{ padding: '0 1.5rem 1.5rem 0' }}>
					<Button type='submit' variant='contained' color='primary'>
						Search
					</Button>
					<Button onClick={closeDialog} variant='outlined' color='secondary'>
						Close
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default SearchTask;

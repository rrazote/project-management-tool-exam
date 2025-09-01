import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import TaskDialog from '../components/TaskDialog';
import { DEFAULT_TASK } from '../helpers/constants';
import CalendarContainer from './CalendarContainer';
import SearchTask from '../components/SearchTask';
import RefreshButton from '../components/RefreshButton';

const ActionContainer: React.FC = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openCalendarModal, setOpenCalendarModal] = useState(false);
	const [openSearchModal, setOpenSearchModal] = useState(false);

	return (
		<Box
			sx={{
				position: 'sticky',
				top: 0,
				bgcolor: 'white',
				py: 1,
				display: 'flex',
				justifyContent: 'center',
				borderBottom: '1px solid #ddd',
				paddingBottom: '1rem',
				gap: '1rem',
			}}
		>
			<RefreshButton />

			<Box>
				<Button variant='contained' color='primary' onClick={() => setOpenModal(true)}>
					Create new task
				</Button>

				<TaskDialog
					open={openModal}
					closeDialog={() => {
						setOpenModal(false);
					}}
					editTask={DEFAULT_TASK}
				/>
			</Box>

			<Box>
				<Button variant='outlined' color='secondary' onClick={() => setOpenSearchModal(true)}>
					Search tasks
				</Button>

				<SearchTask
					open={openSearchModal}
					closeDialog={() => {
						setOpenSearchModal(false);
					}}
				/>
			</Box>

			<Box>
				<Button variant='outlined' color='secondary' onClick={() => setOpenCalendarModal(true)}>
					Calendar
				</Button>

				<CalendarContainer
					open={openCalendarModal}
					closeDialog={() => {
						setOpenCalendarModal(false);
					}}
				/>
			</Box>
		</Box>
	);
};

export default ActionContainer;

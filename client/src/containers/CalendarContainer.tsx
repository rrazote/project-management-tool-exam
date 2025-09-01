import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TaskCalendar from '../components/TaskCalendar';
import TaskListItem from '../components/TaskListItem';
import { useAppContext } from '../context/AppContext';
import { DEFAULT_TASK } from '../helpers/constants';

const CalendarContainer: React.FC<{
	open: boolean;
	closeDialog: () => void;
}> = ({ open, closeDialog }) => {
	const { selectedTask, handleSelectedTask } = useAppContext();

	return (
		<Dialog open={open} onClose={closeDialog} maxWidth='sm' fullWidth>
			<DialogTitle sx={{ fontSize: '2rem', fontWeight: 'bold' }}>{selectedTask.id !== 0 ? 'Task Details' : 'Calendar'}</DialogTitle>
			<DialogContent>{selectedTask.id !== 0 ? <TaskListItem task={selectedTask} showMenu={false} /> : <TaskCalendar />}</DialogContent>
			<DialogActions sx={{ padding: '0 1.5rem 1.5rem 0' }}>
				{selectedTask.id !== 0 ? (
					<Button variant='outlined' color='secondary' onClick={() => handleSelectedTask(DEFAULT_TASK)} style={{ marginBottom: '16px' }}>
						Back
					</Button>
				) : (
					<Button variant='outlined' color='secondary'  onClick={closeDialog}>Close</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default CalendarContainer;

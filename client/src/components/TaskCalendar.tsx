import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from 'dayjs';
import { useAppContext } from '../context/AppContext';
import '../css/TaskCalendar.css';
import { Box } from '@mui/material';

const TaskCalendar = () => {
	const { tasks, handleSelectedTask } = useAppContext();
	// Convert tasks to FullCalendar event format
	const events = tasks.map((task) => ({
		id: task.id.toString(),
		title: task.name,
		date: dayjs(task.due_date).format('YYYY-MM-DD'),
		task: task,
	}));

	const handleDateSelect = (selectInfo: any) => {
		const start = dayjs(selectInfo.start).format('YYYY-MM-DD');
		const end = dayjs(selectInfo.end).subtract(1, 'day').format('YYYY-MM-DD'); // fullCalendar's end is exclusive
		alert(`Selected date: ${start}${start !== end ? ` to ${end}` : ''}`);
	};

	return (
		<Box>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin]}
				initialView='dayGridMonth'
				headerToolbar={{
					left: 'prev,today,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay',
				}}
				events={events}
				selectable={true}
				select={handleDateSelect}
				eventClick={(info) => {
					const clickedTask = info.event.extendedProps.task;
					handleSelectedTask(clickedTask);
				}}
			/>
		</Box>
	);
};

export default TaskCalendar;

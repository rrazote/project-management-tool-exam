import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from 'dayjs';
import { useAppContext } from '../context/AppContext';

const TaskCalendar = () => {
  const { tasks } = useAppContext();
  // Convert tasks to FullCalendar event format
  const events = tasks.map((task) => ({
    id: task.id.toString(),
    title: task.name,
    date: dayjs(task.due_date).format('YYYY-MM-DD'),
  }));

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventClick={(info) => {
          alert(`Task: ${info.event.title}`);
        }}
      />
    </div>
  );
};

export default TaskCalendar;

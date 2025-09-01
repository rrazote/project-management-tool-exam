import { Grid, Box, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import TaskListItem from './TaskListItem';

const TaskList = () => {
  const { tasks, page, itemsPerPage } = useAppContext();
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = tasks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        pr: 1,
        py: 2,
      }}
    >
      {tasks.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No tasks found.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentItems.map((task) => (
            <TaskListItem key={`task-item-${task.id}`} task={task} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TaskList;

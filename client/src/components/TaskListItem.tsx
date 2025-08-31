import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { STATUS, type ITask } from '../helpers/constants';
import dayjs from 'dayjs';
import TaskDialog from './TaskDialog';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useAppContext } from '../context/AppContext';

const TaskListItem: React.FC<{ task: ITask }> = ({ task }) => {
  const [openModal, setOpenModal] = useState(false);
  const { deleteTask } = useDeleteTask();
  const { fetchTasks } = useAppContext();

  const { project, name, priority, due_date, assignee, status, id } = task;
  const convertedDate = dayjs(due_date);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenModal(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    await deleteTask(id);
    fetchTasks();
    handleMenuClose();
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <TaskDialog
        open={openModal}
        closeDialog={() => {
          setOpenModal(false);
        }}
        editTask={task}
      />
      <Card sx={{ borderRadius: 2, boxShadow: 3, mb: 2, minHeight: 1 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h6' gutterBottom>
              {project}
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'grid', rowGap: 1 }}>
            <Typography variant='body2'>
              <strong>Name:</strong> {name}
            </Typography>
            <Typography variant='body2'>
              <strong>Priority:</strong> {priority}
            </Typography>
            <Typography variant='body2'>
              <strong>Due Date:</strong> {convertedDate.format('YYYY/MM/DD')}
            </Typography>
            <Typography variant='body2'>
              <strong>Assignee:</strong> {assignee}
            </Typography>
            <Typography variant='body2'>
              <strong>Status:</strong> {STATUS[status] || 'Unknown'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TaskListItem;

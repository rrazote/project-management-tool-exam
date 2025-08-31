import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  defaultTask,
  PRIORITY,
  STATUS,
  type ITask,
} from '../helpers/constants';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useSaveTask } from '../hooks/useSaveTask';
import { useAppContext } from '../context/AppContext';

const TaskDialog: React.FC<{
  open: boolean;
  closeDialog: () => void;
  editTask?: ITask;
}> = ({ open, closeDialog, editTask = defaultTask }) => {
  const [task, setTask] = useState(editTask);
  const {
    project,
    name,
    assignee,
    priority,
    status,
    due_date: dueDate,
    id,
  } = task;

  const { saveTask, loading } = useSaveTask();
  const { fetchTasks } = useAppContext();

  const handleSetTask = <K extends keyof ITask>(
    field: K,
    value: string | number | null
  ) => {
    const modifiedTask: ITask = { ...task, [field]: value };
    setTask((v) => ({ ...v, ...modifiedTask }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveTask(task);
    fetchTasks();
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth='sm'>
      <DialogTitle>Create New Task</DialogTitle>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label='Project'
            value={project}
            onChange={(e) => handleSetTask('project', e.target.value)}
            required
          />

          <TextField
            label='Task Name'
            value={name}
            onChange={(e) => handleSetTask('name', e.target.value)}
            required
          />

          <TextField
            label='Assignee'
            type='email'
            value={assignee}
            onChange={(e) => handleSetTask('assignee', e.target.value)}
            required
          />

          <FormControl fullWidth>
            <InputLabel id='role-label'>Priority</InputLabel>
            <Select
              labelId='role-label'
              value={priority}
              onChange={(e) => handleSetTask('priority', e.target.value)}
              required
            >
              {PRIORITY.map((item) => (
                <MenuItem key={`priority-menu-item-${item}`} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id='role-label'>Status</InputLabel>
            <Select
              labelId='role-label'
              value={status}
              onChange={(e) => handleSetTask('status', e.target.value)}
              required
              disabled={id === 0}
            >
              {Object.keys(STATUS).map((key) => (
                <MenuItem key={`status-menu-item-${key}`} value={key}>
                  {STATUS[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Due Date'
              value={dayjs(dueDate)}
              onChange={(newValue) => {
                if (newValue && dayjs.isDayjs(newValue)) {
                  handleSetTask('due_date', newValue.format('YYYY/MM/DD'));
                }
              }}
              slotProps={{ textField: { fullWidth: true, required: true } }}
            />
          </LocalizationProvider>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              closeDialog();
            }}
          >
            Cancel
          </Button>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskDialog;

import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TaskDialog from '../components/TaskDialog';
import { defaultTask } from '../helpers/constants';
import TaskCalendar from '../components/TaskCalendar';
import { useAppContext } from '../context/AppContext';

const ActionContainer: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
      <Box>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpenModal(true)}
        >
          Create new task
        </Button>

        <TaskDialog
          open={openModal}
          closeDialog={() => {
            setOpenModal(false);
          }}
          editTask={defaultTask}
        />
      </Box>

      <Box>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => setOpenCalendarModal(true)}
        >
          Search tasks
        </Button>

        <Dialog
          open={openCalendarModal}
          onClose={() => setOpenCalendarModal(false)}
          maxWidth='xs'
          fullWidth
        >
          <DialogTitle>Select a Date</DialogTitle>
          <DialogContent>
            <TaskCalendar />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCalendarModal(false)}>Close</Button>
            <Button
              onClick={() => {
                console.log('Date selected:', selectedDate);
                setOpenCalendarModal(false);
              }}
              variant='contained'
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ActionContainer;

import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppContext } from '../context/AppContext';


const RefreshButton= () => {
  const { fetchTasks } = useAppContext();
  return (
    <Tooltip title={'Reload tasks without filters'}>
      <IconButton color="primary" onClick={() => fetchTasks()}>
        <RefreshIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RefreshButton;

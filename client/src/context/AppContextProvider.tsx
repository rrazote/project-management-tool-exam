import {
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { AppContext } from './AppContext';
import {
  ITEMS_PER_PAGE,
  TASK_GET_API_URL,
  type ITask,
} from '../helpers/constants';
import axios from 'axios';
import type { AlertColor } from '@mui/material';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = ITEMS_PER_PAGE;
  const [loading, setLoading] = useState<boolean>(true);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('info');

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(
        `${TASK_GET_API_URL}?sort_by=DUEDATE&sort_asc=false`
      );
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const value = useMemo(() => {
    const handleCloseToast = () => {
      setToastOpen(false);
    };

    const showToast = (message: string, severity: AlertColor = 'info') => {
      setToastMessage(message);
      setToastSeverity(severity);
      setToastOpen(true);
    };

    return {
      tasks,
      page,
      itemsPerPage,
      setPage,
      totalPages,
      loading,
      fetchTasks,
      toastOpen,
      toastMessage,
      toastSeverity,
      showToast,
      handleCloseToast,
    };
  }, [
    tasks,
    page,
    itemsPerPage,
    totalPages,
    loading,
    fetchTasks,
    toastOpen,
    toastMessage,
    toastSeverity,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

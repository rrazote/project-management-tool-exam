import { createContext, useContext } from 'react';
import type { ITask } from '../helpers/constants';
import type { AlertColor } from '@mui/material';

interface AppContextType {
  tasks: ITask[];
  page: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  totalPages: number;
  loading: boolean;
  fetchTasks: () => void;
  toastOpen: boolean;
  toastMessage: string;
  toastSeverity: AlertColor;
  showToast: (message: string, severity: AlertColor) => void;
  handleCloseToast: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Container must be used inside TaskProvider');
  }

  return context;
};

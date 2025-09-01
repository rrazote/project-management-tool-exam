import { useState, useEffect, type ReactNode, useMemo, useCallback } from 'react';
import { AppContext } from './AppContext';
import { DEFAULT_TASK, ITEMS_PER_PAGE, PROJECT_GET_API_URL, TASK_GET_API_URL, type IProject, type ISearchFilter, type ITask } from '../helpers/constants';
import axios from 'axios';
import type { AlertColor } from '@mui/material';



export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const [projects, setProjects] = useState<IProject[]>([]);
	const [selectedTask, setSelectedTask] = useState<ITask>(DEFAULT_TASK);

	const [toastOpen, setToastOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

	const itemsPerPage = ITEMS_PER_PAGE;

	const fetchTasks = useCallback(async (filter: ISearchFilter | null = null, sortBy: string = 'DUEDATE', sortAsc: boolean = false) => {
		setLoading(true);
    try {
      let query = '';
      if (filter?.project) {
        query += `&project=${filter.project}`;
      }

      if (filter?.start_due_date && filter?.end_due_date) {
        query += `&start_due_date=${filter.start_due_date}&end_due_date=${filter.end_due_date}`;
      }

			const response = await axios.get(`${TASK_GET_API_URL}?sort_by=${sortBy}&sort_asc=${sortAsc}${query}`);
			setTasks(response.data);
		} catch (error) {
			console.error('Error fetching tasks', error);
		} finally {
      console.log('finally');
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, []);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await axios.get(`${PROJECT_GET_API_URL}`);
				setProjects(response.data);
				fetchTasks();
			} catch (error) {
				console.error('Error fetching projects', error);
			}
		};
		fetchProjects();
	}, [fetchTasks]);

	const totalPages = Math.ceil(tasks.length / itemsPerPage);

	const value = useMemo(() => {
		const handleCloseToast = () => {
			setToastOpen(false);
		};

		const handleSelectedTask = (task: ITask) => {
			setSelectedTask(task);
		};

		const showToast = (message: string, severity: AlertColor = 'info') => {
			setToastMessage(message);
			setToastSeverity(severity);
			setToastOpen(true);
		};

		return {
			selectedTask,
			projects,
			tasks,
			page,
			itemsPerPage,
			setPage,
			totalPages,
			loading,
			toastOpen,
			toastMessage,
			toastSeverity,
			handleSelectedTask,
			fetchTasks,
			showToast,
			handleCloseToast,
		};
	}, [selectedTask, projects, tasks, page, itemsPerPage, totalPages, loading, fetchTasks, toastOpen, toastMessage, toastSeverity]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

import { useState } from 'react';
import axios from 'axios';
import {
  TASK_GET_API_URL,
  type IError,
  type ITask,
} from '../helpers/constants';

export const useFetchTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTask = async (
    sortBy: string = 'DUEDATE',
    sortAsc: boolean = false
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${TASK_GET_API_URL}?sort_by=${sortBy}&sort_asc=${sortAsc}`
      );
      setTasks(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response.data);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchTask, tasks, loading, error };
};

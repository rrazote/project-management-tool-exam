import { useState } from 'react';
import axios from 'axios';
import {
  TASK_POST_API_URL,
  TASK_PUT_API_URL,
  type IError,
  type ITask,
} from '../helpers/constants';
import { useAppContext } from '../context/AppContext';

export const useSaveTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError | null>(null);
  const { showToast } = useAppContext();

  const saveTask = async (task: ITask) => {
    setLoading(true);

    const url = task.id ? `${TASK_PUT_API_URL}/${task.id}` : TASK_POST_API_URL;
    const due_date = new Date(task.due_date.toString());
    try {
      const response = await axios({
        method: task.id ? 'PUT' : 'POST',
        url,
        data: { ...task, due_date },
      });
      showToast(
        `Task ${task.id ? 'updated' : 'created'} successfully!`,
        'success'
      );
      return response.data;
    } catch (err: any) {
      showToast(err.response.data.message, 'error');
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { saveTask, loading, error };
};

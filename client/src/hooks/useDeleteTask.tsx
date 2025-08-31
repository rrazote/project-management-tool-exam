import { useState } from 'react';
import axios from 'axios';
import { TASK_DELETE_API_URL, type IError } from '../helpers/constants';
import { useAppContext } from '../context/AppContext';

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError | null>(null);
  const { showToast } = useAppContext();

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${TASK_DELETE_API_URL}/${id}`,
      });

      showToast(`Task deleted!`, 'success');
      return response.data;
    } catch (err: any) {
      showToast(err.response.data.message, 'error');
      setError(err.response.data);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, error };
};

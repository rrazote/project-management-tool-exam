import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export interface ISearchFilter {
  project?: number | "" | undefined;
  start_due_date?: string | null;
  end_due_date?: string | null;
}

export interface IProject {
  id: number;
  name: string;
}

export interface ITask {
  id: number;
  project: string;
  name: string;
  priority: number;
  due_date: string | Dayjs;
  assignee: string;
  status: string;
}

export interface IError {
  error: string;
  message: string;
  timestamp: string;
}

export const DEFAULT_TASK: ITask = {
  id: 0,
  project: '',
  name: '',
  priority: 1,
  assignee: '',
  status: 'PENDING',
  due_date: dayjs(),
};

export const ITEMS_PER_PAGE = 12;

export const PRIORITY: number[] = [1, 2, 3, 4, 5];
export const STATUS: { [key: string]: string } = {
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In Progress',
  PENDING: 'Pending',
};

const SERVER_URL = 'http://localhost:8080';
const TASK_API_URL = `${SERVER_URL}/api/tasks`;
const PROJECT_API_URL = `${SERVER_URL}/api/projects`;
export const TASK_GET_API_URL = `${TASK_API_URL}/due-date`;
export const TASK_POST_API_URL = `${TASK_API_URL}/new`;
export const TASK_PUT_API_URL = `${TASK_API_URL}/update-task`;
export const TASK_DELETE_API_URL = `${TASK_API_URL}/delete`;
export const PROJECT_GET_API_URL = `${PROJECT_API_URL}/`;

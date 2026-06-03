import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// ---- Tareas ----
export const getTasks    = () => api.get('/tasks');
export const createTask  = (data) => api.post('/tasks', data);
export const updateTask  = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask  = (id) => api.delete(`/tasks/${id}`);
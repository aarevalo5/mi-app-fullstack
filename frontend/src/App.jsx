import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks]   = useState([]);
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar tareas al iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.data);
    } catch {
      setError('❌ No se pudo conectar al servidor. ¿Está corriendo el backend?');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (title) => {
    const res = await createTask({ title });
    setTasks(prev => [...prev, res.data.data]);
  };

  const handleToggle = async (task) => {
    const res = await updateTask(task.id, { completed: !task.completed });
    setTasks(prev => prev.map(t => t.id === task.id ? res.data.data : t));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completed = tasks.filter(t => t.completed).length;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Gestor de Tareas</h1>
        <p style={styles.subtitle}>Full Stack — React + Express</p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.stats}>
          <span>Total: <strong>{tasks.length}</strong></span>
          <span>Completadas: <strong>{completed}</strong></span>
          <span>Pendientes: <strong>{tasks.length - completed}</strong></span>
        </div>

        <TaskForm onTaskCreated={handleCreate} />

        {loading ? <p>Cargando tareas...</p> : (
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#eef2ff', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '60px', fontFamily: 'sans-serif' },
  card:      { backgroundColor: '#fff', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '600px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  title:     { margin: 0, color: '#4f46e5', fontSize: '28px' },
  subtitle:  { color: '#888', marginTop: '4px', marginBottom: '24px' },
  stats:     { display: 'flex', gap: '20px', marginBottom: '20px', padding: '12px', backgroundColor: '#f0f4ff', borderRadius: '8px', fontSize: '14px' },
  error:     { backgroundColor: '#fee', color: '#c00', padding: '12px', borderRadius: '8px', marginBottom: '16px' }
};

export default App;
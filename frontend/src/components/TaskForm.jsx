import { useState } from 'react';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    await onTaskCreated(title);
    setTitle('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        style={styles.input}
      />
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Agregando...' : '+ Agregar'}
      </button>
    </form>
  );
}

const styles = {
  form:   { display: 'flex', gap: '10px', marginBottom: '20px' },
  input:  { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' },
  button: { padding: '10px 20px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }
};

export default TaskForm;
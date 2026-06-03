const express = require('express');
const router = express.Router();

// Base de datos en memoria (simulada)
let tasks = [
  { id: 1, title: 'Aprender React', completed: false },
  { id: 2, title: 'Crear API con Express', completed: true },
  { id: 3, title: 'Conectar Frontend y Backend', completed: false },
];

// GET - Obtener todas las tareas
router.get('/tasks', (req, res) => {
  res.json({ success: true, data: tasks });
});

// GET - Obtener una tarea por ID
router.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
  res.json({ success: true, data: task });
});

// POST - Crear nueva tarea
router.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ success: false, message: 'El título es requerido' });
  
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

// PUT - Actualizar tarea
router.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
  
  tasks[index] = { ...tasks[index], ...req.body };
  res.json({ success: true, data: tasks[index] });
});

// DELETE - Eliminar tarea
router.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
  
  tasks.splice(index, 1);
  res.json({ success: true, message: 'Tarea eliminada' });
});

module.exports = router;
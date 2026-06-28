import { useState, useEffect } from 'react';
import { prioritizeTasks } from '../utils/taskPrioritizer';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('aura_tasks');
    const initialTasks = saved ? JSON.parse(saved) : [
      { id: '1', title: 'Hackathon MVP Refinement', priority: 'High', duration: '4h', completed: false, deadline: '' },
      { id: '2', title: 'JavaScript Design Patterns', priority: 'Medium', duration: '2h', completed: true, deadline: '' },
      { id: '3', title: 'React Native Module 1', priority: 'Low', duration: '1.5h', completed: false, deadline: '' }
    ];
    return prioritizeTasks(initialTasks);
  });

  useEffect(() => {
    localStorage.setItem('aura_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now().toString(), completed: false };
    setTasks((prev) => prioritizeTasks([newTask, ...prev]));
  };

  const toggleTask = (id) => {
    setTasks((prev) => prioritizeTasks(prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prioritizeTasks(prev.filter(t => t.id !== id)));
  };

  const stats = {
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    productivity: tasks.length > 0 
      ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) 
      : 0
  };

  return { tasks, addTask, toggleTask, deleteTask, stats };
};
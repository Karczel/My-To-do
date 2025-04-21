'use client';

import { useEffect, useState } from 'react';
import TaskItem from './task';
import AddTask from './add-task';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      console.log('Raw response:', data); // DEBUG
      console.log('Response status:', res.status); // DEBUG
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleStatusChange = (id: string, newStatus: 'todo' | 'inprogress' | 'done') => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle }),
      });

      if (!res.ok) {
        console.error('Failed to create task');
        return;
      }

      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]); // Add new task to the top
      setNewTaskTitle('');
    }
  };

  return (
    <div className="space-y-4">
      <AddTask
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        handleAddTask={handleAddTask}
      />

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}

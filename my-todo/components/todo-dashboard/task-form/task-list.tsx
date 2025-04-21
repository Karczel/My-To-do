'use client';

import { useEffect, useState } from 'react';
import TaskItem from '@/components/todo-dashboard/task-form/task';
import AddTask from '@/components/todo-dashboard/task-form/add-task';

export default function TaskList() {
  const [tasks, setTasks] = useState<{ id: string; title: string; status: 'todo' | 'inprogress' | 'done' }[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {const res = await fetch('/api/tasks');
    const data = await res.json();
    console.log('Raw response:', data); // DEBUG
    console.log('Response status:', res.status); // DEBUG
    setTasks(data);
  } catch (err: any) {
    console.error('Error:', err);
  }
}
  
  async function handleStatusChange(id: string, newStatus: 'todo' | 'inprogress' | 'done') {
    console.log(`Changing status of task ${id} to ${newStatus}`);
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
    try {
      const res = await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task status');
      }

      const updatedTask = await res.json();
      console.log('Updated task:', updatedTask);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTaskTitle }), // Only send title
      });

      if (!res.ok) {
        throw new Error('Failed to add task');
      }

      const addedTask = await res.json(); // Renamed to avoid conflict

      console.log('Added task:', addedTask);

      setTasks((prev) => [addedTask, ...prev]); // Add to list
      setNewTaskTitle(''); // Clear input
    } catch (err) {
      console.error('Error adding task:', err);
    }
  }
  

  return (
    <div className="space-y-4">
      {/* Add Task component */}
      <AddTask
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        handleAddTask={handleAddTask}
      />

    {/* Display Tasks */}
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={{
          ...task,
          status: task.status as 'todo' | 'inprogress' | 'done',
        }}
        onStatusChange={handleStatusChange}
      />
    ))}
  </div>
);
}
'use client';

import { useState } from 'react';
import TaskItem from './task';
import AddTask from './add-task'

const initialTasks = [
  { id: '1', title: 'Buy groceries', status: 'todo' },
  { id: '2', title: 'Work on project', status: 'inprogress' },
  { id: '3', title: 'Read a book', status: 'done' }
];

export default function TaskList() {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTaskTitle, setNewTaskTitle] = useState('');
  
    const handleStatusChange = (id: string, newStatus: 'todo' | 'inprogress' | 'done') => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
      );
    };
  
    const handleAddTask = (e: React.FormEvent) => {
      e.preventDefault();
      if (newTaskTitle.trim()) {
        const newTask = {
          id: Date.now().toString(), // Unique ID based on timestamp
          title: newTaskTitle,
          status: 'todo'
        };
        setTasks((prev) => [newTask, ...prev]); // Add the task at the top
        setNewTaskTitle(''); // Clear input field after adding task
      }
    };
  
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

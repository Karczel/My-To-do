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
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err: any) {
      console.error('Error:', err);
    }
  }

  const handleDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Remove the task from the state
  };

  return (
    <div className="space-y-4">
      {/* Add Task component */}
      <AddTask
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        onTaskAdded={(newTask) => setTasks((prev) => [newTask, ...prev])}
      />

      {/* Display Tasks */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={{
            ...task,
            status: task.status as 'todo' | 'inprogress' | 'done',
          }}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

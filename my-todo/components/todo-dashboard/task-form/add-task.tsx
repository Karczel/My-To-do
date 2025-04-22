import { Plus } from "lucide-react";
import StatusManager from "@/components/todo-dashboard/status/status-change";

interface AddTaskProps {
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  onTaskAdded: (newTask: { id: string; title: string; status: 'todo' | 'inprogress' | 'done' }) => void;
}

export default function AddTask({
  newTaskTitle,
  setNewTaskTitle,
  onTaskAdded,
}: AddTaskProps) {

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTaskTitle }),
      });

      if (!res.ok) {
        throw new Error('Failed to add task');
      }

      const addedTask = await res.json();

      onTaskAdded(addedTask); // ✅ Pass new task back to parent
      setNewTaskTitle('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  }

  return (
    <form onSubmit={handleAddTask} className="flex items-center gap-4 p-4 border-b rounded-lg bg-white hover:bg-blue-50 transition-colors">
      <StatusManager id="temp" status="todo"
      />
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className="flex-1 border rounded px-2 py-1 text-black"
        placeholder="Enter task title"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        className="bg-black text-white w-8 h-8 rounded-full hover:bg-neutral-800 flex items-center justify-center"
      >
        <Plus className="h-5 w-5" />
      </button>
    </form>
  );
}

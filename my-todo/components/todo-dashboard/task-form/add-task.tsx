import { Plus } from "lucide-react";
import StatusManager from "../status/status-change";

interface AddTaskProps {
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  handleAddTask: (e: React.FormEvent) => void;
}

export default function AddTask({
  newTaskTitle,
  setNewTaskTitle,
  handleAddTask
}: AddTaskProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b rounded-lg bg-white hover:bg-blue-50 cursor-pointer transition-colors">
      <StatusManager
        status="todo"
        onStatusChange={() => {}} // Placeholder
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
        onClick={handleAddTask}
        className="bg-black text-white w-8 h-8 rounded-full hover:bg-neutral-800 flex items-center justify-center"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
}

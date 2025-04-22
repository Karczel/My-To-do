import { useState } from 'react';
import TodoStatus from '@/components/todo-dashboard/status/todo-status';
import InProgressStatus from '@/components/todo-dashboard/status/in-progress-status';
import DoneStatus from '@/components/todo-dashboard/status/done-status';

// Define components associated with each status
const statusComponents = {
  todo: TodoStatus,
  inprogress: InProgressStatus,
  done: DoneStatus
} as const;

type StatusKey = keyof typeof statusComponents;

interface StatusManagerProps {
  id: string;
  status: StatusKey;
}

export default function StatusManager({ id, status: initialStatus }: StatusManagerProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [status, setStatus] = useState<StatusKey>(initialStatus);

  const handleStatusClick = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleOptionClick = async (newStatus: StatusKey) => {
    if (newStatus === status) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update task status');

      setStatus(newStatus);
    } catch (err) {
      console.error('Status update error:', err);
    }

    setIsDropdownVisible(false);
  };

  const StatusComponent = statusComponents[status];

  return (
    <div>
      <StatusComponent onClick={handleStatusClick} />
      {isDropdownVisible && (
        <div className="dropdown text-black">
          {(['todo', 'inprogress', 'done'] as const).map((s) => (
            <div
              key={s}
              className={`dropdown-option ${status === s ? 'selected' : ''}`}
              onClick={() => handleOptionClick(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

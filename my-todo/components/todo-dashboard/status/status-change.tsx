'use client';

import { useState } from 'react';
import TodoStatus from '@/components/todo-dashboard/status/todo-status';
import InProgressStatus from '@/components/todo-dashboard/status/in-progress-status';
import DoneStatus from '@/components/todo-dashboard/status/done-status';


const statusComponents = {
  todo: TodoStatus,
  inprogress: InProgressStatus,
  done: DoneStatus
} as const;

type StatusKey = keyof typeof statusComponents;

export default function StatusManager({
  status,
  onStatusChange,
}: {
  status: StatusKey;
  onStatusChange: (newStatus: StatusKey) => void;
}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleStatusClick = () => {
    setIsDropdownVisible((prev) => !prev); // Toggle the dropdown visibility when status is clicked
  };

  const handleOptionClick = (newStatus: StatusKey) => {
    onStatusChange(newStatus);  // Update status when a new option is selected
    setIsDropdownVisible(false);  // Hide the dropdown after selection
  };

  const StatusComponent = statusComponents[status]; // Get the correct component

  return (
    <div>
      <div onClick={handleStatusClick}>
        {/* Render the current status component with a clickable area */}
        <StatusComponent onClick={handleStatusClick} />
      </div>

      {/* If dropdown is visible, render a custom dropdown inside the status component */}
      {isDropdownVisible && (
        <div className="dropdown text-black">
          <div
            className={`dropdown-option ${status === 'todo' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('todo')}
          >
            Todo
          </div>
          <div
            className={`dropdown-option ${status === 'inprogress' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('inprogress')}
          >
            In Progress
          </div>
          <div
            className={`dropdown-option ${status === 'done' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('done')}
          >
            Done
          </div>
        </div>
      )}
    </div>
  );
}
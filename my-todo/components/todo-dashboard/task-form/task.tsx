import StatusManager from '../status/status-change'

export default function TaskItem({
  task,
  onStatusChange
}: {
  task: { id: string; title: string; status: 'todo' | 'inprogress' | 'done' };
  onStatusChange: (id: string, newStatus: 'todo' | 'inprogress' | 'done') => void;
})  {
  const handleStatusChange = async (newStatus: 'todo' | 'inprogress' | 'done') => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        console.error('Failed to update task status');
        return;
      }

      onStatusChange(task.id, newStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <StatusManager
        status={task.status}
        onStatusChange={handleStatusChange}
      />
      <span>{task.title}</span>
    </div>
  );
}
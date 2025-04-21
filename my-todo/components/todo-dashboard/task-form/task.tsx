import StatusManager from '@/components/todo-dashboard/status/status-change'

export default function TaskItem({
  task,
  onStatusChange
}: {
  task: { id: string; title: string; status: 'todo' | 'inprogress' | 'done' };
  onStatusChange: (id: string, newStatus: 'todo' | 'inprogress' | 'done') => void;
}) {

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <StatusManager
        status={task.status}
        onStatusChange={(newStatus) => onStatusChange(task.id, newStatus)}
      />
      <span>{task.title}</span>
    </div>
  );
}
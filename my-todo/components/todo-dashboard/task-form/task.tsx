import DeleteTask from '@/components/todo-dashboard/task-form/delete-task';
import StatusManager from '@/components/todo-dashboard/status/status-change';

export default function TaskItem({
  task,
  onDelete,
}: {
  task: { id: string; title: string; status: 'todo' | 'inprogress' | 'done' };
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border-b justify-between">
      <div className="flex items-center gap-4">
        <StatusManager id={task.id} status={task.status} />
        <span>{task.title}</span>
      </div>
      <DeleteTask task={task} onDelete={() => onDelete(task.id)} />
    </div>
  );
}

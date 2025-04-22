export default function DeleteTask({
    task,
    onDelete,
    }: {
    task: { id: string };
    onDelete?: () => void;
    }) {
    async function handleDeleteTask() {
        try {
        const res = await fetch('/api/tasks', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: task.id }),
        });

        if (!res.ok) {
            throw new Error('Failed to delete task');
        }

        if (onDelete) onDelete(); // Optional: notify parent to refetch or update UI
        } catch (err: any) {
            console.error('Error:', err);
        }
    }
    
        return (
        <div>
            <button onClick={handleDeleteTask} className="text-red-500 hover:text-red-700">
                🗑️
            </button>
        </div>
    );
}

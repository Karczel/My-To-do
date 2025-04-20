import { Circle } from 'lucide-react';

export default function TodoStatus({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-2">
      <Circle className="text-gray-400" />
    </button>
  );
}
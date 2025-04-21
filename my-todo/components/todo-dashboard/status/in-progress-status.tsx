'use client';

import { Play } from 'lucide-react';

export default function InProgressStatus({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-2">
      <Play className="text-purple-500 fill-purple-200" />
    </button>
  );
}
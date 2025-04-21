'use client';

import { CheckCircle } from 'lucide-react';

export default function DoneStatus({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-2">
      <CheckCircle className="text-green-600 fill-green-300" />
    </button>
  );
}
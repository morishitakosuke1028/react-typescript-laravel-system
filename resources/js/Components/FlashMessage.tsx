import React from 'react';
import { usePage } from '@inertiajs/react';

type Flash = {
  message?: string;
  status?: 'success' | 'danger' | 'info';
};

const FlashMessage = () => {
  const props = usePage().props as Record<string, any>;
  const flash: Flash | undefined = props.flash;

  if (!flash?.message) return null;

  const colorClass = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  }[flash.status ?? 'info'];

  return (
    <div className={`p-4 mb-4 text-sm rounded ${colorClass}`}>
      {flash.message}
    </div>
  );
};

export default FlashMessage;

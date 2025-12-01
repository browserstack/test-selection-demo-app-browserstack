import React from 'react';

interface EmptyStateProps {
  message: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon, className }) => (
  <div className={`text-center py-12 ${className || ''}`}>
    {icon && <div className="mb-4 flex justify-center">{icon}</div>}
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);

export default EmptyState;

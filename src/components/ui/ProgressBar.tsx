import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, className }) => (
  <div className={`w-full bg-gray-200 rounded-full h-3 ${className || ''}`}> 
    <div
      className="bg-blue-600 h-3 rounded-full transition-all"
      style={{ width: `${Math.min(value, max) / max * 100}%` }}
    />
  </div>
);

export default ProgressBar;

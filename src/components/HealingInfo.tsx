import React from 'react';

interface HealingInfoProps {
  headline?: string; // e.g. "Healing Demo:"
  message: string; // e.g. "ID changed from ..."
  details?: string; // e.g. extra tips or info
  className?: string;
}

const HealingInfo: React.FC<HealingInfoProps> = ({ headline = 'Healing Demo:', message, details, className }) => (
  <div className={`mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg ${className || ''}`}> 
    <p className="text-sm text-orange-700">
      <strong>{headline}</strong> {message}
      {details && <span className="block mt-1 text-orange-600">{details}</span>}
    </p>
  </div>
);

export default HealingInfo;

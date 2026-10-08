import React from 'react';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high' | 'critical' | string;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, score, size = 'md' }) => {
  const normLevel = level.toLowerCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let label = level.toUpperCase();

  if (normLevel === 'low') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (normLevel === 'medium') {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (normLevel === 'high') {
    colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
    dotColor = 'bg-orange-500';
  } else if (normLevel === 'critical') {
    colorClasses = 'bg-red-50 text-red-700 border-red-200';
    dotColor = 'bg-red-500';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2',
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      <span>{label}</span>
      {score !== undefined && (
        <span className="font-mono opacity-80">({score})</span>
      )}
    </span>
  );
};

import React from 'react';

interface RiskScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showBreakdown?: boolean;
}

export const RiskScoreCircle: React.FC<RiskScoreCircleProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  label = 'RISK SCORE',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const offset = circumference - (clampedScore / 100) * circumference;

  let strokeColor = '#10B981'; // emerald
  let textColor = 'text-emerald-600';
  let badgeLabel = 'LOW';

  if (clampedScore >= 80) {
    strokeColor = '#DC2626'; // red
    textColor = 'text-red-600';
    badgeLabel = 'CRITICAL';
  } else if (clampedScore >= 60) {
    strokeColor = '#EA580C'; // orange
    textColor = 'text-orange-600';
    badgeLabel = 'HIGH';
  } else if (clampedScore >= 30) {
    strokeColor = '#F59E0B'; // amber
    textColor = 'text-amber-600';
    badgeLabel = 'MEDIUM';
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            {label}
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className={`text-3xl font-extrabold tracking-tight ${textColor}`}>
              {score}
            </span>
            <span className="text-xs font-medium text-slate-400">/100</span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 mt-0.5 rounded-full uppercase ${textColor} bg-slate-50 border border-slate-200`}>
            {badgeLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-sage-600">
          step {current} of {total}
        </span>
        <span className="text-sm text-sage-600">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-sage-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-terracotta-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

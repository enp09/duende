import { InputHTMLAttributes } from 'react';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Radio({ label, className = '', ...props }: RadioProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="radio"
        className={`
          mt-1 w-5 h-5
          rounded-full border-2 border-royal-300
          bg-cloud-100
          checked:bg-orange-500 checked:border-orange-500
          focus:outline-none focus:ring-2 focus:ring-orange-200
          transition-all duration-200
          cursor-pointer
          ${className}
        `}
        {...props}
      />
      <span className="text-royal-800 group-hover:text-royal-900 transition-colors">
        {label}
      </span>
    </label>
  );
}

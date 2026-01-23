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
          rounded-full border-2 border-sage-300
          bg-cream-100
          checked:bg-terracotta-500 checked:border-terracotta-500
          focus:outline-none focus:ring-2 focus:ring-terracotta-200
          transition-all duration-200
          cursor-pointer
          ${className}
        `}
        {...props}
      />
      <span className="text-sage-800 group-hover:text-sage-900 transition-colors">
        {label}
      </span>
    </label>
  );
}

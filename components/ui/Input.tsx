import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-sage-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3
          bg-cream-100 border-2 border-sage-200
          rounded-lg
          text-sage-900 placeholder:text-sage-400
          focus:outline-none focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-200
          transition-all duration-200
          ${error ? 'border-terracotta-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-terracotta-600 mt-1">{error}</p>
      )}
    </div>
  );
}

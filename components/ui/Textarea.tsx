import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-royal-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3
          bg-cloud-100 border-2 border-royal-200
          rounded-lg
          text-royal-900 placeholder:text-royal-400
          focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200
          transition-all duration-200
          resize-none
          ${error ? 'border-orange-500' : ''}
          ${className}
        `}
        rows={4}
        {...props}
      />
      {error && (
        <p className="text-sm text-orange-600 mt-1">{error}</p>
      )}
    </div>
  );
}

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-cream-100 rounded-xl border-2 border-sage-200 p-6 ${className}`}>
      {children}
    </div>
  );
}

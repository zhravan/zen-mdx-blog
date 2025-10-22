import { ComponentProps } from 'react';

interface ShareButtonProps extends ComponentProps<'button'> {
  label: string;
  icon: React.ReactNode;
}

export function ShareButton({ label, icon, className = '', ...props }: ShareButtonProps) {
  const baseClasses = 'h-7 w-7 inline-flex items-center justify-center rounded-md border ' +
                     'border-gray-200 dark:border-gray-800 ' +
                     'hover:bg-gray-100 dark:hover:bg-gray-900 ' +
                     'transition-colors';
  
  return (
    <button
      type="button"
      aria-label={label}
      className={`${baseClasses} ${className}`.trim()}
      {...props}
    >
      {icon}
    </button>
  );
}

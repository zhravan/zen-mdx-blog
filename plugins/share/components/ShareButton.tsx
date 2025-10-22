import { ComponentProps, forwardRef } from 'react';

interface ShareButtonProps extends ComponentProps<'button'> {
  label: string;
  icon: React.ReactNode;
  as?: React.ElementType;
}

export const ShareButton = forwardRef<HTMLButtonElement, ShareButtonProps>(
  ({ as: Component = 'button', label, icon, className = '', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md ' +
                       'transition-colors hover:opacity-80 focus:outline-none ' +
                       'focus:ring-2 focus:ring-offset-2 focus:ring-primary';
    
    return (
      <Component
        ref={ref}
        type="button"
        aria-label={label}
        className={`${baseClasses} ${className}`.trim()}
        {...props}
      >
        {icon}
      </Component>
    );
  }
);

ShareButton.displayName = 'ShareButton';

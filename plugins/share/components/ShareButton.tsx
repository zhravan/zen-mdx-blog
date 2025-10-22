import type { ComponentType, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type OwnProps<E extends ElementType = ElementType> = {
  as?: E;
  label: string;
  icon: ReactNode;
  className?: string;
};

type ShareButtonProps<E extends ElementType> = OwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof OwnProps>;

export const ShareButton = <E extends ElementType = 'button'>({
  as,
  label,
  icon,
  className = '',
  ...props
}: ShareButtonProps<E>) => {
  const Component = as || 'button';
  const baseClasses = 'h-7 w-7 inline-flex items-center justify-center rounded-md border ' +
                      'border-gray-200 dark:border-gray-800 ' +
                      'hover:bg-gray-100 dark:hover:bg-gray-900 ' +
                      'transition-colors';

  return (
    <Component
      aria-label={label}
      className={`${baseClasses} ${className}`.trim()}
      {...props}
    >
      {icon}
    </Component>
  );
};

ShareButton.displayName = 'ShareButton';

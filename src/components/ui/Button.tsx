import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'icon';
  color?: 'primary' | 'danger' | 'gray';
  loading?: boolean;
  icon?: React.ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses = {
  default: 'bg-black text-white hover:bg-zinc-900',
  ghost: 'bg-transparent hover:bg-zinc-100',
  outline: 'border border-input bg-transparent hover:bg-accent',
};

const sizeClasses = {
  default: 'h-10 px-4 py-2',
  icon: 'h-10 w-10',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'default',
      size = 'default',
      loading = false,
      icon,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={clsx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          icon && <span className="mr-2">{icon}</span>
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Button;

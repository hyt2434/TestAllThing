import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        'flex h-10 w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-sm focus-ring',
        'pr-8 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

const SelectItem = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <option
      className={cn('relative flex w-full cursor-default select-none items-center py-1.5 pl-2 pr-8 text-sm outline-none', className)}
      ref={ref}
      {...props}
    >
      {children}
    </option>
  );
});

SelectItem.displayName = 'SelectItem';

export { Select, SelectItem };
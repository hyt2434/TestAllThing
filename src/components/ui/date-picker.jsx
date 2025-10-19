import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { cn } from '../../lib/utils';
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = forwardRef(({ className, ...props }, ref) => {
  return (
    <ReactDatePicker
      wrapperClassName={cn('block w-full', className)}
      className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-ring placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
      ref={ref}
    />
  );
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
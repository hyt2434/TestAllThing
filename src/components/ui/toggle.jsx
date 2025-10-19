import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Toggle = forwardRef(({ className, isChecked, onToggle, children, ...props }, ref) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      onClick={onToggle}
      className={cn(
        "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        isChecked ? "bg-primary" : "bg-muted",
        className
      )}
      {...props}
      ref={ref}
    >
      <span
        data-state={isChecked ? "checked" : "unchecked"}
        className={cn(
          "pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform",
          isChecked ? "translate-x-5" : "translate-x-0"
        )}
      >
        {children}
      </span>
    </button>
  );
});

Toggle.displayName = "Toggle";

export { Toggle };
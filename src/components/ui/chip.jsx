import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default: 'bg-muted text-foreground hover:bg-muted/80',
        primary: 'bg-primary/10 text-primary hover:bg-primary/20',
        active: 'bg-primary text-primary-foreground',
      },
      size: {
        sm: 'h-7 text-xs',
        md: 'h-8',
        lg: 'h-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

function Chip({ className, variant, size, ...props }) {
  return (
    <span className={cn(chipVariants({ variant, size }), className)} {...props} />
  );
}

export { Chip };
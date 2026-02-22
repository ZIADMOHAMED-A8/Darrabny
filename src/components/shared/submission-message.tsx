import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';

export default function SubmissionMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  // In case there is no Error Message then hide
  if (!children) return null;

  return (
    <p
      {...props}
      className={cn(
        'relative p-3 rounded-[0.625rem] text-sm text-center flex justify-center items-center text-red-600 dark:text-red-500 border border-red-600 dark:border-red-500 bg-white dark:bg-zinc-700 mt-4 ',
        className
      )}
    >
      {children}

      {/* Icon */}
      <CircleX
        size={18}
        strokeWidth={1.2}
        className="absolute bg-white dark:bg-zinc-700 text-red-600 dark:text-red-500 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </p>
  );
}

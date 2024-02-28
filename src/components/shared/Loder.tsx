import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={cn('flex items-center justify-center color-primary w-full h-[100vh]', className)}>
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
}

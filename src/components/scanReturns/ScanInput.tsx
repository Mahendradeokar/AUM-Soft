import { cn, fixedForwardRef } from '@/lib/utils';
import { ComponentProps, ForwardedRef } from 'react';

interface Props extends ComponentProps<'input'> {}

function ScanInput({ className, ...restProps }: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input
      type="text"
      placeholder=""
      className={cn(
        'flex h-10 m-auto w-[35ch] rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
        className,
      )}
      {...restProps}
      ref={ref}
    />
  );
}

export default fixedForwardRef(ScanInput);

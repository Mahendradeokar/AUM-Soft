import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

function Blink() {
  return <span className="animate-ping inline-flex h-4 w-4 mr-6 rounded-full bg-primary" />;
}

type Props = {
  isScanning: boolean;
  startScan: () => void;
  isInit: boolean;
} & ComponentPropsWithoutRef<'div'>;

export default function ScannerButton({ isScanning, startScan, isInit, className }: Props) {
  if (!isInit) {
    return (
      <Button size="lg" className={cn('grow-1 max-w-lg', className)} variant="default" onClick={startScan}>
        Start Scanning
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className={cn('grow-1 max-w-lg', className)}
      variant={isScanning ? 'outline' : 'destructive'}
      onClick={startScan}
    >
      {isScanning ? (
        <>
          <Blink /> Scanning...
        </>
      ) : (
        'Disconnected, Retry!'
      )}
    </Button>
  );
}

import { Button } from '../ui/button';

function Blink() {
  return <span className="animate-ping inline-flex h-4 w-4 mr-6 rounded-full bg-primary" />;
}

export default function ScannerButton({
  isScanning,
  startScan,
  isInit,
}: {
  isScanning: boolean;
  startScan: () => void;
  isInit: boolean;
}) {
  if (!isInit) {
    return (
      <Button size="lg" className="grow-1 max-w-lg" variant="default" onClick={startScan}>
        Start Scanning
      </Button>
    );
  }

  return (
    <Button size="lg" className="grow-1 max-w-lg" variant={isScanning ? 'outline' : 'destructive'} onClick={startScan}>
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

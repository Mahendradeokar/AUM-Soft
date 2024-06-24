import { Button } from '../ui/button';
import OrderTable from './CompleteOrderTable';
import ShowCounts from './ShowCount';

interface OrderManageProps {
  selectedReturnType: string | null;
  setSelectedReturnType: (returnType: string) => void;
  setStartScan: (startScan: boolean) => void;
}

export default function OrderManage({ selectedReturnType, setSelectedReturnType, setStartScan }: OrderManageProps) {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
      <ShowCounts />
      <div className="flex items-center justify-between space-y-2">
        <div className="flex gap-4 justify-center flex-1">
          {selectedReturnType ? (
            <Button size="lg" className="grow-1 w-full" onClick={() => setStartScan(true)}>
              Start Scanning
            </Button>
          ) : (
            <>
              <Button size="lg" className="grow-1 w-auto" onClick={() => setSelectedReturnType('Currier Return')}>
                Currier Return
              </Button>
              <Button size="lg" className="grow-1 w-auto" onClick={() => setSelectedReturnType('Customer Return')}>
                Customer Return
              </Button>
            </>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight">Outstanding Order&apos;s list!</h2>
        <p className="text-muted-foreground">Scan the outstanding order!</p>
      </div>
      <OrderTable />
    </div>
  );
}

type Props = {
  currentCount: number;
  totalCount: number;
};

export default function ShowCounts({ currentCount, totalCount }: Props) {
  return (
    <div className="p-4 text-center grid place-content-center">
      <div className="rounded-md">
        <div className="text-8xl font-bold">
          <span className="text-red-400">{currentCount}</span> / <span className="text-primary">{totalCount}</span>
        </div>
        <div className="text-lg mt-2">
          Return Order <span> / </span>Total Orders
        </div>
      </div>
    </div>
  );
}

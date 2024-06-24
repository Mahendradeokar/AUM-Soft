export default function ShowCounts({ currentCount = 10, totalCount = 20 }) {
  return (
    <div className="p-4 text-center grid place-content-center">
      <div className="rounded-md shadow-lg">
        <div className="text-8xl font-bold">
          <span className="text-green-400">{currentCount}</span> / <span className="">{totalCount}</span>
        </div>
        <div className="text-lg mt-2">Orders</div>
      </div>
    </div>
  );
}

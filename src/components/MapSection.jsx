import KrabiMap from './KrabiMap.jsx';

function MapSection({ selectedFilter }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <div className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Interactive map</p>
            <p className="text-base font-semibold text-slate-800">Tap pins to explore each JoinJoy route</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">Live map</span>
        </div>
        <div className="relative overflow-hidden rounded-xl ring-1 ring-slate-100">
          <KrabiMap selectedFilter={selectedFilter} />
        </div>
      </div>
    </div>
  );
}

export default MapSection;

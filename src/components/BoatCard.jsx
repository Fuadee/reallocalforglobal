function BoatCard({ boat }) {

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      const filled = boat.rating >= i - 0.2;
      const partial = !filled && boat.rating >= i - 0.7;
      const fillClass = filled ? 'text-amber-500' : 'text-amber-200';
      const gradientId = `star-${boat.name.replace(/\s+/g, '-').toLowerCase()}-${i}`;

      stars.push(
        <svg
          key={i}
          className={`h-4 w-4 ${fillClass}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          {partial ? (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="rgb(252 211 77 / 0.35)" />
              </linearGradient>
            </defs>
          ) : null}
          <path
            fill={partial ? `url(#${gradientId})` : 'currentColor'}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <article className="card-surface h-full overflow-hidden">
      <div className="relative">
        <img className="h-44 w-full object-cover" src={boat.image} alt={boat.name} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10" />
        <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20">
          {boat.type}
        </div>
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">{boat.name}</h3>
            <div
              className="flex items-center gap-2 text-sm text-slate-700"
              aria-label={`Rated ${boat.rating.toFixed(1)} out of 5`}
            >
              <div className="flex items-center gap-1">{renderStars()}</div>
              <span className="font-semibold text-slate-900">{boat.rating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-slate-600">Fits {boat.capacity} guests</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-xl font-semibold text-[#1877F2]">฿{boat.price}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {boat.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#f0f6ff] px-3 py-1 text-xs font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20">
              {tag}
            </span>
          ))}
        </div>
        <button className="w-full rounded-xl bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#1877F2]/30 transition hover:scale-[1.01]">
          View boat details
        </button>
      </div>
    </article>
  );
}

export default BoatCard;

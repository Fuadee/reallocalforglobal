function ExperienceCard({ experience }) {
  return (
    <div className="card-surface flex flex-col gap-4 p-6" aria-label={`Experience card: ${experience.title}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ff] text-lg text-[#1877F2] ring-1 ring-[#1877F2]/20">
          {experience.icon}
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide text-[#1877F2]">{experience.category}</p>
          <h3 className="text-lg font-semibold text-slate-900">{experience.title}</h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-slate-700">{experience.description}</p>
      <div className="flex flex-wrap gap-2">
        {experience.highlights.map((highlight) => (
          <span key={highlight} className="rounded-full bg-[#f0f6ff] px-3 py-1 text-xs font-semibold text-[#1877F2] ring-1 ring-[#1877F2]/20">
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ExperienceCard;

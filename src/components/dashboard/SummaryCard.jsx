function SummaryCard({ icon, label, value, description, tone = 'teal' }) {
  const tones = {
    teal: 'bg-[#e5f7f4] text-[#117b7b]',
    blue: 'bg-[#eaf2ff] text-[#3a67ad]',
    orange: 'bg-[#fff3df] text-[#bd7419]',
    red: 'bg-[#ffebeb] text-[#c84b55]',
  };

  return (
    <article className="card border border-slate-200 bg-white shadow-sm">
      <div className="card-body gap-3 p-5">
        <div className="flex items-start justify-between">
          <span className={`grid size-11 place-items-center rounded-2xl ${tones[tone]}`}>
            {icon}
          </span>
          <span className="text-xs font-medium text-slate-400">Este mes</span>
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-[#19304a]">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
      </div>
    </article>
  );
}

export default SummaryCard;

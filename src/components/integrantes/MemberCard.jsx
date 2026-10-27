import { CalendarDaysIcon, ChevronRightIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function formatDate(value) {
  if (!value) return 'Sin información';
  const [year, month, day] = value.slice(0, 10).split('-');
  return day && month && year ? `${day}/${month}/${year}` : value;
}

function displayValue(value) {
  return value ? value.replaceAll('_', ' ') : 'Sin información';
}

function MemberCard({ member, onOpen }) {
  const fullName = [member.nombre, member.apellidoPaterno, member.apellidoMaterno]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      onClick={() => onOpen(member.id)}
      className="group card min-h-80 border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#8dd5cd] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#15919a] focus:ring-offset-2"
    >
      <div className="card-body gap-5 p-6">
        <div className="flex items-start gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e5f7f4] text-[#126f7b]">
            <UserCircleIcon className="size-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold leading-tight text-[#19304a]">{fullName}</h2>
            <span className="mt-2 inline-flex rounded-full bg-[#f1faf8] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#126f7b]">
              {displayValue(member.parentesco)}
            </span>
          </div>
          <ChevronRightIcon className="size-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#15919a]" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DataItem label="Fecha de nacimiento" value={formatDate(member.fechaNacimiento)} icon={<CalendarDaysIcon />} />
          <DataItem label="Sexo" value={displayValue(member.sexo)} />
          <DataItem label="Tipo de sangre" value={displayValue(member.tipoSangre)} />
          <DataItem label="Fecha de registro" value={formatDate(member.fechaRegistro)} />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-semibold text-slate-500">Pulsa para ver y actualizar</span>
          <span className="text-sm font-bold text-[#126f7b]">Ver detalles</span>
        </div>
      </div>
    </button>
  );
}

function DataItem({ label, value, icon }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="flex items-center gap-1.5 text-xs text-slate-500">
        {icon && <span className="text-[#15919a] [&>svg]:size-4">{icon}</span>}
        {label}
      </p>
      <p className="mt-1 text-sm font-bold capitalize text-[#19304a]">{value}</p>
    </div>
  );
}

export default MemberCard;

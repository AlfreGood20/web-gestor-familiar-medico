import {
  ChevronRightIcon,
  HeartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

function MemberCard({ member, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(member)}
      className="card w-full border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#8dd5cd] hover:shadow-md"
    >
      <div className="card-body flex-row items-center gap-4 p-4">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e5f7f4] text-[#15919a]">
          <UserCircleIcon className="size-9" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-[#19304a]">{member.nombre}</h3>
          <p className="mt-1 text-sm text-slate-500">{member.parentesco}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="badge badge-ghost">{member.edad} años</span>
            <span className="badge badge-ghost">{member.tipoSangre}</span>
            {member.alertas > 0 && (
              <span className="badge bg-[#fff3df] text-[#bd7419]">{member.alertas} alerta</span>
            )}
          </div>
        </div>
        <ChevronRightIcon className="size-5 shrink-0 text-slate-400" aria-hidden="true" />
      </div>
    </button>
  );
}

export default MemberCard;

import { CheckCircleIcon, NoSymbolIcon, TrashIcon } from '@heroicons/react/24/outline';

function CaregiverCard({ caregiver, onToggleStatus, onDelete }) {
  const isActive = caregiver.estado === 'ACTIVO';
  const lastName = caregiver.apellidoMaterno || caregiver.aepllidoMaterno;

  return (
    <article className="card border border-slate-200 bg-white shadow-sm">
      <div className="card-body gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#19304a]">
              {caregiver.nombre} {caregiver.apellidoPaterno} {lastName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{caregiver.correo}</p>
          </div>
          <span className={`badge ${isActive ? 'badge-success' : 'badge-ghost'}`}>
            {caregiver.estado}
          </span>
        </div>
        <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <p><span className="font-semibold">Teléfono:</span> {caregiver.telefono || 'Sin teléfono'}</p>
          <p><span className="font-semibold">Rol:</span> {caregiver.rol}</p>
        </div>
        <div className="card-actions mt-1 flex-wrap">
          <button type="button" onClick={() => onToggleStatus(caregiver)} className="btn btn-outline btn-sm flex-1">
            {isActive ? <NoSymbolIcon className="size-4" /> : <CheckCircleIcon className="size-4" />}
            {isActive ? 'Poner inactivo' : 'Activar'}
          </button>
          <button type="button" onClick={() => onDelete(caregiver.id)} className="btn btn-error btn-sm text-white">
            <TrashIcon className="size-4" /> Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default CaregiverCard;

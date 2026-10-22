import { BeakerIcon, ChevronRightIcon, CubeIcon } from '@heroicons/react/24/outline';

function MedicationCard({ medication, onSelect }) {
  const medicationId = medication.id ?? medication.idMedicamento;

  return (
    <button type="button" onClick={() => onSelect(medicationId)} className="card border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#8dd5cd] hover:shadow-md">
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#e5f7f4] text-[#15919a]">
            <CubeIcon className="size-6" aria-hidden="true" />
          </span>
          <span className={`badge ${medication.activo === false ? 'badge-error' : 'badge-success'} badge-sm`}>
            {medication.activo === false ? 'Inactivo' : 'Activo'}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-[#19304a]">{medication.nombreComercial}</h3>
        <p className="text-sm text-slate-500">{medication.sustanciaActiva}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <span className="rounded-lg bg-slate-50 p-2 text-slate-600"><BeakerIcon className="mr-1 inline size-4 text-[#15919a]" />{medication.concentracion}</span>
          <span className="rounded-lg bg-slate-50 p-2 text-slate-600">{medication.formaFarmaceutica}</span>
        </div>
        <span className="mt-4 flex items-center justify-end gap-1 text-xs font-bold text-[#126f7b]">Ver detalle <ChevronRightIcon className="size-4" /></span>
      </div>
    </button>
  );
}

export default MedicationCard;

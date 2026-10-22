import { BeakerIcon, XMarkIcon } from '@heroicons/react/24/outline';

function MedicationDetailsPanel({ medication, loading, onClose }) {
  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform ${medication || loading ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#e5f7f4] text-[#15919a]"><BeakerIcon className="size-5" /></span>
            <h2 className="font-bold text-[#19304a]">Detalle del medicamento</h2>
          </div>
          <button type="button" onClick={onClose} className="btn btn-circle btn-ghost btn-sm"><XMarkIcon className="size-5" aria-label="Cerrar detalle" /></button>
        </div>
        {loading ? <div className="flex flex-1 items-center justify-center"><span className="loading loading-spinner text-[#15919a]" /></div> : medication && (
          <div className="space-y-5 overflow-y-auto p-6">
            <div><p className="text-xs font-bold uppercase tracking-wider text-[#15919a]">Medicamento</p><h3 className="mt-1 text-2xl font-bold text-[#19304a]">{medication.nombreComercial}</h3><p className="mt-1 text-slate-500">{medication.sustanciaActiva}</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Detail label="Concentración" value={medication.concentracion} />
              <Detail label="Forma farmacéutica" value={medication.formaFarmaceutica} />
              <Detail label="Vía de administración" value={medication.viaAdministracion} />
              <Detail label="Estado" value={medication.activo === false ? 'Inactivo' : 'Activo'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-bold text-[#19304a]">{value || 'Sin información'}</p></div>;
}

export default MedicationDetailsPanel;

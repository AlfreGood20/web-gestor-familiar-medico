import { BeakerIcon, XMarkIcon } from '@heroicons/react/24/outline';

function MedicationDetailsModal({ medication, loading, onClose }) {
  if (!medication && !loading) return null;

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="medication-detail-title">
      <div className="modal-box max-h-[90vh] max-w-2xl overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#e5f7f4] text-[#15919a]"><BeakerIcon className="size-5" /></span>
            <div><p className="text-xs font-bold uppercase tracking-wide text-[#15919a]">Catálogo</p><h2 id="medication-detail-title" className="font-bold text-[#19304a]">Detalle del medicamento</h2></div>
          </div>
          <button type="button" onClick={onClose} className="btn btn-circle btn-ghost btn-sm" aria-label="Cerrar detalle"><XMarkIcon className="size-5" /></button>
        </div>
        {loading ? <div className="flex min-h-72 items-center justify-center"><span className="loading loading-spinner loading-lg text-[#15919a]" /></div> : (
          <div className="max-h-[calc(90vh-6.5rem)] space-y-5 overflow-y-auto p-6">
            <div><p className="text-xs font-bold uppercase tracking-wider text-[#15919a]">Medicamento</p><h3 className="mt-1 text-2xl font-bold text-[#19304a]">{medication.nombreComercial}</h3><p className="mt-1 text-slate-500">{medication.sustanciaActiva || 'Sin sustancia activa registrada'}</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Detail label="Concentración" value={medication.concentracion} />
              <Detail label="Forma farmacéutica" value={medication.formaFarmaceutica} />
              <Detail label="Vía de administración" value={medication.viaAdministracion} />
              <Detail label="Estado" value={medication.activo === false ? 'Inactivo' : 'Activo'} />
            </div>
          </div>
        )}
      </div>
      <button type="button" className="modal-backdrop" aria-label="Cerrar detalle" onClick={onClose} />
    </div>
  );
}

function Detail({ label, value }) {
  return <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-bold capitalize text-[#19304a]">{value || 'Sin información'}</p></div>;
}

export default MedicationDetailsModal;

import { PencilSquareIcon, TrashIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AllergyForm from './AllergyForm';

function formatDate(value) {
  if (!value) return 'Sin información';
  const [year, month, day] = value.slice(0, 10).split('-');
  return day && month && year ? `${day}/${month}/${year}` : value;
}

function displayValue(value) {
  return value ? value.replaceAll('_', ' ') : 'Sin información';
}

function MemberDetailModal({
  member,
  loading,
  allergies,
  allergyType,
  allergiesLoading,
  allergySubmitting,
  onAddAllergy,
  onAllergyTypeChange,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!member && !loading) return null;

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="member-detail-title">
      <div className="modal-box flex max-h-[90vh] max-w-2xl flex-col overflow-hidden p-0">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#15919a]">Familia</p>
            <h2 id="member-detail-title" className="text-lg font-bold text-[#19304a]">Detalle del integrante</h2>
          </div>
          <button type="button" onClick={onClose} className="btn btn-circle btn-ghost btn-sm" aria-label="Cerrar detalle">
            <XMarkIcon className="size-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-80 flex-1 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-[#15919a]" />
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
              <div className="flex items-center gap-4">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e5f7f4] text-[#15919a]">
                  <UserCircleIcon className="size-9" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-[#19304a]">
                    {member.nombre} {member.apellidoPaterno} {member.apellidoMaterno}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{displayValue(member.parentesco)}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Fecha de nacimiento', formatDate(member.fechaNacimiento)],
                  ['Sexo', displayValue(member.sexo)],
                  ['Tipo de sangre', displayValue(member.tipoSangre)],
                  ['Registro', formatDate(member.fechaRegistro)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-bold capitalize text-[#19304a]">{value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-bold text-[#19304a]">Alergias</h4>
                {member.alergias?.length ? (
                  <div className="mt-2 space-y-2">
                    {member.alergias.map((allergy) => (
                      <div key={allergy.idAlergia} className="rounded-xl bg-red-50 p-3 text-sm">
                        <b>{allergy.nombre}</b>
                        <p>{allergy.tipo} · {allergy.severidad}</p>
                        {allergy.observaciones && <p className="text-xs">{allergy.observaciones}</p>}
                      </div>
                    ))}
                  </div>
                ) : <p className="mt-2 text-sm text-slate-500">Sin alergias registradas.</p>}
              </div>

              <AllergyForm
                allergies={allergies}
                allergyType={allergyType}
                allergiesLoading={allergiesLoading}
                submitting={allergySubmitting}
                onTypeChange={onAllergyTypeChange}
                onSubmit={onAddAllergy}
              />
            </div>

            <div className="flex shrink-0 gap-2 border-t border-slate-100 bg-white px-6 py-4">
              <button type="button" onClick={() => onEdit(member)} className="btn btn-outline flex-1">
                <PencilSquareIcon className="size-4" /> Actualizar
              </button>
              <button type="button" onClick={() => onDelete(member.id)} className="btn btn-error flex-1 text-white">
                <TrashIcon className="size-4" /> Eliminar
              </button>
            </div>
          </>
        )}
      </div>
      <button type="button" className="modal-backdrop" aria-label="Cerrar detalle" onClick={onClose} />
    </div>
  );
}

export default MemberDetailModal;

import { CalendarDaysIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { bloodTypes, relationships } from './memberOptions';

function MemberForm({ value, editing, submitting, onChange, onSubmit, onCancel }) {
  const field = (name) => ({ name, value: value[name], onChange });
  return (
    <div className={editing ? 'modal modal-open' : ''} role={editing ? 'dialog' : undefined} aria-modal={editing ? 'true' : undefined}>
      <form onSubmit={onSubmit} className={editing ? 'modal-box max-h-[90vh] max-w-2xl overflow-y-auto border border-slate-200 bg-white p-0 shadow-sm' : 'card border border-slate-200 bg-white shadow-sm'}>
        <div className="card-body p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#19304a]">{editing ? 'Actualizar integrante' : 'Nuevo integrante'}</h2>
          <button type="button" onClick={onCancel} className="btn btn-circle btn-ghost btn-sm"><XMarkIcon className="size-5" /></button>
        </div>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Nombre" icon={<UserIcon />} required {...field('nombre')} />
          <Field label="Apellido paterno" required {...field('apellidoPaterno')} />
          <Field label="Apellido materno" required {...field('apellidoMaterno')} />
          <Field label="Fecha de nacimiento" type="date" icon={<CalendarDaysIcon />} required {...field('fechaNacimiento')} />
          <Select label="Sexo" required {...field('sexo')} options={['MASCULINO', 'FEMENINO']} />
          <Select label="Tipo de sangre" required {...field('tipoSangre')} options={bloodTypes} />
        </div>
        <Select label="Parentesco" required {...field('parentesco')} options={relationships} />
        <button disabled={submitting} className="btn w-full border-0 bg-[#126f7b] text-white hover:bg-[#0b5d69]">
          {submitting && <span className="loading loading-spinner loading-sm" />} {editing ? 'Guardar cambios' : 'Crear integrante'}
        </button>
        </div>
      </form>
      {editing && <button type="button" className="modal-backdrop" aria-label="Cerrar formulario" onClick={onCancel} />}
    </div>
  );
}

function Field({ label, icon, ...props }) {
  return <label className="label mb-3 block p-0"><span className="label-text mb-1.5 block font-bold text-[#29425d]">{label}</span><span className="input input-bordered flex items-center gap-2 bg-white focus-within:outline-[#15919a]">{icon && <span className="text-[#15919a] [&>svg]:size-5">{icon}</span>}<input className="grow" {...props} /></span></label>;
}

function Select({ label, options, ...props }) {
  return <label className="label mb-3 block p-0"><span className="label-text mb-1.5 block font-bold text-[#29425d]">{label}</span><select className="select select-bordered w-full bg-white focus:outline-[#15919a]" {...props}><option value="">Selecciona una opción</option>{options.map((option) => <option key={option} value={option}>{option.replaceAll('_', ' ')}</option>)}</select></label>;
}

export default MemberForm;

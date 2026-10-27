import { LockClosedIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';

function CaregiverForm({ value, submitting, onChange, onSubmit, onCancel }) {
  const field = (name) => ({ name, value: value[name], onChange, required: true });

  return (
    <form onSubmit={onSubmit} className="card border border-slate-200 bg-white shadow-sm">
      <div className="card-body p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#19304a]">Nuevo cuidador</h2>
            <p className="text-sm text-slate-500">Dale acceso a una persona de confianza.</p>
          </div>
          <button type="button" onClick={onCancel} className="btn btn-ghost btn-sm">Cancelar</button>
        </div>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Nombre" icon={<UserIcon />} {...field('nombre')} />
          <Field label="Apellido paterno" {...field('apellidoPaterno')} />
          <Field label="Apellido materno" {...field('apellidoMaterno')} />
          <Field label="Teléfono" type="tel" icon={<PhoneIcon />} {...field('telefono')} />
        </div>
        <Field label="Correo electrónico" type="email" {...field('correo')} />
        <Field label="Contraseña temporal" type="password" icon={<LockClosedIcon />} {...field('contrasena')} />
        <button disabled={submitting} className="btn w-full border-0 bg-[#126f7b] text-white hover:bg-[#0b5d69]">
          {submitting && <span className="loading loading-spinner loading-sm" />}
          {submitting ? 'Creando...' : 'Crear cuidador'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, icon, ...props }) {
  return (
    <label className="label mb-3 block p-0">
      <span className="label-text mb-1.5 block font-bold text-[#29425d]">{label}</span>
      <span className="input input-bordered flex items-center gap-2 bg-white focus-within:outline-[#15919a]">
        {icon && <span className="text-[#15919a] [&>svg]:size-5">{icon}</span>}
        <input className="grow" {...props} />
      </span>
    </label>
  );
}

export default CaregiverForm;

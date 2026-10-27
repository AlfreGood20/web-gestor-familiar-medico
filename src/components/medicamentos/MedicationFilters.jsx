import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const forms = ['TABLETA', 'CAPSULA', 'JARABE', 'SUSPENSION', 'GOTAS', 'INYECCION', 'CREMA', 'POMADA', 'INHALADOR', 'SUPOSITORIO', 'PARCHE', 'OTRA'];
const routes = ['ORAL', 'TOPICA', 'INYECTABLE', 'OFTALMICA', 'OTICA', 'NASAL', 'INHALADA', 'RECTAL', 'SUBLINGUAL', 'OTRA'];

function MedicationFilters({ filters, onChange, onSubmit, onClear }) {
  return (
    <form onSubmit={onSubmit} className="card border border-slate-200 bg-white shadow-sm">
      <div className="card-body p-5">
        <div className="mb-4 flex items-center gap-2 text-[#19304a]">
          <FunnelIcon className="size-5 text-[#15919a]" aria-hidden="true" />
          <div>
            <h2 className="font-bold">Filtrar medicamentos</h2>
            <p className="text-xs font-normal text-slate-500">La búsqueda se actualiza mientras escribes.</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <label className="input input-bordered flex items-center gap-2 bg-white lg:col-span-2">
            <MagnifyingGlassIcon className="size-5 text-slate-400" aria-hidden="true" />
            <input name="nombreComercial" value={filters.nombreComercial} onChange={onChange} className="grow" placeholder="Nombre comercial" />
          </label>
          <input name="sustanciaActiva" value={filters.sustanciaActiva} onChange={onChange} className="input input-bordered bg-white" placeholder="Sustancia activa" />
          <select name="formaFarmaceutica" value={filters.formaFarmaceutica} onChange={onChange} className="select select-bordered bg-white">
            <option value="">Forma farmacéutica</option>
            {forms.map((form) => <option key={form} value={form}>{form}</option>)}
          </select>
          <select name="viaAdministracion" value={filters.viaAdministracion} onChange={onChange} className="select select-bordered bg-white">
            <option value="">Vía de administración</option>
            {routes.map((route) => <option key={route} value={route}>{route}</option>)}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="label cursor-pointer justify-start gap-2 p-0">
            <input type="checkbox" name="activo" checked={filters.activo} onChange={onChange} className="checkbox checkbox-sm [--chkbg:#15919a] [--chkfg:white]" />
            <span className="label-text text-sm text-slate-600">Solo medicamentos activos</span>
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={onClear} className="btn btn-ghost btn-sm">Limpiar</button>
            <button type="submit" className="btn btn-sm border-0 bg-[#126f7b] text-white hover:bg-[#0b5d69]">Buscar</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MedicationFilters;

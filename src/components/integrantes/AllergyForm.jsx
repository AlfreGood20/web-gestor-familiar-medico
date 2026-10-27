import { useState } from 'react';

const allergyTypes = ['MEDICAMENTO', 'ALIMENTO', 'AMBIENTAL', 'CONTACTO', 'INSECTO', 'OTRA', 'SIN_DEFINIR'];
const severities = ['LEVE', 'MODERADA', 'GRAVE'];

function AllergyForm({ allergies, allergyType, allergiesLoading, submitting, onTypeChange, onSubmit }) {
  const [data, setData] = useState({
    idAlergia: '',
    severidad: 'LEVE',
    observaciones: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
  };

  const handleTypeChange = (event) => {
    setData((current) => ({ ...current, idAlergia: '' }));
    onTypeChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      idAlergia: Number(data.idAlergia),
      severidad: data.severidad,
      observaciones: data.observaciones,
    });
    setData({ idAlergia: '', severidad: 'LEVE', observaciones: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-red-100 bg-red-50/50 p-4">
      <h4 className="font-bold text-[#19304a]">Agregar alergia</h4>
      <div className="mt-3 space-y-3">
        <select
          value={allergyType}
          onChange={handleTypeChange}
          className="select select-bordered w-full bg-white"
          required
        >
          <option value="">Selecciona un tipo</option>
          {allergyTypes.map((type) => (
            <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>
          ))}
        </select>
        <select
          name="idAlergia"
          value={data.idAlergia}
          onChange={handleChange}
          className="select select-bordered w-full bg-white"
          required
          disabled={!allergyType || allergiesLoading}
        >
          <option value="">
            {allergiesLoading ? 'Cargando alergias...' : allergyType ? 'Selecciona una alergia' : 'Primero selecciona un tipo'}
          </option>
          {allergies.map((allergy) => (
            <option key={allergy.id} value={allergy.id}>
              {allergy.nombre}
            </option>
          ))}
        </select>
        <select
          name="severidad"
          value={data.severidad}
          onChange={handleChange}
          className="select select-bordered w-full bg-white"
          required
        >
          {severities.map((severity) => (
            <option key={severity} value={severity}>{severity}</option>
          ))}
        </select>
        <textarea
          name="observaciones"
          value={data.observaciones}
          onChange={handleChange}
          className="textarea textarea-bordered w-full bg-white"
          placeholder="Observaciones (opcional)"
          rows="2"
        />
        <button
          type="submit"
          disabled={submitting || allergiesLoading || allergies.length === 0}
          className="btn btn-sm w-full border-0 bg-[#126f7b] text-white hover:bg-[#0b5d69]"
        >
          {submitting && <span className="loading loading-spinner loading-xs" />}
          Guardar alergia
        </button>
      </div>
    </form>
  );
}

export default AllergyForm;

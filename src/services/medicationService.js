const API_URL = 'http://localhost:8080';

export async function getMedicamentos(filters = {}) {
  const params = new URLSearchParams({
    page: String(filters.page ?? 0),
    size: String(filters.size ?? 15),
    sort: 'nombreComercial,ASC',
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (key !== 'page' && key !== 'size' && value !== '' && value !== undefined && value !== null) {
      params.set(key, String(value));
    }
  });

  // CONSUMO DE API: listado global de medicamentos con filtros y paginación.
  const response = await fetch(`${API_URL}/medicamentos?${params.toString()}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Error al obtener medicamentos: ${response.status}`);
  }

  return response.json();
}

export async function getMedicamentoById(idMedicamento) {
  // CONSUMO DE API: detalle de un medicamento global.
  const response = await fetch(`${API_URL}/medicamentos/${idMedicamento}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Error al obtener el medicamento: ${response.status}`);
  }

  return response.json();
}

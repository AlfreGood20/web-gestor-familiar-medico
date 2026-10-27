const API_URL = 'http://localhost:8080';

async function parseResponse(response, message) {
  if (!response.ok) throw new Error(`${message}: ${response.status}`);
  return response.status === 204 ? null : response.json();
}

export async function getIntegrantes() {
  // CONSUMO DE API: obtiene los integrantes de la familia autenticada.
  return parseResponse(
    await fetch(`${API_URL}/integrantes`, { credentials: 'include' }),
    'Error al obtener integrantes',
  );
}

export async function getIntegranteById(idIntegrante) {
  // CONSUMO DE API: obtiene el detalle y las alergias del integrante.
  return parseResponse(
    await fetch(`${API_URL}/integrantes/${idIntegrante}`, { credentials: 'include' }),
    'Error al obtener el integrante',
  );
}

export async function createIntegrante(data) {
  // CONSUMO DE API: crea un integrante para la familia autenticada.
  return parseResponse(await fetch(`${API_URL}/integrantes`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), 'Error al crear integrante');
}

export async function updateIntegrante(idIntegrante, data) {
  // CONSUMO DE API: actualiza los datos básicos del integrante.
  return parseResponse(await fetch(`${API_URL}/integrantes/${idIntegrante}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), 'Error al actualizar integrante');
}

export async function deleteIntegrante(idIntegrante) {
  // CONSUMO DE API: elimina el integrante; el endpoint responde 204.
  return parseResponse(await fetch(`${API_URL}/integrantes/${idIntegrante}`, {
    method: 'DELETE',
    credentials: 'include',
  }), 'Error al eliminar integrante');
}

export async function getAlergias(filters = {}) {
  const params = new URLSearchParams();
  if (filters.nombre) params.set('nombre', filters.nombre);
  if (filters.tipo) params.set('tipo', filters.tipo);
  const query = params.toString();

  // CONSUMO DE API: obtiene el catálogo global de alergias.
  return parseResponse(
    await fetch(`http://localhost:8080/alergia${query ? `?${query}` : ''}`, {
      credentials: 'include',
    }),
    'Error al obtener alergias',
  );
}

export async function addAlergiaToIntegrante(idIntegrante, data) {
  // CONSUMO DE API: asigna una alergia al integrante.
  return parseResponse(await fetch(`http://localhost:8080/integrantes/${idIntegrante}/alergias`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }), 'Error al agregar alergia');
}

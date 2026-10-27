const API_URL = 'http://localhost:8080';

async function parseResponse(response, defaultMessage) {
  if (!response.ok) {
    let message = defaultMessage;
    try {
      const body = await response.json();
      message = body.message || body.error || message;
    } catch {
      // Algunas respuestas de error no contienen JSON.
    }
    throw new Error(message);
  }
  return response.status === 204 ? null : response.json();
}

export async function getCuidadores() {
  // CONSUMO DE API: GET /usuarios/cuidadores.
  return parseResponse(
    await fetch(`${API_URL}/usuarios/cuidadores`, { credentials: 'include' }),
    'No se pudieron cargar los cuidadores',
  );
}

export async function createCuidador(data) {
  // CONSUMO DE API: POST /usuarios/cuidadores.
  return parseResponse(
    await fetch(`${API_URL}/usuarios/cuidadores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    }),
    'No se pudo crear el cuidador',
  );
}

export async function updateCuidadorEstado(idCuidador, estado) {
  // CONSUMO DE API: PATCH /usuarios/cuidadores/{idCuidador}/estado.
  return parseResponse(
    await fetch(`${API_URL}/usuarios/cuidadores/${idCuidador}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ estado }),
    }),
    'No se pudo actualizar el estado del cuidador',
  );
}

export async function deleteCuidador(idCuidador) {
  // CONSUMO DE API: DELETE /usuarios/cuidadores/{idCuidador}.
  return parseResponse(
    await fetch(`${API_URL}/usuarios/cuidadores/${idCuidador}`, {
      method: 'DELETE',
      credentials: 'include',
    }),
    'No se pudo eliminar el cuidador',
  );
}

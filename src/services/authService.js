
const API_URL = 'http://localhost:8080';

export async function postLogin(data) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error de autenticación: ${response.status}`);
  }

  return response;
}

export async function postRegistro(data) {
  
  const response = await fetch(`${API_URL}/auth/registro`,{
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  })

  return response;
}
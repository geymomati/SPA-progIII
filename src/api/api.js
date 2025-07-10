// src/api/api.js

export async function login({ email, password }) {
  // Simula un retardo de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock simple: si email es "admin@admin.com" y password es "1234", login ok
  if (email === 'admin@admin.com' && password === '123456') {
    return {
      data: {
        token: 'mocked-jwt-token-1234567890'
      }
    }
  } else {
    // simula error de autenticacion
    const error = new Error('Credenciales incorrectas')
    error.response = { status: 401 }
    throw error
  }
}

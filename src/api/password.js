import axiosInstance from './axios'

export async function requestPasswordReset(email) {
  return axiosInstance.post('/api/Auth/request-password-reset', { email })
}

export async function resetPassword(token, newPassword) {
  return axiosInstance.post('/api/Auth/reset-password', { token, newPassword })
}

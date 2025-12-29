// src/api/apiClient.ts
import axios from 'axios'
// const domain = 'http://localhost/AJ/packiyo-new/public/api/storefront/'
// const store = 'ahlansahlan'
// const base_url = domain + store
// const base_url_default = 'http://127.0.0.1:8000/api'

// Read from Vite environment variables
const baseURL =
  import.meta.env.VITE_BASE_URL_API ||
  'http://127.0.0.1:8000/api/storefront' // fallback

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
})

// Optional: Add interceptors for auth or error logging
apiClient.interceptors.request.use(
  (config) => {
    // Example: attach auth token if available
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    // You can handle specific error codes globally
    if (error.response?.status === 401) {
      // e.g., redirect to login or refresh token
      console.warn('Unauthorized - redirect to login')
    }
    return Promise.reject(error)
  }
)

export default apiClient

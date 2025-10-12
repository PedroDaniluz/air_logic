import axios from 'axios'
import { Reading } from '../types/readings'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

// Interceptor para adicionar JWT, exceto em rotas públicas
api.interceptors.request.use(
  async (config) => {
    if (
      config.url?.includes('/auth/register') ||
      config.url?.includes('/auth/login')
    ) {
      return config
    }
    const token = await AsyncStorage.getItem('jwt')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const register = async (username: string, password: string) => {
  await api.post('/auth/register', {
    username,
    password,
  })
}

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', {
    username,
    password,
  })
  return response.data
}

export const getSensorReadings = async (): Promise<Reading[]> => {
  const response = await api.get('/readings')
  return response.data
}

export const getSensorReadingsById = async (
  sensorId: string
): Promise<Reading[]> => {
  const response = await api.get('/readings/' + sensorId)
  return response.data
}

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AuthResponse, LoginCredentials, RegisterData, User, ApiError } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor: Adjuntar token JWT
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor: Manejar errores globales
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expirado o inválido
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        
        // Log del error para debugging
        console.error('Error en API:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          message: error.message,
          data: error.response?.data
        });
        
        return Promise.reject(this.formatError(error));
      }
    );
  }

  private formatError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      message: 'Ha ocurrido un error',
      status: error.response?.status,
    };

    if (error.response?.data) {
      const data = error.response.data as any;
      if (data.message) {
        apiError.message = data.message;
      } else if (data.error) {
        apiError.message = data.error;
      } else if (typeof data === 'string') {
        apiError.message = data;
      }
      
      if (data.errors) {
        apiError.errors = data.errors;
      }
    } else if (error.request) {
      apiError.message = 'No se pudo conectar con el servidor';
    } else {
      apiError.message = error.message || 'Error desconocido';
    }

    return apiError;
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/api/auth/login', credentials);
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/api/auth/register', data);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await this.api.get<User>('/api/auth/profile');
    return response.data;
  }

  // User endpoints
  async getUsers(): Promise<User[]> {
    const response = await this.api.get<User[]>('/api/users');
    // Asegurar que siempre devolvemos un array
    return Array.isArray(response.data) ? response.data : [];
  }

  async createUser(data: RegisterData): Promise<User> {
    const response = await this.api.post<User>('/api/users', data);
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.api.get<User>(`/api/users/${id}`);
    return response.data;
  }
}

export const apiService = new ApiService();


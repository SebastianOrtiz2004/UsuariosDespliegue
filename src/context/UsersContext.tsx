import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, RegisterData, ApiError } from '@/types';
import { apiService } from '@/services/api';

interface UsersContextType {
  users: User[];
  loading: boolean;
  error: ApiError | null;
  fetchUsers: () => Promise<void>;
  createUser: (data: RegisterData) => Promise<void>;
  clearError: () => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers debe usarse dentro de UsersProvider');
  }
  return context;
};

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUsers();
      // Asegurar que siempre sea un array
      const usersArray = Array.isArray(data) ? data : [];
      setUsers(usersArray);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      // En caso de error, asegurar que users sea un array vacío
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: RegisterData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await apiService.createUser(data);
      // Actualizar la lista inmediatamente con el nuevo usuario
      setUsers((prev) => {
        // Asegurar que prev sea un array
        const prevArray = Array.isArray(prev) ? prev : [];
        // Verificar que el usuario no esté ya en la lista
        const exists = prevArray.some(u => u.id === newUser.id || u.email === newUser.email);
        if (exists) {
          return prevArray;
        }
        return [...prevArray, newUser];
      });
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = (): void => {
    setError(null);
  };

  const value: UsersContextType = {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    clearError,
  };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};


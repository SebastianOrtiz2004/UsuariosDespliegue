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
      setUsers(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: RegisterData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await apiService.createUser(data);
      setUsers((prev) => [...prev, newUser]);
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


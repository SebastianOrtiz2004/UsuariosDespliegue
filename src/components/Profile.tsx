import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorAlert } from './ErrorAlert';
import { SuccessAlert } from './SuccessAlert';
import './Profile.css';

export const Profile: React.FC = () => {
  const { user, loading, updateProfile, logout, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    clearError();
    try {
      await updateProfile();
      setSuccessMessage('Perfil actualizado');
    } catch (err) {
      // Error manejado por el contexto
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Mi Perfil</h1>

        <ErrorAlert error={error} onClose={clearError} />
        {successMessage && (
          <SuccessAlert 
            message={successMessage} 
            onClose={() => setSuccessMessage(null)} 
          />
        )}

        <div className="profile-content">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <div className="info-item">
              <label>ID:</label>
              <p>{user.id}</p>
            </div>

            <div className="info-item">
              <label>Nombre:</label>
              <p>{user.name}</p>
            </div>

            <div className="info-item">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>

            {user.createdAt && (
              <div className="info-item">
                <label>Fecha de Registro:</label>
                <p>{new Date(user.createdAt).toLocaleString()}</p>
              </div>
            )}

            {user.updatedAt && (
              <div className="info-item">
                <label>Última Actualización:</label>
                <p>{new Date(user.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? <LoadingSpinner size="small" /> : 'Actualizar Perfil'}
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};


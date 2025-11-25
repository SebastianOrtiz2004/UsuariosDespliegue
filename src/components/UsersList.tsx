import React, { useEffect, useState } from 'react';
import { useUsers } from '@/context/UsersContext';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorAlert } from './ErrorAlert';
import { SuccessAlert } from './SuccessAlert';
import './UsersList.css';

export const UsersList: React.FC = () => {
  const { users, loading, error, fetchUsers, createUser, clearError } = useUsers();
  const { isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();
    setSuccessMessage(null);

    try {
      await createUser(formData);
      setSuccessMessage('Usuario creado exitosamente');
      setFormData({ name: '', email: '', password: '' });
      setShowForm(false);
      // Recargar la lista de usuarios después de crear
      // Esperar un momento para asegurar que el backend haya procesado la creación
      setTimeout(async () => {
        await fetchUsers();
      }, 300);
    } catch (err: any) {
      console.error('Error al crear usuario:', err);
      // El error ya está manejado por el contexto y se mostrará en ErrorAlert
      // Pero asegurémonos de que se muestre
      if (err && err.message) {
        console.error('Mensaje de error:', err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="users-list-container">
        <p>Por favor, inicia sesión para ver los usuarios.</p>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="users-list-header">
        <h1>Lista de Usuarios</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Crear Usuario'}
        </button>
      </div>

      {showForm && (
        <div className="create-user-form">
          <h2>Crear Nuevo Usuario</h2>
          <form onSubmit={handleSubmit}>
            {error && (
              <ErrorAlert error={error} onClose={clearError} />
            )}
            {successMessage && (
              <SuccessAlert 
                message={successMessage} 
                onClose={() => setSuccessMessage(null)} 
              />
            )}

            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isSubmitting}
                minLength={6}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner size="small" /> : 'Crear Usuario'}
            </button>
          </form>
        </div>
      )}

      {!showForm && (
        <>
          <ErrorAlert error={error} onClose={clearError} />
          
          {loading && (!users || users.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <LoadingSpinner />
              <p style={{ marginTop: '1rem', color: '#666' }}>Cargando usuarios...</p>
            </div>
          ) : (
            <div className="users-grid">
              {!Array.isArray(users) || users.length === 0 ? (
                <p className="empty-state">No hay usuarios registrados</p>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <p>{user.email}</p>
                      {user.createdAt && (
                        <small>
                          Creado: {new Date(user.createdAt).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};


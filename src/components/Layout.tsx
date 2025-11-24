import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-content">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h1>UserHub</h1>
            </div>
          </Link>
          <nav className="nav">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className={isActive('/') ? 'nav-link active' : 'nav-link'}
                >
                  Usuarios
                </Link>
                <Link 
                  to="/profile" 
                  className={isActive('/profile') ? 'nav-link active' : 'nav-link'}
                >
                  Perfil
                </Link>
                <div className="user-menu">
                  <span className="user-name">{user?.name}</span>
                  <button className="btn-logout" onClick={handleLogout}>
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={isActive('/login') ? 'nav-link active' : 'nav-link'}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className={isActive('/register') ? 'nav-link active' : 'nav-link'}
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 UserHub - Sistema de Gestión de Usuarios</p>
      </footer>
    </div>
  );
};


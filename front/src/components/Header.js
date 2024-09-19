import React, { useContext } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../contexts/UserContext';

const Header = ({ onScrollToProducts, onScrollToAbout, onScrollToContact }) => {
  const { currentUser } = useContext(UserContext); // Obtener el usuario actual del contexto

  return (
    <header>
      <div className="logo">
        <h1>MiDulceOnline</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <i className="fas fa-home"></i>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="#" onClick={onScrollToProducts}>
              <i className="fas fa-shopping-bag"></i>
              Productos
            </Link>
          </li>
          <li>
            <Link to="#" onClick={onScrollToAbout}>
              <i className="fas fa-info-circle"></i>
              Acerca de
            </Link>
          </li>
          <li>
            <Link to="#" onClick={onScrollToContact}>
              <i className="fas fa-envelope"></i>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
      <div className="auth">
        {!currentUser ? (
          <Link to="./Login" className="login">
            Iniciar sesión
          </Link>
        ) : (
          <>
            {currentUser.rol === 'Cliente' && (
              <>
                {/* Icono de administrar cuenta */}
                <Link to="/administrar-cuenta" className="manage-account">
                  <i className="fas fa-user-cog"></i> Perfil
                </Link>
              </>
            )}
            {currentUser.rol === 'Vendedor' && (
              <Link to="/dashboard-vendedor" className="vendor-panel">
                Panel Vendedor
              </Link>
            )}
            {currentUser.rol === 'Administrador' && (
              <Link to="/dashboard-admin" className="admin-dashboard">
                Panel Administrador
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

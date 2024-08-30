import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onScrollToProducts, onScrollToAbout, onScrollToContact }) => {
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
        <Link to="./Login" className="login">
          <i className="fas fa-user"></i>
          Iniciar sesión
        </Link>
        <Link to="#" className="register">
          <i className="fas fa-shopping-cart"></i>
          Agregar producto
        </Link>
      </div>
    </header>
  );
};

export default Header;

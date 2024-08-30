import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="links">
          <h3>Enlaces útiles</h3>
          <ul>
            <li><Link to="#">Inicio</Link></li>
            <li><Link to="#">Productos</Link></li>
            <li><Link to="#">Contacto</Link></li>
          </ul>
        </div>
        <div className="social">
          <h3>Redes sociales</h3>
          <ul>
            <li><Link to="#"><i className="fab fa-facebook"></i> Facebook</Link></li>
            <li><Link to="#"><i className="fab fa-twitter"></i> Twitter</Link></li>
            <li><Link to="#"><i className="fab fa-instagram"></i> Instagram</Link></li>
          </ul>
        </div>
        <div className="contact">
          <h3>Contáctanos</h3>
          <p>Dirección: Calle 123, Ciudad</p>
          <p>Teléfono: 555-555-5555</p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2024 Example.com. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

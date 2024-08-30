import React, { forwardRef } from 'react';
import './About.css';

const About = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="about-section">
      <div className="about-content">
        <img 
          src="https://images.unsplash.com/photo-1560957122-6d2333d76f00?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Reemplaza con la URL de la imagen que desees
          alt="Dulces Colombianos" 
          className="about-image" 
        />
        <div className="about-text">
          <h2>Acerca de Nosotros</h2>
          <p>
            Somos una tienda dedicada a la venta de dulces típicos colombianos, ofreciendo una variedad de productos que representan la rica cultura y tradiciones de nuestro país.
            Nuestros dulces son elaborados con ingredientes de alta calidad y siguiendo recetas tradicionales que han sido transmitidas de generación en generación.
          </p>
          <p>
            En MiDulceOnline, nos esforzamos por brindar la mejor experiencia de compra a nuestros clientes, asegurándonos de que cada dulce que ofrecemos sea una delicia para el paladar.
          </p>
        </div>
      </div>
    </section>
  );
});

export default About;

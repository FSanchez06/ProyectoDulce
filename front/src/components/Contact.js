import React, { forwardRef } from 'react';
import './Contact.css';

const Contact = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="contact-section">
      <h2>Contáctanos</h2>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" id="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" rows="4" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
});

export default Contact;

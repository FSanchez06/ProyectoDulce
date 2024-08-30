import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveSection }) => {
    return (
        <nav className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li onClick={() => setActiveSection('usuarios')}>
                    <i className="fas fa-users"></i> Usuarios
                </li>
                <li onClick={() => setActiveSection('productos')}>
                    <i className="fas fa-box"></i> Productos
                </li>
                <li onClick={() => setActiveSection('ventas')}>
                    <i className="fas fa-shopping-cart"></i> Ventas
                </li>
                <li onClick={() => setActiveSection('pedidos')}>
                    <i className="fas fa-receipt"></i> Pedidos
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;

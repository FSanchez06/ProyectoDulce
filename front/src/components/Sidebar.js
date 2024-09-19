import React, { useContext } from 'react';
import './Sidebar.css';
import { UserContext } from '../contexts/UserContext'; // Importa el contexto

const Sidebar = ({ setActiveSection }) => {
    const { currentUser } = useContext(UserContext); // Obtener el usuario actual del contexto

    return (
        <nav className="sidebar">
            <h2>Dashboard</h2>
            <ul>
                {/* Siempre mostrar perfil */}
                <li onClick={() => setActiveSection('perfil')}>
                    <i className="fas fa-user"></i> Perfil
                </li>

                {/* Mostrar usuarios solo si es Administrador */}
                {currentUser.rol === 'Administrador' && (
                    <li onClick={() => setActiveSection('usuarios')}>
                        <i className="fas fa-users"></i> Usuarios
                    </li>
                )}

                {/* Mostrar productos solo si es Administrador */}
                {currentUser.rol === 'Administrador' && (
                    <li onClick={() => setActiveSection('productos')}>
                        <i className="fas fa-box"></i> Productos
                    </li>
                )}

                {/* Mostrar ventas solo si es Vendedor o Administrador */}
                {(currentUser.rol === 'Vendedor' || currentUser.rol === 'Administrador') && (
                    <li onClick={() => setActiveSection('ventas')}>
                        <i className="fas fa-shopping-cart"></i> Ventas
                    </li>
                )}

                {/* Mostrar pedidos para todos los roles */}
                {(currentUser.rol === 'Vendedor' || currentUser.rol === 'Administrador' || currentUser.rol === 'Cliente') && (
                    <li onClick={() => setActiveSection('pedidos')}>
                        <i className="fas fa-receipt"></i> Pedidos
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Sidebar;

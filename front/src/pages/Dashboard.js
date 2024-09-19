import React, { useState, useContext } from 'react';
import './Dashboard.css';
import Usuarios from '../components/Usuarios';
import Productos from '../components/Productos';
import Ventas from '../components/Ventas';
import Pedidos from '../components/Pedidos';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../contexts/UserContext'; // Importa el contexto
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { currentUser } = useContext(UserContext); // Obtener el usuario actual del contexto
    const [activeSection, setActiveSection] = useState('perfil'); // Sección activa por defecto

    const renderSection = () => {
        switch (activeSection) {
            case 'perfil':
                return (
                    <div>
                        <h2>Perfil de Usuario</h2>
                        <p>Nombre: {currentUser.nombre}</p>
                        <p>Correo: {currentUser.correo}</p>
                        {/* Aquí puedes agregar un formulario para editar el perfil */}
                    </div>
                );
            case 'usuarios':
                return currentUser.rol === 'Administrador' ? <Usuarios /> : null;
            case 'productos':
                return currentUser.rol === 'Administrador' ? <Productos /> : null;
            case 'ventas':
                return currentUser.rol === 'Vendedor' || currentUser.rol === 'Administrador' ? <Ventas /> : null;
            case 'pedidos':
                return currentUser.rol === 'Vendedor' || currentUser.rol === 'Administrador' ? <Pedidos /> : null;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar setActiveSection={setActiveSection} />
            <div className="main-content">
                <Link to="/home" className="back-button">Regresar a Home</Link>
                {renderSection()}
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useState } from 'react';
import './Dashboard.css';
import Usuarios from '../components/Usuarios';
import Productos from '../components/Productos';
import Ventas from '../components/Ventas';
import Pedidos from '../components/Pedidos';
import Sidebar from '../components/Sidebar';

const DashboardAdmin = () => {
    const [activeSection, setActiveSection] = useState('usuarios');

    const renderSection = () => {
        switch (activeSection) {
            case 'usuarios':
                return <Usuarios />;
            case 'productos':
                return <Productos />;
            case 'ventas':
                return <Ventas />;
            case 'pedidos':
                return <Pedidos />;
            default:
                return <Usuarios />;
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar setActiveSection={setActiveSection} />
            <div className="main-content">
                {renderSection()}
            </div>
        </div>
    );
};


export default DashboardAdmin;
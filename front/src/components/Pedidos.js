import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Pedidos.css';
import { UserContext } from '../contexts/UserContext'; // Importa el contexto

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [total, setTotal] = useState(0);
    const [estado, setEstado] = useState('');
    const [id, setId] = useState(null);

    const { currentUser } = useContext(UserContext); // Obtener el usuario actual del contexto

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get('http://localhost:3002/pedidos');
                // Filtrar pedidos según el usuario actual si es un Cliente
                if (currentUser.rol === 'Cliente') {
                    setPedidos(response.data.filter(pedido => pedido.usuario === currentUser.nombre));
                } else {
                    setPedidos(response.data); // Para Administradores y Vendedores mostrar todos
                }
            } catch (error) {
                console.error('Error al cargar pedidos:', error);
            }
        };
        fetchPedidos();
    }, [currentUser]);

    const handleAddOrder = async (e) => {
        e.preventDefault();
        const newOrder = { usuario: currentUser.nombre, total, estado }; // Usar nombre del usuario actual
        await axios.post('http://localhost:3002/pedidos', newOrder);
        setPedidos([...pedidos, newOrder]);
        resetForm();
    };

    const handleDeleteOrder = async (id) => {
        await axios.delete(`http://localhost:3002/pedidos/${id}`);
        setPedidos(pedidos.filter(p => p.id !== id));
    };

    const resetForm = () => {
        setUsuario('');
        setTotal(0);
        setEstado('');
        setId(null);
    };

    return (
        <div className="pedidos-container">
            <h1>Pedidos</h1>
            {/* Solo mostrar formulario si es Vendedor o Administrador */}
            {(currentUser.rol === 'Vendedor' || currentUser.rol === 'Administrador') && (
                <form onSubmit={handleAddOrder}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Total"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    />
                    <button type="submit">Agregar Pedido</button>
                </form>
            )}
            <ul>
                {pedidos.map((pedido) => (
                    <li key={pedido.id}>
                        {pedido.usuario} - ${pedido.total} - {pedido.estado}
                        {(currentUser.rol === 'Vendedor' || currentUser.rol === 'Administrador') && (
                            <button onClick={() => handleDeleteOrder(pedido.id)}>Eliminar</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pedidos;

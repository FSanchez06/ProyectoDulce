import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pedidos.css';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [total, setTotal] = useState(0);
    const [estado, setEstado] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            const response = await axios.get('http://localhost:3002/pedidos');
            setPedidos(response.data);
        };
        fetchPedidos();
    }, []);

    const handleAddOrder = async (e) => {
        e.preventDefault();
        const newOrder = { usuario, total, estado };
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
            <ul>
                {pedidos.map((pedido) => (
                    <li key={pedido.id}>
                        {pedido.usuario} - ${pedido.total} - {pedido.estado}
                        <button onClick={() => handleDeleteOrder(pedido.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pedidos;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ventas.css';

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [vendedor, setVendedor] = useState('');
    const [total, setTotal] = useState(0);
    const [id, setId] = useState(null);

    useEffect(() => {
        const fetchVentas = async () => {
            const response = await axios.get('http://localhost:3002/ventas');
            setVentas(response.data);
        };
        fetchVentas();
    }, []);

    const handleAddSale = async (e) => {
        e.preventDefault();
        const newSale = { vendedor, total };
        await axios.post('http://localhost:3002/ventas', newSale);
        setVentas([...ventas, newSale]);
        resetForm();
    };

    const handleDeleteSale = async (id) => {
        await axios.delete(`http://localhost:3002/ventas/${id}`);
        setVentas(ventas.filter(v => v.id !== id));
    };

    const resetForm = () => {
        setVendedor('');
        setTotal(0);
        setId(null);
    };

    return (
        <div className="ventas-container">
            <h1>Ventas</h1>
            <form onSubmit={handleAddSale}>
                <input
                    type="text"
                    placeholder="Vendedor"
                    value={vendedor}
                    onChange={(e) => setVendedor(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Total"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                />
                <button type="submit">Agregar Venta</button>
            </form>
            <ul>
                {ventas.map((venta) => (
                    <li key={venta.id}>
                        {venta.vendedor} - ${venta.total}
                        <button onClick={() => handleDeleteSale(venta.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ventas;

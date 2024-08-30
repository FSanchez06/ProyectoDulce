import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Productos.css';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3002/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };
        fetchProductos();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!nombre || !precio) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        const newProduct = { name: nombre, price: parseFloat(precio) };
        await axios.post('http://localhost:3002/productos', newProduct);
        setProductos([...productos, newProduct]);
        resetForm();
    };

    const handleEditProduct = (producto) => {
        setId(producto.id);
        setNombre(producto.name);
        setPrecio(producto.price);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!nombre || !precio) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        try {
            await axios.put(`http://localhost:3002/productos/${id}`, { name: nombre, price: parseFloat(precio) });
            setProductos(productos.map(p => (p.id === id ? { ...p, name: nombre, price: parseFloat(precio) } : p)));
            resetForm();
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        await axios.delete(`http://localhost:3002/productos/${id}`);
        setProductos(productos.filter(p => p.id !== id));
    };

    const resetForm = () => {
        setNombre('');
        setPrecio('');
        setId(null);
    };

    return (
        <div className="productos-container">
            <h1>CRUD Productos</h1>
            <form onSubmit={id ? handleUpdateProduct : handleAddProduct}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <button type="submit">{id ? 'Actualizar Producto' : 'Agregar Producto'}</button>
            </form>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.name} - ${producto.price}
                        <div>
                            <button onClick={() => handleEditProduct(producto)}>Editar</button>
                            <button onClick={() => handleDeleteProduct(producto.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Productos;

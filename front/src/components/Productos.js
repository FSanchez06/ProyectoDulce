import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Productos.css';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [region, setRegion] = useState('');
    const [image, setImage] = useState('');
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
        if (!name || !price || !category || !region || !image) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        const newProduct = { name, price: parseFloat(price), category, region, image };
        await axios.post('http://localhost:3002/productos', newProduct);
        setProductos([...productos, newProduct]);
        resetForm();
    };

    const handleEditProduct = (producto) => {
        setId(producto.id);
        setName(producto.name);
        setPrice(producto.price);
        setCategory(producto.category);
        setRegion(producto.region);
        setImage(producto.image);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!name || !price || !category || !region || !image) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        try {
            await axios.put(`http://localhost:3002/productos/${id}`, { name, price: parseFloat(price), category, region, image });
            setProductos(productos.map(p => (p.id === id ? { ...p, name, price: parseFloat(price), category, region, image } : p)));
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
        setName('');
        setPrice('');
        setCategory('');
        setRegion('');
        setImage('');
        setId(null);
    };

    return (
        <div className="productos-container">
            <h1>CRUD Productos</h1>
            <form onSubmit={id ? handleUpdateProduct : handleAddProduct} className="form-container">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Región"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Imagen"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button type="submit" className="submit-button">{id ? 'Actualizar Producto' : 'Agregar Producto'}</button>
            </form>
            <table className="productos-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Región</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.name}</td>
                            <td>${producto.price}</td>
                            <td>{producto.category}</td>
                            <td>{producto.region}</td>
                            <td>
                                {producto.image ? (
                                    <img src={producto.image} alt={producto.name} className="product-image" />
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEditProduct(producto)} className="edit-button">Editar</button>
                                <button onClick={() => handleDeleteProduct(producto.id)} className="delete-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Productos;

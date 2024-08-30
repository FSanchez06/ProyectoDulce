import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Usuarios.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('Cliente');
    const [id, setId] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3002/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        const newUser = { nombre, correo, contraseña: 'default_password', rol }; // Asigna una contraseña por defecto
        await axios.post('http://localhost:3002/usuarios', newUser);
        setUsuarios([...usuarios, newUser]);
        resetForm();
    };

    const handleEditUser = (usuario) => {
        setId(usuario.id);
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
        setRol(usuario.rol);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3002/usuarios/${id}`, { nombre, correo, rol });
            setUsuarios(usuarios.map(u => (u.id === id ? { ...u, nombre, correo, rol } : u)));
            resetForm();
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            if (error.response && error.response.status === 404) {
                alert('No se encontró el usuario. Verifica el ID.');
            } else {
                alert('Ocurrió un error al actualizar el usuario. Inténtalo de nuevo más tarde.');
            }
        }
    };

    const handleDeleteUser = async (id) => {
        await axios.delete(`http://localhost:3002/usuarios/${id}`);
        setUsuarios(usuarios.filter(u => u.id !== id));
    };

    const resetForm = () => {
        setNombre('');
        setCorreo('');
        setRol('Cliente');
        setId(null);
    };

    return (
        <div className="usuarios-container">
            <h1>CRUD Usuarios</h1>
            <form onSubmit={id ? handleUpdateUser : handleAddUser}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Administrador">Administrador</option>
                </select>
                <button type="submit">{id ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
            </form>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.nombre} - {usuario.correo} - {usuario.rol}
                        <div>
                            <button onClick={() => handleEditUser(usuario)}>Editar</button>
                            <button onClick={() => handleDeleteUser(usuario.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Usuarios;

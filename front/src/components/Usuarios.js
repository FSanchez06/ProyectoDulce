import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Usuarios.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('Cliente');
    const [empresa, setEmpresa] = useState('');
    const [id, setId] = useState(null);
    const [mostrarContraseña, setMostrarContraseña] = useState({});

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
        if (!nombre || !correo || !contraseña) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        const newUser = { nombre, correo, contraseña, rol, empresa };
        try {
            const response = await axios.post('http://localhost:3002/usuarios', newUser);
            setUsuarios([...usuarios, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            alert('Ocurrió un error al agregar el usuario. Inténtalo de nuevo más tarde.');
        }
    };

    const handleEditUser = (usuario) => {
        setId(usuario.id);
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
        setContraseña(usuario.contraseña);
        setRol(usuario.rol);
        setEmpresa(usuario.empresa || '');
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!nombre || !correo || !contraseña) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        try {
            await axios.put(`http://localhost:3002/usuarios/${id}`, { nombre, correo, contraseña, rol, empresa });
            setUsuarios(usuarios.map(u => (u.id === id ? { ...u, nombre, correo, contraseña, rol, empresa } : u)));
            resetForm();
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            alert('Ocurrió un error al actualizar el usuario. Inténtalo de nuevo más tarde.');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/usuarios/${id}`);
            setUsuarios(usuarios.filter(u => u.id !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            alert('Ocurrió un error al eliminar el usuario. Inténtalo de nuevo más tarde.');
        }
    };

    const resetForm = () => {
        setNombre('');
        setCorreo('');
        setContraseña('');
        setRol('Cliente');
        setEmpresa('');
        setId(null);
    };

    const togglePasswordVisibility = (id) => {
        setMostrarContraseña(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className="usuarios-container">
            <h1>CRUD Usuarios</h1>
            <form onSubmit={id ? handleUpdateUser : handleAddUser} className="form-container">
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
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                />
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Administrador">Administrador</option>
                </select>
                <input
                    type="text"
                    placeholder="Empresa (opcional)"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                />
                <button type="submit" className="submit-button">{id ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
            </form>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                        <th>Empresa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.correo}</td>
                            <td>
                                {mostrarContraseña[usuario.id] ? usuario.contraseña : '********'}
                                <button onClick={() => togglePasswordVisibility(usuario.id)} className="password-button">
                                    {mostrarContraseña[usuario.id] ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.empresa || 'N/A'}</td>
                            <td>
                                <button onClick={() => handleEditUser(usuario)} className="edit-button">Editar</button>
                                <button onClick={() => handleDeleteUser(usuario.id)} className="delete-button">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;

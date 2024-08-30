import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [error, setError] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        // Cargar usuarios desde la API
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3002/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
                setError('Error al cargar usuarios. Intenta nuevamente más tarde.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const toggleForm = () => {
        setIsLoginActive(!isLoginActive);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = usuarios.find(u => u.correo === email && u.contraseña === password);

        if (user) {
            switch (user.rol) {
                case 'Administrador':
                    navigate('/dashboard-admin');
                    break;
                case 'Vendedor':
                    navigate('/dashboard-vendedor');
                    break;
                case 'Cliente':
                    navigate('/home');
                    break;
                default:
                    setError('Rol no reconocido');
            }
        } else {
            setError('Credenciales incorrectas');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (!nombre.trim() || !email.trim() || !password.trim() || !confirmarPassword.trim()) {
            setError('Por favor, completa todos los campos');
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmarPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validar que el correo no esté registrado
        const existingUser = usuarios.find(u => u.correo === email);
        if (existingUser) {
            setError('El correo ya está registrado');
            return;
        }

        // Validar que la contraseña tenga al menos 8 caracteres y contenga al menos una letra y un número
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un número');
            return;
        }

        const newUser = {
            id: usuarios.length + 1, // O puedes usar un método para generar un ID único
            nombre,
            correo: email,
            contraseña: password,
            rol: 'Cliente', // Asignar un rol predeterminado
            empresa: null
        };

        try {
            await axios.post('http://localhost:3002/usuarios', newUser);
            setError('Registro exitoso. Puedes iniciar sesión ahora.');
            setNombre('');
            setEmail('');
            setPassword('');
            setConfirmarPassword('');
            setUsuarios([...usuarios, newUser]); // Actualiza la lista de usuarios
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setError('Error al registrar usuario. Intenta nuevamente.');
        }
    };

    return (
        <div className="login-container">
            <div className={`container ${isLoginActive ? '' : 'active'}`}>
                <div className={`form-container sign-up ${isLoginActive ? 'hidden' : ''}`}>
                    <form onSubmit={handleRegister}>
                        <h1>Registrarse</h1>
                        <span>Ingresa tus datos para registrarte</span>
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirmar Contraseña" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} />
                        {error && <p className="error">{error}</p>}
                        <button type="submit" disabled={isLoading}>Registrarse</button>
                    </form>
                </div>
                <div className={`form-container sign-in ${isLoginActive ? '' : 'hidden'}`}>
                    <form onSubmit={handleLogin}>
                        <h1>Iniciar Sesión</h1>
                        <span>Ingrese sus datos para iniciar sesión</span>
                        <input 
                            type="email" 
                            placeholder="Correo" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {error && <p className="error">{error}</p>}
                        <Link to="#">¿Olvidó su contraseña?</Link>
                        <button type="submit" disabled={isLoading}>Iniciar Sesión</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Bienvenido de Nuevo</h1>
                            <p>Ingrese sus datos para iniciar sesión</p>
                            <button onClick={toggleForm}>Iniciar Sesión</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>¡Hola!</h1>
                            <p>Regístrate con tus datos para entrar al sistema</p>
                            <button onClick={toggleForm}>Registrarse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

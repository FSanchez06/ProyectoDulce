import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart'; // Importa el componente del carrito
import Checkout from './pages/Checkout'; // Importa el componente del checkout
import Dashboard from './pages/Dashboard'; // Asegúrate de que la ruta sea correcta
import { UserProvider } from './contexts/UserContext'; // Importa el contexto

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* Ruta para el carrito */}
          <Route path="/cart" element={<Cart />} />
          {/* Ruta para el checkout */}
          <Route path="/checkout" element={<Checkout />} />
          {/* Ruta para el dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

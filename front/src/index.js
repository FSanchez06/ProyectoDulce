import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext'; // Importa el contexto del usuario
import { CartProvider } from './contexts/CartContext'; // Importa el contexto del carrito

ReactDOM.render(
    <UserProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </UserProvider>,
    document.getElementById('root')
);

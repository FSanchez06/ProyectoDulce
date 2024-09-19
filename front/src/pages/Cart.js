import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext'; // Importa el contexto del carrito
import './Cart.css';

const Cart = () => {
    const { currentUser } = useContext(UserContext); // Obtener el usuario actual del contexto
    const { cartItems, removeFromCart } = useContext(CartContext); // Obtener los items del carrito

    const handleCheckout = () => {
        if (!currentUser) {
            alert('Por favor, inicia sesión para proceder con la compra.');
            return; // Redirigir al usuario a la página de inicio de sesión si no está autenticado
        }
        // Aquí podrías redirigir al usuario a una página de pago
        console.log('Procediendo al pago...');
    };

    return (
        <div className="cart-container">
            <h2>Tu Carrito</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en tu carrito.</p>
            ) : (
                <ul className="cart-items">
                    {cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>Precio: ${item.price}</p>
                                {/* Selector de cantidad */}
                                <input type="number" min="1" defaultValue="1" className="quantity-selector" />
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="remove-button">Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleCheckout}>Comprar</button>
        </div>
    );
};

export default Cart;

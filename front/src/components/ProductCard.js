import React, { useContext } from 'react';
import './ProductCard.css'; // Asegúrate de que este archivo exista
import { CartContext } from '../contexts/CartContext'; // Importa el contexto del carrito

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext); // Usar el contexto

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.category}</p>
            <p>Región: {product.region}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
    );
};

export default ProductCard;

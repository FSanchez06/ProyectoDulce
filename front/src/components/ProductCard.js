// ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} /> {/* Usar la imagen del producto */}
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <p>Región: {product.region}</p>
      <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;

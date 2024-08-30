import React, { useState } from 'react';
import './ProductFilter.css';

const ProductFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    region: '',
    maxPrice: 200000, // Precio máximo inicial
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const updatedFilters = { ...filters, maxPrice: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="product-filter">
      <h2>Filtrar Productos</h2>
      <div className="product-filter-options">
        <select name="category" onChange={handleChange}>
          <option value="">Seleccionar Categoría</option>
          <option value="Dulces de Frutas">Dulces de Frutas</option>
          <option value="Dulces Tradicionales">Dulces Tradicionales</option>
          <option value="Postres">Postres</option>
          <option value="Dulces de Harina">Dulces de Harina</option>
        </select>
        <select name="region" onChange={handleChange}>
          <option value="">Seleccionar Región</option>
          <option value="Caribe">Caribe</option>
          <option value="Insular">Insular</option>
          <option value="Pacífica">Pacífica</option>
          <option value="Andina">Andina</option>
          <option value="Orinoquia">Orinoquia</option>
          <option value="Amazónica">Amazónica</option>
        </select>
        <div className="price-range">
          <span className="price-label">Precio máximo: ${filters.maxPrice.toLocaleString()}</span>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="200000" // Precio máximo de $200,000 COP
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

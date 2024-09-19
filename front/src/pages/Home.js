import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    region: '',
    minPrice: '',
    maxPrice: '',
  });

  const productsRef = useRef(null);
  const filtersRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Función para obtener productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/productos'); // Cambia la URL si es necesario
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Llama a la función al montar el componente
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddToCart = (product) => {
    console.log(`Producto agregado al carrito: ${product.name}`);
  };

  const handleViewDetails = (product) => {
    console.log(`Ver detalles del producto: ${product.name}`);
  };

  const filteredProducts = products.filter((product) => {
    const minPrice = parseFloat(filters.minPrice) || 0;
    const maxPrice = parseFloat(filters.maxPrice) || Infinity;

    return (
      (filters.category ? product.category === filters.category : true) &&
      (filters.region ? product.region === filters.region : true) &&
      (minPrice ? product.price >= minPrice : true) &&
      (maxPrice ? product.price <= maxPrice : true)
    );
  });

  return (
    <div>
      <Header
        onScrollToProducts={() => filtersRef.current.scrollIntoView({ behavior: 'smooth' })}
        onScrollToAbout={() => aboutRef.current.scrollIntoView({ behavior: 'smooth' })}
        onScrollToContact={() => contactRef.current.scrollIntoView({ behavior: 'smooth' })}
      />
      <Hero ref={productsRef} />
      <main style={{ marginTop: '70px' }}>
        <div ref={filtersRef}>
          <ProductFilter onFilterChange={handleFilterChange} />
        </div>
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />
        <About ref={aboutRef} />
        <Contact ref={contactRef} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

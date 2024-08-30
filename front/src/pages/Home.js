import React, { useState, useRef } from 'react';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';
import './Home.css';

//importacion de imagenes:
import cocada from '../assets/cocada.png'
import dulcename from '../assets/name.jpg'
import alegria from '../assets/alegria.jpg'
import dulcecoco from '../assets/dulcecoco.jpg'
import tresleches from '../assets/tresleches.jpg'
import dulcetamarindo from '../assets/dulcetamarindo.jpg'
import dulcepapaya from '../assets/dulcepapaya.jpg'
import dulcepina from '../assets/dulcepina.jpg'
//import dulcechontaduro from '../assets/dulcechontaduro.jpg'
//import dulceborojo from '../assets/cocada.png'
//import dulcemaracuya from '../assets/cocada.png'
//import arequipe from '../assets/cocada.png'
//import natilla from '../assets/cocada.png'
//import manjarblaco from '../assets/cocada.png'
//import bocadilloveleño from '../assets/cocada.png'
//import dulcemora from '../assets/cocada.png'
//import buñuelo from '../assets/cocada.png'
//import almojabana from '../assets/cocada.png'
//import pandebono from '../assets/cocada.png'
//import galletaavena from '../assets/cocada.png'
//import tortaplatano from '../assets/cocada.png'
//import dulcemarañon from '../assets/cocada.png'
//import dulcecorozo from '../assets/cocada.png'
//import dulcemoriche from '../assets/cocada.png'
//import dulceasai from '../assets/cocada.png'
//import dulcecarambolo from '../assets/cocada.png'
//import dulcecopoazú from '../assets/cocada.png'
//import dulcecamu from '../assets/cocada.png'
//import dulcearaza from '../assets/cocada.png'
//import dulcecocona from '../assets/cocada.png'
//import dulcecopomu from '../assets/cocada.png'



const Home = () => {
  const [products, setProducts] = useState([
    // Región Caribe
    { id: 1, name: 'Cocada', price: 5000, category: 'Dulces de Frutas', region: 'Caribe', image: cocada },
    { id: 2, name: 'Dulce de Ñame', price: 8000, category: 'Dulces Tradicionales', region: 'Caribe', image: dulcename },
    { id: 3, name: 'Alegría', price: 3000, category: 'Dulces Tradicionales', region: 'Caribe', image: alegria },

    // Región Insular
    { id: 4, name: 'Dulce de Coco', price: 8000, category: 'Dulces de Frutas', region: 'Insular', image: dulcecoco},
    { id: 5, name: 'Torta de Tres Leches', price: 30000, category: 'Postres', region: 'Insular', image: tresleches},
    { id: 6, name: 'Dulce de Tamarindo', price: 6000, category: 'Dulces de Frutas', region: 'Insular', image: dulcetamarindo },


    // Región Pacífica
    { id: 7, name: 'Dulce de Papaya', price: 8000, category: 'Dulces de Frutas', region: 'Pacífica', image: dulcepapaya },
    { id: 8, name: 'Dulce de Piña', price: 10000, category: 'Dulces de Frutas', region: 'Pacífica', image: dulcepina },
    { id: 9, name: 'Dulce de Chontaduro', price: 12000, category: 'Dulces de Frutas', region: 'Pacífica', image: 'https://example.com/dulce-de-chontaduro.jpg' },


    // Región Andina
    { id: 10, name: 'Arequipe', price: 10000, category: 'Dulces Tradicionales', region: 'Andina', image: 'https://example.com/arequipe.jpg' },
    { id: 11, name: 'Natilla', price: 12000, category: 'Postres', region: 'Andina', image: 'https://example.com/natilla.jpg' },
    { id: 12, name: 'Manjar Blanco', price: 15000, category: 'Dulces Tradicionales', region: 'Andina', image: 'https://example.com/manjar-blanco.jpg' },

    // Dulces de Harina
    { id: 13, name: 'Buñuelo', price: 15000, category: 'Dulces de Harina', region: 'Andina', image: 'https://example.com/bunuelo.jpg' },
    { id: 14, name: 'Almojábana', price: 12000, category: 'Dulces de Harina', region: 'Andina', image: 'https://example.com/almojabana.jpg' },
    { id: 15, name: 'Pandebono', price: 10000, category: 'Dulces de Harina', region: 'Andina', image: 'https://example.com/pandebono.jpg' },


    // Región Orinoquia
    { id: 16, name: 'Dulce de Marañón', price: 12000, category: 'Dulces de Frutas', region: 'Orinoquia', image: 'https://example.com/dulce-de-maranon.jpg' },
    { id: 17, name: 'Dulce de Corozo', price: 8000, category: 'Dulces de Frutas', region: 'Orinoquia', image: 'https://example.com/dulce-de-corozo.jpg' },
    { id: 18, name: 'Dulce de Moriche', price: 15000, category: 'Dulces de Frutas', region: 'Orinoquia', image: 'https://example.com/dulce-de-moriche.jpg' },


    // Región Amazónica
    { id: 19, name: 'Dulce de Copoazú', price: 20000, category: 'Dulces de Frutas', region: 'Amazónica', image: 'https://example.com/dulce-de-copoazu.jpg' },
    { id: 20, name: 'Dulce de Camu Camu', price: 18000, category: 'Dulces de Frutas', region: 'Amazónica', image: 'https://example.com/dulce-de-camu-camu.jpg' },
    { id: 21, name: 'Dulce de Arazá', price: 15000, category: 'Dulces de Frutas', region: 'Amazónica', image: 'https://example.com/dulce-de-araza.jpg' },

  ]);

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
      <main style={{ marginTop: '70px' }}> {/* Ajustar el margen superior del contenido */}
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

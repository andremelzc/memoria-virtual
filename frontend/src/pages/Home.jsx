import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importa el componente Link
import Hero from '../components/Hero';
import DefinitionsGrid from '../components/DefinitionsGrid';
import AlgorithmsGrid from '../components/AlgorithmsGrid';

export default function Home() {
  return (
    <>
      <Hero />
      <DefinitionsGrid />
      
      <h2 className="text-center text-4xl font-bold mt-16 mb-8 text-text-primary">
        Los Algoritmos de Reemplazo de Páginas
      </h2>
      
      <AlgorithmsGrid />
      
      {/* 3. Aquí está la nueva sección con el botón */}
      <section className="text-center py-16 md:py-24 px-6">
        <h3 className="text-3xl font-bold text-text-primary mb-4">
          ¿Quieres saber más?
        </h3>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
          Lee nuestros artículos para una explicación detallada de cómo funciona cada algoritmo.
        </p>
        <Link 
          to="/blog"
          className="inline-block bg-accent text-white text-lg font-semibold no-underline py-3 px-8 rounded-lg shadow-lg transition-all
                     transform hover:bg-accent-hover hover:-translate-y-1"
        >
          Ir al Blog →
        </Link>
      </section>
    </>
  );
}
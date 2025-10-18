import React from 'react';
import Hero from '../components/Hero';
import DefinitionsGrid from '../components/DefinitionsGrid';

export default function Home() {
  return (
    <>
      <Hero />
      <DefinitionsGrid />
      
      <h2 className="text-center text-4xl font-bold mt-16 mb-8 text-text-primary">
        Los Algoritmos de Reemplazo de Páginas
      </h2>
      
      {/* Aquí continuaría el resto de tu página */}
      <div className="text-center py-20 text-text-secondary">
        (Contenido de los algoritmos iría aquí...)
      </div>
    </>
  );
}

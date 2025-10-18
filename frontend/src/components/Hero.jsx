import React from 'react';

function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Contenido de Texto */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Algoritmos de Reemplazo de Páginas
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              Cuando ocurre un fallo de página, la página requerida debe ser traída desde la memoria secundaria. 
              Si todos los marcos ya están ocupados, se debe reemplazar una página.
              El <span className="bg-accent-light text-accent px-2 py-1 rounded font-semibold">algoritmo de reemplazo</span> decide qué página será reemplazada.
            </p>
            <a 
              href="/simulator" 
              className="inline-block bg-accent text-white text-lg font-semibold no-underline py-3 px-8 rounded-lg shadow-lg transition-all
                         transform hover:bg-accent-hover hover:-translate-y-1"
            >
              Ir al Simulador →
            </a>
          </div>

          {/* Imagen */}
          <div className="flex-1 max-w-lg mt-8 md:mt-0">
            <img 
              src="https://i.imgur.com/GkG8Hq3.png" 
              alt="Diagrama de Memoria Virtual" 
              className="w-full h-auto rounded-xl border border-dark-border shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
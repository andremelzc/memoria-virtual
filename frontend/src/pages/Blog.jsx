import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

// Datos de los artículos del blog
const blogPosts = [
  {
    id: 1,
    title: "Introducción a la Memoria Virtual",
    excerpt: "La memoria virtual es una técnica fundamental en sistemas operativos que permite a los programas utilizar más memoria de la que está físicamente disponible. Aprende los conceptos básicos y su importancia en la gestión de memoria.",
    readTime: 8,
    date: "18 Oct 2024",
    slug: "introduccion-memoria-virtual",
    category: "Fundamentos"
  },
  {
    id: 2,
    title: "Algoritmo FIFO: First In, First Out",
    excerpt: "El algoritmo FIFO es el más simple de los algoritmos de reemplazo de páginas. Descubre cómo funciona, sus ventajas, desventajas y cuándo es apropiado utilizarlo en sistemas de memoria virtual.",
    readTime: 6,
    date: "18 Oct 2024",
    slug: "algoritmo-fifo",
    category: "Algoritmos"
  },
  {
    id: 3,
    title: "Algoritmo LRU: Least Recently Used",
    excerpt: "El algoritmo LRU es uno de los más eficientes para el reemplazo de páginas. Explora su implementación, complejidad y por qué es considerado una aproximación práctica al algoritmo óptimo.",
    readTime: 7,
    date: "18 Oct 2024",
    slug: "algoritmo-lru",
    category: "Algoritmos"
  },
  {
    id: 4,
    title: "Algoritmo Óptimo de Belady",
    excerpt: "El algoritmo óptimo proporciona el menor número de page faults posible, pero requiere conocimiento futuro. Comprende su teoría, implementación y por qué sirve como referencia para otros algoritmos.",
    readTime: 6,
    date: "18 Oct 2024",
    slug: "algoritmo-optimo",
    category: "Algoritmos"
  }
];

function Blog() {
  return (
    <div className="bg-dark-bg py-16 md:py-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header del Blog */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Blog de Memoria Virtual
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Explora artículos detallados sobre memoria virtual, algoritmos de reemplazo de páginas 
            y conceptos fundamentales de sistemas operativos. Profundiza tu conocimiento con 
            explicaciones teóricas y ejemplos prácticos.
          </p>
        </div>

        {/* Categorías
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-accent text-white px-4 py-2 rounded-full font-semibold transition-colors hover:bg-accent-hover">
            Todos
          </button>
          <button className="bg-light-bg text-text-secondary px-4 py-2 rounded-full font-semibold border border-dark-border transition-colors hover:bg-accent hover:text-white">
            Fundamentos
          </button>
          <button className="bg-light-bg text-text-secondary px-4 py-2 rounded-full font-semibold border border-dark-border transition-colors hover:bg-accent hover:text-white">
            Algoritmos
          </button>
          <button className="bg-light-bg text-text-secondary px-4 py-2 rounded-full font-semibold border border-dark-border transition-colors hover:bg-accent hover:text-white">
            Rendimiento
          </button>
          <button className="bg-light-bg text-text-secondary px-4 py-2 rounded-full font-semibold border border-dark-border transition-colors hover:bg-accent hover:text-white">
            Análisis
          </button>
        </div> */}

        {/* Grid de Artículos - Diseño optimizado para 4 artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              category={post.category}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex justify-center mt-16">
          <div className="max-w-2xl w-full text-center p-8 bg-light-bg border border-dark-border rounded-lg">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              ¿Listo para poner en práctica lo aprendido?
            </h3>
            <p className="text-text-secondary mb-6">
              Utiliza nuestro simulador interactivo para experimentar con los algoritmos 
              de reemplazo de páginas y ver cómo se comportan en diferentes escenarios.
            </p>
            <Link 
              to="/simulator"
              className="inline-block bg-accent text-white text-lg font-semibold no-underline py-3 px-8 rounded-lg shadow-lg transition-all
                         transform hover:bg-accent-hover hover:-translate-y-1"
            >
              Ir al Simulador →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;

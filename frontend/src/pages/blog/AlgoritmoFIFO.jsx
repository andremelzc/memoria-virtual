import React from 'react';
import { Link } from 'react-router-dom';

function AlgoritmoFIFO() {
  return (
    <div className="bg-dark-bg py-16 md:py-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/blog" className="text-accent hover:text-accent-hover no-underline">
            ← Volver al Blog
          </Link>
        </nav>

        {/* Header del Artículo */}
        <header className="mb-12">
          <div className="mb-4">
            <span className="inline-block bg-accent text-white text-sm font-semibold px-3 py-1 rounded-full">
              Algoritmos
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Algoritmo FIFO: First In, First Out
          </h1>
          
          <p className="text-xl text-text-secondary">
            El algoritmo FIFO es el más simple y fácil de implementar de todos los algoritmos 
            de reemplazo de páginas. Su principio es intuitivo: la primera página que entra 
            es la primera que sale cuando se necesita espacio.
          </p>
        </header>

        {/* Contenido del Artículo */}
        <article className="prose prose-lg max-w-none">
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Principio de Funcionamiento</h2>
            <p className="text-text-secondary mb-4">
              El algoritmo FIFO (<strong>First In, First Out</strong>) mantiene un registro del orden 
              en que las páginas fueron cargadas en memoria. Cuando es necesario reemplazar una página, 
              siempre selecciona la página que ha estado más tiempo en memoria física.
            </p>
            <p className="text-text-secondary">
              Es como una cola (queue): el primer elemento que entra es el primero que sale. 
              No considera qué tan frecuentemente se usa una página o cuándo fue accedida por última vez.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Implementación</h2>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-8 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{`def fifo(pages, frames):
    queue = deque()          # Cola para mantener orden FIFO
    in_memory = set()        # Conjunto para búsqueda rápida
    page_faults = 0          # Contador de page faults
    
    for page in pages:
        if page not in in_memory:
            page_faults += 1
            
            if len(in_memory) == frames:
                # Memoria llena: remover la página más antigua
                oldest_page = queue.popleft()
                in_memory.remove(oldest_page)
            
            # Agregar la nueva página
            queue.append(page)
            in_memory.add(page)
    
    return page_faults`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Ejemplo Paso a Paso</h2>
          
          <p className="text-text-secondary mb-6">
            Veamos cómo funciona FIFO con la secuencia de páginas [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3] 
            y 3 marcos de página:
          </p>
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-2 px-3 text-text-primary">Página</th>
                    <th className="text-left py-2 px-3 text-text-primary">Marco 1</th>
                    <th className="text-left py-2 px-3 text-text-primary">Marco 2</th>
                    <th className="text-left py-2 px-3 text-text-primary">Marco 3</th>
                    <th className="text-left py-2 px-3 text-text-primary">Page Fault</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">7</td>
                    <td className="py-2 px-3 bg-red-100 text-red-800">7</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">7</td>
                    <td className="py-2 px-3 bg-red-100 text-red-800">0</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">1</td>
                    <td className="py-2 px-3">7</td>
                    <td className="py-2 px-3">0</td>
                    <td className="py-2 px-3 bg-red-100 text-red-800">1</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">2</td>
                    <td className="py-2 px-3 bg-red-100 text-red-800">2</td>
                    <td className="py-2 px-3">0</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 text-red-600">✓ (reemplaza 7)</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">2</td>
                    <td className="py-2 px-3 bg-green-100 text-green-800">0</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 text-green-600">-</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">3</td>
                    <td className="py-2 px-3">2</td>
                    <td className="py-2 px-3 bg-red-100 text-red-800">3</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 text-red-600">✓ (reemplaza 0)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-secondary mt-4">
              🔴 Rojo = Page fault (nueva página cargada) | 🟢 Verde = Hit (página ya en memoria)
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Ventajas del Algoritmo FIFO</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Simplicidad</h3>
                <p className="text-text-secondary">
                  Es el algoritmo más fácil de entender e implementar. Solo requiere 
                  mantener un registro del orden de llegada.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Bajo Overhead</h3>
                <p className="text-text-secondary">
                  Requiere muy poca memoria adicional y procesamiento para mantener 
                  el estado del algoritmo.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Equidad</h3>
                <p className="text-text-secondary">
                  Todas las páginas tienen la misma "oportunidad" de permanecer en memoria 
                  por el mismo tiempo antes de ser reemplazadas.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Desventajas del Algoritmo FIFO</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✗</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Ignora el Patrón de Uso</h3>
                <p className="text-text-secondary">
                  No considera qué tan frecuentemente se accede a una página o cuándo 
                  fue utilizada por última vez.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✗</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Anomalía de Belady</h3>
                <p className="text-text-secondary">
                  En algunos casos, aumentar el número de marcos de página puede 
                  resultar en más page faults en lugar de menos.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✗</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Rendimiento Subóptimo</h3>
                <p className="text-text-secondary">
                  Puede reemplazar páginas que serán necesarias pronto, resultando 
                  en más page faults que otros algoritmos más sofisticados.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">La Anomalía de Belady</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Anomalía de Belady</h4>
            <p className="text-yellow-700 mb-4">
              Una característica única del algoritmo FIFO es que puede experimentar la 
              "Anomalía de Belady": en algunas secuencias de páginas, aumentar el número 
              de marcos de página disponibles puede resultar en más page faults.
            </p>
            <p className="text-yellow-700">
              <strong>Ejemplo:</strong> La secuencia [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5] 
              produce 9 page faults con 3 marcos, pero 10 page faults con 4 marcos.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Cuándo Usar FIFO</h2>
          
          <p className="text-text-secondary mb-6">
            A pesar de sus limitaciones, FIFO puede ser apropiado en ciertos escenarios:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-text-primary mb-3">✅ Apropiado Para:</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Sistemas con recursos muy limitados</li>
                <li>• Aplicaciones con patrones de acceso secuencial</li>
                <li>• Sistemas donde la simplicidad es prioritaria</li>
                <li>• Prototipos y sistemas de prueba</li>
              </ul>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-bold text-text-primary mb-3">❌ Evitar En:</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Sistemas de alto rendimiento</li>
                <li>• Aplicaciones con patrones complejos de acceso</li>
                <li>• Cuando el rendimiento es crítico</li>
                <li>• Sistemas con memoria abundante</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Comparación de Rendimiento</h2>
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <p className="text-text-secondary mb-4">
              En términos generales, el algoritmo FIFO tiende a producir más page faults 
              que algoritmos más sofisticados como LRU u Optimal, especialmente en aplicaciones 
              con patrones de acceso que exhiben localidad temporal.
            </p>
            <p className="text-text-secondary">
              Sin embargo, su simplicidad lo hace valioso en sistemas embebidos o 
              aplicaciones donde los recursos computacionales son muy limitados.
            </p>
          </div>

        </article>

        {/* Navegación */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-dark-border">
          <Link 
            to="/blog/introduccion-memoria-virtual" 
            className="text-accent hover:text-accent-hover no-underline font-semibold"
          >
            ← Anterior: Introducción a Memoria Virtual
          </Link>
          
          <Link 
            to="/blog/algoritmo-lru" 
            className="text-accent hover:text-accent-hover no-underline font-semibold"
          >
            Siguiente: Algoritmo LRU →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlgoritmoFIFO;
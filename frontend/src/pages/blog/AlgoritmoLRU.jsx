import React from 'react';
import { Link } from 'react-router-dom';

function AlgoritmoLRU() {
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
            Algoritmo LRU: Least Recently Used
          </h1>
          
          <p className="text-xl text-text-secondary">
            El algoritmo LRU es considerado uno de los más efectivos para el reemplazo 
            de páginas, basándose en la premisa de que las páginas utilizadas recientemente 
            tienen mayor probabilidad de ser utilizadas nuevamente en el futuro cercano.
          </p>
        </header>

        {/* Contenido del Artículo */}
        <article className="prose prose-lg max-w-none">
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Principio de Localidad Temporal</h2>
            <p className="text-text-secondary mb-4">
              El algoritmo LRU (<strong>Least Recently Used</strong>) se basa en el principio 
              de <strong>localidad temporal</strong>: si una página fue accedida recientemente, 
              es probable que sea accedida nuevamente pronto. Por lo tanto, cuando necesita 
              reemplazar una página, elige la que no ha sido utilizada por más tiempo.
            </p>
            <p className="text-text-secondary">
              A diferencia de FIFO que solo considera el orden de llegada, LRU mantiene 
              registro del tiempo de último acceso a cada página, proporcionando una 
              aproximación mucho más inteligente al algoritmo óptimo.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Implementación Conceptual</h2>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-8 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{`def lru(pages, frames):
    in_memory = []           # Lista que mantiene orden LRU
    page_faults = 0          # Contador de page faults
    
    for page in pages:
        if page not in in_memory:
            page_faults += 1
            
            if len(in_memory) < frames:
                # Hay espacio disponible
                in_memory.append(page)
            else:
                # Memoria llena: remover LRU (primer elemento)
                in_memory.pop(0)
                in_memory.append(page)
        else:
            # Página ya en memoria: actualizar su posición
            in_memory.remove(page)
            in_memory.append(page)  # Mover al final (más reciente)
    
    return page_faults`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Ejemplo Detallado</h2>
          
          <p className="text-text-secondary mb-6">
            Analicemos cómo funciona LRU con la secuencia [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3] 
            y 3 marcos de página:
          </p>
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-2 px-3 text-text-primary">Página</th>
                    <th className="text-left py-2 px-3 text-text-primary">Estado Memoria</th>
                    <th className="text-left py-2 px-3 text-text-primary">Acción</th>
                    <th className="text-left py-2 px-3 text-text-primary">Page Fault</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">7</td>
                    <td className="py-2 px-3">[7]</td>
                    <td className="py-2 px-3">Cargar 7</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">[7, 0]</td>
                    <td className="py-2 px-3">Cargar 0</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">1</td>
                    <td className="py-2 px-3">[7, 0, 1]</td>
                    <td className="py-2 px-3">Cargar 1</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">2</td>
                    <td className="py-2 px-3">[0, 1, 2]</td>
                    <td className="py-2 px-3">Reemplazar 7 (LRU)</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">[1, 2, 0]</td>
                    <td className="py-2 px-3">Mover 0 al final</td>
                    <td className="py-2 px-3 text-green-600">-</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">3</td>
                    <td className="py-2 px-3">[2, 0, 3]</td>
                    <td className="py-2 px-3">Reemplazar 1 (LRU)</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">[2, 3, 0]</td>
                    <td className="py-2 px-3">Mover 0 al final</td>
                    <td className="py-2 px-3 text-green-600">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-secondary mt-4">
              El estado muestra el orden LRU: izquierda = menos reciente, derecha = más reciente
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Métodos de Implementación</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">1. Contador de Tiempo</h3>
              <p className="text-text-secondary mb-3">
                Cada página tiene un contador que se actualiza en cada acceso. 
                Para reemplazar, se busca la página con el menor contador.
              </p>
              <div className="text-sm text-text-secondary">
                <strong>Ventajas:</strong> Preciso<br/>
                <strong>Desventajas:</strong> Overflow del contador, búsqueda lineal
              </div>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">2. Pila de Páginas</h3>
              <p className="text-text-secondary mb-3">
                Mantiene una pila donde el top es la página más recientemente usada. 
                Al acceder una página, se mueve al top.
              </p>
              <div className="text-sm text-text-secondary">
                <strong>Ventajas:</strong> No hay overflow<br/>
                <strong>Desventajas:</strong> Operaciones costosas de movimiento
              </div>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">3. Lista Enlazada + Hash</h3>
              <p className="text-text-secondary mb-3">
                Combina una lista doblemente enlazada con una tabla hash para 
                acceso O(1) y actualización eficiente.
              </p>
              <div className="text-sm text-text-secondary">
                <strong>Ventajas:</strong> O(1) para todas las operaciones<br/>
                <strong>Desventajas:</strong> Mayor complejidad de implementación
              </div>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">4. Bits de Referencia</h3>
              <p className="text-text-secondary mb-3">
                Aproximación usando bits que se desplazan periódicamente. 
                No es LRU exacto pero es más eficiente.
              </p>
              <div className="text-sm text-text-secondary">
                <strong>Ventajas:</strong> Eficiente, soporte de hardware<br/>
                <strong>Desventajas:</strong> Aproximación, no es LRU verdadero
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Ventajas del Algoritmo LRU</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Aprovecha la Localidad Temporal</h3>
                <p className="text-text-secondary">
                  Se basa en patrones reales de acceso a memoria, proporcionando 
                  mejor rendimiento que algoritmos más simples como FIFO.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Sin Anomalía de Belady</h3>
                <p className="text-text-secondary">
                  A diferencia de FIFO, LRU es un algoritmo de pila: más marcos 
                  de página siempre resultan en menos o igual número de page faults.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Aproximación al Óptimo</h3>
                <p className="text-text-secondary">
                  En muchos casos prácticos, LRU se aproxima bastante al rendimiento 
                  del algoritmo óptimo de Belady.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Desventajas del Algoritmo LRU</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✗</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Complejidad de Implementación</h3>
                <p className="text-text-secondary">
                  Requiere estructuras de datos más complejas y costosas que 
                  algoritmos más simples como FIFO.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✗</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Overhead de Tiempo y Espacio</h3>
                <p className="text-text-secondary">
                  Necesita tiempo adicional para actualizar el orden LRU en cada 
                  acceso y espacio extra para mantener la información de orden.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✗</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Dificultad de Implementación en Hardware</h3>
                <p className="text-text-secondary">
                  LRU exacto es difícil de implementar eficientemente en hardware, 
                  por lo que se usan aproximaciones.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Comparación de Rendimiento</h2>
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <h4 className="text-lg font-bold text-text-primary mb-4">LRU vs FIFO vs Optimal</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-2 px-3 text-text-primary">Métrica</th>
                    <th className="text-left py-2 px-3 text-text-primary">FIFO</th>
                    <th className="text-left py-2 px-3 text-text-primary">LRU</th>
                    <th className="text-left py-2 px-3 text-text-primary">Optimal</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">Page Faults</td>
                    <td className="py-2 px-3">10</td>
                    <td className="py-2 px-3 text-green-600">9</td>
                    <td className="py-2 px-3 text-blue-600">7</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">Complejidad</td>
                    <td className="py-2 px-3 text-green-600">O(1)</td>
                    <td className="py-2 px-3">O(n)</td>
                    <td className="py-2 px-3 text-red-600">O(n²)</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3 font-bold">Espacio Extra</td>
                    <td className="py-2 px-3 text-green-600">Mínimo</td>
                    <td className="py-2 px-3">Moderado</td>
                    <td className="py-2 px-3 text-red-600">Alto</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">Implementación</td>
                    <td className="py-2 px-3 text-green-600">Simple</td>
                    <td className="py-2 px-3">Moderada</td>
                    <td className="py-2 px-3 text-red-600">Impractical</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Aproximaciones Prácticas de LRU</h2>
          
          <p className="text-text-secondary mb-6">
            Dado que LRU exacto puede ser costoso, los sistemas reales a menudo 
            usan aproximaciones que proporcionan un rendimiento similar con menor overhead:
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-light-bg border border-dark-border rounded-lg p-4">
              <h4 className="font-bold text-text-primary mb-2">🔄 Clock Algorithm (Second Chance)</h4>
              <p className="text-text-secondary text-sm">
                Aproximación de LRU usando un bit de referencia y un puntero circular.
              </p>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-4">
              <h4 className="font-bold text-text-primary mb-2">📊 Aging Algorithm</h4>
              <p className="text-text-secondary text-sm">
                Usa contadores que se desplazan y combinan bits de referencia históricos.
              </p>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-4">
              <h4 className="font-bold text-text-primary mb-2">🎯 Not Recently Used (NRU)</h4>
              <p className="text-text-secondary text-sm">
                Clasifica páginas en categorías basadas en bits de referencia y modificación.
              </p>
            </div>
          </div>

        </article>

        {/* Navegación */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-dark-border">
          <Link 
            to="/blog/algoritmo-fifo" 
            className="text-accent hover:text-accent-hover no-underline font-semibold"
          >
            ← Anterior: Algoritmo FIFO
          </Link>
          
          <Link 
            to="/blog/algoritmo-optimo" 
            className="text-accent hover:text-accent-hover no-underline font-semibold"
          >
            Siguiente: Algoritmo Óptimo →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlgoritmoLRU;
import React from 'react';
import { Link } from 'react-router-dom';

function AlgoritmoOptimo() {
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
            Algoritmo Óptimo de Belady
          </h1>
          
          <p className="text-xl text-text-secondary">
            El algoritmo óptimo, también conocido como algoritmo de Belady, representa 
            el rendimiento teórico perfecto para el reemplazo de páginas. Aunque no es 
            implementable en la práctica, sirve como referencia para evaluar otros algoritmos.
          </p>
        </header>

        {/* Contenido del Artículo */}
        <article className="prose prose-lg max-w-none">
          
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">🎯 Principio del Algoritmo Óptimo</h2>
            <p className="text-text-secondary mb-4">
              El algoritmo óptimo de Belady establece que <strong>la página que debe ser 
              reemplazada es aquella que será referenciada más lejos en el futuro</strong>, 
              o que nunca será referenciada nuevamente.
            </p>
            <p className="text-text-secondary">
              Este algoritmo <strong>minimiza el número total de page faults</strong> 
              para cualquier secuencia de referencias dada, estableciendo el límite 
              teórico inferior que cualquier algoritmo de reemplazo puede alcanzar.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Funcionamiento del Algoritmo</h2>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-8 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{`def optimal(pages, frames):
    in_memory = []
    page_faults = 0
    
    for i, page in enumerate(pages):
        if page not in in_memory:
            page_faults += 1
            
            if len(in_memory) < frames:
                # Hay espacio disponible
                in_memory.append(page)
            else:
                # Encontrar página a reemplazar
                future_refs = []
                
                for mem_page in in_memory:
                    # Buscar próxima referencia de esta página
                    next_ref = float('inf')  # Nunca referenciada = infinito
                    
                    for j in range(i + 1, len(pages)):
                        if pages[j] == mem_page:
                            next_ref = j
                            break
                    
                    future_refs.append(next_ref)
                
                # Reemplazar página con mayor distancia futura
                victim_idx = future_refs.index(max(future_refs))
                in_memory[victim_idx] = page
    
    return page_faults`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Ejemplo Paso a Paso</h2>
          
          <p className="text-text-secondary mb-6">
            Analicemos el algoritmo óptimo con la secuencia [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3] 
            usando 3 marcos de página. El algoritmo "ve" toda la secuencia futura:
          </p>
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-2 px-3 text-text-primary">Paso</th>
                    <th className="text-left py-2 px-3 text-text-primary">Página</th>
                    <th className="text-left py-2 px-3 text-text-primary">Memoria</th>
                    <th className="text-left py-2 px-3 text-text-primary">Próximas Referencias</th>
                    <th className="text-left py-2 px-3 text-text-primary">Acción</th>
                    <th className="text-left py-2 px-3 text-text-primary">PF</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 font-bold">7</td>
                    <td className="py-2 px-3">[7]</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3">Cargar 7</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">2</td>
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">[7, 0]</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3">Cargar 0</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">3</td>
                    <td className="py-2 px-3 font-bold">1</td>
                    <td className="py-2 px-3">[7, 0, 1]</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3">Cargar 1</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">4</td>
                    <td className="py-2 px-3 font-bold">2</td>
                    <td className="py-2 px-3">[2, 0, 1]</td>
                    <td className="py-2 px-3">7:∞, 0:4, 1:∞</td>
                    <td className="py-2 px-3">Reemplazar 7 (nunca más usado)</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">5</td>
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">[2, 0, 1]</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3">Hit: 0 ya está</td>
                    <td className="py-2 px-3 text-green-600">-</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">6</td>
                    <td className="py-2 px-3 font-bold">3</td>
                    <td className="py-2 px-3">[2, 0, 3]</td>
                    <td className="py-2 px-3">2:8, 0:6, 1:∞</td>
                    <td className="py-2 px-3">Reemplazar 1 (nunca más usado)</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">7</td>
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">[2, 0, 3]</td>
                    <td className="py-2 px-3">-</td>
                    <td className="py-2 px-3">Hit: 0 ya está</td>
                    <td className="py-2 px-3 text-green-600">-</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">8</td>
                    <td className="py-2 px-3 font-bold">4</td>
                    <td className="py-2 px-3">[4, 0, 3]</td>
                    <td className="py-2 px-3">2:8, 0:10, 3:9</td>
                    <td className="py-2 px-3">Reemplazar 2 (más lejos: pos. 8)</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-2 px-3">9</td>
                    <td className="py-2 px-3 font-bold">2</td>
                    <td className="py-2 px-3">[2, 0, 3]</td>
                    <td className="py-2 px-3">4:∞, 0:10, 3:9</td>
                    <td className="py-2 px-3">Reemplazar 4 (nunca más usado)</td>
                    <td className="py-2 px-3 text-red-600">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-secondary mt-4">
              <strong>Total: 7 page faults</strong> - Este es el mínimo posible para esta secuencia
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">¿Por qué es "Óptimo"?</h2>
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">Demostración Matemática</h3>
            <p className="text-text-secondary mb-4">
              <strong>Teorema de Belady:</strong> El algoritmo óptimo minimiza el número 
              de page faults para cualquier secuencia de referencias.
            </p>
            
            <div className="space-y-3 text-text-secondary">
              <p>
                <strong>Prueba por contradicción:</strong> Supongamos que existe un algoritmo A 
                que produce menos page faults que el óptimo para alguna secuencia.
              </p>
              
              <p>
                Si A difiere del óptimo en algún punto, significa que A eligió reemplazar 
                una página P₁ cuando el óptimo habría elegido P₂.
              </p>
              
              <p>
                Dado que el óptimo eligió P₂, sabemos que P₂ será referenciada más lejos 
                en el futuro que P₁ (o nunca). Por lo tanto, reemplazar P₁ en lugar de P₂ 
                no puede resultar en menos page faults.
              </p>
              
              <p className="font-bold">
                ∴ Contradicción: No puede existir tal algoritmo A.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Limitaciones Prácticas</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">⚠</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Imposible de Implementar</h3>
                <p className="text-text-secondary">
                  Requiere conocimiento completo del futuro, lo cual es imposible 
                  en sistemas reales donde las referencias futuras son impredecibles.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">⚠</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Alto Costo Computacional</h3>
                <p className="text-text-secondary">
                  Incluso si el futuro fuera conocido, buscar la próxima referencia 
                  de cada página requiere O(n) por decisión de reemplazo.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">⚠</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Secuencias Dinámicas</h3>
                <p className="text-text-secondary">
                  En sistemas reales, el patrón de acceso puede cambiar dinámicamente 
                  debido a entrada del usuario, interrupciones, etc.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Valor como Referencia</h2>
          
          <p className="text-text-secondary mb-6">
            Aunque no es implementable, el algoritmo óptimo tiene un valor inmenso:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">📊 Benchmark</h3>
              <p className="text-text-secondary">
                Proporciona una línea base para evaluar qué tan cerca están 
                otros algoritmos del rendimiento óptimo teórico.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">🔬 Investigación</h3>
              <p className="text-text-secondary">
                Permite a los investigadores cuantificar las mejoras y 
                entender los límites teóricos de los algoritmos de reemplazo.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">🎯 Diseño de Algoritmos</h3>
              <p className="text-text-secondary">
                Inspira el diseño de algoritmos que intentan aproximar 
                el comportamiento óptimo usando heurísticas inteligentes.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">📈 Validación</h3>
              <p className="text-text-secondary">
                En simulaciones donde el futuro es conocido, valida 
                que otros algoritmos no superan el límite teórico.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Comparación Final de Algoritmos</h2>
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-3 px-4 text-text-primary font-bold">Algoritmo</th>
                    <th className="text-left py-3 px-4 text-text-primary font-bold">Page Faults</th>
                    <th className="text-left py-3 px-4 text-text-primary font-bold">Eficiencia</th>
                    <th className="text-left py-3 px-4 text-text-primary font-bold">Implementabilidad</th>
                    <th className="text-left py-3 px-4 text-text-primary font-bold">Uso Práctico</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-dark-border/50">
                    <td className="py-3 px-4 font-bold text-blue-600">Óptimo</td>
                    <td className="py-3 px-4 font-bold text-green-600">7 (mínimo)</td>
                    <td className="py-3 px-4 text-green-600">100%</td>
                    <td className="py-3 px-4 text-red-600">Imposible</td>
                    <td className="py-3 px-4 text-red-600">Solo simulación</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-3 px-4 font-bold">LRU</td>
                    <td className="py-3 px-4">9</td>
                    <td className="py-3 px-4 text-green-600">85-90%</td>
                    <td className="py-3 px-4 text-yellow-600">Compleja</td>
                    <td className="py-3 px-4 text-green-600">Alta</td>
                  </tr>
                  <tr className="border-b border-dark-border/50">
                    <td className="py-3 px-4 font-bold">FIFO</td>
                    <td className="py-3 px-4">10</td>
                    <td className="py-3 px-4 text-yellow-600">70-80%</td>
                    <td className="py-3 px-4 text-green-600">Simple</td>
                    <td className="py-3 px-4 text-green-600">Media</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Random</td>
                    <td className="py-3 px-4">11-15</td>
                    <td className="py-3 px-4 text-red-600">50-60%</td>
                    <td className="py-3 px-4 text-green-600">Trivial</td>
                    <td className="py-3 px-4 text-red-600">Baja</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Algoritmos Inspirados en el Óptimo</h2>
          
          <p className="text-text-secondary mb-6">
            Aunque el algoritmo óptimo no es implementable, ha inspirado varios 
            algoritmos prácticos que intentan aproximar su comportamiento:
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-light-bg border border-dark-border rounded-lg p-4">
              <h4 className="font-bold text-text-primary mb-2">🔮 Predictive Algorithms</h4>
              <p className="text-text-secondary text-sm">
                Usan patrones históricos y machine learning para predecir accesos futuros.
              </p>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-4">
              <h4 className="font-bold text-text-primary mb-2">📊 Working Set Model</h4>
              <p className="text-text-secondary text-sm">
                Mantiene páginas que han sido referenciadas en una ventana de tiempo reciente.
              </p>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-4">
              <h4 className="font-bold text-text-primary mb-2">🎯 Adaptive Algorithms</h4>
              <p className="text-text-secondary text-sm">
                Cambian su estrategia dinámicamente basándose en el comportamiento observado.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-text-primary mb-3">💡 Conclusión</h3>
            <p className="text-text-secondary">
              El algoritmo óptimo de Belady, aunque imposible de implementar en la práctica, 
              permanece como una piedra angular en la teoría de sistemas operativos. 
              Estableció el límite teórico perfecto y continúa siendo la referencia dorada 
              contra la cual medimos todos los algoritmos de reemplazo de páginas.
            </p>
          </div>

        </article>

        {/* Navegación */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-dark-border">
          <Link 
            to="/blog/algoritmo-lru" 
            className="text-accent hover:text-accent-hover no-underline font-semibold"
          >
            ← Anterior: Algoritmo LRU
          </Link>
          
          <Link 
            to="/blog" 
            className="text-accent hover:text-accent-hover no-underline font-semibold"
          >
            Volver al Blog →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlgoritmoOptimo;
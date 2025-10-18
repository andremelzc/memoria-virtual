import React from 'react';
import { Link } from 'react-router-dom';

function IntroduccionMemoriaVirtual() {
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
              Fundamentos
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Introducción a la Memoria Virtual
          </h1>
          
          <p className="text-xl text-text-secondary">
            La memoria virtual es una técnica fundamental que permite a los sistemas operativos 
            gestionar eficientemente la memoria, proporcionando la ilusión de que cada proceso 
            tiene acceso a más memoria de la que está físicamente disponible.
          </p>
        </header>

        {/* Contenido del Artículo */}
        <article className="prose prose-lg max-w-none">
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">¿Qué es la Memoria Virtual?</h2>
            <p className="text-text-secondary mb-4">
              La <strong>memoria virtual</strong> es una abstracción del almacenamiento que permite que los programas 
              utilicen direcciones de memoria que no corresponden directamente a ubicaciones físicas en la RAM. 
              Esta técnica fundamental en sistemas operativos modernos proporciona varios beneficios cruciales.
            </p>
            <p className="text-text-secondary">
              En lugar de que cada programa acceda directamente a la memoria física, el sistema operativo 
              actúa como intermediario, traduciendo las direcciones virtuales a direcciones físicas cuando 
              es necesario.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Conceptos Fundamentales</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">Páginas Virtuales</h3>
              <p className="text-text-secondary">
                El espacio de direcciones virtuales se divide en bloques de tamaño fijo llamados 
                <strong> páginas</strong>. Típicamente tienen un tamaño de 4KB, 8KB o 16KB.
              </p>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">Marcos de Página</h3>
              <p className="text-text-secondary">
                La memoria física se divide en bloques del mismo tamaño llamados 
                <strong> marcos de página</strong> o frames, donde se almacenan las páginas virtuales.
              </p>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">Tabla de Páginas</h3>
              <p className="text-text-secondary">
                Estructura de datos que mantiene la correspondencia entre páginas virtuales 
                y marcos físicos, junto con información de control.
              </p>
            </div>
            
            <div className="bg-light-bg border border-dark-border rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">MMU</h3>
              <p className="text-text-secondary">
                La <strong>Memory Management Unit</strong> es el hardware que se encarga de 
                traducir automáticamente las direcciones virtuales a físicas.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Ventajas de la Memoria Virtual</h2>
          
          <div className="space-y-6 mb-8">
            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">1. Aislamiento de Procesos</h3>
              <p className="text-text-secondary">
                Cada proceso tiene su propio espacio de direcciones virtuales, evitando que 
                un proceso acceda accidentalmente a la memoria de otro proceso.
              </p>
            </div>
            
            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">2. Uso Eficiente de la Memoria</h3>
              <p className="text-text-secondary">
                Solo las páginas actualmente en uso necesitan estar en memoria física. 
                Las páginas no utilizadas pueden residir en almacenamiento secundario.
              </p>
            </div>
            
            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">3. Simplificación de la Programación</h3>
              <p className="text-text-secondary">
                Los programadores no necesitan preocuparse por la gestión manual de memoria 
                o por la ubicación física de los datos.
              </p>
            </div>
            
            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">4. Soporte para Programas Grandes</h3>
              <p className="text-text-secondary">
                Permite ejecutar programas que son más grandes que la memoria física disponible 
                mediante técnicas de paginación bajo demanda.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Page Faults: Cuando las Páginas No Están</h2>
          
          <div className="bg-light-bg border border-dark-border rounded-lg p-6 mb-8">
            <p className="text-text-secondary mb-4">
              Un <strong>page fault</strong> ocurre cuando un proceso intenta acceder a una página 
              virtual que no está actualmente cargada en memoria física. Esto no es necesariamente 
              un error, sino un evento normal en el funcionamiento de la memoria virtual.
            </p>
            
            <h4 className="text-lg font-bold text-text-primary mb-3">Tipos de Page Faults:</h4>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>Minor Page Fault:</strong> La página está en memoria pero no está marcada como presente en la tabla de páginas.</li>
              <li><strong>Major Page Fault:</strong> La página debe ser cargada desde almacenamiento secundario (disco).</li>
              <li><strong>Invalid Page Fault:</strong> Acceso a una dirección de memoria inválida (error de segmentación).</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Algoritmos de Reemplazo de Páginas</h2>
          
          <p className="text-text-secondary mb-6">
            Cuando la memoria física está llena y se necesita cargar una nueva página, el sistema 
            operativo debe decidir qué página existente reemplazar. Esta decisión es crucial para 
            el rendimiento del sistema y es donde entran en juego los algoritmos de reemplazo de páginas.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-accent/10 border border-accent rounded-lg p-4 text-center">
              <h4 className="font-bold text-text-primary mb-2">FIFO</h4>
              <p className="text-sm text-text-secondary">First In, First Out</p>
            </div>
            <div className="bg-accent/10 border border-accent rounded-lg p-4 text-center">
              <h4 className="font-bold text-text-primary mb-2">LRU</h4>
              <p className="text-sm text-text-secondary">Least Recently Used</p>
            </div>
            <div className="bg-accent/10 border border-accent rounded-lg p-4 text-center">
              <h4 className="font-bold text-text-primary mb-2">Optimal</h4>
              <p className="text-sm text-text-secondary">Algoritmo de Belady</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Impacto en el Rendimiento</h2>
          
          <p className="text-text-secondary mb-6">
            El rendimiento de un sistema con memoria virtual depende en gran medida de la 
            frecuencia de page faults y la eficiencia del algoritmo de reemplazo utilizado. 
            Un buen algoritmo minimiza el número de page faults, mejorando así el rendimiento general.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-bold text-yellow-800 mb-3">💡 Dato Importante</h4>
            <p className="text-yellow-700">
              Un page fault puede ser hasta 1000 veces más lento que un acceso normal a memoria, 
              ya que requiere acceso al disco. Por eso la elección del algoritmo de reemplazo 
              es crucial para el rendimiento del sistema.
            </p>
          </div>

        </article>

        {/* Navegación */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-dark-border">
          <Link 
            to="/blog" 
            className="text-accent hover:text-accent-hover no-underline font-semibold"
          >
            ← Volver al Blog
          </Link>
          
          <Link 
            to="/blog/algoritmo-fifo" 
            className="text-accent hover:text-accent-hover no-underline font-semibold"
          >
            Siguiente: Algoritmo FIFO →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IntroduccionMemoriaVirtual;
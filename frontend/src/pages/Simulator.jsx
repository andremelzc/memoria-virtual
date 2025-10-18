// 1. Importa 'useEffect'
import React, { useState, useRef, useEffect } from 'react'; 
import { runSimulation } from '../api/simulatorApi';
import SimulationForm from '../components/SimulationForm';
import SimulationResults from '../components/SimulationResults';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function SimulatorPage() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  // 2. Añade este hook 'useEffect'
  //    Se ejecutará CADA VEZ que el estado 'results' cambie.
  useEffect(() => {
    // Si 'results' NO es nulo (es decir, acabamos de recibir datos de la API)
    // Y la referencia a la sección existe...
    if (results && resultsRef.current) {
      // ENTONCES, haz el scroll.
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results]); // <-- La dependencia [results] es la clave

  const handleSimulationSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResults(null); // Esto limpia los resultados antiguos


    // Transformar el payload para el backend...
    const payload = {
      algorithm: formData.algorithm,
      frames: formData.frames,
      pages: formData.sequence
        .split(' ')
        .map(x => parseInt(x.trim(), 10))
        .filter(x => !isNaN(x)),
    };

    try {
      const data = await runSimulation(payload);
      // Cuando esto se ejecute, el 'useEffect' de arriba se disparará
      setResults(data); 
    } catch (err) {
      setError(err.message || 'No se pudo conectar al servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-bg text-text-primary min-h-screen py-16 px-6">
      <div className="container mx-auto">
        
        {/* ... (Tu Título y Formulario no cambian) ... */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-4">
          Simulador de Reemplazo de Páginas
        </h1>
        <p className="text-lg text-text-secondary text-center mb-12 max-w-3xl mx-auto">
          Introduce un número de frames y una secuencia de páginas para comparar
          el rendimiento de los algoritmos FIFO, LRU, Óptimo y MRU.
        </p>

        <SimulationForm onSubmit={handleSimulationSubmit} isLoading={isLoading} />

        {/* Área de Resultados (El 'ref' sigue aquí, perfecto) */}
        <section id="results" ref={resultsRef} className="mt-12">
          {isLoading && <LoadingSpinner />}
          <ErrorMessage message={error} />
          <SimulationResults data={results} />
        </section>

      </div>
    </div>
  );
}

export default SimulatorPage;
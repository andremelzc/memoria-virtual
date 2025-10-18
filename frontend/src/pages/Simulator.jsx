import React, { useState } from 'react';
import { runSimulation } from '../api/simulatorApi'; // Importa tu función de API
import SimulationForm from '../components/SimulationForm';
import SimulationResults from '../components/SimulationResults';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function SimulatorPage() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Esta función se pasa al SimulationForm y se activa
   * cuando el usuario envía el formulario.
   */
  const handleSimulationSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    // Transformar el payload para el backend
    const payload = {
      algorithm: formData.algorithm, // ya está en minúsculas
      frames: formData.frames,
      pages: formData.sequence
        .split(' ')
        .map(x => parseInt(x.trim(), 10))
        .filter(x => !isNaN(x)), // solo números válidos
    };

    try {
      // Llama a la API
      const data = await runSimulation(payload);
      // Guarda los resultados del backend en el estado
      setResults(data);
    } catch (err) {
      // Muestra el error
      setError(err.message || 'No se pudo conectar al servidor.');
    } finally {
      // Detiene la carga
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-bg text-text-primary min-h-screen py-16 px-6">
      <div className="container mx-auto">
        
        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-4">
          Simulador de Reemplazo de Páginas
        </h1>
        <p className="text-lg text-text-secondary text-center mb-12 max-w-3xl mx-auto">
          Introduce un número de frames y una secuencia de páginas para comparar
          el rendimiento de los algoritmos FIFO, LRU, Óptimo y MRU.
        </p>

        {/* Formulario de Simulación */}
        <SimulationForm onSubmit={handleSimulationSubmit} isLoading={isLoading} />

        {/* Área de Resultados */}
        <div className="mt-12">
          {isLoading && <LoadingSpinner />}
          <ErrorMessage message={error} />
          <SimulationResults data={results} />
        </div>

      </div>
    </div>
  );
}

export default SimulatorPage;
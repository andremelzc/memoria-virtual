import React, { useState } from 'react';

const ALGORITHMS = ['FIFO', 'LRU', 'Optimal', 'MRU'];

function SimulationForm({ onSubmit, isLoading }) {
  const [frames, setFrames] = useState(4);
  const [sequence, setSequence] = useState('10 20 10 30 40 10 50 20 60');
  const [algorithm, setAlgorithm] = useState('FIFO');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama a la función del padre con los datos del formulario
    onSubmit({
      frames: Number(frames),
      sequence,
      algorithm: algorithm.toLowerCase(), // Envía 'fifo' en minúsculas
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-light-bg border border-dark-border p-8 rounded-xl shadow-lg space-y-6 max-w-4xl mx-auto">
      
      {/* Fila 1: Frames y Secuencia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label htmlFor="frames" className="block text-sm font-medium text-text-secondary mb-2">
            Número de Frames
          </label>
          <input
            type="number"
            id="frames"
            value={frames}
            onChange={(e) => setFrames(e.target.value)}
            min="1"
            max="10"
            required
            className="w-full bg-dark-bg border border-dark-border text-text-primary rounded-lg p-3 focus:ring-accent focus:border-accent"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="sequence" className="block text-sm font-medium text-text-secondary mb-2">
            Secuencia de Páginas (separada por espacios)
          </label>
          <input
            type="text"
            id="sequence"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            required
            placeholder="Ej: 7 0 1 2 0 3 0 4"
            className="w-full bg-dark-bg border border-dark-border text-text-primary rounded-lg p-3 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      {/* Fila 2: Selección de Algoritmo */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-3">
          Algoritmo de Reemplazo
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ALGORITHMS.map((algoName) => (
            <button
              type="button"
              key={algoName}
              onClick={() => setAlgorithm(algoName)}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all
                          ${algorithm === algoName 
                            ? 'bg-accent text-white shadow-md' 
                            : 'bg-dark-bg text-text-secondary border border-dark-border hover:bg-dark-border'
                          }`}
            >
              {algoName}
            </button>
          ))}
        </div>
      </div>

      {/* Fila 3: Botón de Envío */}
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent text-white text-lg font-semibold no-underline py-3 px-8 rounded-lg shadow-lg 
                   transition-all transform hover:bg-accent-hover hover:-translate-y-0.5
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Simulando...' : 'Ejecutar Simulación'}
      </button>

    </form>
  );
}

export default SimulationForm;
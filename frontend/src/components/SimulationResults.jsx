import React from 'react';

// Tarjeta para mostrar una métrica individual (Hit, Fault, etc.)
function MetricCard({ label, value }) {
  return (
    <div className="bg-light-bg border border-dark-border rounded-lg p-4 text-center">
      <p className="text-sm font-medium text-text-secondary">{label}</p>
      <p className="text-3xl font-bold text-text-primary">{value}</p>
    </div>
  );
}

function SimulationResults({ data }) {
  if (!data) return null;

  // Si el backend responde con objeto simple (algorithm, frames, faults)
  if (!data.metrics || !data.steps) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-light-bg border border-dark-border rounded-xl p-6 mt-4">
          <h2 className="text-2xl font-bold mb-2">Resultados de la Simulación</h2>
          <div className="space-y-2">
            <div>Algoritmo: <span className="font-mono">{data.algorithm}</span></div>
            <div>Frames: <span className="font-mono">{data.frames}</span></div>
            <div>Fallos de página: <span className="font-mono">{data.faults}</span></div>
          </div>
        </div>
      </div>
    );
  }

  const { metrics, steps } = data;
  const frameCount = steps[0]?.frames.length || 0;

    return (
  <div className="max-w-4xl mx-auto mt-8 space-y-8">
        {/* 1. Resumen de Métricas */}
        <h2 className="text-3xl font-bold text-text-primary text-center">Resumen de Métricas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Total de Accesos" value={metrics.total_requests} />
          <MetricCard label="Page Hits" value={metrics.hits} />
          <MetricCard label="Page Faults" value={metrics.faults} />
          <MetricCard label="Tasa de Fallos" value={`${(metrics.fault_rate * 100).toFixed(1)}%`} />
        </div>

        {/* 2. Tabla de Pasos */}
        <h2 className="text-3xl font-bold text-text-primary text-center mt-12">Proceso Paso a Paso</h2>
        <div className="bg-light-bg border border-dark-border rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-text-secondary">
              <thead className="border-b border-dark-border bg-dark-bg text-text-primary uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold">Página</th>
                  {/* Genera las cabeceras de los frames dinámicamente */}
                  {Array.from({ length: frameCount }, (_, i) => (
                    <th key={i} className="px-6 py-3 font-semibold text-center">Frame {i + 1}</th>
                  ))}
                  <th className="px-6 py-3 font-semibold text-right">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {steps.map((step, stepIndex) => (
                  <tr key={stepIndex} className="hover:bg-dark-bg/50">
                    <td className="px-6 py-4 font-bold text-lg text-text-primary">{step.page}</td>
                    {step.frames.map((frame, frameIndex) => (
                      <td key={frameIndex} className={`px-6 py-4 text-center font-mono text-lg
                        ${step.page === frame && step.result === 'FAULT' ? 'text-red-400 font-bold' : ''}
                        ${frame === -1 ? 'text-dark-border' : ''}`}>
                        {frame === -1 ? '-' : frame}
                      </td>
                    ))}
                    {/* Muestra el resultado (HIT o FAULT) */}
                    <td className={`px-6 py-4 text-right font-bold text-lg
                      ${step.result === 'HIT' ? 'text-green-500' : 'text-red-500'}`}>
                      {step.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default SimulationResults;
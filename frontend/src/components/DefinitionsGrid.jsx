import React from 'react';
import DefinitionCard from './DefinitionCard'; // Asegúrate de que la ruta sea correcta

function DefinitionsGrid() {
  const definitions = [
    {
      title: '¿Qué es una página (page)?',
      text: 'Para la asignación de memoria no contigua, el espacio de direcciones lógico se divide en bloques de tamaño fijo, llamados páginas.'
    },
    {
      title: '¿Qué es un marco (frame)?',
      text: 'El espacio de direcciones físico (Memoria Principal) se divide conceptualmente en un número de bloques de tamaño fijo, llamados marcos.'
    },
    {
      title: '¿Qué es la paginación (paging)?',
      text: 'La paginación es un esquema de gestión de memoria que elimina la necesidad de asignación contigua de memoria física.'
    },
    {
      title: '¿Qué es un fallo de página (page fault)?',
      text: 'Un fallo de página ocurre cuando la CPU hace referencia a una página y esta no se encuentra en la memoria principal (RAM).'
    }
  ];

  return (
    <section className="container mx-auto px-6 max-w-6xl py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {definitions.map((def, index) => (
          <DefinitionCard key={index} title={def.title}>
            {def.text}
          </DefinitionCard>
        ))}
      </div>
    </section>
  );
}

export default DefinitionsGrid;
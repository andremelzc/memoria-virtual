import React from "react";
import AlgorithmCard from "./AlgorithmCard"; // Importa la tarjeta

function AlgorithmsGrid() {
  const algorithms = [
    { name: "FIFO (First-In, First-Out)" },
    { name: "LRU (Least Recently Used)" },
    { name: "Optimal (Óptimo)" },
    { name: "MRU (Most Recently Used)" },
  ];

  return (
    <section className="container mx-auto px-6 max-w-6xl py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {algorithms.map((algo) => (
          <AlgorithmCard key={algo.name} name={algo.name} />
        ))}
      </div>
    </section>
  );
}

export default AlgorithmsGrid;

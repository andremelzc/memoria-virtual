import React from "react";

function AlgorithmCard({ name }) {
  return (
    <div
      className="bg-light-bg border border-dark-border rounded-xl p-8 text-center
                    transition-all transform hover:-translate-y-1.5 
                    hover:shadow-2xl hover:shadow-black/30
                    flex items-center justify-center min-h-[120px]"
    >
      <h3 className="text-2xl font-semibold text-accent m-0">{name}</h3>
    </div>
  );
}

export default AlgorithmCard;

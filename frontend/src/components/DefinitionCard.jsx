import React from 'react';

function DefinitionCard({ title, children }) {
  return (
    <div className="bg-light-bg border border-dark-border rounded-xl p-8 transition-all 
                    transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30">
      <h3 className="text-2xl font-semibold text-accent mt-0 mb-4">
        {title}
      </h3>
      <p className="text-base text-text-secondary leading-relaxed m-0">
        {children}
      </p>
    </div>
  );
}

export default DefinitionCard;
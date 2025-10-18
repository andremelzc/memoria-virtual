import React from 'react';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="container mx-auto max-w-4xl mt-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
      <p className="font-bold">¡Ocurrió un error!</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default ErrorMessage;
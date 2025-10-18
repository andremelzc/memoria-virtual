import React from "react";

// Icono simple de LinkedIn (puedes reemplazarlo con uno de react-icons)
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a1.66 1.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.1 1.03 3.1 3.26z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
    <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
  </svg>
);

function LinkedInCard({ name, linkedInUrl, postUrl }) {
  // Usamos un servicio de avatares para tener imágenes dinámicas y bonitas
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}`;

  return (
    <div
      className="bg-light-bg border border-dark-border rounded-2xl p-8 w-full max-w-sm mx-auto
                  flex flex-col items-center text-center gap-6
                  transition-all transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30"
    >
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={name}
        className="w-32 h-32 rounded-full border-4 border-accent mb-6"
      />

      {/* Nombre de Referencia */}
  <h3 className="text-2xl font-bold text-text-primary">{name}</h3>

      {/* Botones de acción */}
      <div className="mt-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2
                     bg-accent text-white font-semibold no-underline 
                     py-3.5 px-5 rounded-lg shadow-lg transition-all text-[15px]
                     transform hover:bg-accent-hover hover:scale-105"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
        {postUrl && (
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2
                       bg-dark-bg text-text-secondary border border-dark-border no-underline 
                       py-3.5 px-5 rounded-lg transition-all text-[15px]
                       hover:bg-dark-border hover:text-text-primary"
          >
            <ExternalLinkIcon />
            Post
          </a>
        )}
      </div>
    </div>
  );
}

export default LinkedInCard;

import React from "react";
import LinkedInCard from "../components/LinkedInCard"; // Ajusta la ruta si es necesario

// Aquí defines los datos de las 5 personas
const teamMembers = [
  {
    name: "Andre Melendez Cava",
    linkedInUrl: "https://www.linkedin.com/in/example1",
  },
  {
    name: "Miguel Girón Altamirano",
    linkedInUrl: "https://www.linkedin.com/in/example2",
  },
  {
    name: "Andre Cuenca Echevarria",
    linkedInUrl: "https://www.linkedin.com/in/example3",
  },
  {
    name: "Giancarlo Villavicencio Davila",
    linkedInUrl: "https://www.linkedin.com/in/example4",
  },
  {
    name: "Alejandro Padilla Arellano",
    linkedInUrl: "https://www.linkedin.com/in/example5",
  },
];

function Contact() {
  return (
    <div className="bg-dark-bg py-16 md:py-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Título de la Sección */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-4">
          Nuestro Equipo
        </h1>
        <p className="text-lg text-text-secondary text-center mb-12">
          Conéctate con los miembros que hicieron posible este proyecto. En los
          siguientes links se podrá acceder a la respectiva publicación sobre
          cada integrante en LinkedIn.
        </p>

        {/* Cuadrícula de Tarjetas - 3 arriba, 2 abajo centradas */}
        <div className="max-w-5xl mx-auto">
          {/* Primera fila: 3 tarjetas */}
          <div className="flex justify-center gap-8 mb-8">
            {teamMembers.slice(0, 3).map((member) => (
              <LinkedInCard
                key={member.name}
                name={member.name}
                linkedInUrl={member.linkedInUrl}
              />
            ))}
          </div>

          {/* Segunda fila: 2 tarjetas centradas */}
          <div className="flex justify-center gap-8">
            {teamMembers.slice(3, 5).map((member) => (
              <LinkedInCard
                key={member.name}
                name={member.name}
                linkedInUrl={member.linkedInUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

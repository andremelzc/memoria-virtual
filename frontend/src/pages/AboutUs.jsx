import React from "react";
import LinkedInCard from "../components/LinkedInCard"; // Ajusta la ruta si es necesario

// Aquí defines los datos de las 5 personas
const teamMembers = [
  {
    name: "Andre Melendez Cava",
    linkedInUrl: "https://www.linkedin.com/in/andr%C3%A9-ivan-mel%C3%A9ndez-cava/",
    postUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7389076808664530944/",
  },
  {
    name: "Miguel Girón Altamirano",
    linkedInUrl: "https://www.linkedin.com/in/miguel-giron-altamirano-1173b825b/",
    postUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7389165977739055104/",
  },
  {
    name: "Andre Cuenca Echevarria",
    linkedInUrl: "https://www.linkedin.com/in/andre-cuenca/",
    postUrl: "https://www.linkedin.com/feed/update/urn:li:activity:example3",
  },
  {
    name: "Giancarlo Villavicencio Davila",
    linkedInUrl: "https://www.linkedin.com/in/example4",
    postUrl: "https://www.linkedin.com/feed/update/urn:li:activity:example4",
  },
  {
    name: "Alejandro Padilla Arellano",
    linkedInUrl: "https://www.linkedin.com/in/alejandro-padillaa/",
    postUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7389108604689141760/",
  },
];

function AboutUs() {
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

        {/* Lista responsive de tarjetas */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <LinkedInCard
                key={member.name}
                name={member.name}
                linkedInUrl={member.linkedInUrl}
                postUrl={member.postUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
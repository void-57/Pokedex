import React from "react";
import { Link } from "react-router-dom";

import { Card } from "./ui/card";
import { ChevronRight } from "lucide-react";

const PokemonEvolution = ({ evolutionChain, pokemonId }) => {
  if (!evolutionChain) {
    return null;
  }

  const getEvolutionStages = (chain) => {
    const stages = [];
    let currentChain = chain;

    const getIdFromUrl = (url) => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 2]);
    };

 
    while (currentChain) {
      const id = getIdFromUrl(currentChain.species.url);
      stages.push({
        id,
        name: currentChain.species.name,
        minLevel: currentChain.evolution_details?.[0]?.min_level,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      });

      currentChain = currentChain.evolves_to?.[0];
    }

    return stages;
  };

  const evolutionStages = getEvolutionStages(evolutionChain.chain);

  if (evolutionStages.length <= 1) {
    return null;
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-6 dark:text-gray-200">Evolution Chain</h2>
      <div className="flex items-center justify-center flex-wrap gap-4">
        {evolutionStages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            {index > 0 && (
              <div className="flex flex-col items-center mx-2">
                <ChevronRight className="text-gray-400" size={24} />
                {stage.minLevel && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Level {stage.minLevel}
                  </span>
                )}
              </div>
            )}
            <Link 
              to={`/pokemon/${stage.id}`}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                stage.id === pokemonId ? 
                  "bg-gray-100 dark:bg-gray-700 ring-2 ring-primary" : 
                  "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <div className="w-20 h-20 flex items-center justify-center">
                <img 
                  src={stage.image} 
                  alt={stage.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target;
                    target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
                  }}
                />
              </div>
              <span className="text-sm font-medium mt-2 capitalize dark:text-gray-300">
                {stage.name.replace(/-/g, " ")}
              </span>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default PokemonEvolution;
import React from "react";
import {
  getTypeColor,
  formatHeight,
  formatWeight,
} from "@/services/pokemonService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

const PokemonDetailInfo = ({ pokemon, species }) => {
  console.log(pokemon, species);

  const getGender = () => {
    if (!species) return "Unknown";

    const genderRate = species.gender_rate;
    if (genderRate === -1) return "⚪ Genderless";
    if (genderRate === 0) return "♂️ Male only";
    if (genderRate === 8) return "♀️ Female only";

    const femalePercentage = (genderRate / 8) * 100;
    const malePercentage = 100 - femalePercentage;
    return `♂️ ${malePercentage}% | ♀️ ${femalePercentage}%`;
  };

  // Get description from species data
  const getDescription = () => {
    if (!species) return "Loading description...";

    const englishEntries = species.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    );

    if (englishEntries.length === 0) return "No description available";

    return englishEntries[0].flavor_text.replace(/\f/g, " ");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-800 italic text-sm md:text-base">
          {getDescription()}
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Info size={18} />
            Pokémon Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-sm text-gray-500">Height</p>
              <p className="font-medium">{formatHeight(pokemon.height)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium capitalize">
                {pokemon.types[0].type.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-medium">{formatWeight(pokemon.weight)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{getGender()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Type</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`px-4 py-1.5 rounded-md `}
                style={{ backgroundColor: `var(--color-pokemon-${typeInfo.type.name})` }}
              >
                {typeInfo.type.name.charAt(0).toUpperCase() +
                  typeInfo.type.name.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailInfo;

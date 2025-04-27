import React from "react";
import { Link } from "react-router-dom";
import {
  formatPokemonId,
  getTypeColor,
} from "../services/pokemonService.js";
const PokemonCard = ({ pokemon }) => {
  const mainType = pokemon.types[0].type.name;

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg overflow-hidden"
    >
      <div
        className={`p-4 ${
          mainType === "fire"
            ? "bg-gradient-to-br from-pokemon-fire to-orange-400"
            : mainType === "water"
            ? "bg-gradient-to-br from-pokemon-water to-blue-400"
            : mainType === "grass"
            ? "bg-gradient-to-br from-pokemon-grass to-green-400"
            : mainType === "electric"
            ? "bg-gradient-to-br from-pokemon-electric to-yellow-300"
            : mainType === "rock"
            ? "bg-gradient-to-br from-pokemon-rock to-gray-500"
            : mainType === "flying"
            ? "bg-gradient-to-br from-pokemon-flying to-sky-300"
            : "bg-gradient-to-br from-gray-500 to-gray-400"
        }`}
      >
        <div className="w-full aspect-square relative flex items-center justify-center">
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow dark:bg-gray-800">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {formatPokemonId(pokemon.id)}
        </span>
        <h2 className="text-lg font-bold capitalize mb-2 dark:text-white">
          {pokemon.name.replace(/-/g, " ")}
        </h2>
        <div className="flex flex-wrap gap-2 mt-auto">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className={`text-xs px-3 py-1 rounded-full `}
              style={{ backgroundColor: `var(--color-pokemon-${typeInfo.type.name})` }}
            >
              {typeInfo.type.name.charAt(0).toUpperCase() +
                typeInfo.type.name.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;

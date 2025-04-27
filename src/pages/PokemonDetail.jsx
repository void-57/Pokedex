import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchEvolutionChain,
  formatPokemonId,
} from "@/services/pokemonService";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import StatsChart from "@/components/StatsChart";
import PokemonDetailInfo from "@/components/PokemonDetailInfo";
import PokemonEvolution from "@/components/PokemonEvolution";
import { ThemeToggle } from "@/components/ThemeToggle";

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = useQuery({
    queryKey: ["pokemonDetail", name],
    queryFn: () => fetchPokemonDetails(name || ""),
    enabled: !!name,
    staleTime: 300000,
  });

  const { data: species, isLoading: isSpeciesLoading } = useQuery({
    queryKey: ["pokemonSpecies", pokemon?.species.url],
    queryFn: () => fetchPokemonSpecies(pokemon?.species.url || ""),
    enabled: !!pokemon?.species.url,
    staleTime: 300000,
  });

  const { data: evolutionChain, isLoading: isEvolutionLoading } = useQuery({
    queryKey: ["evolutionChain", species?.evolution_chain.url],
    queryFn: () => fetchEvolutionChain(species?.evolution_chain.url || ""),
    enabled: !!species?.evolution_chain.url,
    staleTime: 300000,
  });

  const isLoading = isPokemonLoading || isSpeciesLoading || isEvolutionLoading;

  const navigateToPokemon = (id) => {
    navigate(`/pokemon/${id}`);
  };

  if (isLoading && !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (pokemonError || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Pokémon Not Found
          </h2>
          <p className="text-gray-700 mb-4">
            We couldn't find the Pokémon you're looking for. It might be hiding!
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700"
          >
            Back to Pokédex
          </Button>
        </div>
      </div>
    );
  }

  const mainType = pokemon.types[0].type.name;

  return (
    <div className="min-h-screen pb-16 dark:bg-black text-black dark:text-white">
      <div
        className={`h-32 w-full absolute top-0 left-0 ${
          mainType === "fire"
            ? "bg-gradient-to-r from-pokemon-fire to-orange-400"
            : mainType === "water"
            ? "bg-gradient-to-r from-pokemon-water to-blue-400"
            : mainType === "grass"
            ? "bg-gradient-to-r from-pokemon-grass to-green-400"
            : mainType === "electric"
            ? "bg-gradient-to-r from-pokemon-electric to-yellow-300"
            : mainType === "rock"
            ? "bg-gradient-to-r from-pokemon-rock to-gray-500"
            : mainType === "flying"
            ? "bg-gradient-to-r from-pokemon-flying to-sky-300"
            : "bg-gradient-to-r from-gray-500 to-gray-400"
        } dark:opacity-90`}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center py-4">
          <Button
            variant="outline"
            className="bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Pokédex
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden mt-8 relative z-10">
          <div className="flex items-center justify-center px-4 sm:px-6 py-4 border-b dark:border-gray-700">
            <Button
              variant="ghost"
              className="p-0 h-8 w-8"
              onClick={() => navigateToPokemon(pokemon.id - 1)}
              disabled={pokemon.id <= 1}
            >
              <ChevronLeft size={24} />
            </Button>

            <div className="text-center mx-4">
              <h1 className="text-2xl sm:text-3xl font-bold capitalize">
                {pokemon.name.replace(/-/g, " ")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {formatPokemonId(pokemon.id)}
              </p>
            </div>

            <Button
              variant="ghost"
              className="p-0 h-8 w-8"
              onClick={() => navigateToPokemon(pokemon.id + 1)}
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 sm:p-6">
            <div className="lg:col-span-5 space-y-6">
              <div className="relative w-full">
                <img
                  src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  className="w-full object-contain"
                />
              </div>

              <div className="mt-6">
                <PokemonEvolution
                  evolutionChain={evolutionChain}
                  pokemonId={pokemon.id}
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <PokemonDetailInfo pokemon={pokemon} species={species} />

              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4 dark:text-gray-200">
                  Base Stats
                </h2>
                <StatsChart pokemon={pokemon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;

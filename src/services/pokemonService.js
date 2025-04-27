import { toast } from "sonner";

const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 100;

export const fetchPokemonList = async (offset) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${LIMIT}&offset=${offset}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    toast.error("Failed to fetch Pokemon list. Please try again later.");
    throw error;
  }
};

export const fetchPokemonDetails = async (nameOrId) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(`Pokemon ${nameOrId} not found`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon details for ${nameOrId}:`, error);
    toast.error(`Failed to fetch details for ${nameOrId}. Please try again later.`);
    throw error;
  }
};

export const fetchPokemonSpecies = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon species:", error);
    toast.error("Failed to fetch Pokemon species information. Please try again later.");
    throw error;
  }
};

export const fetchEvolutionChain = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    toast.error("Failed to fetch Pokemon evolution information. Please try again later.");
    throw error;
  }
};

export const searchPokemon = async (query) => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`);
    if (!response.ok) {
      return [];
    }
    const pokemon = await response.json();
    return [pokemon];
  } catch (error) {
    console.error("Error searching Pokemon:", error);
    return [];
  }
};

export const getPokemonImageById = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const getTypeColor = (type) => {
  const typeColors = {
    fire: "bg-pokemon-fire text-black dark:text-white",
    water: "bg-pokemon-water text-black dark:text-white",
    grass: "bg-pokemon-grass text-black dark:text-white",
    electric: "bg-pokemon-electric text-black dark:text-white",
    rock: "bg-pokemon-rock text-black dark:text-white",
    ground: "bg-pokemon-ground text-black dark:text-white",
    flying: "bg-pokemon-flying text-black dark:text-white",
    poison: "bg-pokemon-poison text-black dark:text-white",
    bug: "bg-pokemon-bug text-black dark:text-white",
    normal: "bg-pokemon-normal text-black dark:text-white",
    fairy: "bg-pokemon-fairy text-black dark:text-white",
    fighting: "bg-pokemon-fighting text-black dark:text-white",
    psychic: "bg-pokemon-psychic text-black dark:text-white",
    ghost: "bg-pokemon-ghost text-black dark:text-white",
    ice: "bg-pokemon-ice text-black dark:text-white",
    dragon: "bg-pokemon-dragon text-black dark:text-white",
    dark: "bg-pokemon-dark text-white dark:text-white",
    steel: "bg-pokemon-steel text-black dark:text-white",
  };
  
  return typeColors[type] || "bg-gray-500 text-black dark:text-white";
};

export const formatPokemonId = (id) => {
  return `#${id.toString().padStart(4, "0")}`;
};

export const formatHeight = (height) => {
  const heightInInches = height * 3.937;
  const feet = Math.floor(heightInInches / 12);
  const inches = Math.round(heightInInches % 12);
  return `${feet}'${inches}"`;
};

export const formatWeight = (weight) => {
  const weightInPounds = (weight / 4.536).toFixed(1);
  return `${weightInPounds} lbs`;
};

export const formatStatName = (statName) => {
  switch (statName) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Sp. Atk";
    case "special-defense":
      return "Sp. Def";
    case "speed":
      return "Speed";
    default:
      return statName;
  }
};

export const getGenderSymbol = (genderRate) => {
  if (genderRate === -1) return "⚪"; 
  if (genderRate === 0) return "♂️"; 
  if (genderRate === 8) return "♀️"; 
  return "♂️♀️";
};

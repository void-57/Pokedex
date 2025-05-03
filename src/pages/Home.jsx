import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";
import {
  fetchPokemonDetails,
  fetchPokemonList,
} from "@/services/pokemonService";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import PokemonCard from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import FilterOptions from "@/components/FilterOptions";
import { ThemeToggle } from "@/components/ThemeToggle";
import SkeletonCard from "@/components/SkeletonCard";

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sortOption, setSortOption] = useState("id-asc");
  const [typeFilter, setTypeFilter] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const loaderRef = useRef(null);

  const {
    data: pokemonListData,
    isLoading: isListLoading,
    error: listError,
  } = useQuery({
    queryKey: ["pokemonList", offset],
    queryFn: () => fetchPokemonList(offset),
    staleTime: 300000,
  });

  const {
    data: detailsData,
    isLoading: isDetailsLoading,
    error: detailsError,
  } = useQuery({
    queryKey: ["pokemonDetails", pokemonListData],
    queryFn: async () => {
      if (!pokemonListData) return [];

      const detailsPromises = pokemonListData.results.map((pokemon) =>
        fetchPokemonDetails(pokemon.name)
      );

      try {
        return await Promise.all(detailsPromises);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        return [];
      }
    },
    enabled: !!pokemonListData,
    staleTime: 300000,
  });
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (detailsData && detailsData.length > 0) {
      setAllPokemon((prev) => {
        const newPokemon = detailsData.filter(
          (pokemon) => !prev.some((p) => p.id === pokemon.id)
        );
        return [...prev, ...newPokemon];
      });

      setHasMore(!!pokemonListData?.next);
    }
  }, [detailsData, pokemonListData]);

  useEffect(() => {
    let filtered = [...allPokemon];
    if (searchQuery) {
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery) ||
          pokemon.id.toString() === searchQuery
      );
    }
    if (typeFilter) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeInfo) => typeInfo.type.name === typeFilter)
      );
    }

    filtered.sort((a, b) => {
      switch (sortOption) {
        case "id-asc":
          return a.id - b.id;
        case "id-desc":
          return b.id - a.id;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setDisplayedPokemon(filtered);
  }, [allPokemon, sortOption, typeFilter, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isIntersecting && hasMore && !isListLoading && !isDetailsLoading) {
      handleLoadMore();
    }
  }, [isIntersecting]);

  const handleLoadMore = () => {
    if (hasMore && !isListLoading && !isDetailsLoading) {
      setOffset((prev) => prev + 20);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

 

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleTypeFilterChange = (type) => {
    setTypeFilter(type);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if ((isListLoading || isDetailsLoading) && allPokemon.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (listError || detailsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Pokémon
          </h2>
          <p className="text-gray-700 mb-4">
            We encountered an issue while trying to catch 'em all. Please try
            again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 dark:bg-black text-black dark:text-white">
      <div className="bg-gradient-to-r from-red-600 to-red-500 dark:from-red-700 dark:to-red-600 text-white py-4 sm:py-6 px-3 sm:px-4 md:px-8 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mr-auto">
              Pokédex
            </h1>
            <div className="order-2 sm:order-3 flex items-center gap-2">
              <a
                href="https://github.com/void-57"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg w-10 h-10 bg-transparent hover:bg-gray-200 text-gray-700 hover:text-gray-900 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-200 transition-all duration-200 hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  class="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
              <ThemeToggle />
            </div>
            <div className="order-3 sm:order-2 w-full sm:w-auto sm:flex-grow sm:max-w-xl sm:mx-4 flex items-center gap-2">
              <div className="flex-grow">
                <SearchBar
                  onSearch={handleSearch}
                  isLoading={
                    isListLoading ||
                    isDetailsLoading 
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            {searchQuery ? "Search Results" : "Pokémon Collection"}
          </h2>
          <FilterOptions
            onSortChange={handleSortChange}
            onTypeFilterChange={handleTypeFilterChange}
            currentSort={sortOption}
            currentTypeFilter={typeFilter}
          />
        </div>

        {isListLoading || isDetailsLoading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: isSearching ? 5 : 20 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : displayedPokemon.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {displayedPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20">
            <h3 className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-400">
              No Pokémon found
            </h3>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        { hasMore && (
          <>
            <div
              ref={loaderRef}
              className="h-20 flex items-center justify-center"
            ></div>

            {(isListLoading || isDetailsLoading) && (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonCard key={`loading-more-${index}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-red-600 hover:bg-red-700 rounded-full shadow-lg p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12"
          size="icon"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect} from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const minSearchLength = 1;
  const debounceDelay = 300; 

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [query]);


  useEffect(() => {
    if (debouncedQuery === "") {
      onSearch("");
    } else if (debouncedQuery.length >= minSearchLength) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    onSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length >= minSearchLength) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex shadow-lg rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
        <Input
          type="text"
          placeholder={`Search Pokémon (min ${minSearchLength} characters)...`}
          value={query}
          onChange={handleInputChange}
          className="w-full pl-10 sm:pl-12 pr-10 py-3 h-12 sm:h-14 border-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
        />
        
       
        {isLoading ? (
          <Loader2 className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 animate-spin" size={18} />
        ) : (
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        )}

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            disabled={isLoading}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
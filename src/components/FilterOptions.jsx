import React, { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pokemonTypes = [
  "all",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const FilterOptions = ({
  onSortChange,
  onTypeFilterChange,
  currentSort,
  currentTypeFilter,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-start w-full md:w-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 flex items-center text-sm sm:text-base w-full sm:w-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
          >
            <ChevronDown size={16} />
            <span className="truncate">Sort by: {getSortLabel(currentSort)}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator className="dark:bg-gray-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem 
              onClick={() => onSortChange("id-asc")}
              className="dark:focus:bg-gray-700 dark:focus:text-gray-100"
            >
              Number (Ascending)
              {currentSort === "id-asc" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onSortChange("id-desc")}
              className="dark:focus:bg-gray-700 dark:focus:text-gray-100"
            >
              Number (Descending)
              {currentSort === "id-desc" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onSortChange("name-asc")}
              className="dark:focus:bg-gray-700 dark:focus:text-gray-100"
            >
              Name (A-Z)
              {currentSort === "name-asc" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onSortChange("name-desc")}
              className="dark:focus:bg-gray-700 dark:focus:text-gray-100"
            >
              Name (Z-A)
              {currentSort === "name-desc" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2 flex items-center text-sm sm:text-base w-full sm:w-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
          >
            <Filter size={16} />
            <span className="truncate">Type: {currentTypeFilter ? currentTypeFilter.charAt(0).toUpperCase() + currentTypeFilter.slice(1) : "All"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 max-h-[50vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
          <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
          <DropdownMenuSeparator className="dark:bg-gray-700" />
          <DropdownMenuGroup>
            {pokemonTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => onTypeFilterChange(type === "all" ? null : type)}
                className="dark:focus:bg-gray-700 dark:focus:text-gray-100"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {(type === "all" && currentTypeFilter === null) || type === currentTypeFilter ? (
                  <span className="ml-auto">✓</span>
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const getSortLabel = (sort) => {
  switch (sort) {
    case "id-asc":
      return "Number (Ascending)";
    case "id-desc":
      return "Number (Descending)";
    case "name-asc":
      return "Name (A-Z)";
    case "name-desc":
      return "Name (Z-A)";
    default:
      return "Default";
  }
};

export default FilterOptions;
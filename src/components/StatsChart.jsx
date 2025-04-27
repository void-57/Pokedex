import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatStatName, getTypeColor } from "../services/pokemonService";

const StatsChart = ({ pokemon }) => {
  const stats = pokemon.stats.map((stat) => ({
    stat: formatStatName(stat.stat.name),
    value: stat.base_stat,
    fullMark: 255,
  }));

  const mainType = pokemon.types[0].type.name;
  const colorClass = getTypeColor(mainType);
  
  

  let color;
  if (colorClass.includes("bg-pokemon-")) {
    const typeColor = colorClass.split(" ")[0].replace("bg-pokemon-", "");
    color = `var(--color-pokemon-${typeColor})`;
    console.log(color);
    
  } else {
    color = "#6D28D9";
  }

  return (
    <div className="w-full h-64 md:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats} className="border-1  dark:border-white rounded-lg">
          <PolarGrid />
          <PolarAngleAxis
            dataKey="stat"
            fontSize={12}
            tickLine={false}
            className="dark:text-white"
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload[0]) return null;
              return (
                <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg border dark:border-gray-700">
                  <p className="text-sm font-medium">
                    {payload[0].payload.stat}: {payload[0].payload.value}
                  </p>
                </div>
              );
            }}
          />
          <Radar
            name="Stats"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>

      
    </div>
  );
};

export default StatsChart;

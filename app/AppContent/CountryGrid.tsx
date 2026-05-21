"use client";

import { useTheme } from "../contextFiles/ThemeContext";
import { useEffect, useState } from "react";

interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    svg: string;
    png: string;
  };
}

function CountryCard({ country }: { country: Country }) {
  const { theme } = useTheme();

  return (
    <div className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer ${theme === 'dark' ? 'bg-[var(--blue-900)]' : 'bg-white'}`}>
      {/* Flag */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-6 pb-8">
        <h2 className={`font-extrabold text-lg mb-3 ${theme === 'dark' ? 'text-white' : 'text-[var(--grey-950)]'}`}>
          {country.name.common}
        </h2>
        <div className={`space-y-1 text-sm ${theme === 'dark' ? 'text-[var(--grey-400)]' : 'text-[var(--blue-950)]'}`}>
          <p>
            <span className={`font-bold ${theme === 'dark' ? 'text-[var(--grey-50)]' : null}`}>Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className={`font-bold ${theme === 'dark' ? 'text-[var(--grey-50)]' : null}`}>Region:</span> {country.region}
          </p>
          <p>
            <span className={`font-bold ${theme === 'dark' ? 'text-[var(--grey-50)]' : null}`}>Capital:</span>{" "}
            {country.capital?.[0] ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CountryGrid() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch countries");
        return res.json();
      })
      .then((data: Country[]) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-gray-500 text-lg">Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
      {countries.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../contextFiles/ThemeContext";

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

interface CountryGridProps {
  search: string;
  region: string;
}

function CountryCard({ country }: { country: Country }) {
  const { theme } = useTheme();

  return (
    <div className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer ${theme === 'dark' ? 'bg-[var(--blue-900)] text-white' : 'bg-white text-[var(--blue-950)]'}`}>
      <div className="w-full h-44 overflow-hidden">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 pb-8">
        <h2 className="font-extrabold text-lg mb-3">
          {country.name.common}
        </h2>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital?.[0] ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CountryGrid({ search, region }: CountryGridProps) {
  const { theme } = useTheme();
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

  const filtered = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>Loading countries...</p>
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

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>No countries found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-8">
      {filtered.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}

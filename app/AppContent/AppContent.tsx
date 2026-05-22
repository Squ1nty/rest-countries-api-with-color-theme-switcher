'use client';
 
import { useState } from 'react';
import Header from "./Header";
import { useTheme } from "../contextFiles/ThemeContext";
import QueryComponents from "./QueryComponents";
import CountryGrid from "./CountryGrid";
 
export default function AppContent() {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
 
  return(
    <div className={`w-full min-h-svh flex flex-col gap-2 ${theme === 'dark' ? 'bg-[var(--blue-950)]' : 'bg-[var(--grey-50)]'}`}>
      <Header />
      <main className='flex flex-col p-4'>
        <QueryComponents
          search={search}
          setSearch={setSearch}
          region={region}
          setRegion={setRegion}
        />
        <CountryGrid search={search} region={region} />
      </main>
    </div>
  );
}
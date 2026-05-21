'use client';

import Header from "./Header";
import { useTheme } from "../contextFiles/ThemeContext";
import QueryComponents from "./QueryComponents";
import CountryGrid from "./CountryGrid";

export default function AppContent() {
  const { theme } = useTheme();

  return(
    <div className={`w-full flex flex-col gap-2 ${theme === 'dark' ? 'bg-[var(--blue-950)]' : 'bg-[var(--grey-50)]'}`}>
      <Header></Header>
      <main className='flex flex-col p-4'>
        <QueryComponents></QueryComponents>
        <CountryGrid></CountryGrid>
      </main>
    </div>
  );
} 
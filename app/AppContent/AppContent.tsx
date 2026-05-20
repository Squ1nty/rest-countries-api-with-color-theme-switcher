'use client';

import Header from "./Header";
import { useTheme } from "../contextFiles/ThemeContext";
import QueryComponents from "./QueryComponents";

export default function AppContent() {
  const { theme } = useTheme();

  return(
    <div className={`w-full h-svh flex flex-col gap-2 overflow-hidden ${theme === 'dark' ? 'bg-[var(--blue-950)]' : 'bg-[var(--grey-50)]'}`}>
      <Header></Header>
      <main className='flex flex-col p-4'>
        <QueryComponents></QueryComponents>
      </main>
    </div>
  );
} 
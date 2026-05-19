'use client';

import Header from "./Header";
import { useTheme } from "../contextFiles/ThemeContext";

export default function AppContent() {
  const { theme } = useTheme();

  return(
    <div className={`w-full h-svh overflow-hidden ${theme === 'dark' ? 'bg-[var(--blue-950)]' : 'bg-white'}`}>
      <Header></Header>
    </div>
  );
} 
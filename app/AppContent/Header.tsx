'use client';

import { useTheme } from "../contextFiles/ThemeContext";

export default function Header(){

  const { theme, toggleTheme } = useTheme();

  return(
  <header className={`w-full sticky top-0 px-4 py-6 shadow-md flex space-between items-center justify-between ${theme === 'dark' ? 'bg-[var(--blue-900)] text-white' : 'bg-white text-[var(--blue-950)]'} z-10 `}>
    <div className="container w-fit"> {/* Actual heading location */}
      <h1 className="font-bold"><a href='/'>Where in the world?</a></h1>
    </div>
    <button className={`flex items-center gap-2 p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors duration-150 cursor-pointer`} onClick={toggleTheme}> {/* Theme toggle location */}
      <svg xmlns="http://www.w3.org/2000/svg" className={`ionicon w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-[var(--blue-950)]'}`} viewBox="0 0 512 512" >
        {theme === 'dark' ? (
          <path
            d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        ) : (
          <>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
            />
            <circle
              cx="256"
              cy="256"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
          </>
        )}
      </svg>
      <p className='text-nowrap'>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
    </button>
  </header>
  );
}

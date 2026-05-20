'use client';

import { useState } from 'react';
import { useTheme } from '../contextFiles/ThemeContext';

function QueryComponents(){
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return(
    <div className='flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-center'>
      <div className={`h-14 ${theme === 'dark' ? 'bg-[var(--blue-900)]' : 'bg-white text-[var(--blue-950)] shadow-md'} w-full pl-10 flex items-center gap-3 rounded-md overflow-hidden lg:max-w-3/5`}>
        <button className='cursor-pointer' onClick={() => alert('Search functionality not implemented yet')}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`ionicon w-7 ${theme === 'dark' ? 'text-white' : 'text-[var(--blue-950)]'}`} viewBox="0 0 512 512">
            <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"/>
          </svg>
        </button>
        <input className={`w-full h-fit py-4 px-2 ${theme === 'dark' ? 'bg-[var(--blue-900)] text-white placeholder:text-white' : 'bg-white text-[var(--blue-950)] placeholder:text-[var(--blue-500)]'} outline-none `} placeholder="Search for a country..." type='text'></input>
      </div>
      <div className={`relative w-48`}>
        <button className={`w-full h-14 px-4 py-2 rounded-md flex justify-between items-center gap-4 ${theme === 'dark' ? 'bg-[var(--blue-900)] text-white' : 'bg-white text-[var(--blue-950)] shadow-md'} cursor-pointer`} onClick={() => setOpen(!open)}>
          {selected || "Filter by Region"}
          <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
        </button>

        {open && (
          <ul className={`absolute z-10 w-full mt-1 rounded-md shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-[var(--blue-900)] text-white' : 'bg-white text-[var(--blue-950)]'}`}>
            {["Africa", "Americas", "Asia", "Europe", "Oceania"].map((region) => (
              <li className={`px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-[var(--blue-950)]' : 'hover:bg-gray-100'}`} key={region} onClick={() => { setSelected(region); setOpen(false); }}>
                {region}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QueryComponents;
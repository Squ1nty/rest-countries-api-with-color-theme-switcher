'use client'

import Link from 'next/link'
import { useTheme } from '../../contextFiles/ThemeContext'
import type { CountryDetail } from '../../AppContent/CountryGrid'

type Props = {
  country: CountryDetail
  borderNames: string[]
}

export default function CountryDetailClient({ country, borderNames }: Props) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const nativeName = Object.values(country.name.nativeName ?? {})[0]?.common ?? 'N/A'
  const currencies = Object.values(country.currencies ?? {}).map(c => c.name).join(', ') || 'N/A'
  const languages = Object.values(country.languages ?? {}).join(', ') || 'N/A'
  const tld = country.tld?.[0] ?? 'N/A'

  return (
    <div className={`min-h-screen px-8 py-12 md:px-20 ${dark ? 'bg-[var(--blue-950)] text-white' : 'bg-[var(--blue-50)] text-[var(--blue-950)]'}`}>

      {/* Back Button */}
      <Link href="/">
        <button className={`flex items-center gap-2 px-8 py-2 shadow-md rounded-md mb-16 text-sm ${dark ? 'bg-[var(--blue-900)] text-white' : 'bg-white text-[var(--blue-950)]'}`}>
          ← Back
        </button>
      </Link>

      {/* Main content */}
      <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-24">

        {/* Flag */}
        <div className="w-full md:w-1/2">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full object-cover rounded-md"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-extrabold mb-8">{country.name.common}</h1>

          <div className="flex flex-col md:flex-row gap-8 mb-12 text-sm">
            {/* Left column */}
            <div className="space-y-2 flex-1">
              <p><span className="font-semibold">Native Name:</span> {nativeName}</p>
              <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Sub Region:</span> {country.subregion ?? 'N/A'}</p>
              <p><span className="font-semibold">Capital:</span> {country.capital?.[0] ?? 'N/A'}</p>
            </div>

            {/* Right column */}
            <div className="space-y-2 flex-1">
              <p><span className="font-semibold">Top Level Domain:</span> {tld}</p>
              <p><span className="font-semibold">Currencies:</span> {currencies}</p>
              <p><span className="font-semibold">Languages:</span> {languages}</p>
            </div>
          </div>

          {/* Border Countries */}
          {borderNames.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold text-sm">Border Countries:</span>
              {borderNames.map(name => (
                <Link
                  key={name}
                  href={`/countries/${name}`}
                  className={`px-6 py-1 text-sm shadow-md rounded-sm ${dark ? 'bg-[var(--blue-900)] text-white' : 'bg-white text-[var(--blue-950)]'}`}
                >
                  {name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
// app/countries/[name]/page.tsx

import Link from 'next/link'
import type { CountryDetail } from '../../AppContent/CountryGrid'
import CountryDetailClient from './CountryDetailClient'
import Header from '@/app/AppContent/Header'

async function getCountry(name: string): Promise<CountryDetail> {
  const decoded = decodeURIComponent(name)
  const res = await fetch(`https://restcountries.com/v3.1/name/${decoded}`)
  if (!res.ok) throw new Error(`Failed to fetch country: ${decoded}`)
  const data = await res.json()
  if (!Array.isArray(data) || data.length === 0) throw new Error(`Country not found: ${decoded}`)
  return data[0]
}

async function getBorderCountryNames(codes: string[]): Promise<string[]> {
  if (!codes || codes.length === 0) return []
  const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}`)
  const data = await res.json()
  return data.map((c: CountryDetail) => c.name.common)
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const country = await getCountry(name)
  const borderNames = await getBorderCountryNames(country.borders ?? [])

  return(
    <>
      <Header></Header>
      <CountryDetailClient country={country} borderNames={borderNames} />
    </>
  );
}
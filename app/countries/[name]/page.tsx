// app/countries/[name]/page.tsx

import type { CountryDetail } from '../../AppContent/CountryGrid'
import CountryDetailClient from './CountryDetailClient'
import Header from '@/app/AppContent/Header'

const BASE = "https://api.restcountries.com/countries/v5"
const FIELDS = "names.common,names.official,names.native,population,region,subregion,capitals,flag.url_svg,flag.url_png,codes.alpha_3,tlds,currencies,languages,borders"

function transform(obj: any): CountryDetail {
  return {
    name: {
      common: obj.names?.common,
      official: obj.names?.official,
      nativeName: obj.names?.native ?? {},
    },
    population: obj.population,
    region: obj.region,
    subregion: obj.subregion,
    capital: obj.capitals?.map((c: any) => c.name),
    flags: {
      svg: obj.flag?.url_svg,
      png: obj.flag?.url_png,
    },
    cca3: obj.codes?.alpha_3,
    tld: obj.tlds,
    currencies: obj.currencies,
    languages: obj.languages,
    borders: obj.borders,
  }
}

async function getCountry(name: string): Promise<CountryDetail> {
  const decoded = decodeURIComponent(name)
  const API_KEY = process.env.REST_COUNTRIES_API_KEY

  const res = await fetch(
    `${BASE}/names.common/${encodeURIComponent(decoded)}?response_fields=${FIELDS}`,
    { headers: { "Authorization": `Bearer ${API_KEY}` } }
  )

  if (!res.ok) throw new Error(`Failed to fetch country: ${decoded}`)
  const data = await res.json()
  const obj = data.data?.objects?.[0]
  if (!obj) throw new Error(`Country not found: ${decoded}`)

  return transform(obj)
}

async function getBorderCountryNames(codes: string[]): Promise<string[]> {
  if (!codes || codes.length === 0) return []
  const API_KEY = process.env.REST_COUNTRIES_API_KEY

  const results = await Promise.all(
    codes.map(code =>
      fetch(`${BASE}/codes.alpha_3/${code}?response_fields=names.common`, {
        headers: { "Authorization": `Bearer ${API_KEY}` }
      }).then(res => res.json())
    )
  )

  return results
    .map(r => r.data?.objects?.[0]?.["names.common"] ?? r.data?.objects?.[0]?.names?.common)
    .filter(Boolean)
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const country = await getCountry(name)
  const borderNames = await getBorderCountryNames(country.borders ?? [])

  return (
    <>
      <Header />
      <CountryDetailClient country={country} borderNames={borderNames} />
    </>
  )
}
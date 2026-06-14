// app/page.tsx
import AppContent from "./AppContent/AppContent";
import { Country } from "./AppContent/CountryGrid";

const FIELDS = "names.common,names.official,population,region,capitals,flag.url_svg,flag.url_png,codes.alpha_3";

async function getCountries(): Promise<Country[]> {
  const API_KEY = process.env.REST_COUNTRIES_API_KEY;
  const BASE = "https://api.restcountries.com/countries/v5";

  // Fetch in batches of 100 (v5 max limit)
  const offsets = [0, 100, 200];
  const results = await Promise.all(
    offsets.map(offset =>
      fetch(`${BASE}?response_fields=${FIELDS}&limit=100&offset=${offset}`, {
        headers: { "Authorization": `Bearer ${API_KEY}` },
        next: { revalidate: 3600 }
      }).then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
    )
  );

  // Combine all batches, flatten data.objects arrays
  const allObjects = results.flatMap(r => r.data.objects);
  // Transform flat dot-notation keys into nested Country shape
  return allObjects
            .filter((obj: any) => obj.flag?.url_svg || obj.flag?.url_png)
            .map((obj: any): Country => ({ 
    name: {
      common: obj.names?.common,
      official: obj.names?.official,
    },
    population: obj.population,
    region: obj.region,
    capital: obj.capitals?.map((c: any) => c.name),
    flags: {
      svg: obj.flag?.url_svg,
      png: obj.flag?.url_png,
    },
    cca3: obj.codes?.alpha_3,
  }));
}

export default async function Home() {
  const countries = await getCountries();
  return <AppContent countries={countries} />;
}
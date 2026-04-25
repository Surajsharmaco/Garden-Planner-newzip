import { useState, useEffect } from "react";
import {
  influencers as DEFAULT_INFLUENCERS,
  NICHE_CATEGORIES,
  COUNTRIES,
  type Influencer,
} from "@/data/influencers";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "") + "/api";

interface LiveInfluencersResult {
  influencers: Influencer[];
  genres: string[];
  countries: string[];
  loading: boolean;
}

export function useLiveInfluencers(): LiveInfluencersResult {
  const [influencers, setInfluencers] = useState<Influencer[]>(DEFAULT_INFLUENCERS);
  const [genres, setGenres] = useState<string[]>([...NICHE_CATEGORIES]);
  const [countries, setCountries] = useState<string[]>([...COUNTRIES]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/admin/public/content/influencers`);
        if (!res.ok) throw new Error("no data");
        const json = await res.json();
        if (!json?.data) throw new Error("no data");
        if (!cancelled) {
          const data = json.data as { items?: Influencer[]; genres?: string[]; countries?: string[] };
          if (data.items?.length) setInfluencers(data.items);
          if (data.genres?.length) setGenres(data.genres);
          if (data.countries?.length) setCountries(data.countries);
        }
      } catch {
        // stay with static defaults
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { influencers, genres, countries, loading };
}

import { useEffect, useState } from "react";
import { LocationCard } from "@/components/LocationCard";
import { MapSection } from "@/components/MapSection";
import { locationApi } from "@/services/api";
import type { Location } from "@/types";

export function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => { locationApi.list().then(setLocations); }, []);
  return (
    <section className="brew-shell mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8"><p className="font-black uppercase tracking-[.22em] text-[#8d8074]">Pickup points</p><h1 className="brew-display mt-3 text-6xl font-black leading-none text-[#060505] md:text-8xl">BrewPoint across Islamabad</h1></div>
      <MapSection locations={locations} />
      <div className="mt-8 grid gap-5 md:grid-cols-4">{locations.map((location) => <LocationCard key={location.id} location={location} />)}</div>
    </section>
  );
}

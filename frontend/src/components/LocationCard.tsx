import { Clock, MapPin, Phone } from "lucide-react";
import type { Location } from "@/types";

export function LocationCard({ location }: { location: Location }) {
  return (
    <article className="rounded-[1.5rem] border border-black/10 bg-[#f7f3ec] p-5 shadow-[0_18px_55px_rgba(72,43,32,.1)]">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#060505] text-[#f5d64b]"><MapPin /></div>
      <h3 className="brew-display text-2xl font-black leading-tight">{location.name}</h3>
      <p className="mt-2 text-sm text-zinc-600">{location.address}</p>
      <p className="mt-4 flex gap-2 text-sm text-zinc-700"><Phone size={16} />{location.phone}</p>
      <p className="mt-2 flex gap-2 text-sm text-zinc-700"><Clock size={16} />{location.openingHours}</p>
    </article>
  );
}

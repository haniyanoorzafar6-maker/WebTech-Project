import { ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Location } from "@/types";

const markerPositions = [
  { x: "44%", y: "28%", area: "F-6", road: "Margalla Ave" },
  { x: "51%", y: "39%", area: "Blue Area", road: "Jinnah Ave" },
  { x: "63%", y: "54%", area: "I-8", road: "9th Ave" },
  { x: "42%", y: "78%", area: "Bahria", road: "Expressway" }
];

export function MapSection({ locations }: { locations: Location[] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f3ec] shadow-[0_28px_90px_rgba(72,43,32,.14)]">
      <div className="grid lg:grid-cols-[1.45fr_.55fr]">
        <div className="relative min-h-[560px] overflow-hidden bg-[#d7cec3]">
          <iframe
            title="Google map of Islamabad with BrewPoint pickup area"
            src="https://www.google.com/maps?q=Islamabad%2C%20Pakistan&z=12&output=embed"
            className="absolute inset-0 h-full w-full border-0 grayscale-[.18] sepia-[.18] contrast-[1.08]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(6,5,5,.12),transparent_32%,transparent_68%,rgba(6,5,5,.16))]" />

          <div className="absolute left-6 top-6 z-10 rounded-full border border-black/10 bg-[#f7f3ec]/85 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-[#482b20] backdrop-blur">
            Islamabad pickup map
          </div>

          {locations.map((location, index) => {
            const marker = markerPositions[index] ?? markerPositions[0];
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.name} ${location.address}`)}`;
            return (
              <a
                key={location.id}
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: marker.x, top: marker.y }}
                aria-label={`Open ${location.name} on Google Maps`}
              >
                <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5d64b]/30 opacity-80 transition group-hover:scale-125" />
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#060505] text-lg font-black text-[#f5d64b] shadow-[0_18px_45px_rgba(6,5,5,.35)] ring-4 ring-[#f7f3ec]">
                  {index + 1}
                </span>
                <span className="absolute left-1/2 top-[4.25rem] hidden w-56 -translate-x-1/2 rounded-[1rem] border border-black/10 bg-[#f7f3ec] p-3 text-left text-[#060505] shadow-xl md:block">
                  <span className="block text-xs font-black uppercase tracking-[.18em] text-[#8d8074]">{marker.area}</span>
                  <span className="mt-1 block text-sm font-black">{location.name}</span>
                  <span className="mt-1 block text-xs text-[#585756]">{marker.road}</span>
                </span>
              </a>
            );
          })}
        </div>

        <aside className="bg-[#060505] p-6 text-white sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#f5d64b]">Marked locations</p>
            <h3 className="brew-display mt-3 text-4xl font-black leading-none">Choose your counter.</h3>
          </div>

          <div className="space-y-3">
            {locations.map((location, index) => {
              const marker = markerPositions[index] ?? markerPositions[0];
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.name} ${location.address}`)}`;
              return (
                <article key={location.id} className="rounded-[1.25rem] border border-white/10 bg-white/8 p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f5d64b] text-sm font-black text-black">{index + 1}</div>
                    <div className="min-w-0">
                      <p className="font-black">{location.name}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[.16em] text-[#cbbcAD]">{marker.area} - {marker.road}</p>
                      <p className="mt-2 flex gap-2 text-sm text-[#d7cec3]"><MapPin size={15} className="mt-0.5 shrink-0" />{location.address}</p>
                      <p className="mt-2 flex gap-2 text-sm text-[#d7cec3]"><Phone size={15} />{location.phone}</p>
                    </div>
                  </div>
                  <Button asChild size="sm" className="mt-4 w-full rounded-full bg-white text-black hover:bg-[#f5d64b]">
                    <a href={mapsUrl} target="_blank" rel="noreferrer">
                      Open map <ExternalLink size={15} />
                    </a>
                  </Button>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-[#f5d64b]/25 bg-[#f5d64b]/10 p-4 text-sm text-[#f5d64b]">
            <Navigation className="mb-3" size={18} />
            Pins are approximate visual markers for the four seeded BrewPoint branches. The Open map buttons search each branch in Google Maps.
          </div>
        </aside>
      </div>
    </div>
  );
}

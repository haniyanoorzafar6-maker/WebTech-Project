import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CoffeeCard } from "@/components/CoffeeCard";
import { Input } from "@/components/ui/input";
import { coffeeApi } from "@/services/api";
import type { Coffee } from "@/types";

export function CatalogPage() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    coffeeApi.list().then(setCoffees).catch(() => setError("Could not load coffees.")).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => coffees.filter((coffee) => `${coffee.name} ${coffee.category}`.toLowerCase().includes(query.toLowerCase())), [coffees, query]);

  return (
    <section className="brew-shell mx-auto max-w-7xl px-4 py-12">
      <div className="brew-dark brew-noise mb-8 overflow-hidden rounded-[2rem] p-8 text-white shadow-[0_30px_100px_rgba(6,5,5,.24)]">
        <p className="font-black uppercase tracking-[.22em] text-[#f5d64b]">Catalog</p>
        <h1 className="brew-display mt-3 text-6xl font-black leading-none md:text-8xl">Brewed signatures</h1>
        <div className="relative mt-6 max-w-xl">
          <Search className="absolute left-4 top-3.5 text-[#8d8074]" size={18} />
          <Input className="h-12 rounded-full border-white/10 bg-white pl-11 text-black" placeholder="Search latte, mocha, cold brew..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>
      {loading && <p className="rounded-[1.5rem] bg-[#f7f3ec] p-6 font-bold text-[#482b20]">Loading coffees...</p>}
      {error && <p className="rounded-[1.5rem] bg-[#f7f3ec] p-4 font-bold text-[#482b20]">{error}</p>}
      {!loading && filtered.length === 0 && <p className="rounded-[1.5rem] bg-[#f7f3ec] p-8 text-center font-bold text-[#482b20]">No coffee matched that search.</p>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} />)}</div>
    </section>
  );
}

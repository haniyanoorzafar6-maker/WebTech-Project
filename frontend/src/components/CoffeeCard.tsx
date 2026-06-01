import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCoffeeImage } from "@/lib/coffeeImages";
import type { Coffee } from "@/types";

export function CoffeeCard({ coffee }: { coffee: Coffee }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="group flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-black/10 bg-[#f7f3ec] p-3 shadow-[0_18px_60px_rgba(72,43,32,.12)]">
      <div className="relative h-56 overflow-hidden rounded-[1.25rem] bg-[#cbc0b3]">
        <img src={getCoffeeImage(coffee.id)} alt={coffee.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        {coffee.isFeatured && <Badge className="absolute left-3 top-3 border-white/30 bg-[#060505] text-[#f5d64b]"><Flame size={13} className="mr-1" />Featured</Badge>}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="brew-display text-2xl font-black leading-tight">{coffee.name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[.18em] text-[#8d8074]">{coffee.category}</p>
          </div>
          <p className="rounded-full bg-white px-3 py-1 font-black">Rs {coffee.price}</p>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-zinc-600">{coffee.description}</p>
        <Button asChild className="mt-auto w-full rounded-full" variant="dark">
          <Link to={`/catalog/${coffee.id}`}>Customize <ArrowRight size={16} /></Link>
        </Button>
      </div>
    </motion.article>
  );
}

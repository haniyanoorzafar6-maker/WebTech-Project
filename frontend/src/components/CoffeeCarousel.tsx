import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCoffeeImage } from "@/lib/coffeeImages";
import type { Coffee } from "@/types";

export function CoffeeCarousel({ coffees }: { coffees: Coffee[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!coffees.length) return null;

  const active = coffees[activeIndex % coffees.length];
  const change = (offset: number) => setActiveIndex((current) => (current + offset + coffees.length) % coffees.length);

  return (
    <div className="brew-dark brew-noise overflow-hidden rounded-[2rem] text-white shadow-[0_30px_100px_rgba(6,5,5,.28)]">
      <div className="grid lg:grid-cols-[.95fr_1.05fr]">
        <div className="order-2 flex flex-col justify-between p-6 sm:p-10 lg:order-1">
          <div>
            <p className="brew-eyebrow-dark">Coffee carousel</p>
            <h2 className="brew-display mt-4 text-5xl font-black leading-none md:text-7xl">Choose your current mood.</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: .3 }}
              className="mt-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-black uppercase tracking-[.2em] text-[#cbbcAD]">{active.category}</p>
                {active.isFeatured && <span className="inline-flex items-center gap-1 rounded-full bg-[#f5d64b] px-3 py-1 text-xs font-black text-black"><Flame size={13} /> Featured</span>}
              </div>
              <h3 className="brew-display mt-4 text-5xl font-black leading-none text-[#f7f3ec]">{active.name}</h3>
              <p className="mt-4 max-w-xl leading-7 text-[#d7cec3]">{active.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <p className="brew-display text-4xl font-black text-[#f5d64b]">Rs {active.price}</p>
                <Button asChild className="rounded-full bg-white text-black hover:bg-[#f5d64b]">
                  <Link to={`/catalog/${active.id}`}>Customize cup <ArrowRight size={16} /></Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white hover:text-black" onClick={() => change(-1)} aria-label="Previous coffee"><ChevronLeft /></Button>
            <div className="flex flex-1 gap-2">
              {coffees.slice(0, 8).map((coffee, index) => (
                <button
                  key={coffee.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 flex-1 rounded-full transition ${index === activeIndex ? "bg-[#f5d64b]" : "bg-white/20 hover:bg-white/45"}`}
                  aria-label={`Select ${coffee.name}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white hover:text-black" onClick={() => change(1)} aria-label="Next coffee"><ChevronRight /></Button>
          </div>
        </div>

        <div className="order-1 min-h-[420px] overflow-hidden lg:order-2">
          <AnimatePresence mode="wait">
            <motion.img
              key={active.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: .98 }}
              transition={{ duration: .42 }}
              src={getCoffeeImage(active.id)}
              alt={active.name}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

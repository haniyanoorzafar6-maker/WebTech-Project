import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CupSoda, MapPin, Sparkles, Star, type LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CoffeeCard } from "@/components/CoffeeCard";
import { CoffeeCarousel } from "@/components/CoffeeCarousel";
import { LiveCupBuilder } from "@/components/LiveCupBuilder";
import { LocationCard } from "@/components/LocationCard";
import { MapSection } from "@/components/MapSection";
import { Button } from "@/components/ui/button";
import { coffeeApi, locationApi } from "@/services/api";
import type { Coffee, Location } from "@/types";
import heroImage from "@/assets/generated/brewpoint-hero.png";
import processImage from "@/assets/generated/brew-process.png";
import ctaImage from "@/assets/generated/brew-cta.png";


export function HomePage() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([coffeeApi.list(), locationApi.list()])
      .then(([coffeeData, locationData]) => {
        setCoffees(coffeeData);
        setLocations(locationData);
      })
      .catch(() => setError("Backend API is not reachable. Start the ASP.NET server to load live data."));
  }, []);

  const featured = coffees.filter((coffee) => coffee.isFeatured).slice(0, 4);

  return (
    <div className="brew-shell">
      <section className="mx-auto max-w-[1500px] px-3 pb-10 pt-4 sm:px-5">
        <div className="brew-dark brew-noise relative min-h-[calc(100vh-6rem)] overflow-hidden rounded-[2rem] text-white shadow-[0_30px_100px_rgba(6,5,5,.32)]">
          <div className="absolute left-6 top-6 z-10 hidden rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-[#cbbcAD] lg:block">
            Est. Islamabad
          </div>
          <div className="absolute bottom-0 right-0 top-0 w-full opacity-55 md:w-[58%]">
            <img src={heroImage} alt="Coffee bar interior" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060505] via-[#060505]/35 to-transparent md:bg-gradient-to-l" />
          </div>

          <div className="relative z-10 grid min-h-[calc(100vh-6rem)] items-end gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-10">
            <div className="pb-8">
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-[#f5d64b] backdrop-blur">
                Specialty pickup coffee
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="brew-display max-w-5xl text-[4.5rem] font-black leading-[.86] sm:text-[6.2rem] lg:text-[8.8rem]">
                Brewed for Islamabad.
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }} className="mt-7 grid max-w-3xl gap-5 md:grid-cols-[1fr_auto] md:items-end">
                <p className="text-base leading-8 text-[#d7cec3] sm:text-lg">
                  Order crafted coffee from F-6, Blue Area, I-8, or Bahria Town Phase 7. Customize the cup, pick a branch, and track it until it is ready.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-full bg-[#f5d64b] text-black hover:bg-white">
                    <Link to="/catalog">Order now <ArrowRight size={18} /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white hover:text-black">
                    <Link to="/locations">Locations</Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22 }} className="mb-4 grid gap-4 sm:grid-cols-3 lg:mb-8">
              {[
                ["12", "signature coffees"],
                ["04", "pickup bars"],
                ["15m", "average prep"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.25rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="brew-display text-4xl font-black text-[#f5d64b]">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[.18em] text-[#cbbcAD]">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {error && <div className="mx-auto mt-4 max-w-7xl rounded-[1.25rem] border border-[#482b20]/20 bg-[#f7f3ec] px-5 py-4 text-sm font-semibold text-[#482b20]">{error}</div>}

      <div className="overflow-hidden border-y border-black/10 bg-[#060505] py-4 text-[#f5d64b]">
        <div className="marquee-track flex w-[200%] gap-10 text-sm font-black uppercase tracking-[.28em]">
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index}>espresso bar - pickup ready - Islamabad roast - custom cup -</span>
          ))}
        </div>
      </div>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-20">
        <CoffeeCarousel coffees={coffees.slice(0, 8)} />
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <p className="font-black uppercase tracking-[.22em] text-[#8d8074]">Current favorites</p>
            <h2 className="brew-display mt-3 text-5xl font-black leading-none text-[#060505] md:text-7xl">A warmer menu, less noise.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#585756]">
            Every card is pulled from the backend catalog and styled like a boutique roastery shelf: textured, grounded, and focused on the drink.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {(featured.length ? featured : coffees.slice(0, 4)).map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} />)}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f3ec] shadow-[0_26px_90px_rgba(72,43,32,.12)] lg:grid-cols-[1fr_1.15fr]">
          <div className="min-h-[420px] bg-cover bg-center" style={{ backgroundImage: `url(${processImage})` }} />
          <div className="p-8 sm:p-12">
            <p className="font-black uppercase tracking-[.22em] text-[#8d8074]">How pickup works</p>
            <h2 className="brew-display mt-3 text-5xl font-black leading-none text-[#060505]">From craving to counter.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {([
                ["Choose", "Pick from 12 brewed signatures.", CupSoda],
                ["Customize", "Size, milk, sugar, toppings.", Sparkles],
                ["Select", "Choose your Islamabad pickup point.", MapPin],
                ["Collect", "Track status until ready.", Clock]
              ] as Array<[string, string, LucideIcon]>).map(([title, text, Icon], index) => (
                <div key={String(title)} className="rounded-[1.25rem] border border-black/10 bg-white/70 p-5">
                  <div className="mb-8 flex items-center justify-between">
                    <Icon className="text-[#482b20]" />
                    <span className="brew-display text-4xl font-black text-[#cbbcAD]">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#585756]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-20">
        <LiveCupBuilder />
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-black uppercase tracking-[.22em] text-[#8d8074]">Islamabad network</p>
            <h2 className="brew-display mt-3 text-5xl font-black leading-none md:text-7xl">Four coffee counters.</h2>
          </div>
          <Button asChild variant="dark" className="rounded-full"><Link to="/locations">See all locations</Link></Button>
        </div>
        <div className="grid gap-5 md:grid-cols-4">{locations.map((location) => <LocationCard key={location.id} location={location} />)}</div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-12">
        <MapSection locations={locations} />
      </AnimatedSection>

      <AnimatedSection className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="brew-display max-w-2xl text-5xl font-black leading-none text-[#060505]">People come back for the same cup.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Haniya", "Ready in 12 minutes at F-6. The Rose Pistachio Latte is quietly perfect."],
              ["Shayan", "Blue Area pickup is quick and consistent. The saffron cappuccino has become my usual order."],
              ["Sana", "Pink Cloud Mocha is smooth, balanced, and just sweet enough. I keep coming back for it."]
            ].map(([name, quote]) => (
              <div key={name} className="rounded-[1.5rem] border border-black/10 bg-[#f7f3ec] p-6 shadow-[0_18px_55px_rgba(72,43,32,.1)]">
                <Star className="mb-4 fill-[#f5d64b] text-[#f5d64b]" />
                <p className="leading-7 text-[#585756]">{quote}</p>
                <p className="mt-5 font-black">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="px-4 pb-24 pt-8">
        <div className="brew-dark mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] text-white shadow-[0_30px_100px_rgba(6,5,5,.28)] md:grid-cols-[1.1fr_.9fr]">
          <div className="p-8 sm:p-12">
            <p className="font-black uppercase tracking-[.22em] text-[#f5d64b]">Ready for pickup</p>
            <h2 className="brew-display mt-4 text-5xl font-black leading-none md:text-7xl">Make the next cup deliberate.</h2>
            <p className="mt-5 max-w-xl leading-8 text-[#d7cec3]">Browse the live catalog, personalize your cup, and track it from your dashboard.</p>
            <Button asChild className="mt-8 rounded-full bg-[#f5d64b] text-black hover:bg-white" size="lg"><Link to="/catalog">Order now</Link></Button>
          </div>
          <img src={ctaImage} alt="Latte art" className="h-full min-h-[340px] w-full object-cover" />
        </div>
      </section>
    </div>
  );
}

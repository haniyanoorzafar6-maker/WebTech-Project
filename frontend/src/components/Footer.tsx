import { Instagram, Mail, MapPin } from "lucide-react";
import logo from "@/assets/generated/brewpoint-logo.png";

export function Footer() {
  return (
    <footer className="brew-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-3 text-xl font-black text-[#f5d64b]"><img src={logo} alt="" className="h-12 w-12 object-contain" />BrewPoint Islamabad</div>
          <p className="max-w-xl text-sm leading-6 text-[#d7cec3]">Premium pickup coffee for Islamabad mornings, office breaks, and late-night focus sessions.</p>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Explore</h3>
          <ul className="space-y-2 text-sm text-[#d7cec3]"><li>Catalog</li><li>Locations</li><li>Dashboard</li><li>Admin</li></ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Contact</h3>
          <p className="flex gap-2 text-sm text-[#d7cec3]"><Mail size={16} /> hello@brewpoint.com</p>
          <p className="mt-2 flex gap-2 text-sm text-[#d7cec3]"><MapPin size={16} /> Islamabad, Pakistan</p>
          <p className="mt-2 flex gap-2 text-sm text-[#d7cec3]"><Instagram size={16} /> @brewpoint</p>
        </div>
      </div>
    </footer>
  );
}

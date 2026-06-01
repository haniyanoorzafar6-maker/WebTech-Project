import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, Shield, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/generated/brewpoint-logo.png";

const nav = [
  ["Home", "/"],
  ["Catalog", "/catalog"],
  ["Locations", "/locations"],
  ["Dashboard", "/dashboard"]
] as const;

export function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#ebe7df]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-black">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-[#060505] p-1"><img src={logo} alt="" className="h-full w-full object-contain" /></span>
          BrewPoint Islamabad
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/45 p-1 md:flex">
          {nav.map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold ${isActive ? "bg-[#060505] text-white" : "text-zinc-700 hover:bg-white"}`}>
              {label}
            </NavLink>
          ))}
          {user?.role === "Admin" && <NavLink to="/admin" className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-white"><Shield className="mr-1 inline" size={15} />Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/profile" className="hidden text-sm font-semibold sm:inline-flex"><UserRound size={16} className="mr-1" />{user.fullName}</Link>
              <Button variant="outline" size="sm" onClick={logout}><LogOut size={16} />Logout</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm"><Link to="/login">Login</Link></Button>
              <Button asChild size="sm"><Link to="/signup">Signup</Link></Button>
            </>
          )}
          <Button className="md:hidden rounded-full" variant="ghost" size="icon" aria-label="Open menu"><Menu size={20} /></Button>
        </div>
      </div>
    </header>
  );
}

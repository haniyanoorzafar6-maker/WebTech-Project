import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, MapPin, ShoppingBag, Star, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderCard } from "@/components/OrderCard";
import { useAuth } from "@/hooks/useAuth";
import { orderApi } from "@/services/api";
import type { Order } from "@/types";

export function DashboardPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { orderApi.mine().then(setOrders); }, []);
  return (
    <section className="brew-shell mx-auto max-w-7xl px-4 py-12">
      <div className="brew-dark brew-noise overflow-hidden rounded-[2rem] p-8 text-white shadow-[0_30px_100px_rgba(6,5,5,.24)]">
        <p className="brew-eyebrow-dark">Dashboard</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <h1 className="brew-display text-6xl font-black leading-none md:text-8xl">Welcome, {user?.fullName}</h1>
          <Button asChild className="rounded-full bg-[#f5d64b] text-black hover:bg-white"><Link to="/catalog">Quick order</Link></Button>
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {([
          ["Orders", orders.length, ShoppingBag],
          ["Ready", orders.filter((o) => o.status === "Ready for Pickup").length, Coffee],
          ["Locations", 4, MapPin],
          ["Favorites", "Featured", Star]
        ] as Array<[string, string | number, LucideIcon]>).map(([label, value, Icon]) => (
          <div key={String(label)} className="brew-panel p-5"><Icon className="mb-5 text-[#482b20]" /><p className="brew-eyebrow">{label}</p><p className="brew-display mt-2 text-4xl font-black text-[#060505]">{value}</p></div>
        ))}
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <div className="space-y-4">
          <h2 className="brew-display text-4xl font-black text-[#060505]">Recent orders</h2>
          {orders.length ? orders.map((order) => <OrderCard key={order.id} order={order} />) : <p className="brew-panel p-8 text-center font-bold text-[#482b20]">No orders yet.</p>}
        </div>
        <div className="brew-panel p-6">
          <p className="brew-eyebrow">Profile</p>
          <h2 className="brew-display mt-3 text-4xl font-black text-[#060505]">Account summary</h2>
          <p className="mt-5 text-sm text-[#585756]">{user?.email}</p>
          <p className="mt-2 text-sm text-[#585756]">{user?.phone ?? "Phone not added"}</p>
          <Button asChild className="mt-6 rounded-full" variant="outline"><Link to="/profile">Edit profile</Link></Button>
        </div>
      </div>
    </section>
  );
}

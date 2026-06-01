import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { coffeeApi, locationApi, orderApi, reviewApi, userApi } from "@/services/api";
import type { Coffee, Location, Order, Review, User } from "@/types";

export function AdminPage() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const load = () => {
    Promise.all([coffeeApi.list(), locationApi.list(), orderApi.all(), userApi.list(), reviewApi.list()])
      .then(([c, l, o, u, r]) => { setCoffees(c); setLocations(l); setOrders(o); setUsers(u); setReviews(r); });
  };
  useEffect(load, []);

  return (
    <section className="brew-shell mx-auto max-w-7xl px-4 py-12">
      <div className="brew-dark brew-noise overflow-hidden rounded-[2rem] p-8 text-white shadow-[0_30px_100px_rgba(6,5,5,.24)]">
        <p className="brew-eyebrow-dark">Admin</p>
        <h1 className="brew-display mt-3 text-6xl font-black leading-none md:text-8xl">BrewPoint operations</h1>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-5">
        {[["Users", users.length], ["Coffees", coffees.length], ["Locations", locations.length], ["Orders", orders.length], ["Reviews", reviews.length]].map(([label, value]) => (
          <div key={label} className="brew-panel p-5"><p className="brew-eyebrow">{label}</p><p className="brew-display mt-2 text-4xl font-black text-[#060505]">{value}</p></div>
        ))}
      </div>
      <AdminTable title="Orders" headers={["Order", "User", "Location", "Total", "Status"]} rows={orders.map((o) => [o.orderNumber, o.userName, o.locationName, `Rs ${o.totalAmount}`, <select key={o.id} className="brew-control px-3 py-1 text-sm" value={o.status} onChange={(e) => orderApi.status(o.id, e.target.value).then(load)}><option>Pending</option><option>Preparing</option><option>Ready for Pickup</option><option>Completed</option><option>Cancelled</option></select>])} />
      <AdminTable title="Coffees" headers={["Name", "Category", "Price", "Available"]} rows={coffees.map((c) => [c.name, c.category, `Rs ${c.price}`, c.isAvailable ? "Yes" : "No"])} />
      <AdminTable title="Locations" headers={["Name", "Phone", "Hours"]} rows={locations.map((l) => [l.name, l.phone, l.openingHours])} />
      <AdminTable title="Users" headers={["Name", "Email", "Role"]} rows={users.map((u) => [u.fullName, u.email, u.role])} />
      <AdminTable title="Reviews" headers={["Coffee", "User", "Rating", "Comment"]} rows={reviews.map((r) => [r.coffeeName, r.userName, r.rating, r.comment])} />
      <Button className="mt-6 rounded-full bg-[#060505] text-white hover:bg-[#482b20]" onClick={load}>Refresh</Button>
    </section>
  );
}

function AdminTable({ title, headers, rows }: { title: string; headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="brew-table mt-8">
      <div className="border-b border-black/10 p-5"><h2 className="brew-display text-3xl font-black text-[#060505]">{title}</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#060505] text-[#f5d64b]">{headers.map((h) => <th key={h} className="px-4 py-3 font-black uppercase tracking-[.12em]">{h}</th>)}</thead>
          <tbody>{rows.map((row, index) => <tr key={index} className="border-t border-black/10">{row.map((cell, i) => <td key={i} className="px-4 py-3 text-[#585756]">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

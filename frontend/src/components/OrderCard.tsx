import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types";

export function OrderCard({ order }: { order: Order }) {
  return (
    <article className="rounded-[1.5rem] border border-black/10 bg-[#f7f3ec] p-5 shadow-[0_18px_55px_rgba(72,43,32,.1)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-black">{order.orderNumber}</h3>
          <p className="text-sm text-[#585756]">{order.locationName} - {new Date(order.pickupTime).toLocaleString()}</p>
        </div>
        <Badge className="border-[#f5d64b]/30 bg-[#f5d64b] text-black">{order.status}</Badge>
      </div>
      <div className="mt-4 space-y-2">
        {order.items.map((item) => (
          <p key={item.id} className="text-sm text-[#585756]">{item.quantity}x {item.coffeeName} - {item.size} - {item.milkType}</p>
        ))}
      </div>
      <p className="mt-4 text-right text-lg font-black">Rs {order.totalAmount}</p>
    </article>
  );
}

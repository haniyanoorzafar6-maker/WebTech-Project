import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { coffeeApi, locationApi, orderApi } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import { getCoffeeImage } from "@/lib/coffeeImages";
import type { Coffee, Location } from "@/types";

const schema = z.object({
  size: z.string().min(1),
  milkType: z.string().min(1),
  sugarLevel: z.string().min(1),
  toppings: z.string(),
  quantity: z.coerce.number().min(1).max(10),
  locationId: z.coerce.number().min(1),
  pickupTime: z.string().min(1)
});
type FormValues = z.infer<typeof schema>;

export function CoffeeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [coffee, setCoffee] = useState<Coffee | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { milkType: "Oat", sugarLevel: "Medium", toppings: "None", quantity: 1 }
  });

  useEffect(() => {
    if (!id) return;
    Promise.all([coffeeApi.get(Number(id)), locationApi.list()]).then(([c, l]) => {
      setCoffee(c);
      setLocations(l);
    });
  }, [id]);

  const onSubmit = async (values: FormValues) => {
    if (!coffee) return;
    if (!user) {
      navigate("/login");
      return;
    }
    await orderApi.create({
      locationId: values.locationId,
      pickupTime: new Date(values.pickupTime).toISOString(),
      items: [{ coffeeId: coffee.id, quantity: values.quantity, size: values.size, milkType: values.milkType, sugarLevel: values.sugarLevel, toppings: values.toppings }]
    });
    setMessage("Order placed. Your dashboard is ready.");
    setTimeout(() => navigate("/dashboard"), 900);
  };

  if (!coffee) return <div className="brew-shell p-10 text-center font-bold">Loading coffee...</div>;

  return (
    <section className="brew-shell mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <Button asChild variant="ghost" className="rounded-full text-[#482b20]"><Link to="/catalog"><ArrowLeft size={16} />Back to catalog</Link></Button>
        <div className="mt-5 overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f3ec] p-3 shadow-[0_28px_90px_rgba(72,43,32,.14)]">
          <img src={getCoffeeImage(coffee.id)} alt={coffee.name} className="h-[560px] w-full rounded-[1.5rem] object-cover" />
        </div>
      </div>
      <div className="brew-panel p-6 sm:p-8">
        <p className="brew-eyebrow">{coffee.category}</p>
        <h1 className="brew-display mt-3 text-6xl font-black leading-none text-[#060505]">{coffee.name}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-[#585756]">{coffee.description}</p>
        <p className="mt-5 inline-flex rounded-full bg-[#060505] px-4 py-2 text-xl font-black text-[#f5d64b]">Rs {coffee.price}</p>
        <div className="mt-5 flex flex-wrap gap-2">{coffee.ingredients.map((i) => <span key={i} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-black text-[#482b20]">{i}</span>)}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-black text-[#482b20]">Size<select className="brew-control mt-2 w-full px-4" {...register("size")}>{coffee.sizeOptions.map((s) => <option key={s}>{s}</option>)}</select></label>
          <label className="text-sm font-black text-[#482b20]">Milk<select className="brew-control mt-2 w-full px-4" {...register("milkType")}><option>Oat</option><option>Dairy</option><option>Almond</option><option>Black</option></select></label>
          <label className="text-sm font-black text-[#482b20]">Sugar<select className="brew-control mt-2 w-full px-4" {...register("sugarLevel")}><option>Low</option><option>Medium</option><option>High</option><option>None</option></select></label>
          <label className="text-sm font-black text-[#482b20]">Topping<select className="brew-control mt-2 w-full px-4" {...register("toppings")}><option>None</option><option>Caramel</option><option>Pistachio</option><option>Rose Dust</option></select></label>
          <label className="text-sm font-black text-[#482b20]">Quantity<input type="number" className="brew-control mt-2 w-full px-4" {...register("quantity")} /></label>
          <label className="text-sm font-black text-[#482b20]">Pickup Time<input type="datetime-local" className="brew-control mt-2 w-full px-4" {...register("pickupTime")} /></label>
          <label className="text-sm font-black text-[#482b20] sm:col-span-2">Pickup Location<select className="brew-control mt-2 w-full px-4" {...register("locationId")}><option value="">Select location</option>{locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</select></label>
          {Object.values(errors)[0]?.message && <p className="sm:col-span-2 text-sm font-bold text-[#7a3026]">Please complete the customization form.</p>}
          {message && <p className="rounded-[1rem] bg-[#f5d64b] p-3 font-black text-black sm:col-span-2">{message}</p>}
          <Button disabled={isSubmitting} className="rounded-full bg-[#060505] text-white hover:bg-[#482b20] sm:col-span-2" size="lg"><ShoppingBag size={18} />Place pickup order</Button>
        </form>
      </div>
    </section>
  );
}

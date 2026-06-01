import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { userApi } from "@/services/api";

const schema = z.object({ fullName: z.string().min(2), phone: z.string().optional() });
type Values = z.infer<typeof schema>;

export function ProfilePage() {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema), values: { fullName: user?.fullName ?? "", phone: user?.phone ?? "" } });
  const submit = async (values: Values) => { if (user) await userApi.update(user.id, values); };
  return (
    <section className="brew-shell mx-auto max-w-4xl px-4 py-12">
      <form onSubmit={handleSubmit(submit)} className="brew-panel p-6 sm:p-10">
        <p className="brew-eyebrow">Account</p>
        <h1 className="brew-display mt-3 text-6xl font-black leading-none text-[#060505]">Profile</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-black text-[#482b20]">Full name<Input className="mt-2" {...register("fullName")} /></label>
          <label className="text-sm font-black text-[#482b20]">Phone<Input className="mt-2" {...register("phone")} /></label>
        </div>
        <Button disabled={isSubmitting} className="mt-6 rounded-full bg-[#060505] text-white hover:bg-[#482b20]">Save profile</Button>
      </form>
    </section>
  );
}

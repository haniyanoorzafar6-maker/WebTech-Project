import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({ fullName: z.string().min(2), email: z.string().email(), phone: z.string().optional(), password: z.string().min(8) });
type Values = z.infer<typeof schema>;

export function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });
  const submit = async (values: Values) => {
    await signup(values);
    navigate("/dashboard");
  };
  return (
    <section className="brew-shell grid min-h-[82vh] place-items-center px-4 py-12">
      <form onSubmit={handleSubmit(submit)} className="brew-panel w-full max-w-2xl p-6 sm:p-10">
        <p className="brew-eyebrow">Join BrewPoint</p>
        <h1 className="brew-display mt-3 text-5xl font-black leading-none text-[#060505]">Create your pickup account.</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-black text-[#482b20]">Full name<Input className="mt-2" {...register("fullName")} /></label>
          <label className="text-sm font-black text-[#482b20]">Phone<Input className="mt-2" {...register("phone")} /></label>
          <label className="text-sm font-black text-[#482b20] sm:col-span-2">Email<Input className="mt-2" {...register("email")} /></label>
          <label className="text-sm font-black text-[#482b20] sm:col-span-2">Password<Input className="mt-2" type="password" {...register("password")} /></label>
        </div>
        {Object.keys(errors).length > 0 && <p className="mt-3 text-sm font-bold text-[#7a3026]">Please complete all required fields.</p>}
        <Button disabled={isSubmitting} className="mt-6 w-full rounded-full bg-[#060505] text-white hover:bg-[#482b20]">Signup</Button>
      </form>
    </section>
  );
}

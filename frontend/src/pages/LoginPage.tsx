import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/generated/brewpoint-logo.png";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
type Values = z.infer<typeof schema>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });
  const submit = async (values: Values) => {
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch {
      setError("root", { message: "Invalid email or password." });
    }
  };
  return (
    <section className="brew-shell grid min-h-[82vh] place-items-center px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f3ec] shadow-[0_30px_100px_rgba(6,5,5,.2)] lg:grid-cols-[.95fr_1.05fr]">
        <div className="brew-dark hidden p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-[#f5d64b] p-2"><img src={logo} alt="BrewPoint mascot" className="h-full w-full object-contain" /></div>
          <div>
            <p className="brew-eyebrow-dark">Member counter</p>
            <h1 className="brew-display mt-4 text-6xl font-black leading-none">Welcome back to the bar.</h1>
            <p className="mt-5 leading-7 text-[#d7cec3]">Track pickups, repeat favorites, and manage your BrewPoint ritual.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(submit)} className="p-6 sm:p-10">
          <p className="brew-eyebrow">Sign in</p>
          <h1 className="brew-display mt-3 text-5xl font-black leading-none text-[#060505]">Login</h1>
          <label className="mt-8 block text-sm font-black text-[#482b20]">Email<Input className="mt-2" {...register("email")} /></label>
          <label className="mt-4 block text-sm font-black text-[#482b20]">Password<Input className="mt-2" type="password" {...register("password")} /></label>
          {(errors.root || errors.email || errors.password) && <p className="mt-3 text-sm font-bold text-[#7a3026]">{errors.root?.message ?? "Enter a valid email and password."}</p>}
          <Button disabled={isSubmitting} className="mt-6 w-full rounded-full bg-[#060505] text-white hover:bg-[#482b20]">Login</Button>
          <p className="mt-5 text-center text-sm text-[#585756]">New here? <Link className="font-black text-[#482b20]" to="/signup">Create account</Link></p>
        </form>
      </div>
    </section>
  );
}

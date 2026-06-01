import { useEffect, useRef } from "react";

export function LiveCupBuilder() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const form = root.querySelector<HTMLFormElement>("[data-cup-form]");
    const liquid = root.querySelector<HTMLDivElement>("[data-liquid]");
    const label = root.querySelector<HTMLParagraphElement>("[data-cup-label]");
    const topping = root.querySelector<HTMLDivElement>("[data-topping]");
    if (!form || !liquid || !label || !topping) return;

    const update = () => {
      const data = new FormData(form);
      const size = String(data.get("size"));
      const milk = String(data.get("milk"));
      const sweet = String(data.get("sweet"));
      const top = String(data.get("top"));
      const heights: Record<string, string> = { Small: "42%", Medium: "58%", Large: "74%" };
      const colors: Record<string, string> = { Oat: "#d8b26f", Dairy: "#b7794b", Almond: "#c89262", Black: "#171717" };
      liquid.style.height = heights[size] ?? "58%";
      liquid.style.background = `linear-gradient(${colors[milk] ?? "#b7794b"}, #3b1f16)`;
      topping.textContent = top === "None" ? "" : top;
      label.textContent = `${size} cup - ${milk} milk - ${sweet} sweetness${top === "None" ? "" : ` - ${top}`}`;
    };

    form.addEventListener("change", update);
    form.addEventListener("submit", (event) => event.preventDefault());
    update();
    return () => form.removeEventListener("change", update);
  }, []);

  return (
    <div ref={rootRef} className="grid gap-8 rounded-[2rem] border border-black/10 bg-[#f7f3ec] p-6 shadow-[0_28px_90px_rgba(72,43,32,.14)] md:grid-cols-2">
      <div>
        <p className="text-xs font-black uppercase tracking-[.22em] text-[#8d8074]">Custom cup</p>
        <h3 className="brew-display mt-3 text-5xl font-black leading-none text-[#060505]">Live Cup Builder</h3>
        <p className="mt-4 max-w-md text-sm leading-6 text-[#585756]">Shape your pickup cup and watch the preview change with every selection.</p>
        <form data-cup-form className="mt-6 grid gap-4 sm:grid-cols-2">
          {([
            ["size", ["Small", "Medium", "Large"]],
            ["milk", ["Oat", "Dairy", "Almond", "Black"]],
            ["sweet", ["Low", "Medium", "High"]],
            ["top", ["None", "Caramel", "Pistachio", "Rose Dust"]]
          ] as Array<[string, string[]]>).map(([name, values]) => (
            <label key={name} className="text-sm font-black capitalize text-[#482b20]">
              {name}
              <select name={name} className="mt-2 h-11 w-full rounded-full border border-black/10 bg-white px-4 text-[#060505]">
                {(values as string[]).map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
          ))}
        </form>
      </div>
      <div className="grid place-items-center rounded-[1.5rem] bg-[#060505] p-8">
        <div className="relative h-64 w-40 overflow-hidden rounded-b-[48px] rounded-t-md border-8 border-black bg-white">
          <div data-liquid className="cup-liquid absolute bottom-0 left-0 right-0 h-1/2 bg-amber-700" />
          <div data-topping className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-[#f5d64b] px-3 py-1 text-xs font-black text-black" />
        </div>
        <p data-cup-label className="mt-4 text-center text-sm font-bold text-[#f5d64b]" />
      </div>
    </div>
  );
}

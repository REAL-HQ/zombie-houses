import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/watch", label: "Watch" },
  { to: "/rescue", label: "Rescue" },
  { to: "/sell", label: "Sell" },
  { to: "/design", label: "Design" },
] as const;

export const Nav = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[200] transition-all duration-200 ${
        transparent
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur-md border-b border-mid"
      }`}
    >
      <div className="max-w-[1160px] mx-auto px-6 h-[60px] md:h-[68px] flex items-center justify-between">
        <Link to="/" className="font-display text-2xl md:text-[1.6rem] leading-none tracking-tight">
          <span className={transparent ? "text-white" : "text-[#0e0e0e]"}>Zombie</span>
          <span className="text-red">Houses</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-opacity ${
                  transparent ? "text-white" : "text-[#0e0e0e]"
                } ${active ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/rescue"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-white text-[0.78rem] font-bold uppercase tracking-[0.1em] hover:bg-[#a93226] transition-colors"
          >
            Donate Now
          </Link>
          <button
            className={`md:hidden ${transparent ? "text-white" : "text-[#0e0e0e]"}`}
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-[60px] z-[190] bg-white flex flex-col px-6 py-8 gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-[#0e0e0e]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/sponsors"
            onClick={() => setOpen(false)}
            className="font-display text-3xl text-[#0e0e0e]"
          >
            Sponsors
          </Link>
          <Link
            to="/apply"
            onClick={() => setOpen(false)}
            className="font-display text-3xl text-[#0e0e0e]"
          >
            Apply for Help
          </Link>
          <Link
            to="/rescue"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-red px-6 py-3.5 text-white font-bold uppercase tracking-[0.1em] text-sm"
          >
            Donate Now
          </Link>
        </div>
      )}
    </header>
  );
};

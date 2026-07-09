import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/zombie-houses-logo.png";

const links = [
  { to: "/watch", label: "Watch" },
  { to: "/rescue", label: "Rescue" },
  { to: "/sell", label: "Sell" },
  { to: "/design", label: "Design" },
] as const;

export const Nav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-[200] bg-[hsl(0_0%_15%)]">
      <div className="w-full px-4 md:px-8 h-16 md:h-20 flex items-center justify-between relative overflow-visible">
        <Link
          to="/"
          className="relative z-40 block h-16 md:h-20 w-24 md:w-40 shrink-0 overflow-visible"
        >
          <img
            src={logo}
            alt="Zombie Houses"
            className="absolute top-2 md:top-2 left-0 h-14 md:h-20 w-auto max-w-none object-contain drop-shadow-lg"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white transition-opacity ${
                  active ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/apply"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/35 px-5 py-2.5 text-white text-[0.78rem] font-bold uppercase tracking-[0.1em] hover:bg-white/10 transition-colors"
          >
            Nominate
          </Link>
          <Link
            to="/rescue"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-red px-5 py-2.5 text-white text-[0.78rem] font-bold uppercase tracking-[0.1em] hover:bg-[#b81830] transition-colors"
          >
            Donate
          </Link>
          <div className="relative hidden md:block" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="flex items-center text-white opacity-80 hover:opacity-100 transition-opacity"
              aria-label="More options"
            >
              <Menu className="w-6 h-6" />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-[hsl(0_0%_20%)] border border-white/10 shadow-xl overflow-hidden z-[210]">
                <Link
                  to="/sponsors"
                  onClick={() => setMoreOpen(false)}
                  className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Sponsors
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMoreOpen(false)}
                  className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMoreOpen(false)}
                  className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
          <button
            className="md:hidden text-white"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 z-[190] bg-[hsl(0_0%_15%)] flex flex-col px-6 py-8 gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/sponsors"
            onClick={() => setOpen(false)}
            className="font-display text-3xl text-white"
          >
            Sponsors
          </Link>
          <Link
            to="/apply"
            onClick={() => setOpen(false)}
            className="font-display text-3xl text-white"
          >
            Apply for Help
          </Link>
          <Link
            to="/rescue"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-red px-6 py-3.5 text-white font-bold uppercase tracking-[0.1em] text-sm"
          >
            Donate Now
          </Link>
        </div>
      )}
    </header>
  );
};

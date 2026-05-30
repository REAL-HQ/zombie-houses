import { Link } from "@tanstack/react-router";
import { Phone as PhoneIcon, Menu } from "lucide-react";
import logo from "@/assets/zombie-houses-logo.png";

export const SiteHeader = () => (
  <header className="w-full bg-[hsl(0_0%_15%)] relative overflow-visible z-30">
    <div className="w-full px-4 md:px-8 h-16 md:h-20 flex items-center justify-between relative overflow-visible">
      <Link to="/" className="relative z-40 block h-16 md:h-20 w-32 md:w-56 shrink-0 overflow-visible">
        <img
          src={logo}
          alt="Zombie Houses"
          className="absolute top-3 md:top-3 left-0 h-20 md:h-28 w-auto max-w-none object-contain drop-shadow-lg"
        />
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
        <Link to="/rescue" className="hover:text-white transition-colors">Rescues</Link>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </nav>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-white italic text-sm md:text-base">Have Selling Questions?</p>
          <a
            href="tel:8139232042"
            className="flex items-center justify-end gap-2 text-white font-extrabold text-lg md:text-2xl"
          >
            <PhoneIcon className="w-5 h-5 md:w-6 md:h-6 text-primary fill-primary" />
            813-923-2042
          </a>
        </div>
        <button className="md:hidden text-white" aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

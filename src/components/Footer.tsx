import { Link } from "@tanstack/react-router";
import logo from "@/assets/zombie-houses-logo.png";
import { BUSINESS } from "@/lib/business";

export const Footer = () => (
  <footer className="bg-[#0e0e0e] text-white">
    <div className="max-w-[1160px] mx-auto px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Link to="/" className="inline-block">
          <img src={logo} alt="ZombieHouses" className="h-12 w-auto" />
        </Link>
        <p className="mt-4 text-sm text-white/55 max-w-xs leading-relaxed">
          Transforming neglected homes, rescuing families, and giving communities a second chance — one zombie house at a time.
        </p>
      </div>
      <FooterCol
        title="Initiatives"
        items={[
          { label: "ZH Rescue", to: "/rescue" },
          { label: "ZH Flipping (A&E)", to: "/watch" },
          { label: "ZH Buyers", to: "/sell" },
        ]}
      />
      <FooterCol
        title="Explore"
        items={[
          { label: "Watch", to: "/watch" },
          { label: "Design", to: "/design" },
          { label: "Sponsor", to: "/sponsors" },
          { label: "Apply for Help", to: "/apply" },
        ]}
      />
      <div>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/55">Company</p>
        <ul className="mt-4 space-y-2">
          <li>
            <Link to="/privacy" className="text-sm text-white/85 hover:text-white">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="text-sm text-white/85 hover:text-white">
              Terms Of Service
            </Link>
          </li>
          <li>
            <Link to="/sms-terms" className="text-sm text-white/85 hover:text-white">
              SMS Terms
            </Link>
          </li>
        </ul>
        <p className="mt-5 text-xs text-white/50 leading-relaxed">
          {BUSINESS.legalName}
          <br />
          {BUSINESS.address}
          <br />
          <a href={`tel:${BUSINESS.phoneHref}`} className="hover:text-white">
            {BUSINESS.phone}
          </a>
          <br />
          <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">
            {BUSINESS.email}
          </a>
        </p>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-[1160px] mx-auto px-6 py-6 flex flex-col items-center justify-center gap-2 text-xs text-white/45 text-center">
        <p>© 2026 ZombieHouses.com</p>
        <p className="max-w-2xl">
          By providing your phone number you agree to receive text messages from {BUSINESS.legalName}.
          Message and data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help.
        </p>
      </div>
    </div>
  </footer>
);

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/55">{title}</p>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="text-sm text-white/85 hover:text-white">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

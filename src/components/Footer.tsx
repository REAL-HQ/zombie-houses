import { Link } from "@tanstack/react-router";

export const Footer = () => (
  <footer className="bg-[#0e0e0e] text-white">
    <div className="max-w-[1160px] mx-auto px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Link to="/" className="font-display text-2xl leading-none">
          <span className="text-white">Zombie</span>
          <span className="text-red">Houses</span>
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
      <FooterCol
        title="Company"
        items={[
          { label: "About", to: "/" },
          { label: "Press", to: "/" },
          { label: "Contact", to: "/" },
          { label: "Privacy Policy", to: "/" },
        ]}
      />
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-[1160px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/45">
        <p>© {new Date().getFullYear()} ZombieHouses.com</p>
        <p>Zombie House Rescue is a charitable initiative of Real Advisors, Inc.</p>
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

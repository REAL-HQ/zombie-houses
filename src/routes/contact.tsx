import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BUSINESS } from "@/lib/business";

const title = "Contact | Zombie Houses";
const description = "Contact Zombie Houses in Tampa Bay by phone or email.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-sm font-bold uppercase tracking-wider text-red">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Get In Touch
        </h1>
        <div className="mt-8 space-y-4 text-base text-foreground">
          <p>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${BUSINESS.phoneHref}`} className="text-red underline">
              {BUSINESS.phone}
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${BUSINESS.email}`} className="text-red underline">
              {BUSINESS.email}
            </a>
          </p>
          <p>
            <strong>Address:</strong> {BUSINESS.address}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
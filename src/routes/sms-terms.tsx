import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/sms-terms")({
  head: () => ({
    meta: [
      { title: "SMS Terms & Conditions — Zombie Houses" },
      {
        name: "description",
        content:
          "Text messaging program terms for Zombie House Buyers: opt-in, message frequency, rates, STOP and HELP instructions.",
      },
      { property: "og:title", content: "SMS Terms & Conditions — Zombie Houses" },
      {
        property: "og:description",
        content: "Opt-in, message frequency, STOP and HELP instructions for our text program.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sms-terms" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/sms-terms" }],
  }),
  component: SmsTermsPage,
});

function SmsTermsPage() {
  return (
    <SiteLayout>
      <article className="max-w-[820px] mx-auto px-6 pt-16 pb-24 md:pt-24">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Legal</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.2rem)] tracking-[-0.03em] leading-[1.06]">
          SMS Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: August 4, 2026</p>

        <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-muted-foreground">
          <Section title="Program Description">
            <p>
              {BUSINESS.legalName} sends text messages to people who request a cash offer on a
              property or submit a rescue nomination. Messages include offer follow-ups, appointment
              and scheduling details, document requests, and status updates on your submission.
            </p>
          </Section>

          <Section title="How To Opt In">
            <p>
              You opt in by entering your mobile number on one of our forms and checking the consent
              box, or by texting us first. Consent is not a condition of purchase and is never
              required to receive an offer or to be considered for a rescue.
            </p>
          </Section>

          <Section title="Message Frequency">
            <p>Message frequency varies based on your activity — typically 2 to 6 messages per month.</p>
          </Section>

          <Section title="Cost">
            <p>Message and data rates may apply. Carriers are not liable for delayed or undelivered messages.</p>
          </Section>

          <Section title="Opting Out">
            <p>
              Reply <strong className="text-foreground">STOP</strong> to any message to cancel. You
              will receive one confirmation message and then no further texts. To rejoin, sign up
              again on our site or text <strong className="text-foreground">START</strong>.
            </p>
          </Section>

          <Section title="Help">
            <p>
              Reply <strong className="text-foreground">HELP</strong> for assistance, call{" "}
              <a className="text-red font-semibold" href={`tel:${BUSINESS.phoneHref}`}>
                {BUSINESS.phone}
              </a>
              , or email{" "}
              <a className="text-red font-semibold" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
              .
            </p>
          </Section>

          <Section title="Supported Carriers">
            <p>
              Supported carriers include AT&amp;T, Verizon Wireless, T-Mobile, Sprint, U.S. Cellular,
              Boost, Cricket, MetroPCS, and others. Carriers are not liable for delayed or
              undelivered messages.
            </p>
          </Section>

          <Section title="Privacy">
            <p>
              No mobile information will be shared with third parties or affiliates for marketing or
              promotional purposes. See our{" "}
              <Link to="/privacy" className="text-red font-semibold">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="text-red font-semibold">
                Terms of Service
              </Link>
              .
            </p>
          </Section>

          <Section title="Contact">
            <p>
              {BUSINESS.legalName}
              <br />
              {BUSINESS.address}
              <br />
              {BUSINESS.phone}
              <br />
              {BUSINESS.email}
            </p>
          </Section>
        </div>
      </article>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

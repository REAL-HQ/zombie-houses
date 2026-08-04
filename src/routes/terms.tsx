import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Zombie Houses" },
      {
        name: "description",
        content:
          "The terms that govern your use of the Zombie Houses website, cash-offer requests, rescue nominations, and text messaging.",
      },
      { property: "og:title", content: "Terms of Service — Zombie Houses" },
      {
        property: "og:description",
        content: "Terms governing our website, cash offers, nominations, and messaging.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <article className="max-w-[820px] mx-auto px-6 pt-16 pb-24 md:pt-24">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Legal</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.2rem)] tracking-[-0.03em] leading-[1.06]">
          Terms Of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: August 4, 2026</p>

        <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-muted-foreground">
          <Section title="Acceptance Of Terms">
            <p>
              By using this website or submitting a form, you agree to these terms. The site is
              operated by {BUSINESS.legalName}, {BUSINESS.address}.
            </p>
          </Section>

          <Section title="Our Services">
            <p>
              We buy distressed properties directly and we fund charitable rescues of neglected,
              occupied homes. We are not a real estate brokerage, lender, or law firm, and nothing on
              this site is legal, tax, or financial advice.
            </p>
          </Section>

          <Section title="Cash Offers">
            <p>
              Any offer figure presented on this site or in follow-up communication is preliminary
              and non-binding until both parties sign a written purchase agreement. Offers depend on
              condition, title, and verification of the information you provide.
            </p>
          </Section>

          <Section title="Rescue Nominations">
            <p>
              Submitting a nomination does not guarantee assistance. We review every submission and
              select projects based on need, feasibility, funding, and timing.
            </p>
          </Section>

          <Section title="Your Responsibilities">
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate information and only submit contact details you are authorized to share.</li>
              <li>Do not use the site unlawfully or attempt to disrupt it.</li>
              <li>Do not submit another person's mobile number for text messaging without their permission.</li>
            </ul>
          </Section>

          <Section title="Communications Consent">
            <p>
              By submitting a form, you agree we may contact you by phone, email, and — where you
              have checked the SMS consent box — text message. Consent to receive texts is not a
              condition of any purchase or service. See our{" "}
              <Link to="/sms-terms" className="text-red font-semibold">
                SMS Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-red font-semibold">
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content, video, photography, and branding on this site belongs to{" "}
              {BUSINESS.legalName} or its licensors and may not be reused without permission.
            </p>
          </Section>

          <Section title="Disclaimers & Limitation Of Liability">
            <p>
              The site is provided "as is" without warranties of any kind. To the fullest extent
              permitted by law, {BUSINESS.legalName} is not liable for indirect, incidental, or
              consequential damages arising from your use of the site.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>These terms are governed by the laws of the State of Florida.</p>
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

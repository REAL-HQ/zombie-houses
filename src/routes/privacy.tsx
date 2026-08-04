import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Zombie Houses" },
      {
        name: "description",
        content:
          "How Zombie House Buyers collects, uses, and protects your information, including SMS/text messaging data and consent.",
      },
      { property: "og:title", content: "Privacy Policy — Zombie Houses" },
      {
        property: "og:description",
        content: "Our privacy practices, including SMS messaging consent and opt-out.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <article className="max-w-[820px] mx-auto px-6 pt-16 pb-24 md:pt-24">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Legal</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.2rem)] tracking-[-0.03em] leading-[1.06]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: August 4, 2026</p>

        <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-muted-foreground">
          <Section title="Who We Are">
            <p>
              This site is operated by {BUSINESS.legalName} ("Zombie Houses," "we," "us"). You can
              reach us at {BUSINESS.address}, by phone at{" "}
              <a className="text-red font-semibold" href={`tel:${BUSINESS.phoneHref}`}>
                {BUSINESS.phone}
              </a>
              , or by email at{" "}
              <a className="text-red font-semibold" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
              .
            </p>
          </Section>

          <Section title="Information We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Information you give us:</strong> name, phone
                number, email address, property address, and any details you include when you
                request a cash offer, nominate a home for rescue, or contact us.
              </li>
              <li>
                <strong className="text-foreground">Automatically collected data:</strong> basic
                device and usage information such as IP address, browser type, and pages viewed.
              </li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To prepare and deliver a cash offer on your property.</li>
              <li>To review and follow up on rescue nominations.</li>
              <li>To respond to your questions and provide customer support.</li>
              <li>To send transactional and, where you have consented, promotional messages.</li>
              <li>To meet legal, tax, and recordkeeping obligations.</li>
            </ul>
          </Section>

          <Section title="SMS / Text Messaging">
            <p>
              By providing your mobile number and checking the consent box on our forms, you agree
              to receive text messages from {BUSINESS.legalName} related to your cash-offer request
              or rescue nomination, and — if you opt in — occasional updates about our projects.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>Message frequency varies. Message and data rates may apply.</li>
              <li>
                Reply <strong className="text-foreground">STOP</strong> to unsubscribe at any time.
                Reply <strong className="text-foreground">HELP</strong> for help, or contact us at{" "}
                {BUSINESS.phone}.
              </li>
              <li>Consent to receive text messages is not a condition of any purchase or service.</li>
              <li>Carriers are not liable for delayed or undelivered messages.</li>
            </ul>
            <p className="mt-3 font-semibold text-foreground">
              No mobile information will be shared with third parties or affiliates for marketing or
              promotional purposes. Information sharing to subcontractors in support services, such
              as customer service or messaging platforms, is permitted. All other use case
              categories exclude text messaging originator opt-in data and consent; this information
              will not be shared with any third parties.
            </p>
            <p className="mt-3">
              See our{" "}
              <Link to="/sms-terms" className="text-red font-semibold">
                SMS Terms &amp; Conditions
              </Link>{" "}
              for full program details.
            </p>
          </Section>

          <Section title="How We Share Information">
            <p>
              We share information only with service providers who help us operate the business
              (for example, hosting, messaging, and CRM providers), with professional advisors, and
              when required by law. We do not sell your personal information, and we never share
              SMS opt-in data or consent with third parties for their own marketing.
            </p>
          </Section>

          <Section title="Data Retention & Security">
            <p>
              We keep your information only as long as needed for the purposes described above or as
              required by law, and we use reasonable administrative and technical safeguards to
              protect it. No method of transmission or storage is completely secure.
            </p>
          </Section>

          <Section title="Your Choices">
            <p>
              You may request access to, correction of, or deletion of your personal information by
              emailing{" "}
              <a className="text-red font-semibold" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
              . You can opt out of texts by replying STOP and out of emails using the unsubscribe
              link.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>Our services are not directed to children under 13, and we do not knowingly collect their information.</p>
          </Section>

          <Section title="Changes To This Policy">
            <p>
              We may update this policy from time to time. The "Last updated" date above reflects the
              most recent version.
            </p>
          </Section>

          <Section title="Contact Us">
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

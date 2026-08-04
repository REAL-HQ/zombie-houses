import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS } from "@/lib/business";
import { toast } from "sonner";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply for Help — ZombieHouses" },
      {
        name: "description",
        content:
          "Nominate a home or family who needs a Zombie House Rescue. We review every submission.",
      },
      { property: "og:title", content: "Apply for Help — ZombieHouses" },
      { property: "og:description", content: "Nominate a home for rescue." },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(e.currentTarget);
    const smsConsent = fd.get("sms_consent") === "on";
    const payload = {
      your_name: String(fd.get("your_name") || "").trim(),
      relationship: String(fd.get("relationship") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      homeowner_name: String(fd.get("homeowner_name") || "").trim(),
      property_address: String(fd.get("property_address") || "").trim(),
      help_needed: String(fd.get("help_needed") || "").trim(),
      story: String(fd.get("story") || "").trim(),
      sms_consent: smsConsent,
      sms_consent_at: smsConsent ? new Date().toISOString() : null,
    };

    setSubmitting(true);
    const { error } = await supabase.from("nominations").insert(payload);
    setSubmitting(false);

    if (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Nomination submitted. We'll be in touch.");
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <SiteLayout>
      <section className="max-w-[820px] mx-auto px-6 pt-16 pb-12 md:pt-24">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-red">Apply for Help</p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.4rem)] tracking-[-0.03em] leading-[1.06]">
          Nominate A Home For Rescue.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Know a homeowner who needs help keeping their home? Tell us their story. We review every submission.
        </p>
      </section>

      <section className="max-w-[820px] mx-auto px-6 pb-24">
        {submitted ? (
          <div className="rounded-[20px] bg-off border border-mid p-10 text-center">
            <h2 className="font-display text-2xl mb-3">Thank you.</h2>
            <p className="text-muted-foreground">
              Your nomination has been received. We review every submission and will reach out if we can help.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-lg bg-red text-white px-6 py-3 font-bold text-sm hover:bg-[#b81830] transition"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-[20px] bg-off border border-mid p-8 grid sm:grid-cols-2 gap-4"
          >
            <In name="your_name" placeholder="Your Name" />
            <In name="relationship" placeholder="Your Relationship to Homeowner" />
            <In name="phone" placeholder="Phone" type="tel" />
            <In name="email" placeholder="Email" type="email" />
            <In name="homeowner_name" placeholder="Homeowner Name" />
            <In name="property_address" placeholder="Property Address" />
            <input
              required
              name="help_needed"
              placeholder="Type of help needed"
              className="sm:col-span-2 rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
            />
            <textarea
              rows={6}
              required
              name="story"
              placeholder="Tell us the story. Who lives there? What happened? What's the deadline?"
              className="sm:col-span-2 rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e] resize-none"
            />
            <label className="sm:col-span-2 flex items-start gap-3 text-[0.78rem] leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                name="sms_consent"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--red)]"
              />
              <span>
                By checking this box, I agree to receive text messages from {BUSINESS.legalName}{" "}
                about this nomination at the number provided. Message and data rates may apply.
                Message frequency varies. Reply STOP to opt out, HELP for help. Consent is not a
                condition of any purchase or service. See our{" "}
                <Link to="/privacy" className="text-red font-semibold">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/sms-terms" className="text-red font-semibold">
                  SMS Terms
                </Link>
                .
              </span>
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="sm:col-span-2 rounded-lg bg-red text-white py-3.5 font-bold text-sm hover:bg-[#b81830] transition disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Nomination →"}
            </button>
            <p className="sm:col-span-2 text-[0.7rem] text-center text-muted-foreground">
              We review every application. Most rescues start with a tip from someone who knows the family.
            </p>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}

function In(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      required
      {...props}
      className="rounded-xl border border-mid bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e0e0e]"
    />
  );
}

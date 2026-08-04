import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  CheckCircle2,
  Hourglass,
  MessageSquare,
  User,
  Mail,
  Phone,
  DollarSign,
  Frown,
  Star,
  ArrowRight,
} from "lucide-react";
import logoAE from "@/assets/logo-ae.png";
import logoDIY from "@/assets/logo-diy.png";
import logoFYI from "@/assets/logo-fyi.png";
import logoHGTV from "@/assets/logo-hgtv.png";
import logoHulu from "@/assets/logo-hulu.png";
import logoTampa from "@/assets/logo-tampabay.png";
import recent1 from "@/assets/recent-1.jpg";
import recent2 from "@/assets/recent-2.jpg";
import recent3 from "@/assets/recent-3.jpg";
import recent4 from "@/assets/recent-4.jpg";
import recent5 from "@/assets/recent-5.jpg";
import recent6 from "@/assets/recent-6.jpg";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Home Fast — Zombie House Buyers" },
      {
        name: "description",
        content:
          "We buy houses in any condition. No repairs. No commissions. Cash offer in 24 hours. Close on your timeline.",
      },
      { property: "og:title", content: "Sell Your Home Fast — Zombie House Buyers" },
      { property: "og:description", content: "Cash offer in 24 hours. Any condition." },
    ],
  }),
  component: SellPage,
});

type Step = "address" | "qualify" | "factors" | "contact" | "thanks" | "sorry";

const TrustRow = () => (
  <div className="mt-10 flex flex-col items-center gap-2 text-sm text-muted-foreground">
    <div className="flex items-center gap-1 text-red">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
    <p className="font-semibold text-foreground">4.9 from 212 reviews</p>
    <p className="text-center max-w-md">
      At <span className="font-bold text-foreground">Zombie Houses</span>, we believe selling
      a distressed property should be <span className="font-bold">faster, easier, and dead simple.</span>
    </p>
  </div>
);

const FormRow = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 px-4 bg-card border-2 rounded-lg shadow-sm focus-within:border-red transition-colors">
    <span className="text-muted-foreground">{icon}</span>
    {children}
  </div>
);

function SellPage() {
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState("");
  const [factors, setFactors] = useState("");
  const [contact, setContact] = useState({ first: "", last: "", email: "", phone: "" });

  const handleSubmit = () => {
    console.log("ZOMBIE HOUSES LEAD:", { address, factors, ...contact });
    setStep("thanks");
  };

  return (
    <SiteLayout>
      <main className="flex-1 flex items-start justify-center px-4 py-10 md:py-16 bg-background">
        <div className={`w-full ${step === "address" ? "max-w-6xl" : "max-w-2xl"}`}>
          {step === "address" && (
            <section className="text-center animate-in fade-in duration-500 mx-auto">
              <h1 className="text-3xl md:text-6xl font-extrabold leading-tight text-red whitespace-nowrap text-center font-display">
                Cash In 3 Days For Your House.
              </h1>
              <p className="mt-4 text-muted-foreground text-lg md:text-xl whitespace-nowrap text-center">
                Get A Free Cash Offer On Your House Regardless Of Location, Condition, Size, Price &amp; Equity
              </p>
              <p className="mt-2 text-muted-foreground text-lg md:text-xl whitespace-nowrap text-center">
                <span className="font-bold">NO Commissions! NO Repairs! NO Listing Fees! NO Hassles!</span>{" "}
                Simply Our Cash For Your House In 3 Days
              </p>

              <div className="max-w-2xl mx-auto">
                <div className="mt-8 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red z-10" />
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Your Property Address..."
                    className="pl-12 h-14 text-base shadow-sm border-2"
                  />
                </div>

                <button
                  disabled={address.trim().length < 4}
                  onClick={() => setStep("qualify")}
                  className="mt-4 w-full rounded-lg bg-red text-white py-4 px-6 shadow-[0_6px_0_0_color-mix(in_oklab,var(--red)_60%,transparent)] hover:brightness-110 active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-2xl font-bold leading-tight">
                    → Get A FREE Cash Offer ←
                  </div>
                  <div className="text-sm font-normal opacity-90 mt-1">
                    Our Service Is 100% FREE! No Strings Attached.
                  </div>
                </button>

                <div className="mt-6 flex justify-center">
                  <a
                    href="https://www.trustpilot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-base md:text-xl text-foreground hover:opacity-80"
                  >
                    <span className="font-bold">Excellent</span>
                    <span className="inline-flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-7 h-7 md:w-8 md:h-8 bg-[#00B67A] inline-flex items-center justify-center"
                        >
                          <Star size={20} fill="white" strokeWidth={0} className="text-white" />
                        </span>
                      ))}
                    </span>
                    <span className="underline">5,019 reviews on</span>
                    <span className="inline-flex items-center gap-1 font-bold">
                      <Star size={22} fill="#00B67A" strokeWidth={0} />
                      Trustpilot
                    </span>
                  </a>
                </div>
              </div>

              <p className="mt-8 text-base md:text-2xl font-extrabold italic leading-snug whitespace-nowrap text-center">
                <span className="text-red">Over 1,000 Homeowners Have Successfully Sold Their Homes</span>{" "}
                <span className="text-foreground not-italic">As-Is With Our Team Since 2005</span>
              </p>
            </section>
          )}

          {step === "qualify" && (
            <section className="animate-in fade-in duration-500">
              <h2 className="text-2xl md:text-4xl font-extrabold text-center text-foreground leading-tight font-display">
                Would You Consider Selling This Property For{" "}
                <span className="text-red underline decoration-red/40 underline-offset-4">
                  Below Market Value
                </span>{" "}
                For A{" "}
                <span className="text-red underline decoration-red/40 underline-offset-4">
                  Quick Cash Deal
                </span>
                ?
              </h2>

              <div className="mt-10 grid md:grid-cols-2 gap-4">
                <Card
                  onClick={() => setStep("factors")}
                  className="p-6 cursor-pointer border-2 hover:border-red hover:shadow-lg transition-all bg-card"
                >
                  <div className="flex gap-4 items-start">
                    <CheckCircle2 className="w-8 h-8 text-red shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-foreground">
                      <span className="font-bold">YES</span>, I Would Sell This Property For{" "}
                      <span className="italic font-bold underline">Below Market Value</span> In
                      Exchange For A <span className="font-bold">Simple, Easy, Fast, Cash Transaction!</span>
                    </p>
                  </div>
                </Card>
                <Card
                  onClick={() => setStep("sorry")}
                  className="p-6 cursor-pointer border-2 hover:border-muted-foreground hover:shadow-lg transition-all bg-muted"
                >
                  <div className="flex gap-4 items-start">
                    <Hourglass className="w-8 h-8 text-muted-foreground shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-muted-foreground">
                      <span className="font-bold">NO</span>, I Am <span className="font-bold">ONLY</span> Looking For{" "}
                      <span className="font-bold underline">Full Market Value</span> And Willing To{" "}
                      <span className="font-bold">Wait 6-12 Months</span> To Sell This Property.
                    </p>
                  </div>
                </Card>
              </div>
            </section>
          )}

          {step === "factors" && (
            <section className="animate-in fade-in duration-500">
              <h2 className="text-xl md:text-3xl font-extrabold text-center text-foreground whitespace-nowrap font-display">
                What <span className="text-red">Factors</span> Have Led You To Sell This Property?
              </h2>
              <p className="text-center text-sm text-muted-foreground mt-2">(Please Explain)</p>

              <div className="mt-8 relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <Textarea
                  value={factors}
                  onChange={(e) => setFactors(e.target.value)}
                  placeholder="Financial Issues, Divorce, Inheritance, Vacant Property, Foreclosure, Medical Emergency, Etc..."
                  className="pl-12 min-h-[180px] text-base border-2"
                />
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  size="lg"
                  disabled={factors.trim().length < 3}
                  onClick={() => setStep("contact")}
                  className="px-12 h-14 text-lg font-bold uppercase bg-red hover:bg-red/90"
                >
                  Next <ArrowRight className="ml-2" />
                </Button>
              </div>
            </section>
          )}

          {step === "contact" && (
            <section className="animate-in fade-in duration-500">
              <p className="text-center font-bold tracking-wide text-red flex items-center justify-center gap-2">
                <DollarSign className="w-5 h-5" /> YOUR OFFER IS READY!{" "}
                <DollarSign className="w-5 h-5" />
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-center text-foreground font-display">
                Where Can We Send Your{" "}
                <span className="block text-red italic">Fast, Cash, Offer?</span>
              </h2>

              <div className="mt-8 space-y-3">
                <FormRow icon={<User className="w-5 h-5" />}>
                  <Input
                    placeholder="First Name"
                    value={contact.first}
                    onChange={(e) => setContact({ ...contact, first: e.target.value })}
                    className="border-0 h-12 focus-visible:ring-0 shadow-none"
                  />
                </FormRow>
                <FormRow icon={<User className="w-5 h-5" />}>
                  <Input
                    placeholder="Last Name"
                    value={contact.last}
                    onChange={(e) => setContact({ ...contact, last: e.target.value })}
                    className="border-0 h-12 focus-visible:ring-0 shadow-none"
                  />
                </FormRow>
                <FormRow icon={<Mail className="w-5 h-5" />}>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="border-0 h-12 focus-visible:ring-0 shadow-none"
                  />
                </FormRow>
                <FormRow icon={<Phone className="w-5 h-5" />}>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="border-0 h-12 focus-visible:ring-0 shadow-none"
                  />
                </FormRow>
              </div>

              <label className="mt-5 flex items-start gap-3 text-[0.78rem] leading-relaxed text-muted-foreground text-left">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--red)]"
                />
                <span>
                  By checking this box, I agree to receive text messages from {BUSINESS.legalName}{" "}
                  about my cash offer at the number provided. Message and data rates may apply.
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

              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!contact.first || !contact.email || !contact.phone || !smsConsent}
                className="mt-6 w-full h-14 text-lg font-extrabold uppercase tracking-wide bg-red hover:bg-red/90"
              >
                See Your Offer <DollarSign className="ml-2" />
              </Button>

              <TrustRow />
            </section>
          )}

          {step === "thanks" && (
            <section className="text-center animate-in fade-in duration-500">
              <CheckCircle2 className="w-20 h-20 text-red mx-auto" />
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-foreground font-display">
                You're All Set, {contact.first}!
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
                One Of Our Cash-Buying Specialists Will Reach Out Within{" "}
                <span className="font-bold text-foreground">24 Hours</span> With Your No-Obligation
                Offer On <span className="font-bold text-foreground">{address}</span>.
              </p>
            </section>
          )}

          {step === "sorry" && (
            <section className="text-center animate-in fade-in duration-500">
              <Frown className="w-20 h-20 text-muted-foreground mx-auto" />
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-foreground font-display">
                We're Sorry...
              </h2>
              <p className="mt-4 text-xl md:text-2xl font-bold text-foreground whitespace-nowrap">
                We Are Unable To Make An Offer On Your Home At This Time.
              </p>
              <p className="mt-4 text-muted-foreground">
                Zombie Houses Specializes In Fast Cash Purchases Below Market Value.
                <br />
                For Full Retail Price, We Recommend Listing With A Local Agent.
              </p>
            </section>
          )}
        </div>
      </main>

      {step === "address" && (
        <>
          <section className="w-full bg-[hsl(0_0%_15%)] py-0">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between gap-6">
              <p className="text-white/90 font-bold tracking-widest text-sm md:text-base shrink-0">
                FOUNDERS SEEN ON
              </p>
              <div className="flex flex-1 items-center justify-between gap-4 md:gap-6 min-w-0">
                {[
                  { src: logoAE, alt: "A&E" },
                  { src: logoDIY, alt: "DIY Network" },
                  { src: logoFYI, alt: "FYI" },
                  { src: logoHGTV, alt: "HGTV" },
                  { src: logoHulu, alt: "Hulu" },
                  { src: logoTampa, alt: "Tampa Bay Times" },
                ].map((logo) => (
                  <div
                    key={logo.alt}
                    className="flex items-center justify-center h-16 md:h-24 w-[15%] min-w-[72px] max-w-[140px]"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>


          <section className="w-full bg-background py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
              <p className="text-red font-bold tracking-wide uppercase">How It Works</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground leading-tight font-display">
                3 Simple Steps <span className="text-red">To Sell Your Home.</span>
              </h2>

              <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                No repairs, no commissions, no hassles. Get cash for your house in 3 days.
              </p>

              <div className="mt-12 grid md:grid-cols-3 gap-8">
                {[
                  {
                    n: "1",
                    title: "Tell Us About Your Home",
                    desc: "Enter your property address and a few quick details. Takes less than 60 seconds.",
                  },
                  {
                    n: "2",
                    title: "Get Your Cash Offer",
                    desc: "We review your property and send you a fair, no-obligation cash offer within 24 hours.",
                  },
                  {
                    n: "3",
                    title: "Close & Get Paid",
                    desc: "Pick your closing date. We handle everything and put cash in your hand in as little as 3 days.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-red text-white flex items-center justify-center text-3xl font-extrabold font-display shadow-[0_6px_0_0_color-mix(in_oklab,var(--red)_60%,transparent)]">
                      {s.n}
                    </div>
                    <h3 className="mt-6 text-xl md:text-2xl font-extrabold text-foreground font-display">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-xs">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>



          <section className="w-full bg-muted py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <p className="text-center text-red font-bold tracking-wide uppercase">
                Real Clients. Real Testimonials.
              </p>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-center text-foreground leading-tight font-display">
                What Other Happy Sellers
                <br />
                Are Saying About Their Experience
              </h2>
              <p className="mt-4 text-center text-muted-foreground text-lg">
                See Why Over 1000 Florida Home Owners Have Trusted Zombie House Buyers
              </p>

              <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Marc P.",
                    quote:
                      "I am a lender and my dealings with Zombie House Buyers has been a good experience. They give me updates on the properties that I loan on and have performed as agreed.",
                  },
                  {
                    name: "Gigi G.",
                    quote:
                      "I have known and worked with Dolmar on and off for about 15 years, he has shown to be honest and has integrity and does what he says he will do.",
                  },
                  {
                    name: "Olivia C.",
                    quote:
                      "I'm a real estate agent, and Zombie House Buyers is one of my top clients for purchasing homes that are difficult to sell because of their condition. The last house I sold them was a property most buyers were walking away from. It was a severely distressed hoarder house filled with roaches, paraphernalia, and decades of clutter. When I brought the deal to them, the Zombie House Buyer Team stepped in, handled the situation, and closed in just days.",
                  },
                  {
                    name: "Marlon Smith",
                    quote:
                      "From start to finish, the entire process was smooth, organized, and professional. Dolmar was hands-on throughout the deal, always available to answer questions, provide guidance, and make sure each step was handled correctly. His knowledge of the wholesaling process and his ability to break things down clearly gave me confidence, especially as a first-time wholesaler. I highly recommend Dolmar Cross and his team.",
                  },
                  {
                    name: "Alicia & Barbara",
                    quote:
                      "Working with Dolmar Cross as his preferred title company has truly been a pleasure. Dolmar consistently demonstrates professionalism, integrity, and a genuine commitment to ensuring efficient transactions for everyone involved. Partnering with Dolmar means partnering with someone who brings positivity and exceptional skill and proficiency to every closing. We value our partnership with Dolmar and appreciate the trust he places in us. We look forward to many more successful transactions together.",
                  },
                ].map((t) => (
                  <Card key={t.name} className="p-6 bg-card flex flex-col gap-3 border-2">
                    <div className="flex items-center gap-1 text-red">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="font-bold text-foreground text-lg">{t.name}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t.quote}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full bg-white py-12 md:py-16">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6">
              <h2 className="text-3xl md:text-5xl font-extrabold text-center text-foreground mb-10 font-display">
                Recent Purchases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[recent1, recent2, recent3, recent4, recent5, recent6].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Recent purchase ${i + 1}`}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
}

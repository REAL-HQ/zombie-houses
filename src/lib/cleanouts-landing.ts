import { Camera, HeartHandshake, Truck } from "lucide-react";
import type { ServiceLandingConfig } from "@/components/services/ServiceLandingPage";

export const cleanoutsLanding: ServiceLandingConfig = {
  page: "cleanouts",
  sourcePage: "/cleanouts",
  service: "Hoarder or Estate Cleanout",
  eyebrow: "Hoarder & Estate Cleanouts",
  headline: "Cleanouts Without Judgment",
  subhead: "Whether it built up over years or you just inherited a full house, we clear it quietly & respectfully.",
  bullets: ["Free Photo Quote", "Upfront Quote Before We Start", "Discreet, Local Crew"],
  steps: [
    { title: "Tell Us What's Going On", description: "Share a few photos or just describe it. No need to clean up first.", icon: Camera },
    { title: "Walk Through Together", description: "We confirm what stays, what goes & anything to set aside for family.", icon: HeartHandshake },
    { title: "We Clear It", description: "We sort, haul & sweep up so the house is ready for what comes next.", icon: Truck },
  ],
  audiences: [
    { title: "Families Settling an Estate" },
    { title: "Adult Children Helping a Parent" },
    { title: "Homeowners Ready for a Reset" },
    { title: "Executors & Attorneys" },
  ],
  care: {
    heading: "Handled With Care",
    bullets: ["We set aside photos, papers & keepsakes we find", "We work at a pace that's right for you", "We keep it private & never judge"],
  },
  notice: "Biohazard situations like body fluids, needles or animal waste need a specialized remediation company. Tell us what you're seeing and we'll help you find the right next step.",
  sellingOption: {
    description: "Not sure you want to keep the house? We also buy houses in any condition. Clear it out & sell it yourself, or sell it to us as-is. We'll talk through both, with no pressure.",
    buttonLabel: "See My Selling Options",
    quoteLinkLabel: "Or Keep Going With a Cleanout Quote",
  },
  ownerHeading: "Meet Dolmar & Keisha",
  ownerDescription: "We're Dolmar & Keisha Cross. We've spent years buying & rehabbing Tampa houses most people wouldn't walk into. Our crew knows how to clear a property fast and leave it clean. When you call, you're dealing with local owners, not a call center. We've walked into a lot of houses like this. Nobody gets judged here.",
  faqs: [
    { question: "Do I Need to Be There?", answer: "Not always. We can plan access with you or a family member ahead of time." },
    { question: "What Happens to Items Worth Keeping?", answer: "We set aside anything you ask us to look for, plus photos, papers & keepsakes we come across." },
    { question: "Can You Help If the House Needs to Be Sold?", answer: "Yes. We buy houses as-is too. Mark it in the form and we'll cover both options." },
    { question: "Do You Handle Biohazard Cleanup?", answer: "Not ourselves. Biohazards need a specialized company, and we'll help point you to one." },
    { question: "What Areas Do You Serve?", answer: "Tampa Bay. Enter your ZIP and we'll confirm." },
  ],
  quoteHeading: "Get Your Free Photo Quote",
};

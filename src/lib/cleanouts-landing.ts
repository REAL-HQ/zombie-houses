import { Camera, HeartHandshake, Truck } from "lucide-react";
import { JOB_PHOTOS } from "@/lib/job-photos";
import type { ServiceLandingConfig } from "@/components/services/ServiceLandingPage";

export const cleanoutsLanding: ServiceLandingConfig = {
  page: "cleanouts",
  sourcePage: "/cleanouts",
  heroPhoto: JOB_PHOTOS.coolrdBefore1,
  gallery: [JOB_PHOTOS.jonesBefore3, JOB_PHOTOS.coolrdBefore2, JOB_PHOTOS.leilaHoarder1, JOB_PHOTOS.coolrdBefore3, JOB_PHOTOS.jonesBefore5, JOB_PHOTOS.courtlandBefore3],
  service: "Hoarder or Estate Cleanout",
  eyebrow: "Hoarder & Estate Cleanouts",
  headline: "Cleanouts Without Judgment",
  subhead: "Years of buildup or an inherited full house, we clear it quietly & respectfully.",
  bullets: ["Free Photo Quote", "Upfront Quote Before We Start", "Discreet, Local Crew"],
  steps: [
    { title: "Tell Us What's Going On", description: "Share a few photos or just describe it. No need to clean up first.", icon: Camera },
    { title: "Walk Through Together", description: "We confirm what stays, what goes & anything to set aside for family.", icon: HeartHandshake },
    { title: "We Clear It", description: "We sort, haul & sweep up so the house is ready for what comes next.", icon: Truck },
  ],
  care: {
    heading: "Handled With Care",
    bullets: ["We Set Aside Photos, Papers & Keepsakes We Find", "We Work At A Pace That's Right For You", "We Keep It Private & Never Judge"],
  },
  notice: "Biohazard situations like body fluids, needles or animal waste need a specialized remediation company. Tell us what you're seeing and we'll help you find the right next step.",
  sellingOption: {
    description: "Not sure you want to keep the house? We also buy houses in any condition. Clear it out & sell it yourself, or sell it to us as-is. We'll talk through both, with no pressure.",
    buttonLabel: "See My Selling Options",
    quoteLinkLabel: "Or Keep Going With A Cleanout Quote",
  },
  ownerHeading: "Meet Dolmar & Keisha",
  ownerDescription: "We're Dolmar & Keisha Cross. We've spent years buying & rehabbing distressed Tampa houses most people wouldn't walk into, including plenty of hoarder homes, so nothing you show us will surprise us. You may know Dolmar from A&E's Zombie House Flipping. Our own crew clears the house quietly & respectfully, works fast & leaves it clean. When you call, you're dealing with local owners, not a call center. We've walked into a lot of houses like this. Nobody gets judged here.",
  faqs: [
    { question: "Do I Need To Be There?", answer: "Not always. We can plan access with you or a family member ahead of time." },
    { question: "What Happens To Items Worth Keeping?", answer: "We set aside anything you ask us to look for, plus photos, papers & keepsakes we come across." },
    { question: "Can You Help If The House Needs To Be Sold?", answer: "Yes. We buy houses as-is too. Mark it in the form and we'll cover both options." },
    { question: "Do You Handle Biohazard Cleanup?", answer: "Not ourselves. Biohazards need a specialized company, and we'll help point you to one." },
    { question: "What Areas Do You Serve?", answer: "Tampa Bay. Enter your ZIP and we'll confirm." },
  ],
  photoQuote: { heading: "Get A Photo Quote", description: "Send a few photos of the rooms. You'll see a price range right away, or for a full house we'll set up a quick, judgment-free walkthrough.", defaultLocation: "inside" },
  quoteHeading: "Get Your Free Photo Quote",
};

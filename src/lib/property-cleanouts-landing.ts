import { Camera, ClipboardCheck, DoorOpen, KeyRound, Landmark, Leaf, ListChecks, Truck, Warehouse } from "lucide-react";
import { JOB_PHOTOS } from "@/lib/job-photos";
import type { ServiceLandingConfig } from "@/components/services/ServiceLandingPage";

export const propertyCleanoutsLanding: ServiceLandingConfig = {
  page: "property-cleanouts",
  sourcePage: "/property-cleanouts",
  heroPhoto: JOB_PHOTOS.leilaBefore1,
  gallery: [JOB_PHOTOS.courtlandBefore1, JOB_PHOTOS.leilaBefore2, JOB_PHOTOS.goldenBefore3, JOB_PHOTOS.leilaBefore4, JOB_PHOTOS.courtlandBefore2, JOB_PHOTOS.elmwoodBefore3],
  service: "Property Cleanout",
  eyebrow: "For Landlords & Realtors",
  headline: "Property Cleanouts, Turned Fast",
  subhead: "Move-outs, evictions, foreclosures & pre-listing cleanouts across Tampa Bay.",
  bullets: ["Free Photo Quote", "Upfront Quote Before We Start", "Photos When The Job Is Done"],
  steps: [
    { title: "Send Photos Or A Lockbox Code", description: "Share photos & access details. We can quote from what you send.", icon: Camera },
    { title: "Approve The Quote", description: "Upfront quote before we start. No surprises at the end.", icon: ClipboardCheck },
    { title: "We Clear & Report Back", description: "We haul it, sweep up & send you photos when we're done.", icon: Truck },
  ],
  itemsHeading: "Common Jobs",
  items: [
    { title: "Tenant Move-Outs", icon: DoorOpen },
    { title: "Post-Eviction Cleanouts", icon: KeyRound },
    { title: "Foreclosures & Bank-Owned", icon: Landmark },
    { title: "Pre-Listing Cleanouts", icon: ListChecks },
    { title: "Garage & Shed Clear-Outs", icon: Warehouse },
    { title: "Yard Debris", icon: Leaf },
  ],
  sellingOption: {
    description: "Got a rental you're done with? We also buy properties as-is, tenants or not. Ask about both.",
    buttonLabel: "See Selling Options",
  },
  ownerHeading: "Meet Dolmar & Keisha",
  ownerDescription: "We're Dolmar & Keisha Cross. We buy & rehab Tampa properties ourselves, so we know what a fast, clean turnover is worth to a landlord or realtor. You may know Dolmar from A&E's Zombie House Flipping. We've spent years working on distressed Tampa houses, from move-outs to full gut jobs. Our own crew clears the property, hauls everything away & leaves it clean & ready for the next step. You'll deal with us & our crew directly, not a call center. Send photos & we'll quote it upfront.",
  faqs: [
    { question: "Do I Need To Meet You There?", answer: "No. With a lockbox or access code we can quote from photos & send photos when we finish." },
    { question: "Can You Handle Repeat Turnovers?", answer: "Yes. Tell us about your portfolio in the form & we'll set up a simple process." },
    { question: "What Can't You Take?", answer: "Hazardous waste, paint, chemicals & biohazards. We'll tell you up front." },
    { question: "What Areas Do You Serve?", answer: "Tampa Bay. Enter your ZIP to confirm." },
  ],
  photoQuote: { heading: "Get A Photo Quote", description: "Upload photos of the unit, garage or lot. You'll see a price range right away, or for bigger turnovers we'll set up a quick walkthrough.", defaultLocation: "inside" },
  quoteHeading: "Get Your Free Photo Quote",
};

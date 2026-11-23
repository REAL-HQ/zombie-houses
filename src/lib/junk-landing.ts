import { Armchair, Bath, BedDouble, Boxes, Camera, Hammer, House, Leaf, MessageSquare, Refrigerator, Truck } from "lucide-react";
import type { ServiceLandingConfig } from "@/components/services/ServiceLandingPage";

export const junkLanding: ServiceLandingConfig = {
  page: "junk",
  sourcePage: "/junk",
  service: "Junk Removal",
  eyebrow: "Tampa Bay Junk Removal",
  headline: "Junk Gone, Tampa Bay",
  subhead: "Send a few photos. Get an upfront quote before we start. We haul it.",
  bullets: ["Free Photo Quote", "Upfront Quote Before We Start", "Local Owner on the Job"],
  steps: [
    { title: "Send Photos", description: "Snap the pile, the room or the garage. Add your ZIP.", icon: Camera },
    { title: "Get Your Quote", description: "We review it and text or call you with an upfront quote.", icon: MessageSquare },
    { title: "We Haul It", description: "We load, sweep up & take it away. You point, we lift.", icon: Truck },
  ],
  itemsHeading: "What We Take",
  items: [
    { title: "Furniture", icon: Armchair },
    { title: "Appliances", icon: Refrigerator },
    { title: "Mattresses", icon: BedDouble },
    { title: "Garage & Attic Junk", icon: House },
    { title: "Yard Debris", icon: Leaf },
    { title: "Light Construction Debris", icon: Hammer },
    { title: "Hot Tubs & Sheds (Ask Us)", icon: Bath },
    { title: "Estate Contents", icon: Boxes },
  ],
  itemsNote: "We can't take hazardous waste, paint, chemicals or biohazards. Ask us and we'll point you to the right place.",
  audiences: [
    { title: "Homeowners" },
    { title: "Landlords & Property Managers", to: "/property-cleanouts" },
    { title: "Realtors" },
    { title: "Families Clearing an Estate", to: "/cleanouts" },
  ],
  ownerHeading: "Meet Dolmar",
  ownerDescription: "I'm Dolmar Cross. I've spent years buying & rehabbing Tampa houses most people wouldn't walk into. My crew knows how to clear a property fast and leave it clean. When you call, you're dealing with a local owner, not a call center.",
  related: [
    { title: "Hoarder & Estate Cleanouts", to: "/cleanouts" },
    { title: "Property Cleanouts", to: "/property-cleanouts" },
  ],
  faqs: [
    { question: "How Do You Price a Job?", answer: "By how much space it takes up in the truck, plus anything heavy or hard to reach. Photos let us give you an upfront quote before we start." },
    { question: "Do I Need to Be Home?", answer: "Not always. If the items are outside or we have access, we can work it out with you ahead of time." },
    { question: "What Can't You Take?", answer: "Hazardous waste, paint, chemicals, tires in bulk & biohazards. We'll tell you up front if something is off limits." },
    { question: "What Areas Do You Serve?", answer: "Tampa Bay. Enter your ZIP in the form and we'll confirm." },
    { question: "Can You Help If I'm Thinking About Selling?", answer: "Yes. We also buy houses as-is. Mention it in the form and we'll talk through both options.", to: "/sell" },
  ],
  quoteHeading: "Get Your Free Photo Quote",
};
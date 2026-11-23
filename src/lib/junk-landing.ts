import { Armchair, Bath, BedDouble, Boxes, Camera, Hammer, House, Leaf, MessageSquare, Refrigerator, Truck } from "lucide-react";
import { JOB_PHOTOS } from "@/lib/job-photos";
import type { ServiceLandingConfig } from "@/components/services/ServiceLandingPage";

export const junkLanding: ServiceLandingConfig = {
  page: "junk",
  sourcePage: "/junk",
  heroPhoto: JOB_PHOTOS.junkHeroStreet,
  gallery: [JOB_PHOTOS.truckJones2, JOB_PHOTOS.jonesBefore1, JOB_PHOTOS.coolrdBefore4, JOB_PHOTOS.jonesBefore6, JOB_PHOTOS.coolrdBefore6, JOB_PHOTOS.jonesBefore4],
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
  feature: {
    id: "yard",
    heading: "Yard Cleanup & Debris Removal",
    description: "Overgrown lots, curb piles & yard junk hauled off in one trip. Send photos & we'll quote it upfront.",
    bullets: ["Branches, Brush & Yard Waste", "Curbside & Driveway Junk Piles", "Overgrown Lots & Fence Lines", "Old Sheds, Playsets & Patio Furniture"],
    photos: [JOB_PHOTOS.yardTruckOvergrown, JOB_PHOTOS.yardJunkHouse, JOB_PHOTOS.goldenBefore6],
  },
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
  ownerHeading: "Meet Dolmar & Keisha",
  ownerDescription: "We're Dolmar & Keisha Cross. We've spent years buying & rehabbing distressed Tampa houses, the kind most people won't walk into, so there isn't much junk we haven't seen. You may know Dolmar from A&E's Zombie House Flipping. Our own crew does the work: we clear properties fast, haul it all away & leave the place clean. When you call or text, you're talking to local owners, not a call center. Send a few photos & we'll give you an upfront quote before we start.",
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

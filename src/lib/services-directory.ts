export const SERVICE_DESTINATIONS = [
  { title: "Junk Removal", to: "/junk", description: "Furniture, appliances, garages, sheds & yard debris.", cta: "Get My Price" },
  { title: "Hoarder & Estate Cleanouts", to: "/cleanouts", description: "Whole-home cleanouts handled quietly & with respect.", cta: "Send Photos" },
  { title: "Property Cleanouts", to: "/property-cleanouts", description: "Move-outs, evictions & pre-listing for landlords & realtors.", cta: "Request a Quote" },
  { title: "Remodeling", to: "/remodel", description: "Bathrooms, kitchens & smaller projects. Consultation requests.", cta: "Request a Consultation" },
  { title: "Sell Your House", to: "/sell", description: "Inherited, distressed or just done with it? Start here.", cta: "Start" },
  { title: "Design & Shop the Look", to: "/design", description: "Before & afters, design guides & the products we use.", cta: "Explore" },
  { title: "Rescue & Community", to: "/rescue", description: "Nominate a family or help rescue a zombie house.", cta: "Learn More" },
] as const;

export function serviceDestination(title: string) {
  return SERVICE_DESTINATIONS.find((service) => service.title === title)?.to;
}

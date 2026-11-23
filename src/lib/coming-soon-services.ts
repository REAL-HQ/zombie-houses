import { Biohazard, CloudRain, Droplets, FlaskConical, HeartCrack, Rat, ShieldAlert, SprayCan, Wind } from "lucide-react";

export const COMING_SOON_SERVICES = [
  { slug: "biohazard", title: "Biohazard Cleanup", description: "Blood, bodily fluids & other biohazards in a home or rental.", icon: Biohazard },
  { slug: "trauma-scene", title: "Crime & Trauma Scene Cleanup", description: "Discreet help after a crime, accident or traumatic event.", icon: ShieldAlert },
  { slug: "unattended-death", title: "Unattended Death Cleanup", description: "Respectful cleanup when a loss isn't found right away.", icon: HeartCrack },
  { slug: "feces-urine", title: "Feces & Urine Cleanup", description: "Human & animal waste, soaked flooring & lingering odor.", icon: Droplets },
  { slug: "mold", title: "Mold Remediation", description: "Moldy drywall, musty rooms & water-stained materials.", icon: Wind },
  { slug: "water-storm", title: "Water & Storm Damage", description: "Leaks, flooding & storm debris after the water's gone.", icon: CloudRain },
  { slug: "drug-lab", title: "Drug Lab Cleanup", description: "Meth & drug residue left behind in a property.", icon: FlaskConical },
  { slug: "rodent", title: "Rodent Cleanup", description: "Droppings, nesting & contaminated insulation.", icon: Rat },
  { slug: "disinfection", title: "Disinfection & Decontamination", description: "Deep sanitizing for homes, rentals & turnovers.", icon: SprayCan },
] as const;

export function comingSoonService(slug: unknown) {
  return COMING_SOON_SERVICES.find((service) => service.slug === slug);
}

// Dolmar's own job photos (approved for use). Captions never include street addresses.
import truckJones1Src from "@/assets/jobs/truck-jones-1.webp";
import truckJones2Src from "@/assets/jobs/truck-jones-2.webp";
import jonesBefore1Src from "@/assets/jobs/jones-before-1.webp";
import jonesBefore3Src from "@/assets/jobs/jones-before-3.webp";
import jonesBefore4Src from "@/assets/jobs/jones-before-4.webp";
import jonesBefore5Src from "@/assets/jobs/jones-before-5.webp";
import jonesBefore6Src from "@/assets/jobs/jones-before-6.webp";
import coolrdBefore1Src from "@/assets/jobs/coolrd-before-1.webp";
import coolrdBefore2Src from "@/assets/jobs/coolrd-before-2.webp";
import coolrdBefore3Src from "@/assets/jobs/coolrd-before-3.webp";
import coolrdBefore4Src from "@/assets/jobs/coolrd-before-4.webp";
import coolrdBefore6Src from "@/assets/jobs/coolrd-before-6.webp";
import leilaHoarder1Src from "@/assets/jobs/leila-hoarder-1.webp";
import leilaHoarder2Src from "@/assets/jobs/leila-hoarder-2.webp";
import leilaBefore1Src from "@/assets/jobs/leila-before-1.webp";
import leilaBefore2Src from "@/assets/jobs/leila-before-2.webp";
import leilaBefore4Src from "@/assets/jobs/leila-before-4.webp";
import leilaBefore5Src from "@/assets/jobs/leila-before-5.webp";
import goldenBefore1Src from "@/assets/jobs/golden-before-1.webp";
import goldenBefore3Src from "@/assets/jobs/golden-before-3.webp";
import goldenBefore4Src from "@/assets/jobs/golden-before-4.webp";
import goldenBefore5Src from "@/assets/jobs/golden-before-5.webp";
import elmwoodBefore1Src from "@/assets/jobs/elmwood-before-1.webp";
import elmwoodBefore3Src from "@/assets/jobs/elmwood-before-3.webp";
import elmwoodBefore4Src from "@/assets/jobs/elmwood-before-4.webp";
import elmwoodBefore6Src from "@/assets/jobs/elmwood-before-6.webp";
import boardwalkBefore1Src from "@/assets/jobs/boardwalk-before-1.webp";
import yardTruckJunkSrc from "@/assets/jobs/yard-truck-junk.webp";
import yardJunkHouseSrc from "@/assets/jobs/yard-junk-house.webp";
import yardTruckOvergrownSrc from "@/assets/jobs/yard-truck-overgrown.webp";
import conniewoodBefore1Src from "@/assets/jobs/conniewood-before-1.webp";

export interface JobPhoto { src: string; alt: string; caption: string; before: boolean }

export const JOB_PHOTOS = {
  truckJones1: { src: truckJones1Src, alt: "Zombie Houses truck parked beside a curbside pile of bagged junk & bins", caption: "Junk Haul, Tampa", before: false },
  truckJones2: { src: truckJones2Src, alt: "Curbside pile of trash bags, bins & debris ready for haul-off in front of a Tampa house", caption: "Curbside Haul-Off, Tampa", before: false },
  jonesBefore1: { src: jonesBefore1Src, alt: "Side yard packed with bikes, tires, hoses & scrap beside a house", caption: "Yard Debris, Tampa", before: true },
  jonesBefore3: { src: jonesBefore3Src, alt: "Living room filled with bags, clothes & stacked belongings", caption: "Hoarder Cleanout, Tampa", before: true },
  jonesBefore4: { src: jonesBefore4Src, alt: "Hallway & bedroom piled high with clothes, bikes & boxes", caption: "Hoarder Cleanout, Tampa", before: true },
  jonesBefore5: { src: jonesBefore5Src, alt: "Cluttered kitchen with counters & table covered in cookware & supplies", caption: "Kitchen Cleanout, Tampa", before: true },
  jonesBefore6: { src: jonesBefore6Src, alt: "Screened porch stacked with luggage, boxes & household items", caption: "Porch Cleanout, Tampa", before: true },
  coolrdBefore1: { src: coolrdBefore1Src, alt: "Garage packed floor to ceiling with bags, furniture & stored items", caption: "Hoarder Cleanout, Holiday", before: true },
  coolrdBefore2: { src: coolrdBefore2Src, alt: "Room with a collapsed ceiling & insulation over piled belongings", caption: "Hoarder House, Holiday", before: true },
  coolrdBefore3: { src: coolrdBefore3Src, alt: "Living room with fallen ceiling debris, papers & furniture", caption: "Hoarder House, Holiday", before: true },
  coolrdBefore4: { src: coolrdBefore4Src, alt: "Overgrown yard full of discarded cans, bags & trash", caption: "Yard Junk, Holiday", before: true },
  coolrdBefore6: { src: coolrdBefore6Src, alt: "Kitchen & dining area covered in clutter & debris", caption: "Kitchen Cleanout, Holiday", before: true },
  leilaHoarder1: { src: leilaHoarder1Src, alt: "Bedroom floor buried under papers, boxes & trash", caption: "Hoarder Cleanout, Tampa", before: true },
  leilaHoarder2: { src: leilaHoarder2Src, alt: "Bedroom filled with boxes, a mattress & scattered debris", caption: "Hoarder Cleanout, Tampa", before: true },
  leilaBefore1: { src: leilaBefore1Src, alt: "Open living area with ceiling damage, exposed insulation & piles of debris", caption: "Property Cleanout, Tampa", before: true },
  leilaBefore2: { src: leilaBefore2Src, alt: "Gutted room with open ceiling, boxes & bags of trash", caption: "Debris & Demo, Tampa", before: true },
  leilaBefore4: { src: leilaBefore4Src, alt: "Water-stained room piled with clothes, boxes & bins", caption: "Water Damage, Tampa", before: true },
  leilaBefore5: { src: leilaBefore5Src, alt: "Bathroom with exposed block walls & debris on the floor", caption: "Bathroom Demo, Tampa", before: true },
  goldenBefore1: { src: goldenBefore1Src, alt: "Empty room with mold-stained walls & a dirty floor", caption: "Mold Damage, Tampa", before: true },
  goldenBefore3: { src: goldenBefore3Src, alt: "Kitchen with damaged cabinets, open doors & a stained floor", caption: "Kitchen Tear-Out, Tampa", before: true },
  goldenBefore4: { src: goldenBefore4Src, alt: "Hallway with marked-up walls & torn-out paneling", caption: "Interior Demo, Tampa", before: true },
  goldenBefore5: { src: goldenBefore5Src, alt: "Stained bathroom with a worn shower, toilet & vanity", caption: "Bathroom, Tampa", before: true },
  elmwoodBefore1: { src: elmwoodBefore1Src, alt: "Room stripped to block walls & bare subfloor", caption: "Interior Demo, Tampa", before: true },
  elmwoodBefore3: { src: elmwoodBefore3Src, alt: "Kitchen with a hole in the ceiling & peeling walls", caption: "Kitchen, Tampa", before: true },
  elmwoodBefore4: { src: elmwoodBefore4Src, alt: "Dated bathroom with a rotted shower base & tile", caption: "Bathroom, Tampa", before: true },
  elmwoodBefore6: { src: elmwoodBefore6Src, alt: "Old kitchen with water-stained floor & worn cabinets", caption: "Kitchen, Tampa", before: true },
  boardwalkBefore1: { src: boardwalkBefore1Src, alt: "Burned-out ceiling with charred joists above a bedroom", caption: "Fire Damage, Holiday", before: true },
  conniewoodBefore1: { src: conniewoodBefore1Src, alt: "Stained living room floor with scattered furniture & debris", caption: "Waste-Soiled Home, New Port Richey", before: true },
  yardTruckJunk: { src: yardTruckJunkSrc, alt: "Zombie House Buyers truck beside a curbside pile of yard junk, bins & bags", caption: "Yard Cleanup, Tampa", before: false },
  yardJunkHouse: { src: yardJunkHouseSrc, alt: "Front yard & driveway piled with bags, bins & debris before haul-off", caption: "Front Yard Junk, Tampa", before: true },
  yardTruckOvergrown: { src: yardTruckOvergrownSrc, alt: "Zombie House Buyers truck on a gravel drive in an overgrown lot in front of a red house", caption: "Overgrown Lot, Tampa Bay", before: false },
} satisfies Record<string, JobPhoto>;
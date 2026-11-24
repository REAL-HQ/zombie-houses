// Dolmar's own job photos (approved for use). Captions never include street addresses.
import goldenBefore6Src from "@/assets/jobs/golden-before-6.webp";
import thumbLeilaBefore3Src from "@/assets/jobs/thumb-leila-before-3.webp";
import thumbBoardwalkBefore2Src from "@/assets/jobs/thumb-boardwalk-before-2.webp";
import thumbCourtlandCavedCeilingSrc from "@/assets/jobs/thumb-courtland-caved-ceiling.webp";
import thumbLeilaHoarder2Src from "@/assets/jobs/thumb-leila-hoarder-2.webp";
import thumbJonesHoarderPorchSrc from "@/assets/jobs/thumb-jones-hoarder-porch.webp";
import thumbJonesHoarderLivingSrc from "@/assets/jobs/thumb-jones-hoarder-living.webp";
import thumbBoardwalkBurnedCeilingSrc from "@/assets/jobs/thumb-boardwalk-burned-ceiling.webp";
import thumbCourtlandInsulationCollapseSrc from "@/assets/jobs/thumb-courtland-insulation-collapse.webp";
import courtlandBefore1Src from "@/assets/jobs/courtland-before-1.webp";
import courtlandBefore2Src from "@/assets/jobs/courtland-before-2.webp";
import courtlandBefore3Src from "@/assets/jobs/courtland-before-3.webp";
import courtlandBefore4Src from "@/assets/jobs/courtland-before-4.webp";
import junkHeroStreetSrc from "@/assets/jobs/junk-hero-street-v2.webp";
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

export interface JobPhoto { src: string; alt: string; caption: string; before: boolean; objectPosition?: string }

export const JOB_PHOTOS = {
  // AI-enhanced illustration (approved by Dolmar), not a real job photo: keep the caption generic, no city, no Before badge.
  junkHeroStreet: { src: junkHeroStreetSrc, alt: "Zombie Houses truck parked beside a large junk pile", caption: "We Haul It All", before: false, objectPosition: "10% 55%" },
  truckJones2: { src: truckJones2Src, alt: "Curbside pile of trash bags, bins & debris ready for haul-off in front of a Tampa house", caption: "Curbside Haul-Off, Tampa", before: true },
  jonesBefore1: { src: jonesBefore1Src, alt: "Side yard packed with bikes, tires, hoses & scrap beside a hoarder house", caption: "Hoarder House, Tampa", before: true },
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
  yardTruckJunk: { src: yardTruckJunkSrc, alt: "Zombie Houses truck beside a curbside pile of yard junk, bins & bags", caption: "Yard Cleanup, Tampa", before: false },
  yardJunkHouse: { src: yardJunkHouseSrc, alt: "Front yard & driveway piled with bags, bins & debris before haul-off", caption: "Front Yard Junk, Tampa", before: true },
  yardTruckOvergrown: { src: yardTruckOvergrownSrc, alt: "Zombie Houses truck on a gravel drive in an overgrown lot in front of a red house", caption: "Overgrown Lot, Tampa Bay", before: false },
  courtlandBefore1: { src: courtlandBefore1Src, alt: "Room buried in fallen insulation under a collapsed ceiling", caption: "Collapsed Ceiling, Tampa", before: true },
  courtlandBefore2: { src: courtlandBefore2Src, alt: "Kitchen with insulation hanging from a caved-in ceiling & debris on the floor", caption: "Kitchen Ceiling Collapse, Tampa", before: true },
  courtlandBefore3: { src: courtlandBefore3Src, alt: "Gutted room with the floor covered in pink insulation & debris", caption: "Insulation & Debris, Tampa", before: true },
  courtlandBefore4: { src: courtlandBefore4Src, alt: "Overgrown backyard with a falling-down shed, scrap wood & yard debris", caption: "Shed & Yard Debris, Tampa", before: true },
  goldenBefore6: { src: goldenBefore6Src, alt: "Overgrown backyard with a collapsing wood fence & shed buried in brush", caption: "Overgrown Yard, Tampa", before: true },
} satisfies Record<string, JobPhoto>;

// Job thumbnails for the shared "Meet Dolmar & Keisha" section (8 tiles, 2 rows of 4 on desktop). None repeat a landing page's hero, Meet photo or Recent Jobs photo.
export const OWNER_THUMBS: readonly JobPhoto[] = [
  { src: thumbCourtlandCavedCeilingSrc, alt: "Room with a caved-in ceiling, hanging insulation & debris piled on the floor", caption: "Caved-In Ceiling, Tampa", before: true },
  { src: thumbJonesHoarderPorchSrc, alt: "Screened porch packed with boxes, bags, appliances & stacked belongings", caption: "Hoarder House, Tampa", before: true },
  { src: thumbBoardwalkBefore2Src, alt: "Fire-damaged room with burned-out ceiling & exposed rafters", caption: "Fire Damage, Holiday", before: true },
  { src: thumbLeilaHoarder2Src, alt: "Bedroom buried in boxes, papers & trash", caption: "Hoarder Cleanout, Tampa", before: true },
  { src: thumbLeilaBefore3Src, alt: "Gutted room with open walls & ceiling & debris piled on the floor", caption: "Gutted Interior, Tampa", before: true },
  { src: thumbJonesHoarderLivingSrc, alt: "Living room piled high with bags, boxes, baskets & household items", caption: "Packed Living Room, Tampa", before: true },
  { src: thumbBoardwalkBurnedCeilingSrc, alt: "Ceiling broken open with charred framing & hanging insulation", caption: "Broken-Through Ceiling, Holiday", before: true },
  { src: thumbCourtlandInsulationCollapseSrc, alt: "Collapsed ceiling with insulation & wiring hanging into the room", caption: "Insulation Collapse, Tampa", before: true },
];

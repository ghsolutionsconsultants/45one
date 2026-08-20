/**
 * Football imagery. All shots are from Pexels (free to use, no attribution
 * required) and were picked to be object-led: pitches, balls, boots and
 * training kit, with no people in frame.
 */
export const img = {
  boots: "/images/boots.jpg",
  cones: "/images/training-cones.jpg",
  pitchAerial: "/images/pitch-aerial.jpg",
  floodlights: "/images/floodlights.jpg",
  stadiumAerial: "/images/stadium-aerial.jpg",
  stadiumNight: "/images/stadium-night.jpg",
  stadiumEmpty: "/images/stadium-empty.jpg",
  ballGrass: "/images/ball-grass.jpg",
  ballTurf: "/images/ball-turf.jpg",
  ballCloseup: "/images/ball-closeup.jpg",
  ballField: "/images/ball-field.jpg",
} as const;

export const galleryImages = [
  { src: img.boots, alt: "Yellow and black football boots on grass", label: "The kit" },
  { src: img.cones, alt: "Agility ladder and marker cones on a training pitch", label: "The work" },
  { src: img.pitchAerial, alt: "A football pitch seen from directly above", label: "The shape" },
  { src: img.floodlights, alt: "An empty pitch under floodlights at night", label: "The stage" },
  { src: img.ballCloseup, alt: "Close up of a match ball", label: "The ball" },
  { src: img.stadiumNight, alt: "A stadium lit up at dusk", label: "The noise" },
] as const;

import { MUSICAL_INTERVAL } from "@/constants";

export const intervalMap: Record<
  MUSICAL_INTERVAL,
  { notation: string; name: string }
> = {
  [MUSICAL_INTERVAL.UNISON]: {
    notation: "P1",
    name: "Unison",
  },
  [MUSICAL_INTERVAL.MINOR_2ND]: {
    notation: "m2",
    name: "Minor 2nd",
  },
  [MUSICAL_INTERVAL.MAJOR_2ND]: {
    notation: "M2",
    name: "Major 2nd",
  },
  [MUSICAL_INTERVAL.MINOR_3RD]: {
    notation: "m3",
    name: "Minor 3rd",
  },
  [MUSICAL_INTERVAL.MAJOR_3RD]: {
    notation: "M3",
    name: "Major 3rd",
  },
  [MUSICAL_INTERVAL.PERFECT_4TH]: {
    notation: "P4",
    name: "Perfect 4th",
  },
  [MUSICAL_INTERVAL.TRITONE]: {
    notation: "TT",
    name: "Tritone",
  },
  [MUSICAL_INTERVAL.PERFECT_5TH]: {
    notation: "P5",
    name: "Perfect 5th",
  },
  [MUSICAL_INTERVAL.MINOR_6TH]: {
    notation: "m6",
    name: "Minor 6th",
  },
  [MUSICAL_INTERVAL.MAJOR_6TH]: {
    notation: "M6",
    name: "Major 6th",
  },
  [MUSICAL_INTERVAL.MINOR_7TH]: {
    notation: "m7",
    name: "Minor 7th",
  },
  [MUSICAL_INTERVAL.MAJOR_7TH]: {
    notation: "M7",
    name: "Major 7th",
  },
  [MUSICAL_INTERVAL.PERFECT_8TH]: {
    notation: "P8",
    name: "Perfect 8th",
  },
};

const retrieveMusicalInterval = (musicalInterval: MUSICAL_INTERVAL) => {
  return intervalMap[musicalInterval];
};

export const getIntervalNotation = (
  musicalInterval: MUSICAL_INTERVAL,
): string => {
  return retrieveMusicalInterval(musicalInterval).notation;
};

export const getIntervalName = (musicalInterval: MUSICAL_INTERVAL): string => {
  return retrieveMusicalInterval(musicalInterval).name;
};

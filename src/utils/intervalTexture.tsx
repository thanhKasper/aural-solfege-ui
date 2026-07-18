import { INTERVAL_TEXTURE } from "@/constants";

export const INTERVAL_TEXTURE_MAP = {
  [INTERVAL_TEXTURE.STACKED]: {
    name: "Stacked",
  },
  [INTERVAL_TEXTURE.ASCENDING]: {
    name: "Ascending",
  },
  [INTERVAL_TEXTURE.DESCENDING]: {
    name: "Descending",
  },
};

export const getIntervalTextureName = (texture: INTERVAL_TEXTURE) => {
  return INTERVAL_TEXTURE_MAP[texture].name;
};

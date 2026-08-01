import musicAudioClient from "./musicAudioClient";

export const getIntervalSound = ({
  interval,
  texture,
  direction,
}: {
  interval: string;
  texture: string;
  direction: string;
}): Promise<Blob> => {
  return musicAudioClient.get(`/${interval}`, {
    params: {
      texture,
      direction,
    },
  });
};

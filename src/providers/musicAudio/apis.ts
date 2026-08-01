import musicAudioClient from "./musicAudioClient";

export const getIntervalSound = async ({
  interval,
  texture,
  direction,
}: {
  interval: string;
  texture: string;
  direction: string;
}): Promise<Blob> => {
  return musicAudioClient
    .get(`/intervals/${interval}`, {
      params: {
        texture,
        direction,
      },
    })
    .then((data) => data.data);
};

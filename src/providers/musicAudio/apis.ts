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
    .get(`/interval-range/${interval}`, {
      params: {
        texture,
        direction,
      },
      responseType: "blob",
    })
    .then((data) => data.data);
};

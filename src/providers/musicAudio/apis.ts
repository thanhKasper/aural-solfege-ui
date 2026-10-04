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

export const getRandomIntervalSound = async ({
  interval,
  texture,
}: {
  interval: string;
  texture: string;
}): Promise<Blob> => {
  const { data } = await musicAudioClient.get<Blob>(
    `/intervals/${interval}/random`,
    {
      params: { texture },
      responseType: "blob",
    },
  );
  return data;
};

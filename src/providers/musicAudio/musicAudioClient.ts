import axios from "axios";

const musicAudioClient = axios.create({
  baseURL: "/sound-repo/api",
});

export default musicAudioClient;

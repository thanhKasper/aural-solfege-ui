import axios from "axios";

const musicAudioClient = axios.create({
  baseURL: "/api/intervals",
});

export default musicAudioClient;

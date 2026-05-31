import axios from "axios";

const auralSolfegeClient = axios.create({
  baseURL: "/aural-solfege/api",
});

export default auralSolfegeClient;

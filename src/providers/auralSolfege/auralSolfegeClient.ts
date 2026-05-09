import axios from "axios";

const auralSolfegeClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default auralSolfegeClient;

import axios from "axios";
import { Reading } from "../types/readings";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getSensorReadings = async (): Promise<Reading[]> => {
  const response = await api.get("/readings");
  return response.data;
};


export const getSensorReadingsById = async (sensorId: string): Promise<Reading[]> => {
  const response = await api.get("/readings/" + sensorId);
  return response.data;
};
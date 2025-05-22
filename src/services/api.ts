const sensorsData: SensorData[] = require('../mock/sensors.json');

type SensorData = {
  id: number;
  sensorId: number;
  value: number;
  timestamp: string;
};

export const getSensorDataById = async (sensorId: number): Promise<SensorData[]> => {
  await new Promise(resolve => setTimeout(resolve, 250)); // Simulate network delay
  return sensorsData.filter((sensor: SensorData) => sensor.sensorId === sensorId);
};
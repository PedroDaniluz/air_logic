import { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { View, Text, FlatList } from "react-native";
import { getSensorReadings, getSensorReadingsById } from "../services/api";
import styled from "styled-components/native";
import theme from "../styles/theme";
import ChartCard from "../components/ChartCard";
import { Skeleton } from "moti/skeleton";
import { Reading } from "../types/readings";

type HistoricoScreenRouteProp = RouteProp<RootStackParamList, "History">;

interface SensorData {
  id: number;
  value: number;
  timestamp: string;
}

const agruparPorData = (dados: SensorData[]) => {
  const agrupado: { [data: string]: SensorData[] } = {};

  dados.forEach((item) => {
    const dataFormatada = new Date(item.timestamp).toLocaleDateString("pt-BR");
    if (!agrupado[dataFormatada]) {
      agrupado[dataFormatada] = [];
    }
    agrupado[dataFormatada].push(item);
  });

  const resultado = Object.entries(agrupado).map(([data, readings]) => ({
    data,
    readings: readings.reverse(),
  }));

  return resultado.sort((a, b) => {
    const d1 = new Date(b.data.split('/').reverse().join('/'));
    const d2 = new Date(a.data.split('/').reverse().join('/'));
    return d1.getTime() - d2.getTime();
  });
};


const History = () => {
  const route = useRoute<HistoricoScreenRouteProp>();
  const { sensorId } = route.params;

  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const data = await getSensorReadingsById(sensorId);
        setSensorData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do sensor", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSensorData();
  }, [sensorId]);

  return (
    <Container>
      <Header>Histórico</Header>

      <ChartCard
        sensorName={sensorId}
        sensorData={sensorData}
      />

      <FullHistory>
        <HistoryHeader>Histórico Detalhado</HistoryHeader>
        {isLoading && (
          <View style={{ gap: 8 }}>
            <Skeleton colorMode="light" show width={160} height={20} radius={4} />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                colorMode="light"
                width={'100%'}
                height={24}
                radius={2}
                show
              />
            ))}
          </View>
        )}
        <FlatList
          data={agruparPorData(sensorData).reverse()}
          keyExtractor={(item) => item.data}
          renderItem={({ item }) => (
            <View>
              <DateHeader>{item.data}</DateHeader>
              {item.readings.map((reading) => (
                <ReadingComponent key={reading.id}>
                  <View style={{ flex: 1.2 }}>
                    <ReadingText>
                      • {new Date(reading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </ReadingText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <ReadingText style={{ textAlign: 'center' }}>
                      {reading.value.toFixed(2)} bar
                    </ReadingText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <ReadingText style={{ textAlign: 'right' }}>
                      {reading.value > 3.6 ? 'HIGH' : reading.value < 3.0 ? 'LOW' : 'OK'}
                    </ReadingText>
                  </View>
                </ReadingComponent>
              ))}
            </View>
          )}
        />
      </FullHistory>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  gap: 24px;
  background-color: ${theme.colors.background};
  padding: 72px 32px 24px;
`;

const Header = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primaryBlue};
  font-size: 24px;
`;

const FullHistory = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${theme.colors.background};
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  elevation: 4;
`;

const HistoryHeader = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primaryBlue};
  font-size: 16px;
  margin-bottom: 12px;
`;

const DateHeader = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: 16px;
  color: ${theme.colors.secundaryBlue};
  margin-bottom: 8px;
`;

const ReadingComponent = styled.View`
  flex-direction: row;
  margin: 4px 0;
  width: 100%;
`;

const ReadingText = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: 14px;
  color: ${theme.colors.primaryBlue};
`;

export default History;
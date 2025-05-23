import { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { View, Text, FlatList, Dimensions } from "react-native";
import { getSensorDataById } from "../services/api";
import styled from "styled-components/native";
import theme from "../styles/theme";
import { LineChart } from "react-native-chart-kit";

type HistoricoScreenRouteProp = RouteProp<RootStackParamList, "History">;

interface SensorData {
  id: number;
  value: number;
  timestamp: string;
}

const calcularMediaPorHora = (dados: SensorData[]) => {
  const agrupado: { [intervalo: string]: number[] } = {};

  dados.forEach(({ timestamp, value }) => {
    const hora = new Date(timestamp).getHours();
    const faixa = Math.floor(hora / 3) * 3;
    const label = `${faixa.toString().padStart(2, "0")}h`;

    if (!agrupado[label]) {
      agrupado[label] = [];
    }
    agrupado[label].push(value);
  });

  const intervalosOrdenados = Object.keys(agrupado).sort((a, b) => {
    const hA = parseInt(a.split("-")[0]);
    const hB = parseInt(b.split("-")[0]);
    return hA - hB;
  });

  const medias = intervalosOrdenados.map((intervalo) => {
    const valores = agrupado[intervalo];
    const media = valores.reduce((acc, v) => acc + v, 0) / valores.length;
    return parseFloat(media.toFixed(2));
  });

  return { horas: intervalosOrdenados, medias };
};

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
  const { sensorId, sensorName } = route.params;

  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const data = await getSensorDataById(sensorId);
        setSensorData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do sensor", error);
      }
    };

    fetchSensorData();
  }, [sensorId]);

  const { horas, medias } = calcularMediaPorHora(sensorData);

  return (
    <Container>
      <Header>Histórico</Header>
      {horas.length > 0 && medias.length > 0 && (
        <ChartCard>
          <ChartHeader>
            <ChartTitle>
              <Title>Histórico de Pressão</Title>
              <Subtitle>Últimas 24 horas</Subtitle>
            </ChartTitle>
            <ChartSensor>{sensorName}</ChartSensor>
          </ChartHeader>
          <LineChart
            bezier
            data={{
              labels: horas,
              datasets: [{ data: medias }],
            }}
            width={Dimensions.get("window").width - 98}
            height={170}
            chartConfig={{
              backgroundColor: theme.colors.background,
              backgroundGradientFrom: theme.colors.background,
              backgroundGradientTo: theme.colors.background,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: () => theme.colors.primaryBlue,
              propsForLabels: {
                fontSize: 8,
                fontFamily: theme.fonts.medium,
              },
              propsForDots: {
                r: "2",
              },
            }}
            style={{ borderRadius: 8 }}
          />
        </ChartCard>
      )}

      <FullHistory>
        <HistoryHeader>Histórico Detalhado</HistoryHeader>
        <FlatList
          data={agruparPorData(sensorData).reverse()}
          keyExtractor={(item) => item.data}
          renderItem={({ item }) => (
            <View>
              <DateHeader>{item.data}</DateHeader>
              {item.readings.map((reading) => (
                <Reading key={reading.id}>
                  <ReadingCell style={{ flex: 1.2 }}>
                    <ReadingText>• {new Date(reading.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</ReadingText>
                  </ReadingCell>
                  <ReadingCell style={{ flex: 1 }}>
                    <ReadingText style={{ textAlign: 'center' }}>{reading.value.toFixed(2)} bar</ReadingText>
                  </ReadingCell>
                  <ReadingCell style={{ flex: 1 }}>
                    <ReadingText style={{ textAlign: 'right' }}>
                      {reading.value > 3.6 ? 'HIGH' : reading.value < 3.0 ? 'LOW' : 'OK'}
                    </ReadingText>
                  </ReadingCell>
                </Reading>
              ))}
            </View>
          )}
        />

      </FullHistory>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  gap: 24px;
  background-color: ${theme.colors.background};
  padding: 72px 32px;
`;

const Header = styled(Text)`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primaryBlue};
  font-size: 24px;
`;

const ChartCard = styled(View)`
  width: 100%;
  padding-bottom: 16px;
  background-color: ${theme.colors.background};
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

const ChartHeader = styled(View)`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ChartTitle = styled(View)`
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled(Text)`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primaryBlue};
  font-size: 16px;
`;

const Subtitle = styled(Text)`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.secundaryBlue};
`;
const ChartSensor = styled(Text)`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.secundaryBlue};
  text-align: right;
`;

const FullHistory = styled(View)`
  flex: 1;
  padding: 24px;
  background-color: ${theme.colors.background};
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const HistoryHeader = styled(Text)`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primaryBlue};
  font-size: 16px;
  margin-bottom: 12px;
`;

const DateHeader = styled(Text)`
  font-family: ${theme.fonts.medium};
  font-size: 16px;
  color: ${theme.colors.secundaryBlue};
  margin-bottom: 8px;
`;


const Reading = styled(View)`
  flex-direction: row;
  margin: 4px 0;
  width: 100%;
`;

const ReadingCell = styled(View)`
  justify-content: start;
`;

const ReadingText = styled(Text)`
  font-family: ${theme.fonts.medium};
  font-size: 14px;
  color: ${theme.colors.primaryBlue};
`;

export default History;
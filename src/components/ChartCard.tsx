import { View, Text, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit";
import styled from "styled-components";
import theme from "../styles/theme";
import { Skeleton } from "moti/skeleton";

interface ChartCardProps {
    sensorName: string;
    sensorData: SensorData[];
}

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

const ChartCard: React.FC<ChartCardProps> = ({
    sensorName,
    sensorData,
}) => {
    const { horas, medias } = calcularMediaPorHora(sensorData);

    const isDataReady = horas.length > 0 && medias.length > 0;

    return (
        <ChartCardStyled>
            <ChartHeader>
                <View>
                    <ChartTitle>Histórico de Pressão</ChartTitle>
                    <ChartSubtitle>Últimas 24 horas</ChartSubtitle>
                </View>
                <ChartSensor>{sensorName}</ChartSensor>
            </ChartHeader>
            {!isDataReady ? (
                <View style={{ paddingLeft: 16 }}>
                    <Skeleton
                    show={true}
                    colorMode="light"
                    height={170}
                    width={Dimensions.get("window").width - 98}
                    radius={8}
                />
                </View>
            ) : (
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
            )}
        </ChartCardStyled>
    )
}


const ChartCardStyled = styled(View)`
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

const ChartTitle = styled(Text)`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primaryBlue};
  font-size: 16px;
`;

const ChartSubtitle = styled(Text)`
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

export default ChartCard;
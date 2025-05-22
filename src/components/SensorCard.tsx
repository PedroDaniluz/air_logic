import { View } from "react-native";
import styled from "styled-components/native";
import theme from "../styles/theme";
import Gauge from "./Gauge";
import { getSensorDataById} from "../services/api";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

interface SensorCardProps {
    title: string;
    sensorId: number;
}

const SensorCard: React.FC<SensorCardProps> = ({
    title,
    sensorId,
}) => {
    const [sensorValue, setSensorValue] = useState<number | null>(null);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const data = await getSensorDataById(sensorId);
                setSensorValue(data[(data.length - 1)].value);
            } catch (error) {
                console.error("Erro ao buscar dados do sensor", error);
            }
        };

        fetchSensorData();
    }, [sensorId]);

    return (
        <Card>
            <CardHeader>
                <View>
                    <Title>{title}</Title>
                    <Subtitle>Pressão</Subtitle>
                </View>
                <History>Histórico</History>
            </CardHeader>
            <CardContent>
                <SensorValue>{sensorValue?.toFixed(1)} bar</SensorValue>
                <Gauge
                    value={sensorValue ?? 0}
                    minValue={0}
                    maxValue={7}
                />
            </CardContent>
        </Card>
    );
};

const Card = styled(View)`
    width: 100%;
    padding: 16px;
    background-color: ${theme.colors.background};
    border-radius: 8px;
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
    shadow-offset: 0px 2px;
`;

const CardHeader = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: top;
`;

const Title = styled.Text`
    font-family: ${theme.fonts.medium};
    font-size: 18px;
    color: ${theme.colors.primaryBlue};
`;

const Subtitle = styled.Text`
    font-family: ${theme.fonts.medium};
    font-size: 14px;
    color: ${theme.colors.secundaryBlue};
`;

const History = styled.Text`
    color: ${theme.colors.secundaryBlue};
    font-family: ${theme.fonts.bold};
    font-size: 14px;
    text-decoration-line: underline;
`;  

const CardContent = styled(View)`
    align-items: center;
    flex-direction: row;
    margin-top: 8px;
    justify-content: space-between;
`;

const SensorValue = styled.Text`
    font-family: ${theme.fonts.extraBold};
    font-size: 44px;
    color: ${theme.colors.secundaryBlue};
`;

export default SensorCard;
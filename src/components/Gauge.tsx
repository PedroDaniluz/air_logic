import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styled from 'styled-components/native';

interface GaugeProps {
    value: number;
    minValue: number;
    maxValue: number;
}

const Gauge: React.FC<GaugeProps> = ({
    value,
    minValue,
    maxValue
}) => {
    const fixedValue = ((value - minValue) / (maxValue - minValue)) * 100;
    return (
        <GaugeContainer>
            <AnimatedCircularProgress style={{ position: 'absolute', right: 0, top: -25 }}
                size={100}
                width={15}
                fill={fixedValue}
                tintColor={fixedValue < 80 ? "#00e0ff" : "red"}
                backgroundColor="#3d5875"
                rotation={270}
                arcSweepAngle={180}
            />
        </GaugeContainer>
    );
};

const GaugeContainer = styled.View`
    position: relative;
    justify-content: center;
    align-items: center;
`;

export default Gauge;

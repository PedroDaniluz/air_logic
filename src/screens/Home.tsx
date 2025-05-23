import { View, Text, Button } from "react-native";
import theme from "../styles/theme";
import styled from "styled-components/native";
import SensorCard from "../components/SensorCard";

const Home = () => {
    return (
        <Container>
            <Header>
                <HeaderText>Home</HeaderText>
                <HeaderLogo source={require('../../assets/logo2.png')} />
            </Header>
            <SensorCard title={"Compressor"} sensorId={1}/>
            <SensorCard title={"Atuador 1"} sensorId={2}/>
            <SensorCard title={"Atuador 2"} sensorId={3}/>
        </Container>
    );
}

const Container = styled(View)`
    flex: 1;
    padding: 72px 32px 0;
    gap: 24px;
    background-color: ${theme.colors.background};
`;

const Header = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const HeaderText = styled(Text)`
    color: ${theme.colors.primaryBlue};
    font-family: ${theme.fonts.bold};
    font-size: 24px
`

const HeaderLogo = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 60px;
    aspect-ratio: 1.9;
`;

export default Home;
import { View, Text } from "react-native";
import theme from "../styles/theme";
import styled from "styled-components/native";
import SensorCard from "../components/SensorCard";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
    return (
        <Container>
            <InnerContainer>
                <Header>
                    <HeaderText>Home</HeaderText>
                    <HeaderLogo source={require('../../assets/logo2.png')} />
                </Header>
                <SensorCard title={"Compressor"} sensorId={1} />
                <SensorCard title={"Atuador 1"} sensorId={2} />
                <SensorCard title={"Atuador 2"} sensorId={3} />
            </InnerContainer>
        </Container>
    );
}

const Container = styled.ScrollView.attrs(() => ({
  bounces: false,
}))`
  padding: 72px 32px 0;
  background-color: ${theme.colors.background};
`;

const InnerContainer = styled(View)`
    flex: 1;
    display: flex;
    gap: 24px;
`

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
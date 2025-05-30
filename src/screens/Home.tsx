import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import theme from "../styles/theme";
import SensorCard from "../components/SensorCard";

const sensors = [
    {
        id: 1,
        name: "Compressor",
    },
    {
        id: 2,
        name: "Atuador 1",
    },
    {
        id: 3,
        name: "Atuador 2",
    },
];

const Home = () => {
    return (
        <Container>
            <Header>
                <HeaderText>Home</HeaderText>
                <HeaderLogo source={require('../../assets/logo2.png')} />
            </Header>
            <FlatList
                bounces={false}
                data={sensors}
                renderItem={({ item }) => (
                    <SensorCard title={item.name} sensorId={item.id} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 24, paddingHorizontal: 32, marginTop: 24 }}
            />
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    padding-top: 72px;
    background-color: ${theme.colors.background};
`;

const Header = styled.View`
    padding: 0 32px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const HeaderText = styled.Text`
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
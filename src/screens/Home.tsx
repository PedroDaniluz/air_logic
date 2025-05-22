import { View, Text, Image } from "react-native";
import theme from "../styles/theme";
import styled from "styled-components/native";

const Home = () => {
    return (
        <Container>
            <Header>
                <HeaderText>Home</HeaderText>
                <HeaderLogo source={require('../../assets/logo2.png')}/>
            </Header>
        </Container>
    );
}

const Container = styled(View)`
    flex: 1;
    padding: 72px 32px;
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
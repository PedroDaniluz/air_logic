import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import LoginButton from '../components/LoginButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const Welcome = () => {
    const navigation = useNavigation<NavigationProps>();
    return (
        <GradientContainer
            colors={['#E3FCFF', '#9EF0FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <Logo source={require('../../assets/logo.png')} />
            <ButtonContainer>
                <LoginButton text='Entrar' onClick={() => navigation.navigate('Login')} filled={true}/>
                <LoginButton text='Criar conta' onClick={() => navigation.navigate('Login')} filled={false}/>
            </ButtonContainer>
        </GradientContainer>
    );
};

const GradientContainer = styled(LinearGradient)`
  padding: 76px 40px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 116px;
  aspect-ratio: 1.9;
`;

const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  gap: 12px;
`;


export default Welcome;

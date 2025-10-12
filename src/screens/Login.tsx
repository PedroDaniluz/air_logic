import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import theme from '../styles/theme'
import InputField from '../components/InputField'
import LoginButton from '../components/LoginButton'
import { RootStackParamList } from '../types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'MainApp'>

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation<NavigationProps>()

  return (
    <Container>
      <Pressable onPress={() => navigation.goBack()}>
        {({ pressed }) => (
          <BackButton pressed={pressed}>
            <MaterialIcons
              name="chevron-left"
              size={32}
              color={theme.colors.primaryBlue}
            />
          </BackButton>
        )}
      </Pressable>

      <Header>Bem vindo de volta!</Header>

      <LoginForm>
        <InputField
          placeholder="Insira seu email"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          secureTextEntry
          placeholder="Insira sua senha"
          value={password}
          onChangeText={setPassword}
        />
        <StyledText>Esqueceu sua senha?</StyledText>
      </LoginForm>
      <LoginButton
        text="Login"
        onClick={() => navigation.navigate('MainApp')}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  gap: 44px;
  padding: 76px 40px;
  background-color: ${theme.colors.background};
`

const Header = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 32px;
  color: ${theme.colors.primaryBlue};
`

const BackButton = styled.View<{ pressed?: boolean }>`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.primaryBlue};
  opacity: ${({ pressed }) => (pressed ? 0.5 : 1)};
`

const LoginForm = styled.View`
  gap: 12px;
`

const StyledText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: #717171;
  text-align: right;
`

export default Login

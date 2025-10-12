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
import { login } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'MainApp'>

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const navigation = useNavigation<NavigationProps>()

  const handleLogin = async () => {
    setErrorMsg('')
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Preencha todos os campos')
      return
    }
    try {
      const loginResponse = await login(username, password)
      if (loginResponse && loginResponse.token) {
        await AsyncStorage.setItem('jwt', loginResponse.token)
        await AsyncStorage.setItem('username', username)
        navigation.navigate('MainApp')
      } else {
        setErrorMsg('Usuário ou senha inválidos')
      }
    } catch {
      setErrorMsg('Usuário ou senha inválidos')
    }
  }

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
          placeholder="Insira seu nome de usuário"
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          secureTextEntry
          placeholder="Insira sua senha"
          value={password}
          onChangeText={setPassword}
        />
        <ErrorText>{errorMsg}</ErrorText>
      </LoginForm>
      <LoginButton text="Login" onClick={handleLogin} />
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

const ErrorText = styled.Text`
  color: ${theme.colors.red};
  font-size: 12px;
  min-height: 18px;
`

export default Login

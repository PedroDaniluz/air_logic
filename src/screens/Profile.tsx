import styled from 'styled-components/native'
import theme from '../styles/theme'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginButton from '../components/LoginButton'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

const Profile = () => {
  const [username, setUsername] = useState('')
  const navigation = useNavigation<NavigationProps>()

  useEffect(() => {
    const fetchUsername = async () => {
      const name = await AsyncStorage.getItem('username')
      if (name) setUsername(name)
    }
    fetchUsername()
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.clear()
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    })
  }

  return (
    <Container>
      <Header>Olá, {username}</Header>
      <LoginButton text="Sair" onClick={handleLogout} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  gap: 24px;
  background-color: ${theme.colors.background};
  padding: 72px 32px 24px;
  justify-content: space-between;
`
const Header = styled.Text`
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.primaryBlue};
  font-size: 24px;
`

export default Profile

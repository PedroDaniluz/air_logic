/* eslint-disable @typescript-eslint/no-require-imports */
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import theme from '../styles/theme'
import SensorCard from '../components/SensorCard'
import { useEffect, useState } from 'react'
import { getSensorReadings } from '../services/api'
import { Reading } from '../types/readings'

const Home = () => {
  const [data, setData] = useState<Reading[]>([])
  useEffect(() => {
    const fetchedData = async () => {
      const res = await getSensorReadings()
      setData(res)
    }
    fetchedData()
  }, [])
  const uniqueSensors = Array.from(
    new Map(data.map((item) => [item.sensorId, item])).values()
  )

  return (
    <Container>
      <Header>
        <HeaderText>Home</HeaderText>
        <HeaderLogo source={require('../../assets/logo2.png')} />
      </Header>
      <FlatList
        bounces={false}
        data={uniqueSensors}
        keyExtractor={(item) => item.sensorId}
        renderItem={({ item }) => <SensorCard sensorId={item.sensorId} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 24,
          paddingHorizontal: 32,
          marginTop: 24,
        }}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding-top: 72px;
  background-color: ${theme.colors.background};
`

const Header = styled.View`
  padding: 0 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled.Text`
  color: ${theme.colors.primaryBlue};
  font-family: ${theme.fonts.bold};
  font-size: 24px;
`

const HeaderLogo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 60px;
  aspect-ratio: 1.9;
`

export default Home

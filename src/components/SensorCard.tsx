import { View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Skeleton } from 'moti/skeleton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import styled from 'styled-components/native'
import theme from '../styles/theme'
import Gauge from './Gauge'
import { getSensorReadingsById } from '../services/api'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>

interface SensorCardProps {
  sensorId: string
}

const SensorCard: React.FC<SensorCardProps> = ({ sensorId }) => {
  const navigation = useNavigation<NavigationProp>()
  const [sensorValue, setSensorValue] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const formattedData = await getSensorReadingsById(sensorId)
        setSensorValue(formattedData[formattedData.length - 1].value)
      } catch (error) {
        console.error('Erro ao buscar dados do sensor', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSensorData()
  }, [sensorId])

  return (
    <Card>
      <CardHeader>
        <View>
          <Title>{sensorId}</Title>
          <Subtitle>Pressão</Subtitle>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('History', { sensorId })}
        >
          <History>Histórico</History>
        </TouchableOpacity>
      </CardHeader>
      <CardContent>
        <Skeleton colorMode="light" show={isLoading} width={160}>
          <SensorValue>{sensorValue?.toFixed(1)} bar</SensorValue>
        </Skeleton>
        <Gauge value={sensorValue ?? 0} minValue={0} maxValue={7} />
      </CardContent>
    </Card>
  )
}

const Card = styled.View`
  width: 100%;
  padding: 16px;
  background-color: ${theme.colors.background};
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  elevation: 4;
`

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const Title = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: 18px;
  color: ${theme.colors.primaryBlue};
`

const Subtitle = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: 14px;
  color: ${theme.colors.secundaryBlue};
`

const History = styled.Text`
  color: ${theme.colors.secundaryBlue};
  font-family: ${theme.fonts.bold};
  font-size: 14px;
  text-decoration-line: underline;
`

const CardContent = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 8px;
  justify-content: space-between;
`

const SensorValue = styled.Text`
  font-family: ${theme.fonts.extraBold};
  font-size: 44px;
  color: ${theme.colors.secundaryBlue};
`

export default SensorCard

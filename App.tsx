import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat'

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

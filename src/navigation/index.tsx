import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Welcome from '../screens/Welcome'
import Login from '../screens/Login'
import TabRoutes from './TabRoutes'
import Register from '../screens/Register'

const Stack = createNativeStackNavigator()

export default function Routes() {
  const [initialRoute, setInitialRoute] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('jwt')
      setInitialRoute(token ? 'MainApp' : 'Welcome')
    }
    checkToken()
  }, [])

  if (!initialRoute) return null

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainApp" component={TabRoutes} />
    </Stack.Navigator>
  )
}

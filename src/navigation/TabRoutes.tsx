import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Home from '../screens/Home'
import History from '../screens/History'
import theme from '../styles/theme'

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()

function HomeWithHistoryStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="History" component={History} />
    </HomeStack.Navigator>
  )
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primaryBlue,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          paddingTop: 6,
          height: 80,
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
        },
      }}
    >
      <Tab.Screen
        name="Perfil"
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            Alert.alert('Perfil', 'Funcionalidade ainda não implementada.')
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      >
        {() => null}
      </Tab.Screen>
      <Tab.Screen
        name="HomeTab"
        component={HomeWithHistoryStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            Alert.alert(
              'Configurações',
              'Funcionalidade ainda não implementada.'
            )
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      >
        {() => null}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

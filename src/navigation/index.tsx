import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

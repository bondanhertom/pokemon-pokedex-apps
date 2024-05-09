import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import {MainStackParamList} from './type';
const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLargeTitle: true,
          headerTitle: 'Pokedex',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerLargeTitle: true,
          headerTitle: 'Detail',
          headerTransparent: true,
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

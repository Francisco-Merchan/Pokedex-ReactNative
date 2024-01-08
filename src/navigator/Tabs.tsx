import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Navigator} from './Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {Tab2Screen} from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderWidth: 0,
          elevation: 0,
          height: 60,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="list-outline" color={color} size={25} />
          ),
        }}
        name="Home"
        component={Navigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Busqueda',
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" color={color} size={25} />
          ),
        }}
        name="SearchScreen"
        component={Tab2Screen}
      />
    </Tab.Navigator>
  );
};

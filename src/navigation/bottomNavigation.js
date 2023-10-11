import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import FarmList from '../screens/farmlist';
import GraphReportScreen from '../screens/graphreport';
import DashboardScreen from '../screens/dashboard';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import GOBALCOLORS from '../gobalconstant/colors';
import CropListScreen from '../screens/crop/list';

const Tab = createBottomTabNavigator();

const NavigationBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: '#42f44b'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        tabBarActiveTintColor: GOBALCOLORS.COLORS.BLUE,
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'FarmList') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'GraphReportScreen') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'DashboardScreen') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'CropList') {
            iconName = focused ? 'list' : 'list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({focused, color}) => {
          if (route.name === 'Home') {
            return <Text style={{color: color}}>Home</Text>;
          } else if (route.name === 'FarmList') {
            return <Text style={{color: color}}>Farm List</Text>;
          } else if (route.name === 'GraphReportScreen') {
            return <Text style={{color: color}}>Graph</Text>;
          } else if (route.name === 'DashboardScreen') {
            return <Text style={{color: color}}>Create Report</Text>;
          } else if (route.name === 'CropList') {
            return <Text style={{color: color}}>Crop List</Text>;
          }
        },
        tabBarStyle: {
          height: 50,
        },
      })}>
      {/* <Tab.Screen
        options={{
          headerShown: null,
        }}
        name="Home"
        component={HomeScreen}
      /> */}
        <Tab.Screen
        options={{
          headerShown: null,
        }}
        name="FarmList"
        component={FarmList}
      />
      <Tab.Screen
        options={{
          headerShown: null,
        }}
        name="CropList"
        component={CropListScreen}
      />
      <Tab.Screen
        options={{
          headerShown: null,
        }}
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <Tab.Screen
        options={{
          headerShown: null,
        }}
        name="GraphReportScreen"
        component={GraphReportScreen}
      />
    
    </Tab.Navigator>
  );
};
export default NavigationBottomTab;

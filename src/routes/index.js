import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  States,
  StatesDetail,
  Video,
  VideoDetail,
  Login,



} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();


export default function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="States"
        component={States}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StatesDetail"
        component={StatesDetail}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Video"
        component={Video}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{
          headerShown: false,
        }}
      />
















    </Stack.Navigator>
  );
}

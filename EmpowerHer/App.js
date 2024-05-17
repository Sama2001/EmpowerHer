//app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MenuScreen from './screens/MenuScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import FirstPage from './screens/Firstpage';
import Membership from './screens/Membership';
import volunteer from './screens/Volunteer'
import manager from './screens/ManagerScreen';
import task from './screens/Tasks';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="First" component={FirstPage} />
        <Stack.Screen name="Member" component={Membership} />
        <Stack.Screen name="volunteer" component={volunteer} />
        <Stack.Screen name="ManagerScreen" component={manager} />
        <Stack.Screen name="tasks" component={task} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


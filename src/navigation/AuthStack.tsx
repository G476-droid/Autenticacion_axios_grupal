import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../components/screens/auth/LoginScreen';
import { RegisterScreen } from '../components/screens/auth/RegisterScreen';
import { AuthStackParamList } from './typeNavigation';


const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;

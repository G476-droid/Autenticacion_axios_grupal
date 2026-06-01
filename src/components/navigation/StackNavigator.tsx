import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export const StackNavigator = () => {

  return (
    <NavigationContainer>
      {/*<AppStack />*/}
      <AuthStack/>
    </NavigationContainer>
  );
};


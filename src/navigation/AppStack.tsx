import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppStackParamList } from "./typeNavigation";
import { HomeScreen } from "../components/screens/app/HomeScreen";
import { DetailScreen } from "../components/screens/app/DetailScreen";

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#4F46E5",
        headerTitleStyle: {
          fontWeight: "700" as const,
          color: "#1A202C",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: "Detalle del Post",
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

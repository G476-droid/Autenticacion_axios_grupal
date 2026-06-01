import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

export const StackNavigator = () => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner message="Cargando sesión" />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

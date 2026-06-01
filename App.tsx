import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StackNavigator } from "./src/navigation/StackNavigator";
import { AuthProvider } from "./src/context/AuthContext";

const App =()=> {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <StackNavigator />
    </AuthProvider>
  );
}
 export default App;
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/typeNavigation";
import { LoginForm } from "../../types/auth";
import { isValidEmail, isValidPassword } from "../../utils/validators";
import { loginStyles } from "../../styles/appStyle";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

type LoginScreenNavigationProp = StackScreenProps<AuthStackParamList, "Login">;

export const LoginScreen = ({ navigation }: LoginScreenNavigationProp) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!isValidEmail(loginForm.email)) {
      setEmailError("Ingresa un email válido");
      valid = false;
    }
    if (!isValidPassword(loginForm.password)) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    }
    return valid;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={loginStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={loginStyles.header}>
          <Text style={loginStyles.title}>Bienvenido</Text>
          <Text style={loginStyles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={loginStyles.form}>
          <Input
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={loginForm.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />
          <Input
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={loginForm.password}
            onChangeText={(value) => handleInputChange("password", value)}
            isPassword
            error={passwordError}
          />
          <Button
            title="Iniciar Sesión"
            onPress={()=>{}}
            loading={loading}
            style={loginStyles.button}
          />
        </View>

        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>¿No tienes cuenta? </Text>
          <Text
            style={loginStyles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Regístrate
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

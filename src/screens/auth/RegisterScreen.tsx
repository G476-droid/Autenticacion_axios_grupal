import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/typeNavigation";
import {
  isValidEmail,
  isValidPassword,
  passwordsMatch,
} from "../../utils/validators";
import { registerStyles } from "../../styles/appStyle";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { RegisterForm } from "../../types/auth";
import { AuthContext } from "../../context/AuthContext";

type RegisterScreenNavigationProp = StackScreenProps<
  AuthStackParamList,
  "Register"
>;

export const RegisterScreen = ({
  navigation,
}: RegisterScreenNavigationProp) => {
  const { signUp } = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setRegisterForm({ ...registerForm, [key]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmError("");

    if (!isValidEmail(registerForm.email)) {
      setEmailError("Ingresa un email válido");
      valid = false;
    }
    if (!isValidPassword(registerForm.password)) {
      setPasswordError("Mínimo 6 caracteres");
      valid = false;
    }
    if (!passwordsMatch(registerForm.password, registerForm.confirmPassword)) {
      setConfirmError("Las contraseñas no coinciden");
      valid = false;
    }
    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    const error = await signUp(
      registerForm.email.trim(),
      registerForm.password
    );
    setLoading(false);

    if (error) {
      Alert.alert("No se pudo registrar", error);
      return;
    }

    Alert.alert("Cuenta creada", "Ya puedes iniciar sesión.");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={registerStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={registerStyles.header}>
          <Text style={registerStyles.title}>Crear Cuenta</Text>
          <Text style={registerStyles.subtitle}>Regístrate para comenzar</Text>
        </View>

        <View style={registerStyles.form}>
          <Input
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={registerForm.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />
          <Input
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={registerForm.password}
            onChangeText={(value) => handleInputChange("password", value)}
            isPassword
            error={passwordError}
          />
          <Input
            label="Confirmar Contraseña"
            placeholder="Repite tu contraseña"
            value={registerForm.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            isPassword
            error={confirmError}
          />
          <Button
            title="Registrarse"
            onPress={handleRegister}
            loading={loading}
            style={registerStyles.button}
          />
        </View>

        <View style={registerStyles.footer}>
          <Text style={registerStyles.footerText}>¿Ya tienes cuenta? </Text>
          <Text style={registerStyles.link} onPress={() => navigation.goBack()}>
            Inicia Sesión
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

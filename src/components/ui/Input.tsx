import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { inputStyles } from "../../styles/appStyle";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export const Input = ({
  label,
  error,
  isPassword = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.label}>{label}</Text>
      <View style={inputStyles.inputWrapper}>
        <TextInput
          style={[inputStyles.input, error ? inputStyles.inputError : null]}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#A0AEC0"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={inputStyles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#A0AEC0"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={inputStyles.errorText}>{error}</Text> : null}
    </View>
  );
};

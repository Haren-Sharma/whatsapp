import { View, TextInput } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

const Input = ({ value, onChangeText, placeholder, secure, toggleSecure,onFocus }) => {
  return (
    <View>
      <TextInput
        style={styles.inputbox}
        value={value}
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='black'
        secureTextEntry={secure}
        onFocus={onFocus}
      />
      {placeholder?.includes("password") && (
        <FontAwesome
          onPress={toggleSecure}
          name={secure ? "eye-slash" : "eye"}
          style={styles.icon}
          size={20}
          color="whitesmoke"
        />
      )}
    </View>
  );
};
export default Input;

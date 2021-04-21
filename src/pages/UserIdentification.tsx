import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { navigate } = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.wrapper}>
            <View style={styles.form}>
              <Text style={styles.emoji}>{name.length > 0 ? "😆" : "😃"}</Text>

              <Text style={styles.heading}>
                Como podemos {"\n"} chamar você?
              </Text>

              <TextInput
                onBlur={handleInputBlur}
                onChangeText={setName}
                onFocus={handleInputFocus}
                style={[
                  styles.input,
                  (isFocused || !!name) && styles.inputFocused,
                ]}
                value={name}
              />

              <Button
                disabled={!name.length}
                onPress={() => navigate("Confirmation")}
                style={styles.button}
              >
                <Text style={styles.confirm}>Confirmar</Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    paddingHorizontal: 12,
    width: "100%",
  },
  confirm: {
    color: colors.white,
    fontFamily: fonts.complement,
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  emoji: {
    fontSize: 44,
  },
  form: {
    alignItems: "center",
    paddingHorizontal: 54,
    width: "100%",
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    fontSize: 18,
    marginTop: 24,
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
  inputFocused: {
    borderColor: colors.green,
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

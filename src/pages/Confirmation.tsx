import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.emoji}>😁</Text>

        <Text style={styles.title}>Prontinho!</Text>
        <Text style={styles.subtitle}>
          Vamos começar a cuidar das suas plantinhas com muito cuidado
        </Text>

        <View style={styles.buttonContainer}>
          <Button style={styles.button}>
            <Text style={styles.confirm}>Confirmar</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    paddingHorizontal: 12,
    width: "100%",
  },
  buttonContainer: {
    paddingHorizontal: 54,
    width: "100%",
  },
  confirm: {
    color: colors.white,
    fontFamily: fonts.complement,
    fontSize: 18,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
  },
  emoji: {
    fontSize: 78,
  },
  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 20,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 38,
    marginTop: 15,
    textAlign: "center",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    width: "100%",
  },
});

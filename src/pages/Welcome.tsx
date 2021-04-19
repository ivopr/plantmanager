import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import wateringImage from "../assets/watering.png";
import colors from "../styles/colors";

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {"\n"} suas plantas de {"\n"} forma fácil
      </Text>

      <Image source={wateringImage} style={styles.image} />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <TouchableOpacity activeOpacity={0.75} style={styles.button}>
        <Entypo color={colors.white} name="chevron-right" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.green,
    height: 56,
    justifyContent: "center",
    marginBottom: 10,
    width: 56,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    height: 292,
    width: 284,
  },
  subtitle: {
    color: colors.heading,
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  title: {
    color: colors.heading,
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 38,
    textAlign: "center",
  },
});

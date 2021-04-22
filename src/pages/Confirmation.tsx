import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ConfirmationProps {
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
  subtitle: string;
  title: string;
}

const emojis = {
  hug: "🤗",
  smile: "😊",
};

export function Confirmation() {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const {
    buttonTitle,
    title,
    icon,
    nextScreen,
    subtitle,
  } = params as ConfirmationProps;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigate(
                "Tab",
                nextScreen === "MyPlants" ? { screen: "MyPlants" } : undefined
              )
            }
            style={styles.button}
          >
            <Text style={styles.confirm}>{buttonTitle}</Text>
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

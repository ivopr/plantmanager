import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import userImage from "../assets/user.jpeg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textHello}>Olá,</Text>
        <Text style={styles.textName}>Ivo</Text>
      </View>

      <Image source={userImage} style={styles.userImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    width: "100%",
  },
  textHello: {
    color: colors.heading,
    fontFamily: fonts.extraLight,
    fontSize: 28,
  },
  textName: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 40,
  },
  userImage: {
    borderRadius: 28,
    height: 56,
    width: 56,
  },
});

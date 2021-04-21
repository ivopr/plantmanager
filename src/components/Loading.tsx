import Lottie from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

import Animation from "../assets/load.json";

export function Loading() {
  return (
    <View style={styles.container}>
      <Lottie autoPlay loop source={Animation} style={styles.animation} />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    backgroundColor: "transparent",
    height: 200,
    width: 200,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

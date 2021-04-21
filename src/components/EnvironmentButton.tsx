import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  isActive?: boolean;
}

export function EnvironmentButton({
  isActive = false,
  title,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[styles.button, isActive && styles.buttonActive]}
      {...rest}
    >
      <Text style={[styles.title, isActive && styles.titleActive]}>
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.shape,
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 1.5,
    paddingHorizontal: 20,
  },
  buttonActive: {
    backgroundColor: colors.green_light,
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
  },
  titleActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    fontSize: 17,
  },
});

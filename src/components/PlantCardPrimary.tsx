import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

export function PlantCardPrimary({
  data: { name, photo },
  ...rest
}: PlantCardPrimaryProps) {
  return (
    <RectButton style={styles.button} {...rest}>
      <SvgFromUri height={70} uri={photo} width={70} />
      <Text style={styles.title}>{name}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.shape,
    borderRadius: 20,
    flex: 1,
    margin: 10,
    maxWidth: "45%",
    paddingVertical: 10,
  },
  title: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

export function PlantCardSecondary({
  data: { name, photo, hour },
  ...rest
}: PlantCardPrimaryProps) {
  return (
    <RectButton style={styles.button} {...rest}>
      <SvgFromUri height={50} uri={photo} width={50} />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regar às</Text>
        <Text style={styles.time}>{hour}</Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.shape,
    borderRadius: 20,
    flexDirection: "row",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 25,
    width: "100%",
  },
  details: {
    alignItems: "flex-end",
  },
  time: {
    color: colors.body_dark,
    fontFamily: fonts.heading,
    fontSize: 16,
    marginTop: 5,
  },
  timeLabel: {
    color: colors.body_light,
    fontFamily: fonts.text,
    fontSize: 16,
  },
  title: {
    flex: 1,
    color: colors.green_dark,
    fontFamily: fonts.heading,
    fontSize: 17,
    marginLeft: 10,
  },
});

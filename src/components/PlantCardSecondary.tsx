import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import {
  RectButton,
  RectButtonProps,
  Swipeable,
} from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleDelete(): void;
}

export function PlantCardSecondary({
  data: { name, photo, hour },
  handleDelete,
  ...rest
}: PlantCardPrimaryProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <RectButton onPress={handleDelete} style={styles.buttonDelete}>
            <Feather name="trash" size={32} color={colors.white} />
          </RectButton>
        </Animated.View>
      )}
    >
      <RectButton style={styles.button} {...rest}>
        <SvgFromUri height={50} uri={photo} width={50} />
        <Text style={styles.title}>{name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
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
  buttonDelete: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderRadius: 20,
    height: "90%",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: -25,
    paddingLeft: 25,
    position: "relative",
    width: 100,
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

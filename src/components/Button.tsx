import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import colors from "../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

export function Button({
  activeOpacity,
  children,
  disabled,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ?? 0.75}
      onPress={onPress}
      style={[styles.button, style, disabled && styles.disabled]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.green,
    height: 56,
    justifyContent: "center",
    minWidth: 56,
  },
  disabled: {
    backgroundColor: colors.green_light,
  },
});

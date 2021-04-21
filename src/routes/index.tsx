import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { StackNavigator } from "./stack.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

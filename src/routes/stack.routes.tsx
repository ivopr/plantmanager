import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Confirmation } from "../pages/Confirmation";
import { UserIdentification } from "../pages/UserIdentification";
import { Welcome } from "../pages/Welcome";
import colors from "../styles/colors";

const { Navigator, Screen } = createStackNavigator();

export function StackNavigator() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="UserIdentification" component={UserIdentification} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}

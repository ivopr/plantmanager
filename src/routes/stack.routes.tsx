import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Confirmation } from "../pages/Confirmation";
import { PlantSave } from "../pages/PlantSave";
import { UserIdentification } from "../pages/UserIdentification";
import { Welcome } from "../pages/Welcome";
import colors from "../styles/colors";
import { TabNavigator } from "./tab.routes";

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
      <Screen name="Tab" component={TabNavigator} />
      <Screen name="PlantSave" component={PlantSave} />
    </Navigator>
  );
}

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";

import { Confirmation } from "../pages/Confirmation";
import { PlantSave } from "../pages/PlantSave";
import { UserIdentification } from "../pages/UserIdentification";
import { Welcome } from "../pages/Welcome";
import colors from "../styles/colors";
import { TabNavigator } from "./tab.routes";

const { Navigator, Screen } = createStackNavigator();

export function StackNavigator() {
  const [name, setName] = useState("");
  const { getItem } = useAsyncStorage("@plantmanager:user");

  useEffect(() => {
    async function getName() {
      await getItem().then((username) => setName(username ?? ""));
    }

    getName();
  }, []);

  return (
    <Navigator
      initialRouteName={name.length > 0 ? "Tab" : "UserIdentification"}
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

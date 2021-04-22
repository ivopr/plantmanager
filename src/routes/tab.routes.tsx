import { MaterialIcons } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";

import { MyPlants } from "../pages/MyPlants";
import { PlantSelect } from "../pages/PlantSelect";
import colors from "../styles/colors";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabNavigator() {
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
      initialRouteName={name.length > 0 ? "MyPlants" : "PlantSelect"}
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
        style: {
          height: 60,
        },
      }}
    >
      <Screen
        name="PlantSelect"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="MyPlants"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Navigator>
  );
}

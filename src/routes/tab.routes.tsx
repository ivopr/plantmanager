import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { MyPlants } from "../pages/MyPlants";
import { PlantSelect } from "../pages/PlantSelect";
import colors from "../styles/colors";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
        style: {
          height: 88,
          paddingVertical: 20,
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

import {
  useFonts,
  Jost_200ExtraLight,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import React from "react";

import { Routes } from "./src/routes";

export default function App() {
  const [isFontsLoaded] = useFonts({
    Jost_200ExtraLight,
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  return <Routes />;
}

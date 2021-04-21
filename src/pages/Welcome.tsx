import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Image,
  Dimensions,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { ScreenProps } from "react-native-screens";

import wateringImage from "../assets/watering.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Welcome() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {"\n"} suas plantas de {"\n"} forma fácil
        </Text>

        <Image
          resizeMode="contain"
          source={wateringImage}
          style={styles.image}
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <Button onPress={() => navigate("UserIdentification")}>
          <Entypo color={colors.white} name="chevron-right" size={24} />
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 38,
    textAlign: "center",
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
});

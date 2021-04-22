import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/core";
import { format, isBefore } from "date-fns";
import Constants from "expo-constants";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import waterdropImage from "../assets/waterdrop.png";
import { Button } from "../components/Button";
import { PlantProps, SavePlantToStorage } from "../libs/storage";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ParamsProps {
  plant: PlantProps;
}

export function PlantSave() {
  const [timeToWater, setTimeToWater] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(
    Platform.OS === "ios"
  );
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { plant } = params as ParamsProps;

  function handleChangeTime(_: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setIsDatePickerOpen((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setTimeToWater(new Date());
      return Alert.alert("Opa, opa, você ainda não tem uma máquina do tempo.");
    }

    if (dateTime) {
      setTimeToWater(dateTime);
    }
  }

  async function handleSavePlant() {
    try {
      await SavePlantToStorage({
        ...plant,
        dateTimeNotification: timeToWater,
      });

      navigate("Confirmation", {
        title: "Tudo Certo!",
        subtitle:
          "Fique tranquilo, que lembraremos você de cuidar da sua plantinha.",
        icon: "hug",
        buttonTitle: "Muito Obrigado :D",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possível salvar sua planta!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />

          <Text style={styles.title}>{plant.name}</Text>
          <Text style={styles.description}>{plant.about}</Text>
        </View>

        <View style={styles.controllersContainer}>
          <View style={styles.tipContainer}>
            <Image source={waterdropImage} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {isDatePickerOpen && (
            <DateTimePicker
              display="spinner"
              mode="time"
              onChange={handleChangeTime}
              value={timeToWater}
            />
          )}

          {Platform.OS === "android" && (
            <RectButton
              onPress={() => setIsDatePickerOpen((oldValue) => !oldValue)}
              style={styles.datetimeButton}
            >
              <Text style={styles.datetime}>
                {format(timeToWater, "HH:mm")}
              </Text>
            </RectButton>
          )}

          <Button onPress={handleSavePlant}>
            <Text>Cadastrar Planta</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alertLabel: {
    color: colors.heading,
    fontFamily: fonts.complement,
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  controllersContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  datetime: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 24,
  },
  datetimeButton: {
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 25,
    width: "100%",
  },
  description: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    marginTop: 10,
    textAlign: "center",
  },
  plantInfo: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  scrollViewContainer: {
    backgroundColor: colors.shape,
    flex: 1,
    justifyContent: "space-between",
  },
  tipContainer: {
    alignItems: "center",
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "relative",
  },
  tipImage: {
    height: 56,
    width: 56,
  },
  tipText: {
    color: colors.blue,
    flex: 1,
    fontFamily: fonts.text,
    fontSize: 17,
    marginLeft: 20,
    textAlign: "justify",
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginTop: 15,
  },
});

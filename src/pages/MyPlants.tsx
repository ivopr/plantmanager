import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import waterdropImage from "../assets/waterdrop.png";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PlantCardSecondary } from "../components/PlantCardSecondary";
import { LoadPlantFromStorage, PlantProps } from "../libs/storage";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function MyPlants() {
  const [plants, setPlants] = useState([] as PlantProps[]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextUp, setNextUp] = useState<string>();

  useEffect(() => {
    getPlants();
  }, []);

  async function getPlants() {
    setIsLoading(true);

    await LoadPlantFromStorage().then((storagedPlants) => {
      setNextUp(`Não esqueça de regar a ${
        storagedPlants[0].name
      } daqui a ${formatDistance(
        new Date(storagedPlants[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      )}
      `);
      setPlants(storagedPlants);
    });

    setIsLoading(false);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />

        <View style={styles.spotlight}>
          <Image source={waterdropImage} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>{nextUp}</Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>Próximas Regadas</Text>

          <FlatList
            data={plants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlantCardSecondary data={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  nextUp: {},
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    marginVertical: 20,
  },
  spotlight: {
    alignItems: "center",
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    flexDirection: "row",
    height: 110,
    padding: 20,
    width: "100%",
  },
  spotlightImage: {
    height: 60,
    width: 60,
  },
  spotlightText: {
    color: colors.blue,
    flex: 1,
    fontFamily: fonts.text,
    fontSize: 16,
    paddingLeft: 20,
  },
});

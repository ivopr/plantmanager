import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { api } from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: string;
    repeat_every: string;
  };
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState([] as EnvironmentProps[]);
  const [plants, setPlants] = useState([] as PlantProps[]);
  const [filteredPlants, setFilteredPlants] = useState([] as PlantProps[]);
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get(
        "/plants_environments?_sort=title&_order=asc"
      );

      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnvironments();
    fetchPlants();
  }, []);

  useEffect(() => {
    if (selectedEnvironment === "all") {
      setFilteredPlants(plants);
    } else {
      const filtered = plants.filter((plant) =>
        plant.environments.includes(selectedEnvironment)
      );

      setFilteredPlants(filtered);
    }
  }, [selectedEnvironment]);

  async function fetchPlants() {
    const { data } = await api.get(
      `/plants?_page=${page}&_limit=8&_sort=name&_order=asc`
    );

    if (!data) {
      return setIsLoading(true);
    }

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setIsLoadingMore(false);
  }

  function handleLoadMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setIsLoadingMore(true);
    setPage((oldPage) => oldPage + 1);
    fetchPlants();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Header />

        <Text style={styles.titleBold}>Em qual ambiente</Text>
        <Text style={styles.titleRegular}>você quer colocar sua planta?</Text>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          contentContainerStyle={styles.filters}
          data={environments}
          horizontal
          renderItem={({ item }) => (
            <EnvironmentButton
              isActive={selectedEnvironment === item.key}
              key={item.key}
              onPress={() => setSelectedEnvironment(item.key)}
              title={item.title}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.data}
        data={filteredPlants}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator color={colors.green} size={25} />
          ) : (
            <></>
          )
        }
        numColumns={2}
        onEndReached={({ distanceFromEnd }) => handleLoadMore(distanceFromEnd)}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <PlantCardPrimary key={item.name} data={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  data: {
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  filtersContainer: {
    height: 40,
    marginVertical: 10,
  },
  filters: {
    paddingHorizontal: 40,
  },
  titleBold: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17,
    lineHeight: 20,
  },
  titleRegular: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
  },
  wrapper: {
    paddingHorizontal: 30,
  },
});

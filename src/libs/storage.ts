import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import {
  AndroidNotificationPriority,
  cancelScheduledNotificationAsync,
  scheduleNotificationAsync,
} from "expo-notifications";

export interface PlantProps {
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
  dateTimeNotification: Date;
  hour?: string;
}

export interface StoragedPlantProps {
  [id: string]: {
    data: PlantProps;
    notificationId: string;
  };
}

export async function SavePlantToStorage(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragedPlantProps) : {};

    const nextWatering = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { repeat_every, times } = plant.frequency;

    if (repeat_every === "week") {
      const interval = Math.trunc(7 / Number(times));
      nextWatering.setDate(now.getDate() + interval);
    } else {
      nextWatering.setDate(nextWatering.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextWatering.getTime()) / 1000)
    );

    const notificationId = await scheduleNotificationAsync({
      content: {
        title: "Heeeey 🌱",
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      },
    });

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId,
      },
    };

    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    );
  } catch (error) {
    throw Error(error);
  }
}

export async function LoadPlantsFromStorage(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const plants = data ? (JSON.parse(data) as StoragedPlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map((plant) => ({
        ...plants[plant].data,
        hour: format(
          new Date(plants[plant].data.dateTimeNotification),
          "HH:mm"
        ),
      }))
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;
  } catch (error) {
    throw Error(error);
  }
}

export async function deletePlantFromStorage(id: string): Promise<void> {
  const data = await AsyncStorage.getItem("@plantmanager:plants");
  const plants = data ? (JSON.parse(data) as StoragedPlantProps) : {};

  await cancelScheduledNotificationAsync(plants[id].notificationId);

  delete plants[id];

  await AsyncStorage.setItem("@plantmanager:plants", JSON.stringify(plants));
}

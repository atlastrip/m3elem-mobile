import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import { Vibration } from "react-native";

// @ts-ignore
import Slider from "react-native-sliders";
import * as Haptics from "expo-haptics";

import React, { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IPack } from "../Reservation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { IUser } from "store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatePresence, Motion } from "@legendapp/motion";

import { ButtonPrimary } from "@/components/index";
import { useFocusEffect } from "@react-navigation/native";
import { Platform } from "react-native";
import PackCard from "@/components/cards/PackCard";
import { delayFunctionExecution } from "@/helpers/delayFunctionExecution";

const PackCustom = ({
  navigation,
  route,
}: {
  navigation: Navigate;
  route: any;
}) => {
  const insets = useSafeAreaInsets();

  const [Loading, setLoading] = useState(false);
  const [Packs, setPacks] = useState<IPack[] | null>([]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@HasClickedThePopupCTA", "true");
    })();
    FetchAllPacks();
  }, []);

  const SendInAppNotification = () => {
    // Schedule notification after 10 seconds
    const scheduleNotification = setTimeout(async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Libérez votre potentiel",
          body: "Complétez le paiement de votre pack et commencez votre entraînement dès maintenant",
          data: {
            Page: "Packs",
          },
        },
        trigger: {
          seconds: 300, // time in seconds after which the notification will be shown
        },
      });
    }, 1000); // 10 seconds in milliseconds

    return () => {
      clearTimeout(scheduleNotification); // Clear the timeout if the component unmounts
    };
  };

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@HasClickedThePopupCTA", "true");
      const hasSendNotification = await AsyncStorage.getItem(
        "@hasSendNotification"
      );
      if (hasSendNotification !== "true") {
        SendInAppNotification();
        await AsyncStorage.setItem("@hasSendNotification", "true");
      } else {
        console.log("Notification has been already sent");
      }
    })();
  }, []);

  const FetchAllPacks = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(
      "https://pantofit.pythonanywhere.com/api/offers/all",
      {
        method: "GET",
        headers,
      }
    );

    const json = await res.json();
    console.log(json);
    if (json.errors) {
      const { message } = json?.errors[0] || "Error..";
      if (message === "Access Forbiden") {
        console.log("Access Forbiden");
        throw new Error(message);
        // navigation.navigate("Splash");
      }
    }
    setPacks(json);
  };

  const [SliderValueSceances, setSliderValueSceances] = useState<any>([1]);
  const [SliderValueTime, setSliderValueTime] = useState<any>([1]);
  const [Price, setPrice] = useState("");
  const [SelectedPackId, setSelectedPackId] = useState(22);

  const Sceances = ["5  ", "10 ", "20 ", " ∞"];
  const SceancesPrice = [69 * 5, 66 * 10, 59 * 20, 56 * 50, 49 * 100, 40 * 365];

  const Dates = ["1  ", "3 ", "6 ", "12"];
  const DatesPrice = [0.7, 0.8, 0.9, 1];

  const handlePrice = () => {
    const nameOfPrice = `${
      Sceances[SliderValueSceances - 1].includes("∞")
        ? "illimité"
        : Sceances[SliderValueSceances - 1] + "sessions"
    }-${SliderValueTime[0] !== 4 ? Dates[SliderValueTime - 1] : 1}${(() => {
      if (SliderValueTime[0] === 1) {
        return "month";
      }
      if (SliderValueTime[0] === 2) {
        return "months";
      }
      if (SliderValueTime[0] === 3) {
        return "months";
      }
      if (SliderValueTime[0] === 4) {
        return "year";
      }
    })()}`;
    return nameOfPrice.split(" ").join("") || "10sessions-6months";
  };

  const handleSceances = () => {
    return Sceances[SliderValueSceances - 1];
  };
  const handleDate = () => {
    return Dates[SliderValueTime - 1];
  };

  const [ShowOtherPacks, setShowOtherPacks] = useState(false);
  useEffect(() => {
    delayFunctionExecution(() => setShowOtherPacks(true), 5);
  }, []);

  useEffect(() => {
    delayFunctionExecution(() => {
      setSliderValueSceances([2]);
      setSliderValueTime([3]);
    }, 0.5);
  }, []);

  useEffect(() => {
    setSelectedPackId(
      Packs?.filter((e) => e.name.toLocaleLowerCase() === `${handlePrice()}`)[0]
        ?.id || 0
    );
    setPrice(
      Packs?.filter((e) => e.name.toLocaleLowerCase() === `${handlePrice()}`)[0]
        ?.price || ""
    );
  }, [SliderValueSceances, SliderValueTime]);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: insets?.top + 10,
          paddingBottom: 10,
        }}
        className="p-2 flex-row justify-between items-center bg-white/5"
      >
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="chevron-back" color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Pack Pérsonnalisé</Text>
        <TouchableOpacity className="p-2 opacity-0">
          <Ionicons name="share-outline" color="transparent" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="p-3 bg-white/5 my-3">
          <View className="flex-row  justify-between items-end mb-2">
            {/* <Text className="text-white font-bold text-xl ">{handlePrice()}</Text> */}
            <Text className="text-white font-bold text-2xl ">Mon Pack:</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(
                  "PackInfo",
                  Packs?.filter((e) => e.id == SelectedPackId)[0]
                );
              }}
              style={{
                backgroundColor: COLORS.primary,
                opacity: Price === "" ? 0 : 1,
              }}
              className="p-2 rounded-full pl-3 pr-1 flex-row items-center"
            >
              <Text className="font-bold text-xl text-white">{Price}</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-3">
          <View className="p-3 rounded-lg bg-white/5">
            <View className="flex-row  justify-between items-end mb-2">
              <Text className="text-white font-bold text-2xl ">
                Nombre des scéances:
              </Text>
              <Text className="text-white font-bold text-3xl">
                {handleSceances()}
              </Text>
            </View>
            <View className="px-3">
              <Slider
                value={SliderValueSceances}
                thumbTintColor={COLORS.primary}
                minimumTrackTintColor={COLORS.primary}
                minimumValue={1}
                maximumValue={4}
                // animateTransitions
                step={1}
                onValueChange={(value: any) => {
                  if (SliderValueSceances[0] !== value[0]) {
                    if (Platform.OS === "ios") {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    }

                    // else {
                    //   // For Android devices, you can use a different duration or pattern
                    //   Vibration.vibrate(10);
                    // }
                  }
                  setSliderValueSceances(value);
                }}
              />
              <View className="flex-row justify-between px-1">
                {Sceances.map((e, idx) => (
                  <Text key={idx} className="text-white text-center">
                    {e}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View className="p-3">
          <View className="p-3 rounded-lg bg-white/5">
            <View className="flex-row  justify-between items-end mb-2">
              <Text className="text-white font-bold text-2xl ">
                Date d'expiration:
              </Text>
              <View className="flex-row items-end">
                <Text className="text-white font-bold text-3xl">
                  {handleDate()}
                </Text>
                <Text className="text-white font-bold text-base mb-0.5">
                  mois
                </Text>
              </View>
            </View>
            <View className="px-3">
              <Slider
                value={SliderValueTime}
                thumbTintColor={COLORS.primary}
                minimumTrackTintColor={COLORS.primary}
                minimumValue={1}
                maximumValue={4}
                // animateTransitions
                step={1}
                onValueChange={(value: any) => {
                  if (SliderValueTime[0] !== value[0]) {
                    if (Platform.OS === "ios") {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    }
                    // else {
                    //   // For Android devices, you can use a different duration or pattern
                    //   Vibration.vibrate(10);
                    // }
                  }
                  setSliderValueTime(value);
                }}
              />
              <View className="flex-row justify-between px-1">
                {Dates.map((e, idx) => (
                  <Text key={idx} className="text-white text-center">
                    {e}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingBottom: insets.bottom > 5 ? insets.bottom : 10,
          }}
          className="p-3"
        >
          <ButtonPrimary
            onPress={() => {
              navigation.navigate(
                "PackInfo",
                Packs?.filter((e) => e.id == SelectedPackId)[0]
              );
            }}
            text="Continuer"
            Loading={Loading}
            setLoading={() => {}}
          />
        </View>
        {/* <View>
          {Packs?.map((pack, idx) => (
            <Text key={idx} className="text-white">
              {pack?.id}#{pack?.name}
            </Text>
          ))}
        </View> */}
        <AnimatePresence>
          {ShowOtherPacks && (
            <Motion.View
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <View className="px-3">
                <View className="w-full flex-row items-center mt-5">
                  <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
                  <View className="w-3" />
                  <Text className="text-gray-400">OU</Text>
                  <View className="w-3" />
                  <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
                </View>
              </View>
              <Text className="font-bold text-2xl text-white px-3 mt-6">
                Découverer nos packs
              </Text>
              <ScrollView horizontal>
                {Packs?.filter((e) => e.name.includes("-") !== true).map(
                  (e, i) => (
                    <View key={i} className="mx-3">
                      <PackCard
                        navigation={navigation}
                        Pack={e}
                        populaire={false}
                        handleCloseModal={() => {}}
                      />
                    </View>
                  )
                )}
              </ScrollView>
            </Motion.View>
          )}
        </AnimatePresence>
        <View
          style={{
            height: 10,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default PackCustom;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

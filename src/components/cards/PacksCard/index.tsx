import { Modal, ScrollView, TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Navigate } from "navigation";
import PackCard from "../PackCard";
import window from "../../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { IUserStore, setShowPopupCTA } from "../../../store/User";

export interface IPack {
  id: number;
  name: string;
  description: string;
  price: string;
  old_price: string;
  is_popular: boolean;
  attendance_number: number;
  duration_days: number;
  giftp: {
    name: string;
    description: string;
    expiration_date: string;
    gifts: {
      name: string;
      description: string;
      type: string;
      types: string[];
    }[];
    image: string;
  };
}

export const PacksCard = ({ navigation }: { navigation: Navigate }) => {
  const [Packs, setPacks] = useState<IPack[] | null>([]);

  useEffect(() => {
    FetchPacks();
  }, []);

  const ShowPopupCTA = false

  const [modalShowOffers, setModalShowOffers] = useState(true);
  const FetchPacks = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch("https://pantofit.pythonanywhere.com/api/offers/", {
      method: "GET",
      headers,
    });

    const json = await res.json();
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
  const insets = useSafeAreaInsets();
  const Dispatch = useDispatch();
  const handleCloseModal = () => {
    Dispatch(setShowPopupCTA(false));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ShowPopupCTA}
      style={{
        flex: 1,
      }}
      onRequestClose={() => {
        Dispatch(setShowPopupCTA(false));
      }}
    >
      <View
        style={{
          height: window.height,
        }}
        className="bg-black/50 justify-end"
      >
        <TouchableOpacity
          onPress={() => Dispatch(setShowPopupCTA(false))}
          className="p-3 flex-1"
        ></TouchableOpacity>
        <View className="p-3 bg-black rounded-lg">
          <View className="w-full items-end">
            <TouchableOpacity
              onPress={() => Dispatch(setShowPopupCTA(false))}
              className="pt-3 pr-3"
            >
              <Ionicons name="close" color="white" size={24} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text className="text-white text-center font-bold text-lg ">
              Quel pack vous convient le plus ?
            </Text>

            {Packs?.map((e, i) => (
              <PackCard
                navigation={navigation}
                key={i}
                Pack={e}
                populaire={i === 1}
                handleCloseModal={handleCloseModal}
              />
            ))}
            <View
              style={{
                height: insets.bottom + 10,
              }}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

import {
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import React, { useEffect, useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import window from "../../../constants/Layout";
import PackCard from "../../../components/cards/PackCard";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setBackTo } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";


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


const CardHistory = ({
  name,
  pic,
  details,
  time,
  price,
}: {
  name: string;
  pic: string;
  details: string;
  time: string;
  price: string;
}) => {
  return (
    <View className="p-3 rounded-xl bg-gray-900 flex-row relative my-2">
      <Image
        style={{
          aspectRatio: 1,
        }}
        className="rounded w-2/6"
        source={{
          uri: pic,
        }}
      />
      <View className="ml-3 w-4/6">
        <Text className="text-white font-bold text-lg">{name}</Text>
        <Text className="text-white text-base">{details}</Text>
        <View className="absolute bottom-2">
          <Text className="text-white font-bold text-lg">{time}</Text>
        </View>
      </View>
      <View className="absolute bottom-3 right-3 rounded-full bg-white  p-2 px-3">
        <Text className="text-primary-500 font-bold text-lg">{price} bcs</Text>
      </View>
    </View>
  );
};

const History = ({ navigation }: { navigation: Navigate }) => {
  const insets = useSafeAreaInsets();

  const ops = [
    {
      name: "Fitness workout",
      pic: "https://www.anytimefitness.com/wp-content/uploads/2021/05/gym-photo-homepage-sm-1024x549.jpg",
      details: "Session workout avec coach: zakaria",
      time: "12:03, 12/07",
      price: "330",
    },
    {
      name: "Bouteille d'eau",
      pic: "https://5.imimg.com/data5/HZ/NO/IH/SELLER-23767712/plastic-water-bottle.png",
      details: "Transparent Plastic Water Bottle, Screw Cap",
      time: "20:17 12/07",
      price: "15",
    },
    {
      name: "Coffee",
      pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG",
      details: "Cup of coffee",
      time: "18:37 12/07",
      price: "25",
    },
    {
      name: "Fitness workout",
      pic: "https://www.anytimefitness.com/wp-content/uploads/2021/05/gym-photo-homepage-sm-1024x549.jpg",
      details: "Session workout avec coach: zakaria",
      time: "12:03 12/07",
      price: "330",
    },
  ];

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
        className="p-2 flex-row justify-center items-center bg-white/5"
      >
        <View className="p-3">
          <Text className="text-lg font-bold text-white">Historique</Text>
        </View>
      </View>

      <ScrollView
      style={{flex : 1}}
      >


      <View className="px-3 pt-3">
          {ops.map((e, idx) => (
            <CardHistory {...e} key={idx} />
            ))}
        </View>
            </ScrollView>
      
    </View>
  );
};

export default History;

const styles = StyleSheet.create({});

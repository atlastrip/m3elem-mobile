require("dayjs/locale/fr");
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";

import { IGym } from "../../../pages/Auth/Home";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { Navigate } from "navigation";

interface IProps {
  navigation: Navigate;
  Loading: boolean;
  Data: { clients: any; gym: IGym; date: string }[];
}

export const Attendances: FC<IProps> = ({ navigation, Loading, Data }) => {
  const [imageUrl, setImageUrl] = useState('');


  return (
    <View>
      <Text className="text-white text-xl mt-5">Dernières séances :</Text>
      <View className="h-[1px] my-2 bg-white" />
      <View>
    </View>
      <View className="flex-row justify-center">
        {Loading && <ActivityIndicator />}
      </View>
      {Data?.map((GYM, idx) => (
        <View
          className="flex-row justify-between  p-3 rounded-lg bg-white/10 my-2 items-center"
          key={idx}
        >
          <View className="">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Map", {
                  lon: GYM?.gym?.longitude,
                  lat: GYM?.gym?.latitude,
                })
              }
              className="flex-row"
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderWidth : 2

                }}
                className="rounded-full border border-white"
                source={{
                  uri: GYM?.gym?.logo_url,
                }}
              />
              <View className="ml-2">
                <Text className="text-white text-xl font-bold">
                  {GYM?.gym?.name}
                </Text>
                <Text className="text-white">
                  le{" "}
                  {dayjs(GYM?.date).locale("fr").format("D MMMM YYYY , mm:ss")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

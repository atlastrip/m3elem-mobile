import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  // WebView
} from "react-native";
import { WebView } from "react-native-webview";
import React, { FC, useEffect, useState } from "react";
import Navigation, { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { COLORS } from "../../../constants/theme";
import { IUser, setConfetti } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const CashPlus = ({
  navigation,
  route,
}: {
  navigation: Navigate;
  route: any;
}) => {
  const insets = useSafeAreaInsets();
  const Params = route.params;
  const [Loading, setLoading] = useState(false);
  const [CashPlusCode, setCashPlusCode] = useState("");

  const FetchData = async () => {
    setLoading(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const accessToken = await getToken();
    headers.append("Authorization", `Bearer ${accessToken}`);
    const res = await fetch(
      "https://pantofit.pythonanywhere.com/api/payment/cashplus/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          offer_id: Params.offer_id,
        }),
      }
    );

    try {
      const json = await res.json();
      setCashPlusCode(json?.TOKEN);
      console.log({ json });
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const getToken = async () => {
    const data = await getData("@token");
    console.log({ access: data?.access });
    return data?.access;
  };

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
        <TouchableOpacity
          onPress={() => navigation.navigate("Packs")}
          className="p-2 flex-row"
        >
          <Ionicons name="chevron-back" color="white" size={24} />
          <Text className="text-white text-lg font-bold">Offres</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">CashPlus Paiement</Text>
        <View className="p-2 flex-row">
          <Ionicons name="share-outline" color="transparent" size={24} />
          <Text className="text-transparent text-lg font-bold">Offres</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View className="items-center mt-3">
          <View
            className=" items-center justify-center"
            style={{
              width: "100%",
            }}
          >
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/77829205/224441963-c2a12d67-9937-4736-8568-8cbefd7b5abe.png",
              }}
              style={{
                width: "30%",
                aspectRatio: 1,
                borderColor: "gray",
              }}
              className=""
            />
          </View>
        </View>
        <View className="p-3 mt-6">
          <Text className="text-white text-center text-2xl font-bold">
            Paiement en espèces
          </Text>
          <Text className="text-white text-center text-lg font-bold px-10 mt-3">
            Présentez le code ci-dessous à une agence CashPlus
          </Text>
          <View className="rounded-xl bg-white/10 p-2 mt-10">
            {Loading ? (
              <ActivityIndicator />
            ) : (
              <Text
              selectable
              className="text-white text-center text-2xl font-bold">
                {CashPlusCode}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CashPlus;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

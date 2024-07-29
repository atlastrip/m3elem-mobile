import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";

import { WebView } from "react-native-webview";
import React, { useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IUser } from "../../../store/User";
import Lottie from "lottie-react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import window from "../../../constants/Layout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ButtonPrimary } from "@/components/index";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const ContactUs = ({ navigation }: { navigation: Navigate }) => {
  const insets = useSafeAreaInsets();
  const [User, setUser] = useState<IUser | null>(null);
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const GetUserFromAsyncStorage = async () => {
    const user = await AsyncStorage.getItem("@user");
    console.log(user)
    // @ts-ignore
    const userFromAsyncStorage: IUser = await JSON.parse(user);
    setUser(userFromAsyncStorage);
  };

  useFocusEffect(
    React.useCallback(() => {
      GetUserFromAsyncStorage();
    }, [])
  );

  const getToken = async () => {
    const data = await getData("@token");
    console.log({ access: data?.access });
    return data?.access;
  };

  const HandleSendMessage = async () => {
    if (Message.length === 0) return Alert.alert("Veuillez saisir un message");
    setLoading(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const accessToken = await getToken();
    headers.append("Authorization", `Bearer ${accessToken}`);

    try {
      const res = await fetch(
        "https://pantofit.pythonanywhere.com/api/contact/",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            message: `Info:<br />Phone:${User?.phone}, Name: ${User?.user?.first_name} ${User?.user?.last_name}, Email:${User?.user?.email}, UserName:${User?.user?.username}, Url1:${User?.url}, Url2:${User?.user?.url}, <br />Message:${Message}`,
          }),
        }
      );

      const json = await res.json();
      console.log({ json });
      setLoading(false);
      if (json.sent) {
        Alert.alert(
          "Message envoyé ✅",
          "Nous avons bien reçu votre message et allons prendre contact avec vous dans les plus brefs délais ."
        );

        setMessage("");
        navigation.goBack();
      }
    } catch (err) {
      setLoading(false);
      console.log({ err });
      Alert.alert("Oups ! Une erreur est survenue.");
    }
  };

  return (
    <View className="flex-1 bg-black">
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
        <Text className="text-lg font-bold text-white">Contactez-Nous</Text>
        <View className="p-2">
          <Ionicons name="share-outline" color="transparent" size={24} />
        </View>
      </View>
      <KeyboardAwareScrollView
        style={{
          backgroundColor: "black",
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <View className="items-center p-3">
            <View
              style={{
                width: window.width * 0.8,
                height: window.width * 0.8,
              }}
            >
              <Lottie source={require("./contactus.json")} autoPlay />
            </View>
            <Text className="text-white w-full text-left pl-2 mb-2 text-lg">
              Envoyez-nous un message 💬 :
            </Text>
            <TextInput
              style={{
                borderWidth: 2,
              }}
              value={Message}
              onChangeText={setMessage}
              className="text-white border border-white/50 rounded-lg text-xl p-3 mb-3 w-full"
              placeholder="Message"
            />
            <View className="w-full">
              <ButtonPrimary
                text="Envoyer"
                Loading={Loading}
                setLoading={() => {}}
                onPress={HandleSendMessage}
              />
            </View>
            <View className="w-full flex-row items-center mt-5">
              <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
              <View className="w-3" />
              <Text className="text-gray-400">OU</Text>
              <View className="w-3" />
              <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
            </View>
            <View className="w-full mt-4">
              <ButtonPrimary
                isOutlined
                text="Appelez nous"
                Loading={false}
                setLoading={() => {}}
                onPress={() => Linking.openURL("tel:+212520509565")}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

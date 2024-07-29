import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import { COLORS } from "../../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { isLogin } from "../../../store/User";
import { ButtonPrimary } from "../../../components/index";
import { FontAwesome5 } from "@expo/vector-icons";

const ForgetPassword = ({ navigation }: { navigation: Navigate }) => {
  const insets = useSafeAreaInsets();
  const [Loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [ShowCodeInput, setShowCodeInput] = useState(false);
  const [CodeOTP, setCodeOTP] = useState("");
  const dispatch = useDispatch();

  const FetchAuth = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(
      "https://pantofit.pythonanywhere.com/api/verify/noauth/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          phone: username,
        }),
      }
    );

    try {
      const json = await res.json();
      console.log({ json });
      if (json.status === "Approved") {
        setLoading(false);
        setShowCodeInput(true);
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };
  const FetchOTP = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(
      "https://pantofit.pythonanywhere.com/api/verify/code/noauth/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          phone: username,
          code: CodeOTP,
        }),
      }
    );

    try {
      const json = await res.json();
      console.log({ json });
      setLoading(false);
      if (json.status === "Approved") {
        navigation.navigate("AfterOTPResetPassword", {
          username,
          code: CodeOTP,
        });
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        paddingTop: insets?.top || 3,
      }}
    >
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
        className="p-3"
      >
        <View className="flex-row justify-center">
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={{
              uri: "https://avatars.githubusercontent.com/u/97095042?s=200&v=0",
            }}
          />
        </View>
        <Text className="text-white text-xl font-black mb-7">
          {ShowCodeInput
            ? "Code de vérification"
            : "Vous avez oublié votre Mot de passe?"}
        </Text>
        <Text className="text-white text-lg mb-7">
          {ShowCodeInput
            ? "Saisir le code de vérification envoyé à votre numéro de téléphone."
            : "Ce n'est pas grave! Saisissez le numéro de téléphone associé à votre compte PantoFit."}
        </Text>

        {!ShowCodeInput ? (
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="text-white border border-white/25 rounded-lg text-xl p-3 mb-3"
            keyboardType="number-pad"
            placeholder="Numéro de téléphone"
          />
        ) : (
          <TextInput
            value={CodeOTP}
            onChangeText={setCodeOTP}
            className="text-white text-center border border-white/25 rounded-lg text-xl p-3 mb-3"
            keyboardType="number-pad"
            style={{
              borderColor: "#ffffff50",
            }}
            placeholder="Entrer le code ( _ _ _ _ )"
          />
        )}
        <ButtonPrimary
          setLoading={setLoading}
          Loading={Loading}
          onPress={!ShowCodeInput ? FetchAuth : FetchOTP}
          text="Envoyer"
        />
      </KeyboardAwareScrollView>
      <View className="p-3">
        <View
          style={{
            height: insets.bottom,
          }}
        />
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

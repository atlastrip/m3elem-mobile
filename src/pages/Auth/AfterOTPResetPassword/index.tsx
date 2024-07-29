import {
  ActivityIndicator,
  Alert,
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

const AfterOTPResetPassword = ({
  navigation,
  route,
}: {
  navigation: Navigate;
  route: any;
}) => {
  const Params = route.params;
  const insets = useSafeAreaInsets();
  const [Loading, setLoading] = useState(false);
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ShowCodeInput, setShowCodeInput] = useState(true);
  const [CodeOTP, setCodeOTP] = useState("6562");
  const dispatch = useDispatch();

  const FetchResetPassword = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const res = await fetch(
      "https://pantofit.pythonanywhere.com/api/reset-password/",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          phone: Params.username,
          code: Params.code,
          password: Password,
        }),
      }
    );

    try {
      const json = await res.json();
      console.log({ json });
      if (json.message === "Time expired.") {
        setLoading(false);
        Alert.alert("Echec",'Temps expiré')
        navigation.navigate("Login")
      }else{
        Alert.alert("bien modifier",'Votre mot de passe est bien modifier')
        navigation.navigate("Login")
      }
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  const handlePressButton = () => {
    setLoading(true);
    if(Password.length !== 0){
      if (Password === ConfirmPassword) {
        FetchResetPassword()
      } else {
        setLoading(false);
        Alert.alert('Veillez confirmer le mot de pass')
      }
    }else{
      setLoading(false);
      Alert.alert('Enter le mot de pass')
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
          Nouveau Mot de passe
        </Text>
        <TextInput
          value={Password}
          onChangeText={setPassword}
          style={{
            borderWidth : 2,
            borderColor : '#FFFFFF50',
          }}
          placeholderTextColor={'#FFFFFF50'}
          className="text-white border border-white/25 rounded-lg text-xl p-3 mb-3"
          keyboardType="default"
          placeholder="Mot de passe"
        />
        <TextInput
          value={ConfirmPassword}
          onChangeText={setConfirmPassword}
          className="text-white border border-white/25 rounded-lg text-xl p-3 mb-3"
          keyboardType="default"
          style={{
            borderColor : '#FFFFFF50',
            borderWidth : 2
          }}
          placeholderTextColor={'#FFFFFF50'}
          placeholder="Confirmez votre mot de pass"
        />
        <ButtonPrimary
          setLoading={setLoading}
          Loading={Loading}
          onPress={handlePressButton}
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

export default AfterOTPResetPassword;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

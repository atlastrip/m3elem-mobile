import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Platform,
  Share,
  FlatList,
  Animated,
  ImageBackground,
  TextInput,
} from "react-native";
import * as LinkingExpo from "expo-linking";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, {
  Marker,
  MarkerAnimated,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { BarCodeScanner } from "expo-barcode-scanner";
import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import window from "../../../../constants/Layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SHADOWS } from "../../../../constants/theme";
import Salle from "../../../../components/cards/Salle";
import * as Sharing from "expo-sharing";
import { content } from "../../../../../tailwind.config";
import { useNetInfo, NetInfoState } from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import { IUser, setConnected } from "../../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer from "react-native-swipe-gestures";
import swipeDirections from "react-native-swipe-gestures";
import CustomMapStyle from "./CustomMapStyle";
import { ButtonPrimary } from "@/components/index";
import { useFocusEffect } from "@react-navigation/native";
import { PacksCard } from "@/components/cards/PacksCard";
const screenWidth = Dimensions.get("window").width;
import { LineChart } from "react-native-chart-kit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



export default function HomeCoachScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  const [QrCode, setQrCode] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    setQrCode(data as string);
  };

  return (
     <ScrollView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
     
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
        className="p-3"
      >
        <Text
          style={{
            marginTop: insets.top + 10,
          }}
          className="text-white text-2xl font-black mb-7 text-center"
        >
          Scanner Le QRcode
        </Text>
        <View className="flex-row justify-center my-3">
          <View
            style={{
              width: window.width * 0.8,
              height: window.width * 0.8,
              borderColor: COLORS.primary,
            }}
            className="border-2 rounded-lg p-2"
          >
            <BarCodeScanner
              className="w-full h-full"
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
          </View>
          {scanned && (
            <View className="w-full h-full bg-black/50 absolute top-0 left-0 justify-center items-center">
              <TouchableOpacity
              className="items-center"
                onPress={() => {
                  setQrCode("");
                  setScanned(false);
                }}
              >
                <Ionicons name={"refresh-circle"} color="white" size={50} />
                <Text className="text-white font-semibold text-lg">
                  Tapper pour refaire le scan
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text className="text-white text-2xl font-medium mt-3 mb-7 text-center">
          Ou Saisir le code
        </Text>
        <TextInput
          value={QrCode}
          onChangeText={setQrCode}
          className="text-white border border-white/25 rounded-lg text-xl p-3 text-center"
          placeholder="code"
          placeholderTextColor={"gray"}
        />
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
          }}
          onPress={() => {
            if (QrCode?.length < 6)
              return Alert.alert("Erreur", "Qrcode non valide");
            setLoading((v) => !v);
          }}
          className="rounded-lg p-3 mt-3"
        >
          {Loading ? (
            <ActivityIndicator size={24} />
          ) : (
            <Text className="text-white font-bold text-center text-lg">
              Valider
            </Text>
          )}
        </TouchableOpacity>

        <View
          style={{
            height: 30,
          }}
        />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centeredViewWithHeigh: {
    height: window?.height,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "black",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

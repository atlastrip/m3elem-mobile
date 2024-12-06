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
import window from "../../../constants/Layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SHADOWS } from "../../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ProductQRCode({ navigation, route }: any) {
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

  type TUser = {
    id: string;
    fullName: string;
    email: string;
    image: string;
    phone: string;
    role: string;
    fcmToken: string;
    expoToken: string;
    provider: string;
    points: number;
    age: number;
    AppleidentityToken: string;
    genre: string;
    city: string;
    createdAt: string;
    birthDay: string;
    updatedAt: string;
  };

  const User: TUser = {
    id: "string",
    fullName: "string",
    email: "string",
    image: "string",
    phone: "string",
    role: "string",
    fcmToken: "string",
    expoToken: "string",
    provider: "string",
    points: 1900,
    age: 19,
    AppleidentityToken: "string",
    genre: "string",
    city: "string",
    birthDay: "string",
    createdAt: "string",
    updatedAt: "string",
  };

  const { product } = route.params;
  const [UserFetch, setUserFetch] = useState<TUser>();
  const [ScanView, setScanView] = useState(false);
  const [Quantity, setQuantity] = useState(1);
  const handleToggleScan = () => {
    setScanView((v) => !v);
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
        <View
          style={{
            paddingTop: insets.top + 10,
          }}
        >
          <View className="  w-full justify-center items-center  p-3 bg-gray-100/5 rounded-xl ">
            <View className="flex-row   w-full  ">
              <Image source={{ uri: product?.image }} style={styles.image} />
              <View className="flex-row justify-between flex-1 mx-2 ">
                <View className="  items-start px-2 w-full">
                  <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.description}>{product.description}</Text>
                  <View style={styles.pointsContainer}>
                    <Text className="text-primary-500 text-xl font-bold">
                      Price: {product.points} bcs
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    aspectRatio: 1,
                  }}
                  className="bg-primary-500 p-1 rounded-full justify-center items-center"
                >
                  <Ionicons name="add" size={28} color={"white"} />
                </TouchableOpacity>
                <Text className="text-white font-bold">{Quantity}</Text>
                <TouchableOpacity
                  style={{
                    aspectRatio: 1,
                  }}
                  className="bg-primary-500 p-1 rounded-full justify-center items-center"
                >
                  <Ionicons name="remove" size={28} color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleToggleScan}>
          <Text className="text-white py-5 text-2xl text-center">
            Toggle scan
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center my-3 mt-6">
          <View
            style={{
              width: window.width * 0.9,
              height: window.width * 0.9,
              borderColor: COLORS.primary,
            }}
            className="border-2 rounded-lg p-2"
          >
            {ScanView && (
              <BarCodeScanner
                className="w-full h-full"
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              />
            )}
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
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 12,
    color: "#555",
  },
  pointsContainer: {
    marginTop: 8,
  },
  points: {
    fontSize: 13,
    fontWeight: "bold",
    color: "green",
  },
  reserveButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

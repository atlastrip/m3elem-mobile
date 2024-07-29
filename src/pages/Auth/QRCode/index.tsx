import {
  ActivityIndicator,
  Animated,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as LinkingExpo from "expo-linking";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SvgQRCode from "react-native-qrcode-svg";
import window from "../../../constants/Layout";

import { useDispatch, useSelector } from "react-redux";
import { PacksCard } from "../../../components/cards/PacksCard";
import { COLORS } from "../../../constants/theme";

const QRCode = ({ navigation }: { navigation: Navigate }) => {
  const insets = useSafeAreaInsets();
  const [QR, setQR] = useState("YTYTYT");
  const [QrCodeBig, setQrCodeBig] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState("");
  const state = useSelector((state: any) => state?.user?.confetti);
  const dispatch = useDispatch();
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const url = LinkingExpo.useURL();

  // useEffect(() => {
  //     const page = url?.split('=')[1]
  //     if((page?.length || '') >0){
  //       navigation.navigate(page)
  //     }
  //     console.log({url});
  // }, [url]);
  
  useEffect(() => {
    if (state) {
      fadeIn();
    }
  }, [state]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        paddingTop: insets?.top,
      }}
    >
      <PacksCard navigation={navigation} />
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
        style={{
          height : window.height - insets.top - insets.bottom -40
        }}
        onPress={() => setQrCodeBig((v) => !v)}>
          <View className="flex-row justify-center">
            <Image
              style={{
                opacity: QrCodeBig ? 0.1 : 1,
                width: QrCodeBig ? 50 : 130,
                aspectRatio: 1,
              }}
              source={{
                uri: COLORS.logo.sign.orange,
              }}
            />
          </View>
          <Text
            style={{
              opacity: QrCodeBig ? 0.1 : 1,
            }}
            className="text-white text-center font-bold text-lg px-10"
          >
            Votre Qr-code ServiceDay
          </Text>
          
          <View className="flex-row justify-center mt-10">
            {!Loading ? (
              <View
                style={{
                  padding: !QrCodeBig ? 8 : 0,
                }}
                className="bg-white/10 rounded-md"
              >
                <SvgQRCode
                  logoBorderRadius={8}
                  quietZone={9}
                  size={!QrCodeBig ? window?.width * 0.6 : window?.width}
                  value={QR || 'd'}
                  color='white'
                  backgroundColor="black"
                  // linearGradient={[COLORS.primary, "black"]}
                  logo={{
                    uri: COLORS.logo.sign.black,
                  }}
                />
              </View>
            ) : (
              <View className="bg-white/10 p-3 rounded-md ">
                <View
                  style={{
                    height: window?.width * 0.6,
                    aspectRatio: 1,
                  }}
                  className="justify-center items-center"
                >
                  <ActivityIndicator />
                </View>
              </View>
            )}
          </View>
          
          <Text
            style={{
              fontSize: QrCodeBig ? 30 : 20,
            }}
            className="text-white text-center font-bold text-lg mt-3"
          >
            {Loading
              ? "Chargement ..."
              : ([QR[0], QR[1], QR[2]].join("") || "") +
                "  " +
                ([QR[3], QR[4], QR[5]].join("") || "")}
          </Text>
        <Text
            style={{
              fontSize: QrCodeBig ? 30 : 20,
            }}
            className="text-white text-center font-bold text-lg mt-3"
          >
            Mon Solde: 3400 bcoins
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default QRCode;

const styles = StyleSheet.create({});

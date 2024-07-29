import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as LinkingExpo from "expo-linking";
import ConfettiCannon from "react-native-confetti-cannon";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { IPages, Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SvgQRCode from "react-native-qrcode-svg";
import window from "../../../constants/Layout";
import { AnimatePresence, Motion } from "@legendapp/motion";

import { useDispatch, useSelector } from "react-redux";
import { IUser, setConfetti } from "../../../store/User";
import { COLORS } from "../../../constants/theme";
import { ButtonPrimary } from "../../../components/index";
import Lottie from "lottie-react-native";

const Congrats = ({
  navigation,
  route,
}: {
  navigation: Navigate;
  route: any
  
  // {
  //   params: {
  //     User: IUser;
  //     Text: string;
  //     Lottie:  'Felicitations' | 'Oh Non';
  //     Title: 'Felicitations' | 'Oh Non';
  //     to : IPages
  //   };
  // };
}) => {
  const insets = useSafeAreaInsets();
  const state = useSelector((state: any) => state?.user?.confetti);
  const dispatch = useDispatch();

  const Params = route.params;

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        paddingTop: insets?.top,
      }}
    >
      {(state && Params.Title === 'Felicitations' ) && (
        <ConfettiCannon
          onAnimationEnd={() =>
            setTimeout(() => {
              dispatch(setConfetti(false));
            }, 2000)
          }
          count={200}
          origin={{ x: 0, y: 0 }}
        />
      )}
      <View
        style={{
          flex: 1,
        }}
        className="justify-between"
      >
        <View>
          <Text className="text-white text-center text-4xl mt-8 font-bold">
            {Params?.Title || ''}
          </Text>
          <Text className="text-white text-center text-2xl p-3">
            {Params?.User?.user?.first_name} {Params?.User?.user?.last_name}
          </Text>
        </View>
        <View>
          <View
            className=""
            style={{
              height: window.width * 0.8,
            }}
          >{
            Params.Title === 'Felicitations' ? 
            <Lottie source={require("./congrats.json")} autoPlay loop={state} />
            :
            <Lottie source={require("./ohno.json")} autoPlay loop={false} />
          }
          </View>
          <Text className="text-white text-center text-2xl mt-4 p-3">
            {Params?.Text}
          </Text>
        </View>
        <View className="p-3">
          <ButtonPrimary
            Loading={false}
            onPress={() => navigation.navigate(Params.to)}
            setLoading={() => {}}
            text="ACCEUIL"
          />
          <View
            style={{
              height: insets?.bottom + 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Congrats;

const styles = StyleSheet.create({});

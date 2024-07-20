import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NetInfoState, useNetInfo } from "@react-native-community/netinfo";
import { setConnected } from "../../../store/User";
import { useDispatch } from "react-redux";
import Lottie from "lottie-react-native";
import window from "../../../constants/Layout";


const ConnectionLost = () => {
  const dispatch = useDispatch();
  const internetState: NetInfoState = useNetInfo();
  useEffect(() => {
    if (internetState.isConnected === true) {
      dispatch(setConnected(true));
    }
  }, [internetState.isConnected]);

  return (
    <View className="bg-black flex-1 items-center justify-center">
      <View
        style={{
            width : window.width * .8,
            height : window.width * .8,
        }}
      >
        <Lottie source={require("./noconnection.json")} autoPlay />
      </View>
      <View>
        <Text className="text-white mt-10 text-center text-xl font-bold">Oups y'a pas de connection</Text>
      </View>
    </View>
  );
};

export default ConnectionLost;

const styles = StyleSheet.create({});

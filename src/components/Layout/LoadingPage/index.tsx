import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { IUserStore } from "store/User";
import window from "../../../constants/Layout";

const LoadingPage = () => {
  const state = useSelector(
    (state: { user: IUserStore }) => state?.user?.loadingPage
  );

  return (
    <>
      {state && (
        <View style={{
            zIndex : 9999,
            height : window.height,
            width : window.width
        }} className="absolute top-0 left-0 justify-center items-center bg-black/80">
          <ActivityIndicator color="white" />
          <Text className="text-center text-white font-bold text-2xl mt-3">
          Chargement en cours
          </Text>
        </View>
      )}
    </>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({});

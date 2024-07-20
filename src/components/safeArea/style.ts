import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const SafeScreenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { WebView } from "react-native-webview";
import React, { useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IUser } from "../../../store/User";
import { Ionicons } from "@expo/vector-icons";

const WebViewer = ({
  navigation,
  route,
}: {
  navigation: Navigate;
  route: any;
}) => {
  const insets = useSafeAreaInsets();
  const Params = route.params;
  const [User, setUser] = useState<IUser | null>(null);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
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
        <Text className="text-lg font-bold text-white">{Params.PageName}</Text>
        <View className="p-2">
          <Ionicons name="share-outline" color="transparent" size={24} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <WebView
          injectedJavaScript="(function() { var head = document.getElementsByTagName('header')[0]; head.parentNode.removeChild(head); var footer = document.getElementsByTagName('footer')[0]; footer.parentNode.removeChild(footer);})()"
          style={{}}
          source={{
            uri: Params?.Url,
          }}
        />
      </View>
    </View>
  );
};

export default WebViewer;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

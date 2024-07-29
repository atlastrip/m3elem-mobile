import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect } from "react";
import { IPack } from "../../../pages/Auth/Reservation";
import { COLORS } from "../../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Motion } from "@legendapp/motion";

const PackCard: FC<{
  Pack: IPack;
  navigation: any;
  populaire: boolean;
  handleCloseModal: () => void;
}> = ({ Pack, navigation, populaire, handleCloseModal = () => {} }) => {
  return (
    <TouchableOpacity
      style={{
        borderColor: COLORS.primary,
        borderWidth: 2,
      }}
      onPress={() => {
        handleCloseModal();
        navigation.navigate("PackInfo", Pack);
      }}
      className="rounded-3xl border my-3 bg-white/5"
    >
      <View className="p-3 py-4">
        {populaire && (
          <View className="flex-row justify-end">
            <Motion.View
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              style={{
                borderColor: COLORS.primary,
                borderWidth: 1,
              }}
              className="p-1 rounded-full px-3"
            >
              <Text className="text-white mb-1 text-base font-bold">
                Le plus populaire
              </Text>
            </Motion.View>
          </View>
        )}
        <View className="items-end" style={styles?.between}>
          <Text className="text-white/50 mb-1 ">Pack : {Pack?.name}</Text>
          <Text className="text-white/50 pt-2">
            {Math.floor(+Pack?.price / Pack?.attendance_number)} dh / séance
          </Text>
        </View>
        <View className="items-end" style={styles?.between}>
          <Text className="text-white text-xl font-bold">
            {Pack?.attendance_number} séances
          </Text>
          <View className="flex-row items-end pt-2">
            <Text className="text-white text-2xl ">{Pack?.price}</Text>
            <Text className="text-gray-300 mb-1"> dh</Text>
          </View>
        </View>
      </View>
      {Pack?.giftp?.gifts?.map((gift, i) => (
        <View
          key={i}
          style={{
            backgroundColor: COLORS.primary,
          }}
          className="px-3 py-2 rounded-b-3xl items-center justify-between flex-row"
        >
          <Text
            numberOfLines={1}
            style={{
              maxWidth: "70%",
            }}
            className="text-white ml-3 text-lg font-bold"
          >
            <Ionicons name="gift-outline" color="white" size={24} />
            {gift?.name}
          </Text>
          <Ionicons name="chevron-forward" color="white" size={24} />
        </View>
      ))}
    </TouchableOpacity>
  );
};

export default PackCard;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

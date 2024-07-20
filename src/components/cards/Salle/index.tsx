import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Image } from "react-native-animatable";
import { LinearGradient, Rect, Svg, Stop, Defs } from "react-native-svg";

interface IProps {
  GYM: any;
  width: number;
  setSelectedGym: React.Dispatch<React.SetStateAction<any | null | undefined>>;
  setModalVisible: (value: React.SetStateAction<boolean>) => void;
  setModalSalleVisible: (value: React.SetStateAction<boolean>) => void;
  calculateDistanceBetween2Coords: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => number;
  currentLocation: any;
}

const Salle: FC<IProps> = ({
  GYM,
  width,
  setSelectedGym,
  setModalVisible,
  setModalSalleVisible,
  calculateDistanceBetween2Coords,
  currentLocation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedGym(GYM);
        setModalSalleVisible(false);
        setModalVisible(true);
      }}
      className="mx-3 relative bg-gray-800 rounded-lg"
    >
      <View
        className="p-1 px-3 rounded-full absolute top-2 right-2 z-50"
        style={{
          backgroundColor: GYM?.get_status === "Ouvert" ? "green" : "red",
        }}
      >
        <Text className="text-white text-base">{GYM?.get_status}</Text>
      </View>
      <Image
        style={{
          width,
          height: width * 0.8,
        }}
        className="rounded-lg"
        source={{
          uri: GYM?.image_1,
        }}
      />
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={"black"} stopOpacity={0} />
            <Stop offset="1" stopColor={"black"} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <View

      className="absolute bottom-0 p-2 flex-row">
        <Image
          style={{
            aspectRatio : 1,
            borderWidth : 2

          }}
          className="rounded-full border border-white p-1"
          source={{
            uri: GYM?.logo_url,
          }}
        />
        <View
        
        className="pl-2 w-full">
          <Text
          numberOfLines={1} ellipsizeMode='tail' className="flex-wrap text-white text-lg w-8/12">{GYM?.name}</Text>
          <Text className="text-gray-400">{GYM?.city?.name}</Text>
          {currentLocation?.longitude && (
            <Text className="text-white">
              À{" "}
              {calculateDistanceBetween2Coords(
                +GYM?.latitude,
                +GYM?.longitude,
                currentLocation?.longitude,
                +currentLocation?.latitude
              )}{" "}Km
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Salle;

const styles = StyleSheet.create({});

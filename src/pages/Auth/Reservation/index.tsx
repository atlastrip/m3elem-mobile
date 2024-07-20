import {
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TurboModuleRegistry,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import { COLORS, SHADOWS } from "../../../constants/theme";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import window from "../../../constants/Layout";
import PackCard from "../../../components/cards/PackCard";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setBackTo } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native";

export interface IPack {
  id: number;
  name: string;
  description: string;
  price: string;
  old_price: string;
  is_popular: boolean;
  attendance_number: number;
  duration_days: number;
  giftp: {
    name: string;
    description: string;
    expiration_date: string;
    gifts: {
      name: string;
      description: string;
      type: string;
      types: string[];
    }[];
    image: string;
  };
}

const Creneau = ({
  available,
  from_to,
  reservations,
  setOpenPopup,
  setSelectedType,
  workoutType,
  dateIndex,
  HandleScrollToIndex,
  maxIndex
}: {
  from_to: string;
  workoutType: string;
  available: boolean;
  reservations: string[];
  setOpenPopup: (value: React.SetStateAction<boolean>) => void;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  dateIndex: number;
  HandleScrollToIndex: (index: number) => void;
  maxIndex: number;
}) => {
  return (
    <View className="px-3">
      <TouchableOpacity
        onPress={
          available
            ? () => {
              setSelectedType(reservations.length > 0 ? "single" : "multi");
              setOpenPopup(true);
            }
            : () =>
              Alert.alert(
                "Créneau Complet",
                `Ce créneau est complet, vous pouvez choisir un autre créneau dans la liste ou dans le jour ${dateIndex === maxIndex ? 'précedant' : 'suivant'}`,
                [
                  {
                    text: `Vers le jour ${dateIndex === maxIndex ? 'précedant' : 'suivant'}`,
                    onPress: () => HandleScrollToIndex(dateIndex + (dateIndex === maxIndex ? -1 : 1)),
                  },
                  {
                    text: "OK",
                    onPress: () => { },
                  },
                ]
              )
        }
        className={`p-3 pt-1 my-2 rounded-lg ${!available ? "bg-gray-700" : "bg-primary-500"
          }`}
      >
        <View className="justify-between flex-row">
          <Text className="text-white font-bold text-xl ">{workoutType}</Text>
          <Text className="text-white font-bold text-xl text-right">
            {from_to}
          </Text>
        </View>
        <View className="flex-row justify-between">
          {Array(5)
            .fill(0)
            .map((e, indx) => (
              <View
                key={indx}
                style={{ aspectRatio: 1 }}
                className="w-[15%] rounded-md bg-white justify-center items-center"
              >
                {typeof reservations[indx] !== "string" ? (
                  <View>
                    <Ionicons name="lock-open" size={35} color="green" />
                  </View>
                ) : (
                  <View>
                    <Ionicons name="lock-closed" size={35} color="black" />
                  </View>
                )}
              </View>
            ))}
        </View>
        <View className="flex-row justify-between mt-3 ">
          {Array(5)
            .fill(0)
            .map((e, indx) => (
              <View
                key={indx}
                style={{ aspectRatio: 1 }}
                className="w-[15%] rounded-md bg-white justify-center items-center "
              >
                {typeof reservations[indx + 5] !== "string" ? (
                  <View>
                    <Ionicons name="lock-open" size={35} color="green" />
                  </View>
                ) : (
                  <View>
                    <Ionicons name="lock-closed" size={35} color="black" />
                  </View>
                )}
              </View>
            ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};
const CreneauPrivate = ({ from_to,

  dateIndex,
  HandleScrollToIndex,
  maxIndex
}: {
  from_to: string;
  dateIndex: number;
  maxIndex: number;
  HandleScrollToIndex: (index: number) => void;
}) => {
  return (
    <View className="px-3">
      <ImageBackground
        className=" my-2"
        imageStyle={{
          borderRadius: 10,
        }}
        source={require("@/assets/png/private.jpg")}
      >
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Créneau Privé",
              `Ce créneau est Privé, vous pouvez choisir un autre créneau dans la liste ou dans le jour ${dateIndex === maxIndex ? 'précedant' : 'suivant'}`,
              [
                {
                  text: `Vers le jour ${dateIndex === maxIndex ? 'précedant' : 'suivant'}`,
                  onPress: () => HandleScrollToIndex(dateIndex + (dateIndex === maxIndex ? -1 : 1)),
                },
                {
                  text: "OK",
                  onPress: () => { },
                },
              ]
            )}
          className={`p-3 pb-10`}>
          <Text className="text-white font-bold text-xl text-right">
            {from_to}
          </Text>

          <View className="px-5 pt-5 items-center">
            <Ionicons name={"lock-closed"} size={50} color="white" />
          </View>
          <Text className="text-white font-bold text-xl text-center">
            Session Privé
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const Flag = ({ flag }: { flag: "populaire" | "private" | "diamond" }) => {
  const flagProperty = {
    populaire: {
      color: "#f52036",
      icon: <Ionicons name={"star"} size={14} color={"white"} />,
    },
    private: {
      color: "#DAA520",
      icon: <MaterialCommunityIcons name={"crown"} size={14} color={"white"} />,
    },
    diamond: {
      color: "blue",
      icon: (
        <MaterialCommunityIcons name={"diamond"} size={14} color={"#b9f2ff"} />
      ),
    },
  };
  const [Expand, setExpand] = useState(false);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: flagProperty[flag].color,
      }}
      onPress={() => setExpand((v) => !v)}
      className="absolute top-0 right-3 rounded-b-lg p-2 pt-3 z-10 flex-row"
    >
      {flagProperty[flag].icon}
      <Text className={`font-bold text-white`}>{Expand && flag}</Text>
    </TouchableOpacity>
  );
};

const Reservation = ({ navigation }: { navigation: Navigate }) => {
  const insets = useSafeAreaInsets();

  const reservations = [
    {
      price: 330,
      available: false,
      from_to: "10 - 12",
      isPrivate: true,
      reservations: ["", "", ""],
    },
    {
      price: 330,
      available: true,
      from_to: "12 - 14",
      reservations: ["", "", "", "", ""],
    },
    {
      price: 330,
      available: true,
      from_to: "14 - 16",
      reservations: ["", "", ""],
    },
    {
      price: 330,
      available: true,
      from_to: "16 - 18",
      reservations: [],
    },
    {
      price: 330,
      available: false,
      from_to: "18 - 20",
      reservations: ["", "", "", "", "", "", "", "", "", "", ""],
    },
  ];
  const flatListRef = useRef(null);

  const HandleScrollToIndex = (index: number) => {
    if (flatListRef) {
      // @ts-ignore
      flatListRef?.current?.scrollToIndex({ animated: true, index });
    }
  };

  const days = [
    { day: "13/09", workout: "Cardio" },
    { day: "14/09", workout: "Fitness" },
    { day: "15/09", workout: "Cardio" },
    { day: "16/09", workout: "Cardio" },
    { day: "17/09", workout: "Cardio" },
    { day: "18/09", workout: "Cardio" },
    { day: "19/09", workout: "Cardio" },
    { day: "20/09", workout: "Cardio" },
    { day: "21/09", workout: "Cardio" },
    { day: "22/09", workout: "Cardio" },
  ];
  const [DotIndex, setDotIndex] = useState(0);
  const [OpenPopup, setOpenPopup] = useState(false);
  const [SelectedType, setSelectedType] = useState("");
  type IPack = {
    name: string;
    price: number;
    description: string;
    flag: "populaire" | "private" | "diamond";
    availableRefund: number;
    maxRefund: number;
    pointsRefund: number;
    type: string;
    image: any;
  };
  const [packs, setPacks] = useState<IPack[]>([
    {
      name: "Pack Couple Privé",
      price: 520,
      description: "Une description de pack pour les clients",
      flag: "diamond",
      availableRefund: 24,
      maxRefund: 6,
      pointsRefund: 260,
      type: "multi",
      image: require("@/assets/png/private-session.jpg"),
    },
    {
      name: "Pack Solo",
      price: 220,
      description: "Une description de pack pour les clients",
      flag: "populaire",
      availableRefund: 24,
      maxRefund: 6,
      pointsRefund: 100,
      type: "single",
      image: require("@/assets/png/solo.webp"),
    },
    {
      name: "Pack Group Privé",
      price: 820,
      description: "Une description de pack pour les clients",
      flag: "private",
      availableRefund: 24,
      maxRefund: 6,
      pointsRefund: 400,
      type: "multi",
      image: require("@/assets/png/group.jpg"),
    },
  ]);

  const [ExpandInfo, setExpandInfo] = useState("");

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
        className="p-2 bg-white/5"
      >
        <View className="flex-row justify-between mt-3">
          <TouchableOpacity
            disabled={DotIndex === 0}
            style={{
              opacity: DotIndex === 0 ? 0 : 1,
            }}
            onPress={() => HandleScrollToIndex(DotIndex - 1)}
          >
            <Text className="text-xl font-bold text-white mb-2 ">
              <Ionicons name="chevron-back" color="white" size={24} />
              {days[DotIndex - 1]?.day || days[DotIndex]?.day}
            </Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white mb-2">
            {days[DotIndex]?.day === "13/09"
              ? "Aujourd'hui"
              : days[DotIndex]?.day}
          </Text>
          <TouchableOpacity onPress={() => HandleScrollToIndex(DotIndex + 1)}>
            <Text className="text-xl font-bold text-white mb-2">
              {days[DotIndex + 1]?.day}
              <Ionicons name="chevron-forward" color="white" size={24} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
        className="pb-0"
      >
        <FlatList
          data={days}
          ref={flatListRef}
          renderItem={({ item, index }) => (
            <ScrollView key={index} style={{ flex: 1, width: window?.width }}>
              {reservations.map((e, idxx) => {
                return e?.isPrivate ? (
                  <CreneauPrivate
                    dateIndex={index}
                    maxIndex={days.length - 1}
                    HandleScrollToIndex={HandleScrollToIndex}
                    key={idxx + `e`} {...e} />
                ) : (
                  <Creneau
                    dateIndex={index}
                    HandleScrollToIndex={HandleScrollToIndex}
                    workoutType={item?.workout}
                    maxIndex={days.length - 1}
                    setSelectedType={setSelectedType}
                    setOpenPopup={setOpenPopup}
                    key={idxx}
                    reservations={e?.reservations}
                    from_to={e?.from_to}
                    available={e?.available}
                  />
                );
              })}
            </ScrollView>
          )}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate={"fast"}
          keyExtractor={(item, idx) => "" + idx}
          onScroll={(event) => {
            const index = Math.floor(
              event.nativeEvent.contentOffset.x / window?.width
            );
            setDotIndex(index);
          }}
          snapToInterval={window?.width}
          horizontal
        />
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={OpenPopup}
        className="justify-end bg-black/50 "
        onRequestClose={() => {
          setOpenPopup(false);
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
        >

          <View
            style={{
              minHeight: window.height,
            }}
            className=" justify-end bg-black/80"
          >

            <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() => setOpenPopup(true)}
              className="p-20"
            />
            <View className="bg-white rounded-3xl p-3 pb-20">
              <View className="">
                <View className="-mt-12 flex-row shadow-sm shadow-gray-200 justify-center">
                  <Image source={require('../../../assets/png/Inspyre.png')}
                    className="rounded-full  object-cover"
                    style={{ width: 70, height: 70 }} />
                </View>
                <View className="flex-row justify-between p-3">
                  <View>
                    <Image source={require('../../../assets/png/private-session.jpg')}
                      className="rounded-xl border-black border-2 object-cover"
                      style={{ width: 60, height: 60 }} />
                  </View>
                  <View>
                    <Text className="text-[#210264] text-xl text-start px-5">
                      Les miracles existent, et c'est ainsi que s'est produit et que perdure depuis le...
                    </Text>
                  </View>
                </View>
              </View>
              <View className="p-3">
                {(SelectedType !== "single"
                  ? packs
                  : packs.filter((e) => e.type == "single")
                ).map((pack, index) => (
                  <View key={index} className="">
                    <View
                    // onPress={() =>
                    //   ExpandInfo === pack.name
                    //     ? setExpandInfo("")
                    //     : setExpandInfo(pack.name)
                    // }
                    >

                      <View className="bg-white w-full">
                        <Text className="text-[16px] font-normal text-gray-400 ml-4">Donation</Text>
                      </View>
                      <View className="bg-white ">
                        <View className="shadow-sm shadow-gray-200" style={styles.progressBar}>
                          <View style={styles.progress} />
                        </View>
                      </View>
                      <TouchableOpacity className="flex-row justify-between bg-white">
                        <View className=" ">
                          <Text className="text-[14px] font-normal text-red-500 ml-4">59 000 / 100 000 dh</Text>
                        </View>
                        <View className="bg-white">
                          <Text className="text-[14px] font-normal text-gray-500 ml-4">19 Donateurs</Text>
                        </View>
                      </TouchableOpacity>

                      <View className="flex-row justify-start">
                        <Text className="font-bold text-blue-950 text-center text-lg px-3 mt-2">Aider Inspyre avec:</Text>
                      </View>

                      <TouchableOpacity
                         onPress={() => {
                          setOpenPopup(false); 
                          navigation.navigate("ProductsPopup"); 
                        }}
                        className="flex-row justify-center mb-5 mt-2">
                        <View className="p-3 w-full  bg-red-600 rounded-full">
                          <Text className="text-white font-bold text-center text-lg px-3">
                            Achat de produits
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View className="flex-row justify-center">
                        <Text className="text-black font-light text-center text-lg px-3">OU</Text>
                      </View>
                      <TouchableOpacity
                        // onPress={()=>navigation.navigate("")}
                        className="flex-row justify-center mb-5 mt-2">
                        <View className="p-3 w-full  bg-red-600 rounded-full">
                          <Text className="text-white font-bold text-center text-lg px-3">
                            Don direct
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal> */}
    </View>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  progressBar: {
    height: 12,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
  },
  progress: {
    flex: 1,
    backgroundColor: 'red',
    color: 'red',
    borderRadius: 10,
    zIndex: 10,
    // width: 2,
    height: '100%',
    width: '50%',
  },
});

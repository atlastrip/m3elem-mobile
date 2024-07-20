import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { IPack } from "../Reservation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import window from "../../constants/Layout";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome
} from "@expo/vector-icons";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { COLORS } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser } from "../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVersion } from "@/helpers/GetVersion";
import { useFocusEffect } from "@react-navigation/native";
import { PacksCard } from "../../components/cards/PacksCard";

const ProjectProductsDetails = ({ navigation, route }: { navigation: Navigate; route: any }) => {
  const dispatch = useDispatch();
  const [User, setUser] = useState<IUser | null>(null);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const user = await AsyncStorage.getItem("@user");
        // @ts-ignore
        console.log({ user: JSON.parse(user) })
        // @ts-ignore
        setUser(JSON.parse(user));
      })();
    }, [])
  );

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("@user");
      // @ts-ignore
      setUser(JSON.parse(user));
    })();
  }, []);

  const Card = [
    {
      title: 'Pip Pip Yallah',
      title2: '10% Cash Back',
      description: 'Un cashback de 10% pour toute recharge de la wallet pip pip yalah',
      image: require('../../assets/png/PipPipYallah.png'),
      icon: <MaterialIcons name="model-training" color="red" size={30} />,
      colorIcon: 'white',
      onPress: () => navigation.navigate('Categories'),
    },
    {
      title: 'Pip Pip Yallah',
      title2: '10% Cash Back',
      description: 'Un cashback de 10% pour toute recharge de la wallet pip pip yalah',
      image: require('../../assets/png/PipPipYallah.png'),
      icon: <MaterialIcons name="model-training" color="red" size={30} />,
      colorIcon: 'white',
      onPress: () => navigation.navigate('Categories'),
    },
    {
      title: 'Pip Pip Yallah',
      title2: '10% Cash Back',
      description: 'Un cashback de 10% pour toute recharge de la wallet pip pip yalah',
      image: require('../../assets/png/PipPipYallah.png'),
      icon: <MaterialIcons name="model-training" color="red" size={30} />,
      colorIcon: 'white',
      onPress: () => navigation.navigate('Categories'),
    },
    {
      title: 'Pip Pip Yallah',
      title2: '10% Cash Back',
      description: 'Un cashback de 10% pour toute recharge de la wallet pip pip yalah',
      image: require('../../assets/png/PipPipYallah.png'),
      icon: <MaterialIcons name="model-training" color="red" size={30} />,
      colorIcon: 'white',
      onPress: () => navigation.navigate('Categories'),
    },
  ];

  const showAlert = () =>
    Alert.alert(
      "Se Déconnecter",
      "Voulez vous vraiment se déconnecter ?",
      [
        {
          text: "Annuler",
          onPress: () => { },
          style: "cancel",
        },
        {
          text: "Déconnexion",
          onPress: handleLogout,
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => { },
      }
    );
  const [Version, setVersion] = useState(window?.version);
  const [TextSearch, setTextSearch] = useState('');

  useEffect(() => {
    FetchVersion();
  }, []);

  const FetchVersion = async () => {
    const { version, loading } = await getVersion();
    setVersion(version);
    setRefreshing(false);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchVersion();
  }, []);

  const handleLogout = () => {
    (async () => {
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@user");
      dispatch(isLogin(false));
    })();
  };

  return (
    <ScrollView style={{ flex: 1 }} className="bg-white text-black">
      <PacksCard navigation={navigation} />
      <View
        style={{ paddingTop: insets?.top + 10, paddingBottom: 10 }}
        className="p-2  justify-start items-center bg-white/5"
      >
        <TouchableOpacity
          style={{
            width: window.width * .8
          }}
          className="flex-row justify-between mb-5"
        >

          <View className="flex p-3">
            <Image source={require('../../assets/png/DeallkhirLogo.png')}
              style={{ width: 70, height: 35 }}
              className="" />
          </View>
          <View className=" mt-3 ">
            <Image source={require('../../assets/png/private-session.jpg')}
              className="rounded-full border-black border-2 object-cover"
              style={{ width: 40, height: 40 }} />
          </View>
        </TouchableOpacity>
        <View className="shadow-sm shadow-slate-300 mb-3 bg-white pt-3">
          <View className="flex-row justify-between px-8 ">
            <View>
              <Image source={require('../../assets/png/private-session.jpg')}
                className="rounded-xl border-black border-2 object-cover"
                style={{ width: 70, height: 80 }} />
            </View>
            <View>
              <Text className="text-[#210264] text-lg font-bold text-start px-8">
                Les miracles existent, et c'est ainsi que s'est produit et que perdure depuis le...
              </Text>
              <TouchableOpacity className="flex-row justify-between ml-3 ">
                <View className=" ml-5">
                  <Text className="text-[14px] font-normal text-[#2B61E3]">59 000 / 100 000 dh</Text>
                </View>
                <View className="">
                  <Text className="text-[14px] font-normal text-gray-500 mr-10">19 Donateurs</Text>
                </View>
              </TouchableOpacity>
              <View className="ml-5 mr-7 shadow-sm shadow-gray-200">
                <View style={styles.progressBar}>
                  <View style={styles.progress} />
                </View>
              </View>

            </View>
          </View>

        </View>
        <View className="flex-row justify-between items-center w-full ">
          <View className="flex-row justify-between items-center bg-[#eff8ff] rounded-lg p-2 w-[83%]">
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={{
                paddingHorizontal: 10,
              }}
            />
            <TextInput
              onChangeText={setTextSearch}
              placeholderTextColor="#000000"
              className="text-black text-base justify-end w-full"
              value={TextSearch}
              placeholder="Recherche des projets..."
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddProduct');
            }}
            className=" justify-between items-center bg-[#eff8ff] rounded-lg p-1 py-2"
          >
            <Ionicons
              name="add"
              size={24}
              color="black"
              style={{
                paddingHorizontal: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="flex-row justify-center p-2">
        <View>
          {Card?.map((card, idx) => (
            <TouchableOpacity key={idx}
              style={{
                width: window.width * .8
              }}
              className="m-3">
              <View className="justify-between rounded-3xl shadow-md shadow-gray-200 bg-white">
                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-md font-normal mt-6 text-black ml-4">{card.title}</Text>
                  </View>
                  <View style={{ backgroundColor: card.colorIcon }} className="flex items-center mt-5 mr-3 justify-center">
                    <Ionicons name="heart-outline" color='red' size={24} />
                  </View>
                </View>
                <View>
                  <Text className="text-2xl font-bold mt-3 text-black ml-4">{card.title2}</Text>
                </View>
                <View className="object-cover mt-3">
                  <Image source={card.image} style={{ width: '100%', height: 200 }} />
                </View>
                <View className=" bg-[#eff8ff] w-full rounded-b-xl">
                  <ImageBackground
                    className="m-1 p-3 -mt-10 flex-row justify-end"
                  >
                    <TouchableOpacity
                      className={` bg-[#2B61E3] flex-row justify-between px-2 mt-4 py-1 rounded-2xl w-24`}
                    >
                      <View className="mt-1">
                        <MaterialIcons name="add-shopping-cart" color='white' size={19} />
                      </View>
                      <View>
                        <Text className="text-md font-normal mt-1 text-white text-start p-1">
                          + 10 dh
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                  <View className="">
                    <Text className="text-lg font-semibold text-blue-950 ml-4">{card.description}</Text>
                  </View>
                  <View className="bg-[#eff8ff] flex-row justify-end p-3">
                    <View className="bg-white rounded-2xl w-40 flex-row justify-between p-3">
                      <Text className="text-[#2B61E3] text-lg font-semibold">100.00 dh</Text>
                      <Text className="text-[#2B61E3] line-through text-lg font-semibold">110</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        <TouchableOpacity
          onPress={() => {
            // setOpenPopup(true);
            navigation.navigate("ProductsPopup");
          }}
          className="mb-5 mt-5">
          <View className="p-3 w-full  bg-[#2B61E3] rounded-full">
            <Text className="text-white font-bold text-center text-lg px-3">
              Participer
            </Text>
          </View>
        </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProjectProductsDetails;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    color: 'white',
  },
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
    height: '100%',
    width: '40%',
  },
});

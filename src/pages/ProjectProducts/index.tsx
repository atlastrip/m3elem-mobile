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

const ProjectProducts = ({ navigation, route }: { navigation: Navigate; route: any }) => {
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

          <View className=" ">
            <Image source={require('../../assets/png/DeallkhirLogo.png')}
              style={{ width: 70, height: 35 }}
              className="" />
          </View>
          <View className="">
            <Image source={require('../../assets/png/private-session.jpg')}
              className="rounded-full border-black border-2 object-cover"
              style={{ width: 40, height: 40 }} />
          </View>
        </TouchableOpacity>

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
            className="flex-row justify-between items-center bg-[#eff8ff] rounded-lg p-1 py-2"
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
      {/*   
        <View className=" p-3">
          <Text className="text-lg font-bold text-blue-950">Projets à soutenir:</Text>
        </View>
   */}
      <TouchableOpacity>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
          }
          horizontal
        >
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
                <ImageBackground
                  className="m-1 p-2"
                >
                  <TouchableOpacity
                    className={` bg-[#007ecd]/70 mt-4 justify-center rounded-2xl flex-row w-52`}
                  >
                    <View className="mt-2 ">
                      <FontAwesome name="book" color='white' size={19} />
                    </View>
                    <View>
                      <Text className="text-lg font-semibold text-white text-start p-1">
                        Soutenir l'Education
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <View className=" bg-[#eff8ff] w-full rounded-b-xl">
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
              {idx !== Card.length - 1 && (
                <View className="flex-row justify-end">
                  <View className="w-10/12 h-[1px] bg-white/10" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="p-3 mx-28">
          <TouchableOpacity
            className="p-3 rounded-2xl items-center border-2 bg-white border-[#2B61E3]  font-bold"
            onPress={() => navigation.navigate("ProjectProductsDetails")}>
            <Text
              className="text-xl font-bold text-[#2B61E3]"
            >
              Voir tous
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default ProjectProducts;

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
    // width: 2,
    height: '100%',
    width: '50%',
  },
});

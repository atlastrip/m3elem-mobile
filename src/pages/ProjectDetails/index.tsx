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
  Touchable,
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
  FontAwesome,
} from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser } from "../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVersion } from "@/helpers/GetVersion";
import { useFocusEffect } from "@react-navigation/native";
import { PacksCard } from "../../components/cards/PacksCard";
import { Modal } from "react-native";


const ProjectDetails = ({ navigation, route }: { navigation: Navigate; route: any }) => {
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
  const [OpenPopup, setOpenPopup] = useState(false);

  return (
    <ScrollView style={{ flex: 1 }} className="bg-white text-black">
      <PacksCard navigation={navigation} />

      <ImageBackground
        style={{
          // backgroundColor: COLORS.secondary,
          aspectRatio: 2,
          paddingTop: insets?.top + 20,
          padding: 30,
          // marginBottom: 60
        }}
        // imageStyle={{
        //   // borderRadius: 18,
        // }}
        className="relative"
        source={require('../../assets/png/Plant.webp')}
      >
        <TouchableOpacity
          style={{
            width: window.width * .8
          }}
          className="flex-row justify-between items-center mb-5"
        >

          <TouchableOpacity
            onPress={() => navigation.navigate("Projects")}
            className="flex-row bg-white rounded-full p-2">
            <MaterialCommunityIcons name="chevron-left" color='red' size={30} />
          </TouchableOpacity>
          <View className="mt-3 ">
            <Image source={require('../../assets/png/Inspyre.png')}
              className="rounded-full object-cover"
              style={{ width: 50, height: 50 }} />
          </View>
        </TouchableOpacity>
      </ImageBackground>

      <View className="flex-row justify-between px-3">
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
        <TouchableOpacity className="flex-row justify-between">
          <View className="flex-row p-3">
            <Ionicons name="bookmark-outline" color='#062265' size={26} />
          </View>
          <View className="flex-row p-3">
            <Ionicons name="share-social-sharp" color='#062265' size={26} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        className="w-full p-2">
        <View className="px-3 -mt-3">
          <Text className="text-lg  font-bold mt-6 text-[#062265]">
            Les miracles existent et c est ainsi que c est produit et que perdure depuis...
          </Text>
        </View>
        <View className="justify-between rounded-3xl shadow-sm mt-5">
          <View className="flex-row justify-between">
            <View className=" w-full">
              <Text className="text-[16px] font-normal text-gray-400 ml-4">Donation</Text>
            </View>
            {/* <View className="pr-14">
              <Text className="text-[14px] font-normal text-gray-500 mr-4">19 Donateurs</Text>
            </View> */}
          </View>
          <View className="  w-full rounded-b-xl">
            <View className="">
              <View style={styles.progressBar}>
                <View style={styles.progress} />
              </View>
            </View>
            <View className="flex-row justify-between mb-2 ">
              <View className=" ">
                <Text className="text-[14px] font-normal text-[#2B61E3] ml-4">59 000 / 100 000 dh</Text>
              </View>
              <View className="">
                <Text className="text-[14px] font-normal text-gray-500 mr-4">19 Donateurs</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 0.5,
              margin: 3,
            }}
          ></View>
          <View className="p-2 ">
            <View
              className="p-3">
              <Text
                className="text-lg font-bold text-[#062265]"
              >
                Description de projet:
              </Text>
            </View>
            <View
              className="p-3">
              <Text
                className="text-lg font-normal text-gray-500"
              >
                Les graines à pollinisation libre (OP) sont produites par une plante pollinisée par des
                abeilles ou d'autres insectes, des chauves-souris, des oiseaux, du vent ou même des humains.
                Certaines plantes, comme les haricots, se pollinisent même. Une fois plantée, la graine qui
                s'est formée via ce type de fertilisation fera pousser une plante qui ressemble et agit
                comme ses de plantes OP sont également génétiquement diverses, il y a donc des variations au
                sein d'une population de plantes OP. Cette variation signifie que les plantes peuvent s'adapter
                à vos conditions locales si vous conservez des semences et replantez année après année. En sélectionnant
                et en conservant les graines des plantes qui poussent le mieux, vous faites partie du processus.
                Les agriculteurs pratiquent ce type de sélection depuis des millénaires, à la recherche de la saveur,
                de la taille des fruits, de la robustesse, de la précocité, etc., c'est ainsi que nous avons aujourd'hui
                une incroyable diversité de cultures.
              </Text>
            </View>

            <View
              className="p-3">
              <Text
                className="text-lg font-bold text-[#062265]"
              >
                Porteur de projet:
              </Text>
            </View>
            <View className="flex-row p-2">
              <View>
                <Image source={require('../../assets/png/Inspyre.png')}
                  className="rounded-full  object-cover"
                  style={{ width: 50, height: 50 }} />
              </View>
              <View className="px-5">
                <Text className="text-[#062265] text-xl text-start ">
                  Coopération Inspyre
                </Text>
                <View className="flex-row ">
                  <Text className="text-[#2B61E3] text-[14px] font-normal text-start ">
                    15
                  </Text>
                  <Text className="text-[#210264] text-[14px] font-normal pl-2 text-start">
                    Projets
                  </Text>
                </View>
              </View>
              <View className="px-16 mt-2">
                <MaterialCommunityIcons name="chevron-right" color='#2B61E3' size={24} />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpenPopup(true);
                navigation.navigate("ProductsPopup");
              }}
              className="flex-row justify-center mb-5 mt-5">
              <View className="p-3 w-full  bg-[#2B61E3] rounded-full">
                <Text className="text-white font-bold text-center text-lg px-3">
                  Participer
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
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
                  <Image source={require('../../assets/png/Inspyre.png')}
                    className="rounded-full  object-cover"
                    style={{ width: 70, height: 70 }} />
                </View>
                <View className="flex-row justify-between p-3">
                  <View>
                    <Image source={require('../../assets/png/private-session.jpg')}
                      className="rounded-xl border-black border-2 object-cover"
                      style={{ width: 60, height: 60 }} />
                  </View>
                  <View>
                    <Text className="text-[#062265] text-[16px] px-3 pt-3">
                      Les miracles existent, et c'est ainsi que s'est produit et que perdure depuis le...
                    </Text>
                  </View>
                </View>
              </View>
              <View className="p-3">
                <View className="">
                  <View>
                    <View className="bg-white w-full">
                      <Text className="text-[16px] font-normal text-gray-400 ml-4">Donation</Text>
                    </View>
                    <View className="bg-white ">
                      <View className="shadow-sm shadow-gray-200" style={styles.progressBar}>
                        <View style={styles.progress} />
                      </View>
                    </View>
                    <View className="flex-row justify-between bg-white">
                      <View className=" ">
                        <Text className="text-[14px] font-normal text-[#2B61E3] ml-4">59 000 / 100 000 dh</Text>
                      </View>
                      <View className="bg-white">
                        <Text className="text-[14px] font-normal text-gray-500 ml-4">19 Donateurs</Text>
                      </View>
                    </View>

                    <View className="flex-row justify-start">
                      <Text className="font-bold text-[#062265] text-center text-lg px-3 mt-2">Aider Inspyre avec:</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setOpenPopup(false);
                        navigation.navigate("ProductsPopup");
                      }}
                      className="flex-row justify-center mb-5 mt-2">
                      <View className="p-3 w-full  bg-[#2B61E3] rounded-full">
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
                      <View className="p-3 w-full  bg-[#2B61E3] rounded-full">
                        <Text className="text-white font-bold text-center text-lg px-3">
                          Don direct
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* ))} */}
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>

  );
};

export default ProjectDetails;

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
    backgroundColor: '#2B61E3',
    color: '#2B61E3',
    borderRadius: 10,
    zIndex: 10,
    // width: 2,
    height: '100%',
    width: '50%',
  },
});

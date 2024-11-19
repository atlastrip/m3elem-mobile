import {
  ActivityIndicator,
  Alert,
  Image,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import window from "../../../constants/Layout";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome6
} from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVersion } from "@/helpers/GetVersion";
import { useFocusEffect } from "@react-navigation/native";
import { PacksCard } from "../../../components/cards/PacksCard";
import { ButtonPrimary } from "@/components/index";

const MenuArtisan = ({ navigation, route }: { navigation: Navigate; route: any }) => {
  const dispatch = useDispatch();
  const [User, setUser] = useState<IUser | null>(null);
  const insets = useSafeAreaInsets();
  const [imageProfile, setImageProfile] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const user = await AsyncStorage.getItem("@user");
        const img = await AsyncStorage.getItem("@imageProfile");
        setImageProfile(img);

        // @ts-ignore
        // console.log({ user: JSON.parse(user) })
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

  const Menus = [
    {
      name: "About us",
      icon: <Ionicons name="help" color="white" size={24} />,
      colorIcon: "#007cff",
      onPress: () =>
        navigation.navigate("WebView", {
          PageName: "About us",
          Url: "https://serviceday.ma/about",
        }),
    },
    {
      name: "Terms of use",

      icon: (
        <Ionicons name="shield-checkmark-sharp" color="white" size={20} />
      ),
      colorIcon: "#fe2d58",
      onPress: () =>
        navigation.navigate("WebView", {
          PageName: "Terms of use",
          Url: "https://www.serviceday.ma/terms-of-use",
        }),
    },
    {
      name: "A HOUSE GURU Blog",
      icon: <MaterialIcons name="model-training" color="white" size={20} />,
      colorIcon: "green",
      onPress: () =>
        navigation.navigate("WebView", {
          PageName: "A HOUSE GURU Blog",
          Url: "https://www.byteforce.ma",
        }),
    },
    // {
    //   name: "Conditions de vente",
    //   icon: (
    //     <MaterialCommunityIcons
    //       name="handshake-outline"
    //       color="white"
    //       size={24}
    //     />
    //   ),
    //   colorIcon: "#5855d6",
    //   onPress: () =>
    //     navigation.navigate("WebView", {
    //       PageName: "Conditions de vente",
    //       Url: "https://www.pantofit.com/termsofsell.html",
    //     }),
    // },

    {
      name: "How to use",
      icon: <MaterialIcons name="menu-book" color="white" size={20} />,
      colorIcon: "purple",
      onPress: () =>
        navigation.navigate("WebView", {
          PageName: "How to use",
          Url: "https://www.byteforce.ma/portfolio",
        }),
    },
  ];

  const Menu4 = [
    {
      name: "My leads",
      icon: <MaterialIcons name="local-offer" color="white" size={20} />,
      colorIcon: "coral",
      onPress: () =>
        navigation.navigate("MyLeads"),
    },
    {
      name: "Balance and transactions",
      icon: <MaterialIcons name="money" color="white" size={20} />,
      colorIcon: "blue",
      onPress: () =>
        navigation.navigate("Transactions"),
    },
    {
      name: "Direct Leads",
      icon: <MaterialIcons name="chat" color="white" size={20} />,
      colorIcon: "blue",
      onPress: () =>
        navigation.navigate("ConversationsScreen"),
    },
  ]

  const Menu2 = [
    {
      name: "Manage my account",
      icon: <SimpleLineIcons name="user" color="white" size={20} />,
      colorIcon: "#39c559",
      
      onPress: () => navigation.navigate("GestionDeCompteArtisant"),
    },
    {
      name: "Notifications",
      icon: <MaterialIcons name="notifications" color="white" size={20} />,
      colorIcon: "red",
      onPress: () =>
        navigation.navigate("Notification"),
    },
    {
      name: "Payment methods",
      icon: <MaterialIcons name="payments" color="white" size={20} />,
      colorIcon: "#7b0bb8",
      onPress: () =>
        navigation.navigate("PaymentMethod"),
    },
    {
      name: "Contact us",
      icon: <MaterialIcons name="support-agent" color="white" size={20} />,
      colorIcon: "orange",
      onPress: () =>
        navigation.navigate("WebView", {
          PageName: "Contact",
          Url: "https://www.serviceday.ma/contact",
        }),
    }
    // {
    //   name: "Conversations",
    //   icon: <MaterialIcons name="chat" color="white" size={20} />,
    //   colorIcon: "blue",
    //   onPress: () =>
    //     navigation.navigate("ConversationsScreen"),
    // },
    // {
    //   name: "Pantofit podcast",
    //   icon: <MaterialCommunityIcons name="podcast" color="white" size={20} />,
    //   colorIcon: COLORS.primary,
    //   onPress: () =>
    //     navigation.navigate("WebView", {
    //       PageName: "Pantofit podcast",
    //       Url: "https://www.pantofit.com/podcast.html",
    //     }),
    // },
  ];
  const Menu3 = [
    {
      name: "Mise à jour disponible",
      onPress: () =>
        Linking.openURL(
          Platform.OS === "android"
            ? "https://play.google.com/store/apps/details?id=com.serviceday.serviceday"
            : "https://apps.apple.com/lr/app/pantofit/id1613173191"
        ),
      version: window?.version,
    },
  ];

  const showAlert = () =>
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },
        {
          text: "Logout",
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
      await AsyncStorage.removeItem("@imageProfile");
      dispatch(isLogin(false));
    })();
  };
  const [IsConnected, setIsConnected] = useState<boolean | null>(null);
  const HandleConnected = async () => {
    const UserFromAsyncStorage = await AsyncStorage.getItem("@user");
    const ParsedUser: any = await JSON.parse(UserFromAsyncStorage || "");
    console.log('====================================');
    console.log('ParsedUser', ParsedUser.email);
    console.log('====================================');
    // @ts-ignore
    setIsConnected(!!ParsedUser?.email)
  }
  useEffect(() => {
    HandleConnected();
  }, [])


  return (
    <View
      style={{
        flex: 1,
      }}
      className="bg-white"
    >
      {IsConnected ? (
        <>
          <View
            style={{
              paddingTop: insets?.top + 10,
              paddingBottom: 0,
            }}
            className="p-6">
            <Text className="text-2xl text-start font-bold text-black">Settings</Text>
          </View>
          <View

            className="p-2 flex-row justify-center items-center bg-white/5"
          >

          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="white"
              />
            }
            style={{
              flex: 1,
            }}
          >
            <View className="p-3 mt-3">
              <View
                style={{ backgroundColor: COLORS.primary + 10 }}
                className="rounded-lg ">
                <TouchableOpacity
                  onPress={() => navigation.navigate("GestionDeCompteArtisant")}
                  className="flex-row p-3 justify-between"
                >
                  <View className="flex-row">
                    {
                      imageProfile ? (
                        <Image
                          source={{ uri: imageProfile }}
                          style={{
                            width: window?.width * 0.15,
                            aspectRatio: 1,
                            borderWidth: 2,
                          }}
                          className="rounded-full p-3 flex-row justify-center items-center relative"

                        />
                      ) : (
                        <View
                          style={{
                            width: window?.width * 0.15,
                            aspectRatio: 1,
                            borderWidth: 2,
                            borderColor: "#000000",
                          }}
                          className="rounded-full p-3 flex-row justify-center items-center relative"
                        >
                          <FontAwesome6 name="user" size={24} />
                        </View>
                      )
                    }
                    <View className="ml-2">
                      <Text className="text-black text-xl font-bold">
                        {User?.firstName + " " + User?.lastName

                          || "User"}{" "}
                        {/* {User?.user?.last_name || "ServiceDay"} */}
                      </Text>
                      <Text className="text-black mt-2">View profile</Text>
                    </View>
                  </View>
                  <View className="justify-center items-self-end">
                    <Ionicons name="chevron-forward" color="gray" size={24} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="px-3">

              <View
                style={{ backgroundColor: COLORS.primary + 10 }}

                className="rounded-lg  mb-3">
                {Menu4?.map((menu, idx) => (
                  <View key={idx}>
                    <TouchableOpacity
                      onPress={menu.onPress}
                      className="flex-row justify-between p-4 pl-5 "
                    >
                      <View className="flex-row">
                        <View
                          style={{
                            backgroundColor: menu.colorIcon,
                            aspectRatio: 1,
                          }}
                          className="p-[1px] rounded-md items-center justify-center"
                        >
                          {menu.icon}
                        </View>
                        <Text className="text-lg font-bold  text-black ml-4">
                          {menu.name}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" color="gray" size={24} />
                    </TouchableOpacity>
                    {idx !== Menu2.length - 1 && (
                      <View className="flex-row justify-end">
                        <View className="w-10/12 h-[1px] bg-white/10" />
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <View
                style={{ backgroundColor: COLORS.primary + 10 }}

                className="rounded-lg  mb-3">
                {Menu2?.map((menu, idx) => (
                  <View key={idx}>
                    <TouchableOpacity
                      onPress={menu.onPress}
                      className="flex-row justify-between p-4 pl-5 "
                    >
                      <View className="flex-row">
                        <View
                          style={{
                            backgroundColor: menu.colorIcon,
                            aspectRatio: 1,
                          }}
                          className="p-[1px] rounded-md items-center justify-center"
                        >
                          {menu.icon}
                        </View>
                        <Text className="text-lg font-bold  text-black ml-4">
                          {menu.name}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" color="gray" size={24} />
                    </TouchableOpacity>
                    {idx !== Menu2.length - 1 && (
                      <View className="flex-row justify-end">
                        <View className="w-10/12 h-[1px] bg-white/10" />
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <View
                style={{ backgroundColor: COLORS.primary + 10 }}

                className="rounded-lg  mb-3">
                {Menus?.map((menu, idx) => (
                  <View key={idx}>
                    <TouchableOpacity
                      onPress={menu.onPress}
                      className="flex-row justify-between p-4 pl-5 "
                    >
                      <View className="flex-row">
                        <View
                          style={{
                            backgroundColor: menu.colorIcon,
                            aspectRatio: 1,
                          }}
                          className="p-[1px] rounded-md items-center justify-center"
                        >
                          {menu.icon}
                        </View>
                        <Text className="text-lg font-bold  text-black ml-4">
                          {menu.name}
                        </Text>
                      </View>
                      <View className="flex-row justify-end">
                        {menu?.name == "Gérer votre compte" &&
                          (!User?.fullName ||
                            !User?.email ||
                            !User?.phone) && (
                            <View
                              className="bg-red-600 rounded-full justify-center"
                              style={{
                                aspectRatio: 1,
                              }}
                            >
                              <Text className="text-base font-bold text-white text-center">
                                1
                              </Text>
                            </View>
                          )}
                        <Ionicons name="chevron-forward" color="gray" size={24} />
                      </View>
                    </TouchableOpacity>
                    {idx !== Menus.length - 1 && (
                      <View className="flex-row justify-end">
                        <View className="w-10/12 h-[1px] bg-white/10" />
                      </View>
                    )}
                  </View>
                ))}
              </View>
              <View
                style={{ backgroundColor: COLORS.primary + 10 }}

                className="rounded-lg  mb-3">
                <View>
                  <TouchableOpacity
                    onPress={showAlert}
                    className="flex-row justify-between p-4 pl-3 "
                  >
                    <View className="flex-row">
                      <Text className="text-lg font-bold  text-black ml-4">
                        Logout
                      </Text>
                    </View>
                    <View className="flex-row justify-end">
                      <Ionicons name="chevron-forward" color="gray" size={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 20,
              }}
            />
          </ScrollView>
        </>
      ) : (
        <View className="p-3 justify-center flex-1">
          <View className='mb-20' >
            <ButtonPrimary Loading={false} setLoading={() => { }} text='Log in to see settings' onPress={() => handleLogout()} />
          </View>
        </View>
      )}

    </View>
  );
};

export default MenuArtisan;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

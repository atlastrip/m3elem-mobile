// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Linking,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { FC, useEffect, useState } from "react";
// import { Navigate } from "navigation";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import window from "../../../constants/Layout";
// import {
//   Ionicons,
//   MaterialCommunityIcons,
//   SimpleLineIcons,
//   MaterialIcons,
//   FontAwesome6
// } from "@expo/vector-icons";
// import { COLORS } from "../../../constants/theme";
// import { useDispatch } from "react-redux";
// import { isLogin, IUser } from "../../../store/User";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getVersion } from "@/helpers/GetVersion";
// import { useFocusEffect } from "@react-navigation/native";
// import { PacksCard } from "../../../components/cards/PacksCard";
// import { ButtonPrimary } from "@/components/index";

// const Menu = ({ navigation, route }: { navigation: Navigate; route: any }) => {
//   const dispatch = useDispatch();
//   const [User, setUser] = useState<IUser | null>(null);
//   const insets = useSafeAreaInsets();
//   const [imageProfile, setImageProfile] = useState<string | null>(null);


//   useFocusEffect(
//     React.useCallback(() => {
//       (async () => {
//         const user = await AsyncStorage.getItem("@user");
//         const img = await AsyncStorage.getItem("@imageProfile");
//         setImageProfile(img);

//         // @ts-ignore
//         // console.log({ user: JSON.parse(user) })
//         // @ts-ignore
//         setUser(JSON.parse(user));
//       })();
//     }, [])
//   );

//   useEffect(() => {
//     (async () => {
//       const user = await AsyncStorage.getItem("@user");
//       // @ts-ignore
//       setUser(JSON.parse(user));
//     })();
//   }, []);

//   const Menus = [
//     {
//       name: "About us",
//       icon: <Ionicons name="help" color="white" size={24} />,
//       colorIcon: "#007cff",
//       onPress: () =>
//         navigation.navigate("WebView", {
//           PageName: "About us",
//           Url: "https://www.m3alempro.com/en/about",
//         }),
//     },
//     {
//       name: "Terms of use",

//       icon: (
//         <Ionicons name="shield-checkmark-sharp" color="white" size={20} />
//       ),
//       colorIcon: "#fe2d58",
//       onPress: () =>
//         navigation.navigate("WebView", {
//           PageName: "Terms of use",
//           Url: "https://www.m3alempro.com/en/terms",
//         }),
//     },
//     {
//       name: "Manage my account",
//       icon: <SimpleLineIcons name="user" color="white" size={20} />,
//       colorIcon: "#39c559",
//       onPress: () => navigation.navigate("GestionDeCompte"),
//     },
//   ];

//   const Menu2 = [
//     {
//       name: "Contact us",
//       icon: <MaterialIcons name="support-agent" color="white" size={20} />,
//       colorIcon: "orange",
//       onPress: () =>
//         navigation.navigate("WebView", {
//           PageName: "Contact",
//           Url: "https://www.m3alempro.com/en/contact",
//         }),
//     },
//     {
//       name: "Projects",
//       icon: <MaterialIcons name="chat" color="white" size={20} />,
//       colorIcon: "blue",
//       onPress: () =>
//         navigation.navigate("OrdersUserWithConversationsScreen"),
//     },
//     {
//       name: "Direct Contacts",
//       icon: <MaterialIcons name="chat" color="white" size={20} />,
//       colorIcon: "blue",
//       onPress: () =>
//         navigation.navigate("DirectConversationsScreenForUser"),
//     },
//     {
//       name: "A HOUSE GURU Blog",
//       icon: <MaterialIcons name="model-training" color="white" size={20} />,
//       colorIcon: "green",
//       onPress: () =>
//         navigation.navigate("WebView", {
//           PageName: "A HOUSE GURU Blog",
//           Url: "https://www.m3alempro.com/en/blog",
//         }),
//     },
//   ];
//   const Menu3 = [
//     {
//       name: "Mise à jour disponible",
//       onPress: () =>
//         Linking.openURL(
//           Platform.OS === "android"
//             ? "https://play.google.com/store/apps/details?id=com.serviceday.serviceday"
//             : "https://apps.apple.com/lr/app/pantofit/id1613173191"
//         ),
//       version: window?.version,
//     },
//   ];

//   const showAlert = () =>
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to log out?",
//       [
//         {
//           text: "Cancel",
//           onPress: () => { },
//           style: "cancel",
//         },
//         {
//           text: "Logout",
//           onPress: handleLogout,
//           style: "destructive",
//         },
//       ],
//       {
//         cancelable: true,
//         onDismiss: () => { },
//       }
//     );
//   const [Version, setVersion] = useState(window?.version);

//   useEffect(() => {
//     FetchVersion();
//   }, []);

//   const FetchVersion = async () => {
//     const { version, loading } = await getVersion();
//     setVersion(version);
//     setRefreshing(false);
//   };

//   const [refreshing, setRefreshing] = React.useState(false);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     FetchVersion();
//   }, []);

//   const handleLogout = () => {
//     (async () => {
//       await AsyncStorage.removeItem("@token");
//       await AsyncStorage.removeItem("@user");
//       await AsyncStorage.removeItem("@imageProfile");

//       dispatch(isLogin(false));
//     })();
//   };
//   const [IsConnected, setIsConnected] = useState<boolean | null>(null);
//   const HandleConnected = async () => {
//     const UserFromAsyncStorage = await AsyncStorage.getItem("@user");
//     const ParsedUser: any = await JSON.parse(UserFromAsyncStorage || "");
//     console.log('ParsedUser', ParsedUser);

//     // @ts-ignore
//     setIsConnected(!!ParsedUser?.email)
//   }
//   useEffect(() => {
//     HandleConnected();
//   }, [])
//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//       className="bg-white"
//     >
//       {IsConnected ? (
//         <>
//           <View
//             style={{
//               paddingTop: insets?.top + 10,
//               paddingBottom: 0,
//             }}
//             className="p-6">
//             <Text className="text-2xl text-start font-bold text-black">Settings</Text>
//           </View>
//           <View

//             className="p-2 flex-row justify-center items-center bg-white/5"
//           >

//           </View>
//           <ScrollView
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="white"
//               />
//             }
//             style={{
//               flex: 1,
//             }}
//           >
//             <View className="p-3 mt-3">
//               <View
//                 style={{ backgroundColor: COLORS.primary + 20 }}
//                 className="rounded-lg ">
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate("GestionDeCompte")}
//                   // onPress: () => navigation.navigate(""),

//                   className="flex-row p-3 justify-between"
//                 >
//                   <View className="flex-row">
//                     {
//                       imageProfile ? (
//                         <Image
//                           source={{ uri: imageProfile }}
//                           style={{
//                             width: window?.width * 0.15,
//                             aspectRatio: 1,
//                             borderWidth: 2,
//                           }}
//                           className="rounded-full p-3 flex-row justify-center items-center relative"

//                         />
//                       ) : (
//                         <View
//                           style={{
//                             width: window?.width * 0.15,
//                             aspectRatio: 1,
//                             borderWidth: 2,
//                             borderColor: "#000000",
//                           }}
//                           className="rounded-full p-3 flex-row justify-center items-center relative"
//                         >
//                           <FontAwesome6 name="user" size={24} />
//                         </View>
//                       )
//                     }
//                     <View className="ml-2">
//                       <Text className="text-black text-xl font-bold">
//                         {User?.firstName + " " + User?.lastName

//                           || "Utilisateur"}{" "}                        {/* {User?.user?.last_name || "ServiceDay"} */}
//                       </Text>
//                       <Text className="text-black mt-2">View profile</Text>
//                     </View>
//                   </View>
//                   <View className="justify-center items-self-end">
//                     <Ionicons name="chevron-forward" color="gray" size={24} />
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View className="px-3">

//               <View
//                 style={{ backgroundColor: COLORS.primary + 20 }}

//                 className="rounded-lg  mb-3">
//                 {Menu2?.map((menu, idx) => (
//                   <View key={idx}>
//                     <TouchableOpacity
//                       onPress={menu.onPress}
//                       className="flex-row justify-between p-4 pl-5 "
//                     >
//                       <View className="flex-row">
//                         <View
//                           style={{
//                             backgroundColor: menu.colorIcon,
//                             aspectRatio: 1,
//                           }}
//                           className="p-[1px] rounded-md items-center justify-center"
//                         >
//                           {menu.icon}
//                         </View>
//                         <Text className="text-lg font-bold  text-black ml-4">
//                           {menu.name}
//                         </Text>
//                       </View>
//                       <Ionicons name="chevron-forward" color="gray" size={24} />
//                     </TouchableOpacity>
//                     {idx !== Menu2.length - 1 && (
//                       <View className="flex-row justify-end">
//                         <View className="w-10/12 h-[1px] bg-white/10" />
//                       </View>
//                     )}
//                   </View>
//                 ))}
//               </View>
//               <View
//                 style={{ backgroundColor: COLORS.primary + 20 }}

//                 className="rounded-lg  mb-3">
//                 {Menus?.map((menu, idx) => (
//                   <View key={idx}>
//                     <TouchableOpacity
//                       onPress={menu.onPress}
//                       className="flex-row justify-between p-4 pl-5 "
//                     >
//                       <View className="flex-row">
//                         <View
//                           style={{
//                             backgroundColor: menu.colorIcon,
//                             aspectRatio: 1,
//                           }}
//                           className="p-[1px] rounded-md items-center justify-center"
//                         >
//                           {menu.icon}
//                         </View>
//                         <Text className="text-lg font-bold  text-black ml-4">
//                           {menu.name}
//                         </Text>
//                       </View>
//                       <View className="flex-row justify-end">
//                         {menu?.name == "Gérer votre compte" &&
//                           (!User?.fullName ||
//                             !User?.email ||
//                             !User?.phone) && (
//                             <View
//                               className="bg-red-600 rounded-full justify-center"
//                               style={{
//                                 aspectRatio: 1,
//                               }}
//                             >
//                               <Text className="text-base font-bold text-white text-center">
//                                 1
//                               </Text>
//                             </View>
//                           )}
//                         <Ionicons name="chevron-forward" color="gray" size={24} />
//                       </View>
//                     </TouchableOpacity>
//                     {idx !== Menus.length - 1 && (
//                       <View className="flex-row justify-end">
//                         <View className="w-10/12 h-[1px] bg-white/10" />
//                       </View>
//                     )}
//                   </View>
//                 ))}
//               </View>
//               <View
//                 style={{ backgroundColor: COLORS.primary + 20 }}

//                 className="rounded-lg  mb-3">
//                 <View>
//                   <TouchableOpacity
//                     onPress={showAlert}
//                     className="flex-row justify-between p-4 pl-3 "
//                   >
//                     <View className="flex-row">
//                       <Text className="text-lg font-bold  text-black ml-4">
//                         Logout
//                       </Text>
//                     </View>
//                     <View className="flex-row justify-end">
//                       <Ionicons name="chevron-forward" color="gray" size={24} />
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{
//                 height: 20,
//               }}
//             />
//           </ScrollView>
//         </>
//       ) : (
//         <View className="p-3 justify-center flex-1">
//           <View className='mb-20' >
//             <ButtonPrimary Loading={false} setLoading={() => { }} text='Log in to see settings' onPress={() => handleLogout()} />
//           </View>
//         </View>
//       )}

//     </View>
//   );
// };

// export default Menu;

// const styles = StyleSheet.create({
//   between: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//   },
// });


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
  FontAwesome6,
} from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVersion } from "@/helpers/GetVersion";
import { useFocusEffect } from "@react-navigation/native";
import { PacksCard } from "../../../components/cards/PacksCard";
import { ButtonPrimary } from "@/components/index";
import Constants from 'expo-constants';
import { getToken } from "@/helpers/getToken";

const Menu = ({ navigation, route }: { navigation: Navigate; route: any }) => {
  const dispatch = useDispatch();
  const [User, setUser] = useState<IUser | null>(null);
  const insets = useSafeAreaInsets();
  const [imageProfile, setImageProfile] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // State for delete operation

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const user = await AsyncStorage.getItem("@user");
        const img = await AsyncStorage.getItem("@imageProfile");
        setImageProfile(img);

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
          Url: "https://www.m3alempro.com/en/about",
        }),
    },
    {
      name: "Terms of use",
      icon: <Ionicons name="shield-checkmark-sharp" color="white" size={20} />,
      colorIcon: "#fe2d58",
      onPress: () =>
        navigation.navigate("WebView", {
          PageName: "Terms of use",
          Url: "https://www.m3alempro.com/en/terms",
        }),
    },
    {
      name: "Manage my account",
      icon: <SimpleLineIcons name="user" color="white" size={20} />,
      colorIcon: "#39c559",
      onPress: () => navigation.navigate("GestionDeCompte"),
    },
  ];

  const Menu2 = [
    {
      name: "Contact us",
      icon: <MaterialIcons name="support-agent" color="white" size={20} />,
      colorIcon: "orange",
      onPress: () =>
        navigation.navigate("WebView", {
          PageName: "Contact",
          Url: "https://www.m3alempro.com/en/contact",
        }),
    },
    {
      name: "Projects",
      icon: <MaterialIcons name="chat" color="white" size={20} />,
      colorIcon: "blue",
      onPress: () =>
        navigation.navigate("OrdersUserWithConversationsScreen"),
    },
    {
      name: "Direct Contacts",
      icon: <MaterialIcons name="chat" color="white" size={20} />,
      colorIcon: "blue",
      onPress: () =>
        navigation.navigate("DirectConversationsScreenForUser"),
    },
    {
      name: "A HOUSE GURU Blog",
      icon: <MaterialIcons name="model-training" color="white" size={20} />,
      colorIcon: "green",
      onPress: () =>
        navigation.navigate("WebView", {
          PageName: "A HOUSE GURU Blog",
          Url: "https://www.m3alempro.com/en/blog",
        }),
    },
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

  const showDeleteAccountAlert = () =>
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDeleteAccount,
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
    console.log("ParsedUser", ParsedUser);

    // @ts-ignore
    setIsConnected(!!ParsedUser?.email);
  };
  useEffect(() => {
    HandleConnected();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "No authentication token found.");
        setIsDeleting(false);
        return;
      }

      const headers = new Headers();
              headers.append("Content-Type", "application/json");
              headers.append("Authorization", `Bearer ${token}`);
      const response = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {

        method: "POST",
        headers,
        body: JSON.stringify({
          query: `mutation DeleteAccount {
            deleteAccount
          }`
        })
      });


      const Data = await response.json();

      console.log('Data', Data);


      if (Data?.data?.deleteAccount) {
        // Alert.alert("Success", "Your account has been deleted.");
        await AsyncStorage.removeItem("@token");
        await AsyncStorage.removeItem("@user");
        await AsyncStorage.removeItem("@imageProfile");
        dispatch(isLogin(false));
        navigation.navigate("Login");
      }

      if (Data?.errors[0]?.message) {
        Alert.alert("Error", Data?.errors[0]?.message || "Failed to delete account.");

      }



    } catch (error: any) {
      console.error("Delete Account Error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

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
            className="p-6"
          >
            <Text className="text-2xl text-start font-bold text-black">
              Settings
            </Text>
          </View>
          <View className="p-2 flex-row justify-center items-center bg-white/5"></View>
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
                style={{ backgroundColor: COLORS.primary + "20" }}
                className="rounded-lg "
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("GestionDeCompte")}
                  className="flex-row p-3 justify-between"
                >
                  <View className="flex-row">
                    {imageProfile ? (
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
                    )}
                    <View className="ml-2">
                      <Text className="text-black text-xl font-bold">
                        {User?.firstName + " " + User?.lastName || "Utilisateur"}{" "}
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
                style={{ backgroundColor: COLORS.primary + "20" }}
                className="rounded-lg  mb-3"
              >
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
                style={{ backgroundColor: COLORS.primary + "20" }}
                className="rounded-lg  mb-3"
              >
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

              {/* Delete Account Section */}
              <View
                style={{ backgroundColor: COLORS.primary + "20" }}
                className="rounded-lg  mb-3"
              >
                <View>
                  <TouchableOpacity
                    onPress={showDeleteAccountAlert}
                    className="flex-row justify-between p-4 pl-5 "
                  >
                    <View className="flex-row">
                      {isDeleting ? (
                        <ActivityIndicator size="small" color="red" />
                      ) : (
                        <View>
                          <View className="flex-row">
                            <View
                              style={{
                                backgroundColor: 'red',
                                aspectRatio: 1,
                              }}
                              className="p-[1px] rounded-md items-center justify-center"
                            >
                              {/* {menu.icon} */}
                              <Ionicons name="person-remove-sharp" color="white" size={22} />
                            </View>
                            <Text className="text-lg font-bold  text-black ml-4">
                              Delete Account
                            </Text>
                          </View>
                        </View>
                      )}
                      {/* <Text className="text-lg font-bold  text-black ml-4">
                        Delete Account
                      </Text> */}
                    </View>
                    <View className="flex-row justify-end">
                      <Ionicons name="chevron-forward" color="gray" size={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Logout Section */}
              <View
                style={{ backgroundColor: COLORS.primary + "20" }}
                className="rounded-lg  mb-3"
              >
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
          <View className="mb-20">
            <ButtonPrimary
              Loading={false}
              setLoading={() => { }}
              text="Log in to see settings"
              onPress={() => handleLogout()}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

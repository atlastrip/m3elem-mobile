// import * as Analytics from "expo-firebase-analytics";
import * as SplashScreen from "expo-splash-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, Linking, Platform, StatusBar, Text, View } from "react-native";
import { TabBarIcon } from "../components/index";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  setUser,
  setShowPopupCTA,
  setTokenPushNotification,
} from "../store/User";
import { COLORS } from "../constants/theme";
import tw from "twrnc";
import Spinner from "react-native-loading-spinner-overlay";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "../pages/Auth/QRCode";
import Packs from "../pages/Auth/Reservation";
import PackInfo from "../pages/Auth/PackInfo";
import LoginScreen from "../pages/Auth/Login";
import Notification from "../pages/ProjectDetails";
import Menu from "../pages/Auth/Menu";
import GestionDeCompte from "../pages/Auth/GestionDeCompte";
import CMIPayment from "../pages/Auth/CMIPayment";
import Congrats from "../pages/Auth/Congrats";
import WebViewer from "../pages/Auth/WebView";
import HomeMapScreen from "../pages/Auth/Home";
import { NetInfoState, useNetInfo } from "@react-native-community/netinfo";
import ConnectionLost from "@/pages/Auth/ConnectionLost";
import CashPlus from "@/pages/Auth/CashPlus";
import ForgetPassword from "@/pages/Auth/ForgetPassword";
import AfterOTPResetPassword from "@/pages/Auth/AfterOTPResetPassword";
import ContactUs from "@/pages/Auth/ContactUs";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import OnBoardingLogin from "@/pages/Auth/OnBoardingLogin";
import CreateAccount from "@/pages/Auth/CreateAccount";
import { AnimatedTabBarIcon } from "@/components/navigation/TabBarIcon";
import { delayFunctionExecution } from "@/helpers/delayFunctionExecution";
import PackCustom from "@/pages/Auth/PackCustom";
import History from "@/pages/Auth/History";
import HomeCoachScreen from "@/pages/Auth/CoachPages/HomeCoach";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import AddProduct from "@/pages/AddProduct";
import ProductQRCode from "@/pages/Auth/ProductQRCode";
import ProjectDetails from "../pages/ProjectDetails";
import ProductsPopup from "../pages/ProductsPopup";
import Categories from "../pages/Categories";
import Projects from "../pages/Projects";
import ProjectProducts from "../pages/ProjectProducts";
import ProjectProductsDetails from "../pages/ProjectProductsDetails";
import Portfolio from "@/pages/Portfolio";
import City from "@/pages/City";
import { PaperProvider } from "react-native-paper";
import ProfessionPage from "@/pages/Profession";
import Order from "@/pages/Order";
import Orders from "@/pages/Order/orders";
import OrderView from "@/pages/Order/orderViewer";
import ArtisanPage from "@/pages/Profession/artisan";
import ArtisanHomePage from "@/pages/Auth/Artisan";
import ArtisanOrders from "@/pages/Auth/Artisan/Orders";
import SwiperComponent from "@/pages/Auth/Artisan/Orders/DeckOrders";
import MyQrCode from "@/pages/Auth/Artisan/Orders/MyQrCode";
import MenuArtisan from "@/pages/Auth/MenuArtisan";
import NotificationsPage from "@/pages/Auth/Artisan/Notification";
import ImagePreview from "@/pages/ImagePreviewer";
import orderViewerArtisan from "@/pages/Order/orderViewerArtisan";
import OrderViewerArtisan from "@/pages/Order/orderViewerArtisan";
import Transactions from "@/pages/Auth/Artisan/Transactions";
import MyLeads from "@/pages/Auth/Artisan/MyLeads";
import PaymentMethodPage from "@/pages/Auth/Artisan/PaymentMethod";
import MapViewArtisan from "@/pages/Auth/Artisan/Map";
import ChatScreen from "@/pages/Chat";
import CompleteProfile from "@/pages/CompleteProfile";
import InstantResult from "@/pages/InstantResult";
import { ServiceProviderProfile } from "@/pages/ServiceProviderProfile";
import ConversationsScreen from "@/pages/ConversationsScreen";
import OrdersUserWithConversationsScreen from "@/pages/OrdersUserWithConversationsScreen";
import ConversationsScreenForUnlockedArtisant from "@/pages/ConversationsScreenForUnlockedArtisant";
import DirectConversationsScreenForUser from "@/pages/DirectConversationsScreenForUser";
import PhoneVerificationScreen from "@/pages/PhoneVerificationScreen";
import PhoneConfirmCodeScreen from "@/pages/PhoneConfirmCodeScreen";
import CreateAccountForArtisant from "@/pages/Auth/CreateAccountForArtisant";
import GestionDeCompteArtisant from "@/pages/Auth/GestionDeCompteArtisant";
import CreateAccountForArtisantNextPage from "@/pages/Auth/CreateAccountForArtisantNextPage";
import VerificationAccountArtisantScreen from "@/pages/VerificationAccountArtisantScreen";
import ChatForArtisant from "@/pages/ChatForArtisant";
import ProProfile from "@/pages/ProProfile";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),

  handleSuccess: async (identifier) => {
    console.log("success", identifier);
  },
});

// @ts-ignore
const apiUrl = Constants?.manifest?.extra?.apiUrl;

export type IPages =
  | "Root"
  | "Login"
  | "CreateAccount"
  | "ProductQRCode"
  | "PackInfo"
  | "Congrats"
  | "History"
  | "Verification"
  | "GestionDeCompte"
  | "ProductsPopup"
  | "Projects"
  | "ProjectProducts"
  | "ProjectProductsDetails"
  | "Categories"
  | "MyInfo"
  | "Map"
  | "Scans"
  | "Listing"
  | "FoodViewer"
  | "Livreur"
  | "ProjectDetails"
  | "Profil"
  | "ContactUs"
  | "Packs"
  | "Home"
  | "CMIPayment"
  | "Auth"
  | "CashPlus"
  | "ForgetPassword"
  | "AfterOTPResetPassword"
  | "PackCustom"
  | "WebView"
  | "Products"
  | "PacksCrenaux"
  | "Statistics"
  | "AddProduct"
  | "Notification"
  | "PaymentMethod"
  | "Transactions"
  | "MyLeads"
  | "CompleteProfile"
  | "InstantResult"
  | "ServiceProviderProfile"
  | "ConversationsScreen"
  | "OrdersUserWithConversationsScreen"
  | "ConversationsScreenForUnlockedArtisant"
  | "DirectConversationsScreenForUser"
  | "PhoneVerificationScreen"
  | "PhoneConfirmCodeScreen"
  | "CreateAccountForArtisant"
  | "GestionDeCompteArtisant"
  | "CreateAccountForArtisantNextPage"
  | "VerificationAccountArtisantScreen"
  | "ProProfile"


  ;
export interface Navigate {
  navigate: (page: IPages, Params?: any) => void;
  goBack: () => void;
}

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const GroupPack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pack"
        component={Packs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const GroupParametre = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GestionDeCompte"
        component={GestionDeCompte}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GestionDeCompteArtisant"
        component={GestionDeCompteArtisant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const GroupParametreArtisan = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="_Menu"
        component={MenuArtisan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationsPage}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodPage}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="MapViewArtisan"
        component={MapViewArtisan}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyLeads"
        component={MyLeads}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GestionDeCompte"
        component={GestionDeCompte}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GestionDeCompteArtisant"
        component={GestionDeCompteArtisant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const GroupeOrder = () => {
  return (<Stack.Navigator>
    <Stack.Screen
      name="Orders"
      component={Orders}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="OrderViewUser"
      component={OrderView}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="InstantResult"
      component={InstantResult}
      options={{
        headerShown: false,
      }}
    />

  </Stack.Navigator>)
}
const ArtisanGroupeOrder = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="_Orders"
        component={ArtisanOrders}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
const GroupHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfessionPage"
        component={ProfessionPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ArtisanPage"
        component={ArtisanPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

function BottomTabNavigator() {
  const Dispatch = useDispatch();

  return (
    <BottomTab.Navigator
      initialRouteName="Explorer"
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
          paddingHorizontal: 5,
          paddingTop: 8,
          backgroundColor: "white",
        },

        header: () => <></>,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={ArtisanHomePage}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              // Icon={<Ionicons name="home" size={24} color="black" />}
              name="Home"
              source={require("../assets/png/explorer.png")}
              isFocuse={focused}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Leads"
        component={ArtisanGroupeOrder}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              // Icon={<Ionicons name="home" size={24} color="black" />}
              name="Leads"
              source={require("../assets/png/offer.png")}
              isFocuse={focused}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={GroupParametreArtisan}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              name="Settings"
              Icon={<Ionicons name="heart-outline" size={24} color="black" />}
              source={require("../assets/png/settings.png")}
              isFocuse={focused} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
function BottomTabNavigatorUser() {
  const Dispatch = useDispatch();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
          paddingHorizontal: 5,
          borderTopColor: "#FFFFFF",
          borderTopWidth: 0.5,
          paddingTop: 8,
          backgroundColor: "white",
        },
        header: () => <></>,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name={`Explore`}
        component={GroupHome}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              name="Explore"
              Icon={<Ionicons name="home" size={24} color="black" />}
              // name="Acceil"
              source={require("../assets/png/explorer.png")}

              isFocuse={focused}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="-Orders"
        // component={HomeMapScreen}
        component={GroupeOrder}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AnimatedTabBarIcon
              name="Orders"

              Icon={<MaterialCommunityIcons name="handshake-outline" size={24} color="red" />}
              // name="Products"
              source={require("../assets/png/offer.png")}

              isFocuse={focused}
              hasNewFeature
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu _"
        component={GroupParametre}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabBarIcon
              name="Settings"
              Icon={<Ionicons name="heart-outline" size={24} color="black" />}
              source={require("../assets/png/settings.png")}
              isFocuse={focused} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function RootNavigator() {


  const parseUrl = (url: any) => {
    const regex = /https:\/\/m3elem.vercel.app\/en\/pro\/artisan\/(\w+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return { name: 'Artisan', params: { id: match[1] } };
    }
    return null;
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const responseListener = useRef();
  const notificationListener: any = useRef();
  const navigationRef: any = useRef();

  const [CurrentApp, setCurrentApp] = useState("APP");
  const state = useSelector((state: any) => state?.user?.isAuth);
  const role = useSelector((state: any) => state?.user?.User?.role);
  // console.log({role})
  const Connected = useSelector((state: any) => state?.user?.Connected);
  const dispatch = useDispatch();
  const [isLoadingComplete, setLoadingComplete] = useState(true);
  const [HasLanguage, setHasLanguage] = useState(false);
  const [IsCoach, setIsCoach] = useState(true);

  const getToken = async () => {
    const value = await AsyncStorage.getItem("@token");
    const userString = await AsyncStorage.getItem("@user");
    const user = (userString || '')?.length > 0 ? JSON.parse(userString as string) : null
    // const value = false
    if (value) {
      dispatch(isLogin(true));
      dispatch(setUser(user));
      setLoadingComplete(false);
    } else {
      dispatch(isLogin(false));
      setLoadingComplete(false);
    }
  };

  useEffect(() => {
    getToken();
    useLanguage();
  }, [state]);

  const useLanguage = async () => {
    const Langue = await AsyncStorage.getItem("@language");
    if (Langue) {
      setHasLanguage(true);
    }
  };

  if (isLoadingComplete) {
    return (
      <View style={tw`flex-1 bg-black`}>
        <StatusBar backgroundColor="#000" barStyle="dark-content" />
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={isLoadingComplete}
          //Text with the Spinner
          textContent={"Chargement en cours..."}
          //Text style of the Spinner Text
          textStyle={tw`text-white`}
        />
      </View>
    );
  }



  return (
    <Stack.Navigator>
      <>
        {Connected ? (
          <>
            {!state ? (
              <Stack.Group>
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="OnBoardingLogin"
                  component={OnBoardingLogin}
                />
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  name="CreateAccount"
                  component={CreateAccount}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreateAccountForArtisant"
                  component={CreateAccountForArtisant}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreateAccountForArtisantNextPage"
                  component={CreateAccountForArtisantNextPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PhoneVerificationScreen"
                  component={PhoneVerificationScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PhoneConfirmCodeScreen"
                  component={PhoneConfirmCodeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="VerificationAccountArtisantScreen"
                  component={VerificationAccountArtisantScreen}
                  options={{ headerShown: false }}
                />

              </Stack.Group>

            ) : (
              <>
                <Stack.Group>
                  {role !== 'artisant' ? (
                    <>
                      <Stack.Screen
                        options={{
                          headerShown: false,
                        }}
                        name="Explore_"
                        component={BottomTabNavigatorUser}
                      />
                      <Stack.Screen
                        name="Chat"
                        component={ChatScreen}
                        options={{
                          headerShown: false,
                        }}
                      />
                        <Stack.Screen
                        name="ChatForArtisant"
                        component={ChatForArtisant}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="InstantResult"
                        component={InstantResult}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="ProProfile"
                        component={ProProfile}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="ServiceProviderProfile"
                        component={ServiceProviderProfile}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="ImagePreview"
                        component={ImagePreview}
                        options={{
                          headerShown: false,
                          presentation: 'modal',
                        }}
                      />
                      <Stack.Screen
                        name="OrderViewUser"
                        component={OrderView}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="OrdersUserWithConversationsScreen"
                        component={OrdersUserWithConversationsScreen}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="ConversationsScreenForUnlockedArtisant"
                        component={ConversationsScreenForUnlockedArtisant}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="DirectConversationsScreenForUser"
                        component={DirectConversationsScreenForUser}
                        options={{
                          headerShown: false,
                        }}
                      />

                    </>
                  ) : (
                    <>
                      <Stack.Screen
                        options={{
                          headerShown: false,
                        }}
                        name="Home"
                        component={BottomTabNavigator}
                      />



                      <Stack.Screen
                        name="CompleteProfile"
                        component={CompleteProfile}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="Transactions"
                        component={Transactions}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="MyLeads"
                        component={MyLeads}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="OrderView"
                        component={OrderViewerArtisan}
                        options={{
                          headerShown: false,
                          presentation: 'modal',
                        }}
                      />
                      <Stack.Screen
                        name="Chat"
                        component={ChatScreen}
                        options={{
                          headerShown: false,
                        }}
                      />
                       <Stack.Screen
                        name="ChatForArtisant"
                        component={ChatForArtisant}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="ConversationsScreen"
                        component={ConversationsScreen}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="OrderViewerArtisan"
                        component={OrderViewerArtisan}
                        options={{
                          headerShown: false,
                          presentation: 'modal',
                        }}
                      />
                      <Stack.Screen
                        name="OrderViewUser"
                        component={OrderView}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="ImagePreview"
                        component={ImagePreview}
                        options={{
                          headerShown: false,
                          presentation: 'modal',
                        }}
                      />
                      <Stack.Screen
                        options={{
                          headerShown: false,
                          // presentation: 'modal', // This presents the screen as a modal overlay
                        }}
                        name="DeckOrders"
                        component={SwiperComponent}
                      />
                      <Stack.Screen
                        options={{
                          headerShown: false,
                          presentation: 'formSheet', // This presents the screen as a modal overlay
                        }}
                        name="MyQrCode"
                        component={MyQrCode}
                      />
                    </>
                  )}
                </Stack.Group>
              </>
            )}
          </>
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ConnectionLost"
            component={ConnectionLost}
          />
        )}
      </>

    </Stack.Navigator>
  );
}

export function handleRegistrationError(errorMessage: string) {
  Alert.alert(errorMessage);
  throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsyncBro() {
  console.log('====================================');
  console.log('yoooo');
  console.log('====================================');
  console.log('Constants.expoConfig.extra.eas.projectId', Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId);

  // let token;
  // if (Device.isDevice) {

  //   const { status: existingStatus } =
  //   await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== "granted") {
  //     console.log('sss');

  //     if (Platform.OS === 'android') {
  //       Notifications.setNotificationChannelAsync('default', {
  //         name: 'default',
  //         importance: Notifications.AndroidImportance.MAX,
  //         vibrationPattern: [0, 250, 250, 250],
  //         lightColor: '#FF231F7C',
  //       });
  //     }

  //       const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //       let finalStatus = existingStatus;
  //       if (existingStatus !== 'granted') {
  //         const { status } = await Notifications.requestPermissionsAsync();
  //         finalStatus = status;
  //       }
  //       if (finalStatus !== 'granted') {
  //         handleRegistrationError('Permission not granted to get push token for push notification!');
  //         return;
  //       }
  //       const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
  //       if (!projectId) {
  //         handleRegistrationError('Project ID not found');
  //       }
  //       try {
  //         const pushTokenString = (
  //           await Notifications.getExpoPushTokenAsync({
  //             projectId,
  //           })
  //         ).data;
  //         console.log(pushTokenString);
  //         return pushTokenString;
  //       } catch (e: unknown) {
  //         handleRegistrationError(`${e}`);
  //       }
  //     // } else {
  //     //   handleRegistrationError('Must use physical device for push notifications');
  //     // }
  //   }

  // }
  // return token;

  let token;
  if (Device.isDevice) {
    const { status: existingStatus, canAskAgain } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Info", "Veuillez activez les notifications.");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId,
    })).data;
    console.log(token);
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export default function Navigation() {
  // const queryClient = new QueryClient();

  const [expoPushToken, setExpoPushToken] = useState("");
  // const [TokenPushNotification, setTokenPushNotification] = useState("");
  const [notification, setNotification]: any = useState(false);
  const notificationListener: any = useRef();
  const responseListener: any = useRef();
  const navigationRef = useRef<any>(null);
  const routeNameRef = useRef();

  useEffect(() => {
    registerForPushNotificationsAsyncBro();
  }, []);


  // useEffect(() => {
  //   if (notificationListener) {
  //     notificationListener.current =
  //       Notifications.addNotificationReceivedListener((notification) => {
  //         setNotification(notification);
  //       });
  //     responseListener.current =
  //       Notifications.addNotificationResponseReceivedListener((response) => {
  //         console.log(JSON.stringify({ notification: response }, undefined, 2));
  //         const Page = response?.notification.request?.content?.data?.Page;
  //         const Params = response?.notification.request?.content?.data?.Params;

  //         if (Params) {
  //           navigationRef.current?.navigate(Page, Params);
  //         } else if (typeof Page === "string") {
  //           navigationRef.current?.navigate(Page);
  //         }
  //         console.info({ Page, Params });
  //       });

  //     return () => {
  //       Notifications.removeNotificationSubscription(
  //         notificationListener?.current
  //       );
  //       Notifications.removeNotificationSubscription(responseListener?.current);
  //     };
  //   }
  // }, [responseListener.current]);
  useEffect(() => {
    if (notificationListener) {
      // Listen for notifications when they are received
      notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        console.log('notification', notification);

        setNotification(notification);
      });

      // Listen for notification responses (when the user interacts with them)
      responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(JSON.stringify({ notification: response }, undefined, 2));

        const data = response?.notification.request?.content?.data;
        console.log('====================================');
        console.log('data', data);
        console.log('====================================');

        if (data) {
          const Page = data.Page || 'Home';  // Default to 'Home' if Page isn't available
          const Params = data.Params || {};  // Default to an empty object if Params isn't available

          // Navigate based on the notification data
          if (Params) {
            navigationRef.current?.navigate(Page, Params);
          } else if (typeof Page === 'string') {
            navigationRef.current?.navigate(Page);
          }
          console.info({ Page, Params });
        }
      });

      // Cleanup the listeners on component unmount
      return () => {
        Notifications.removeNotificationSubscription(notificationListener?.current);
        Notifications.removeNotificationSubscription(responseListener?.current);
      };
    }
  }, [responseListener.current]);


  // useEffect(()=>{
  //   SplashScreen.hideAsync();
  // },[])

  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      const result = await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }





  return (
    <PaperProvider>
      <NavigationContainer
        ref={(navigatorRef) => {
          onLayoutRootView();
          navigationRef.current = navigatorRef;
        }}
        onReady={() => {
          routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef?.current?.getCurrentRoute()?.name;
          const currentRouteOptions =
            navigationRef?.current?.getCurrentRoute()?.params?.id ||
            navigationRef?.current?.getCurrentRoute()?.params?.Title ||
            "No varient";

          const trackScreenView = () => {
            // Analytics.logEvent("screen_view_rn", {
            //   screen: currentRouteName || "Map",
            //   variant: currentRouteOptions,
            // });
          };

          if (previousRouteName !== currentRouteName) {
            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName || "";
            if (typeof currentRouteName === "string") {
              trackScreenView();
            }
          }
        }}
      >
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

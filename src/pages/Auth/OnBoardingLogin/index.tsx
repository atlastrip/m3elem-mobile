import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import { COLORS, SHADOWS } from "../../../constants/theme";
import window from "../../../constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, setLoadingPage } from "../../../store/User";
import { ButtonPrimary } from "../../../components/index";
import { FontAwesome5 } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import { registerForPushNotificationsAsync } from "@/components/pushNotification";
import { Motion } from "@legendapp/motion";
import { LoginWithApple } from "@/components/buttons/LoginWithApple";
import LoadingPage from "@/components/Layout/LoadingPage";
import { useFocusEffect } from "@react-navigation/native";
interface ICheckoutType {
  name: string;
  isSelected: boolean;
  setSelectedPayType: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  TYPE: string;
}
WebBrowser.maybeCompleteAuthSession();

export const getStringProperty = (
  someUnknown: unknown,
  propertyName: string
): string | unknown => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = (someUnknown as any)[propertyName];
    if (typeof p === "string") {
      return p;
    }
  } catch {
    // Ignore.
  }

  return undefined;
};
const GoogleEnv = {
  clientId:
    "595961874472-obn3ip8ajojv7dmjia29osu5u9pmaq5u.apps.googleusercontent.com",
  iosClientId:
    "595961874472-o02ute49jq85lkt93oi6rhecvao87skc.apps.googleusercontent.com",
  androidClientId:
    "595961874472-3pmkc1kskp122fpusqejn3e0i7p824uj.apps.googleusercontent.com",
};

const OnBoardingLogin = ({ navigation }: { navigation: Navigate }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.setItem("@location", "false");
    }, [])
  );
  const [identity, setIdentity] = useState<
    AppleAuthenticationCredential | undefined
  >(undefined);

  useEffect(() => {
    if (identity?.identityToken) {
      HandleLoginWithApple({
        identityToken: identity?.identityToken || "",
      });
    }
  }, [identity?.identityToken]);

  interface IToken {
    identityToken: string;
  }
  const HandleLoginWithApple = async (token: IToken) => {
    dispatch(setLoadingPage(true));
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const res = await fetch(
        "https://pantofit.pythonanywhere.com/social-auth/apple",
        {
          method: "POST",
          headers,
          body: JSON.stringify(token),
        }
      );

      const json = await res.json();
      if (json?.user) {
        await AsyncStorage.setItem(
          "@token",
          JSON.stringify({
            refresh: json?.refresh_token,
            access: json?.access_token,
          })
        );
        await AsyncStorage.setItem("@user", JSON.stringify(json?.user));
        dispatch(isLogin(true));
        
        dispatch(setLoadingPage(false));
      } else {
        dispatch(setLoadingPage(false));

        Alert.alert(JSON.stringify(json, undefined, 2));
        // Alert.alert(json?.detail);
        setERR(JSON.stringify(json, undefined, 2));
      }
    } catch (err) {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      dispatch(setLoadingPage(false));
    }
  };

  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState(null);
  const [ERR, setERR] = useState("");
  const [requestG, responseG, promptAsyncG] =
    Google.useIdTokenAuthRequest(GoogleEnv);

  React.useEffect(() => {
    console.log(JSON.stringify({ response: responseG }, undefined, 2));
    if (responseG?.type === "success") {
      HandleLoginWithGoogle(responseG.params.id_token);
    }
  }, [responseG, accessToken]);

  const HandleLoginWithGoogle = async (token: string) => {
    dispatch(setLoadingPage(true));
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const res = await fetch(
        "https://pantofit.pythonanywhere.com/social-auth/google",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            token,
          }),
        }
      );

      const json = await res.json();
      console.log({ json });
      if (json?.user) {
        await AsyncStorage.setItem(
          "@token",
          JSON.stringify({
            refresh: json?.refresh_token,
            access: json?.access_token,
          })
        );
        await AsyncStorage.setItem("@user", JSON.stringify(json?.user));
        dispatch(setLoadingPage(false));
        dispatch(isLogin(true));
      } else {
        dispatch(setLoadingPage(false));

        Alert.alert(json?.detail);
        setERR(json?.detail);
      }
    } catch (err) {
      dispatch(setLoadingPage(false));

      console.log({ err });
    }
  };

  const [DotIndex, setDotIndex] = useState(0);

  const flatListRef = useRef(null);


  const HandleScrollToIndex = (index: number) => {
    if (flatListRef) {
      // @ts-ignore
      flatListRef?.current?.scrollToIndex({ animated: true, index });
    }
  };

  const Screens = [
    {
      idx: 111,
      name: "ServiceDay find Reliable Handymen.",
      Image: (
        // <Image
        //   resizeMode="contain"
        //   source={require("./Images/1.png")}
        //   style={{
        //     width: window.width * 0.5,
        //     height: window.width * 0.5,
        //   }}
        // />
        <Image
          resizeMode="contain"
          source={require('@/assets/vec-1.avif')}
          style={{
            width: window.width * 0.7,
            height: window.width * 0.7,
          }}
        />
      ),
      description:
      "Connecting with skilled, vetted handymen in Casablanca is quick and easy with our app. From plumbing and electrical work to carpentry and general maintenance, we've got you covered."
        // "Embark on an immersive journey through captivating audio tours. Explore new destinations and uncover the hidden gems of the world, all through the power of sound.",
    },
    {
      idx: 112,
      name: "Our experts",
      Image: (
        <Image
          resizeMode="contain"
          source={require("@/assets/png/illus.webp")}
          style={{
            width: window.width * 0.7,
            height: window.width * 0.7,
          }}
        />
      ),
      description:
      "Connect with Skilled Handymen for All Your Home Needs"
        // "Choose from a variety of curated tours tailored to your interests. Whether you're into history, nature, or culinary adventures, there's a journey waiting just for you.",
    },

  ];


  const TokenPushNotification = useSelector(
    (state: any) => state?.user?.TokenPushNotification
  );


  return (
    <View
      style={{
        backgroundColor: "#000000",
        flex: 1,
        paddingTop: insets?.top,
      }}
    >
      <Image
        style={{
          width: window.width,
          height: window.height,
          resizeMode: "cover"
        }}
        className="absolute object-center object-cover"
        source={{uri  : "https://m3elem.vercel.app/_next/static/media/background.6c3571e0.jpg" }}


      />
      <LoadingPage />
      <View className="flex-row justify-end px-3">
        <Button title="Guest mode" onPress={async () => {

          await AsyncStorage.setItem("@token", JSON.stringify({
            refresh: "",
            access: "",
          }))
          
          await AsyncStorage.setItem("@user", JSON.stringify({user : {fullName : "Hello"}}))
          return dispatch(isLogin(true));

        }} />
      </View>

      <View className="flex-1 relative">
        <FlatList
          className=""
          data={Screens}
          ref={flatListRef}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: window?.width,
              }}
              className="w-full flex-1 justify-end mb-5 items-center"
            >
              <Text

                className={`text-primary-500 ${window.width > 400 ? 'text-7xl' : "text-3xl"} px-5 mt-6 font-bold text-left w-full`}>
                {item?.name}
              </Text>
              <Text
                style={{
                  width: window.width,
                }}
                className="text-black font-medium text-xl px-5 pt-5 text-left"
              >
                {item?.description}
              </Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate={"fast"}
          keyExtractor={(item, idx) => "" + item.idx + idx}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(
              event.nativeEvent.contentOffset.x / window?.width
            );

            setDotIndex(index);
          }}
          onScroll={(event) => {
            if (event.nativeEvent.contentOffset.x > (window?.width + (window?.width / 5))) {
              navigation.navigate('Login')
            }
          }}
          snapToInterval={window?.width}
          horizontal
        />
        <View className="items-center hidden flex-row mb-3 mt-3 z-50 w-full justify-center">
          <View className="flex-row p-2 rounded-full bg-[#333333]">
            {Array(2)
              .fill(0)
              .map((e, index) => (
                <TouchableOpacity
                  onPress={() => HandleScrollToIndex(index)}
                  key={index}
                  style={{
                    backgroundColor:
                      DotIndex === index ? COLORS.primary : "white",
                    width: DotIndex === index ? 20 : 12,
                    height: 12,
                    // aspectRatio : 1,
                    borderRadius: 9999,
                    marginRight: 3,
                    marginLeft: 3,
                    ...SHADOWS.small,
                  }}
                />
              ))}
          </View>
        </View>
      </View>
      <View className=" rounded-t-3x p-6 ">
        <TouchableOpacity
          className=" mr-2 items-center justify-center -mt-6 rounded-full flex-row"
          style={[{ width: "100%", height: 60 , backgroundColor : COLORS.primary}]}
          // onPress={() => navigation.navigate('Login')}
          onPress={() => navigation.navigate('Login')}
        >
          <Text
            style={{
              fontSize: 18,
            }}
            className="text-white font-medium "
          >
            {" "}
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingLogin;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

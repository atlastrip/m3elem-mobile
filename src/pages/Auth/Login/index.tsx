import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { isLogin, IUser, setUser } from "../../../store/User";
import { ButtonPrimary } from "../../../components/index";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { registerForPushNotificationsAsync } from "@/components/pushNotification";
import { LoginWithApple } from "@/components/buttons/LoginWithApple";
import LoadingPage from "@/components/Layout/LoadingPage";
import * as Device from "expo-device";
import { COLORS } from "../../../constants/theme";
import { Button } from "react-native";
import window from "../../../constants/Layout";
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

const GoogleEnv = {
  clientId:
    "595961874472-obn3ip8ajojv7dmjia29osu5u9pmaq5u.apps.googleusercontent.com",
  iosClientId:
    "595961874472-o02ute49jq85lkt93oi6rhecvao87skc.apps.googleusercontent.com",
  androidClientId:
    "595961874472-3pmkc1kskp122fpusqejn3e0i7p824uj.apps.googleusercontent.com",
};



const LoginScreen = ({ navigation }: { navigation: Navigate }) => {
  const insets = useSafeAreaInsets();

  const [Loading, setLoading] = useState(false);
  const [username, setUsername] = useState("newAzeddine@gmail.com");
  const [password, setPassword] = useState("123");
  const [ShowPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [identity, setIdentity] = useState<
    AppleAuthenticationCredential | undefined
  >(undefined);

  // useEffect(()=>{
  //     setUsername('0621664802');
  //     setPassword('P@ntofit');
  // },[])

  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [ERR, setERR] = useState("");
  const [requestG, responseG, promptAsyncG] = Google.useIdTokenAuthRequest({
    ...GoogleEnv,
  });
  const [ERR_requestG, setERR_requestG] = useState("");

  const [rememberMe, setRememberMe] = useState(false);


  const HandleLoginWithGoogle = async (token: string) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl as string,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `mutation Mutation($input: inputLogin) {
              login(input: $input) {
                user {
                  id
                  fullName
                  email
                  phone
                }
                token
              }
            }`,
            variables: {
              email: username,
              password
            }
          }),
        }
      );

      const json = await res.json();
      console.info({ json: json.data?.login });
      if (json?.user) {
        await AsyncStorage.setItem(
          "@token",
          json.data?.login?.token
        );
        await AsyncStorage.setItem("@user", JSON.stringify(json.data?.login?.user));
        dispatch(isLogin(true));
        const token = await registerForPushNotificationsAsync();
        console.info({ token });

      } else {
        setLoading(false);
        setERR(JSON.stringify(json, undefined, 2));
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("error", JSON.stringify(err, undefined, 2));
      // Alert.alert(json?.detail);
      setERR(JSON.stringify(err, undefined, 2));
    }
  };




  const FetchAuth = async (em = null, ps = null) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    try {
      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl as string,
        {
          method: "POST",
          headers,

          body: JSON.stringify({
            query: `mutation Mutation($inputLogin: LoginInput) {
              login(inputLogin: $inputLogin) {
                user {
                  id
                  firstName
                  lastName
                  email
                  phone
                  role
                  imageProfile
                }
                token
              }
            }`,
            variables: {
              inputLogin: {
                email: em || username,
                password: ps || password
              }
            }
          }),
        }
      );

      const json = await res.json();
      if (json.data?.login?.user) {
        console.info('user', json.data?.login.user);
        console.info('token', json.data?.login.token);

        await AsyncStorage.setItem(
          "@token",
          json.data?.login?.token
        );
        await AsyncStorage.setItem("@imageProfile", json.data?.login?.user?.imageProfile);
        await AsyncStorage.setItem("@user", JSON.stringify(json.data?.login?.user));
        await AsyncStorage.setItem("@signed-user", JSON.stringify({ email: em || username, password: ps || password }));
        dispatch(isLogin(true));
        dispatch(setUser(json.data?.login?.user));
        // console.log({ user: json.data?.login?.user })
        // const token = await registerForPushNotificationsAsync();
        // console.info({ token });

      } else {
        setLoading(false);
        setERR(JSON.stringify(json, undefined, 2));
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("error", JSON.stringify(err, undefined, 2));
      // Alert.alert(json?.detail);
      setERR(JSON.stringify(err, undefined, 2));
    }
  };

  const [SignedUser, setSignedUser] = useState<{ email: string, password: string } | null>(null);
  const getSignedUser = async () => {
    const stringUser = await AsyncStorage.getItem('@signed-user');
    if ((stringUser || '')?.length > 0) {
      setSignedUser(JSON.parse(stringUser || '{}'))
    } else {
      null
    }
  }


  useEffect(() => {
    getSignedUser()
  }, [])

  const handleLoginWithSignedUser = () => {
    setUsername(SignedUser?.email || "")
    setPassword(SignedUser?.password || "")
    setLoading(true)
    // @ts-ignore
    FetchAuth(SignedUser?.email || '', SignedUser?.password)
  }



  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingTop: insets?.top,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} className="px-4 rounded-full shadow-sm shadow-slate-400">
        <Ionicons name="chevron-back" color="#2B61E3" size={22} />
      </TouchableOpacity>
      <LoadingPage />

      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
        className="p-3 "
      >
        <View
          style={{
            flex: 1,
          }}
          className=""
        >
          <View className="flex-row justify-center flex-1">
            <Image
              resizeMode="contain"
              style={{
                width: window.width,
                height: window.width
              }}
              // source={require('@/assets/png/gift-box.png')}
              source={require('@/assets/handyman.webp')}

            />
          </View>
          <Text
            style={{ color: COLORS.primary }}
            className=" text-2xl font-bold my-4 text-center">
            Log in again!
          </Text>
          {(SignedUser) && (
            <View className="px-3">
              <TouchableOpacity
                style={{ backgroundColor: COLORS.primary + 20 }}
                onPress={handleLoginWithSignedUser}
                className="rounded-2xl border-2 border-primary-500 outline-2 outline-offset-2 outline-primary-500 p-3" >
                <Text className="text-center text-base text-primary-500 font-semibold">
                  Log in again with : {SignedUser?.email}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View className="px-3">
            <View>
              {/* <Text className=" text-black mb-2">Full Name</Text> */}
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={{
                  borderColor: "#00000050",
                }}
                placeholderTextColor={"#00000050"}
                className="text-black border-b border-[#2B61E3] text-lg p-3 mb-3"
                // keyboardType="number-pad"
                placeholder="Enter your full name"
              />
            </View>
            <View className="">
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  className="text-black border-b border-[#2B61E3] text-lg p-3 mb-3"
                  keyboardType="default"
                  placeholderTextColor={"#00000050"}
                  placeholder="Enter your password"
                  textContentType="password"
                  secureTextEntry={!ShowPassword}
                // style={{
                //   borderColor: Errors?.pass?.length === 0 ? "#00000050" : "red",
                // }}
                />
                {/* {Errors?.pass && (
          <Text className="text-red-600 mb-3 ml-4">{Errors?.pass}</Text>
        )} */}
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-[15%]"
                >
                  <Ionicons
                    name={!ShowPassword ? "eye-off" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderWidth: 1,
                    borderColor: '#2B61E3',
                    borderRadius: 4,
                    marginRight: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {rememberMe && (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: '#2B61E3',
                        borderRadius: 3,
                      }}
                    />
                  )}
                </View>
                <Text className="mb-6 text-md pt-6">Remember me</Text>
              </TouchableOpacity>
              <View className="mt-6">
                <Text className="text-[#062265]">Forgot password?</Text>
              </View>
            </View>
            {ERR?.length !== 0 && (
              <Text className="text-red-600 text-base p-3">{ERR}</Text>
            )}
            <ButtonPrimary
              Loading={Loading}
              onPress={FetchAuth}
              setLoading={setLoading}
              text="Log in"
            />
          </View>

          <View className="w-full hidden flex-row items-center my-3 px-5">
            <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
            <View className="w-3" />
            <Text className="text-gray-500">Or log in with</Text>
            <View className="w-3" />
            <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
          </View>

          {/* <View className=""> */}
          <View className="hidden justify-center mt-3 pb-3 px-5">
            <TouchableOpacity
              className="bg-white  mr-2 items-center justify-center rounded-xl flex-row"
              style={[{ width: "100%", height: 50 }]}
              onPress={() => promptAsyncG()}
            >
              <FontAwesome5 name="google" size={15} color="#2B61E3" />
              <Text
                style={{
                  fontSize: 18,
                }}
                className=" font-medium text-[#2B61E3]"
              >
                {" "}
                Continue with Google
              </Text>
            </TouchableOpacity>

          </View>
          {/* </View> */}
          <View className="flex-row justify-center gap-2 mt-1">
            <View>
              <Text className="text-center text-[16px]">
                New to ServiceDay?
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateAccount')}
            >
              <Text
                style={{ color: COLORS.primary }}
                className="text-center text-[16px] ">
                Sign up here
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 10,
            }}
          />
          <View
            style={{
              height: insets?.bottom || 3,
            }}
          />
        </View>
      </KeyboardAwareScrollView >
    </View >

  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  // socialIcons: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 10, // Adjust spacing as needed
  // },
});

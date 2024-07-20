import {
  ActivityIndicator,
  Alert,
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
import React, { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IPack } from "../Reservation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import window from "../../../constants/Layout";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser, setLoadingPage } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonPrimary } from "@/components/index";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { registerForPushNotificationsAsync } from "@/components/pushNotification";
import { LoginWithApple } from "@/components/buttons/LoginWithApple";

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

const CreateAccount = ({
  navigation,
  route,
}: {
  navigation: Navigate;
  route: any;
}) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [User, setUser] = useState<IUser | null>(null);
  const [password, setPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  //login
  const [Loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  const [accessToken, setAccessToken] = React.useState<string | null>(null);


  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validateStrings = (text: string) => {
    return text.replace(/^a-zA-Z0-9]/g, "");
  };

  const CreateAccount = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const graphql = JSON.stringify({
      query: "mutation SignUp($input: inputSignUp) {\r\n  signUp(input: $input) {\r\n    token\r\n    user {\r\n      id\r\n      fullName\r\n      email\r\n      phone\r\n    }\r\n  }\r\n}",
      variables: { "input": { "phone": username, "password": password, "fullName": LastName, "email": Email.toLowerCase() } }
    })
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql
    };

    fetch("https://m3elem-app-ecj9f.ondigitalocean.app/m3elem", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        const res: { token: string, user: any } = result?.data?.signUp;

        if (res?.user) {
          await AsyncStorage.setItem(
            "@token",
            res?.token
          );
          await AsyncStorage.setItem("@user", JSON.stringify(res?.user));
          dispatch(isLogin(true));
        } else {

        }
      })
      .catch((error) => console.error(error));
  }


  const [Errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    password: "",
  });

  const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: elementIndex * window.width, animated: true });
    }
  };
  const scrollViewRef1 = useRef<any>(null);
  const [SelectedAccount, setSelectedAccount] = useState("User");

  return (
    <>
      <View
        className="flex-row justify-between items-center bg-white"
        style={{
          paddingTop: insets.top,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} className="px-4 rounded-full shadow-sm shadow-slate-400">
          <Ionicons name="chevron-back" color="#2B61E3" size={22} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => { }} className="p-2">
      <Ionicons name="chevron-back" color="transparent" size={24} />
    </TouchableOpacity> */}
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
        className=" bg-white pt-10"
      >
        <Text
          style={{ color: COLORS.primary }}
          className=" text-2xl font-bold my-1  text-center">
          Create a New Account
        </Text>
        <View className="flex-row justify-center">
          <View className="flex-row justify-center p-1 rounded-full bg-gray-50">
            <TouchableOpacity
              onPress={() => {
                setSelectedAccount('User');
                scrollToElement(scrollViewRef1, 0)
              }}
              style={(SelectedAccount === "User") ? { backgroundColor: COLORS.primary } : {}}
              className="w-32 p-1 rounded-full ">
              <Text className="text-lg font-bold text-center">
                User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedAccount('Artisan');
                scrollToElement(scrollViewRef1, 1)
              }}
              style={(SelectedAccount === "Artisan") ? { backgroundColor: COLORS.primary } : {}}
              className="w-32 p-1 rounded-full ">
              <Text className="text-lg font-bold text-center">
                Artisan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef1}
          snapToInterval={window?.width} // Snaps at each element width
          decelerationRate="fast"
          // scrollEnabled={!!SelectedProfession}
          onScroll={(event) => {
            if (event.nativeEvent.contentOffset.x >= window.width) {
              setSelectedAccount("Artisan")
            } else {
              setSelectedAccount("User")
            }
          }}
          style={{}} horizontal >

          <View style={{ width: window.width }} >
            <View className="px-5">
              <TextInput
                value={LastName}
                onChangeText={setLastName}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your full name"
                textContentType="name"
                style={{
                  borderColor: Errors?.firstName?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.firstName && (
                <Text className="text-red-600 mb-3 ml-4">{Errors?.firstName}</Text>
              )}
              {/* <Text className="text-black ml-2 mb-2">Phone Number</Text> */}
              <TextInput
                value={username}
                onChangeText={setUsername}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                keyboardType="number-pad"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your phone number"
                textContentType="telephoneNumber"
                style={{
                  borderColor: Errors?.number?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.number && (
                <Text className="text-red-600 mb-3 ml-4">{Errors?.number}</Text>
              )}
              {/* <Text className="text-black ml-2 mb-2">Email</Text> */}
              <TextInput
                value={Email}
                onChangeText={setEmail}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                keyboardType="email-address"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your email"
                textContentType="emailAddress"
                style={{
                  borderColor: Errors?.email?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.email && (
                <Text className="text-primary-500 mb-3 ml-4">{Errors?.email}</Text>
              )}
              {/* <Text className="text-black ml-2 mb-2">Password</Text> */}
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}

                  className="text-black border-b border-primary-500 text-lg p-3 mb-3"
                  keyboardType="visible-password"
                  placeholderTextColor={"#00000050"}
                  placeholder="Enter your password"
                  textContentType="password"
                  secureTextEntry={!ShowPassword}
                  style={{
                    borderColor: Errors?.password?.length === 0 ? "#00000050" : "red",
                  }}
                />
                {Errors?.password && (
                  <Text className="text-primary-500 mb-3 ml-4">{Errors?.password}</Text>
                )}
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-[15%]"
                >
                  <Ionicons
                    name={!ShowPassword ? "eye-off" : "eye"}
                    size={20}
                    color="black"
                    className="mt-6"
                  />
                </TouchableOpacity>
              </View>
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
                        backgroundColor: COLORS.primary,
                        borderRadius: 3,
                      }}
                    />
                  )}
                </View>
                <Text className="mb-3 text-md pt-3">Remember me</Text>
              </TouchableOpacity>
              <ButtonPrimary
                Loading={Loading}
                onPress={CreateAccount}
                setLoading={() => { }}
                text="Create an Account"
              />
            </View>


            <View className="w-full flex-row items-center mt-3 px-5">
              <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
              <View className="w-3" />
              <Text className="text-gray-400">Or</Text>
              <View className="w-3" />
              <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
            </View>
            <View className="justify-center mt-3 pb-3 px-5">

              <View className="flex-row justify-center mt-1 px-6">
                <Text className="text-black mb-3 text-base">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={{ color: COLORS.primary }}
                    className="text-center text-[16px] pt-1 text-primary-500">
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ width: window.width }} >
            <View className="px-5">
              <TextInput
                value={LastName}
                onChangeText={setLastName}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your full name"
                textContentType="name"
                style={{
                  borderColor: Errors?.firstName?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.firstName && (
                <Text className="text-red-600 mb-3 ml-4">{Errors?.firstName}</Text>
              )}
              {/* <Text className="text-black ml-2 mb-2">Phone Number</Text> */}
              <TextInput
                value={username}
                onChangeText={setUsername}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                keyboardType="number-pad"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your phone number"
                textContentType="telephoneNumber"
                style={{
                  borderColor: Errors?.number?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.number && (
                <Text className="text-red-600 mb-3 ml-4">{Errors?.number}</Text>
              )}
              {/* <Text className="text-black ml-2 mb-2">Email</Text> */}
              <TextInput
                value={Email}
                onChangeText={setEmail}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                keyboardType="email-address"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your email"
                textContentType="emailAddress"
                style={{
                  borderColor: Errors?.email?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.email && (
                <Text className="text-primary-500 mb-3 ml-4">{Errors?.email}</Text>
              )}
              {/* <Text className="text-black ml-2 mb-2">Password</Text> */}
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}

                  className="text-black border-b border-primary-500 text-lg p-3 mb-3"
                  keyboardType="visible-password"
                  placeholderTextColor={"#00000050"}
                  placeholder="Enter your password"
                  textContentType="password"
                  secureTextEntry={!ShowPassword}
                  style={{
                    borderColor: Errors?.password?.length === 0 ? "#00000050" : "red",
                  }}
                />
                {Errors?.password && (
                  <Text className="text-primary-500 mb-3 ml-4">{Errors?.password}</Text>
                )}
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-[15%]"
                >
                  <Ionicons
                    name={!ShowPassword ? "eye-off" : "eye"}
                    size={20}
                    color="black"
                    className="mt-6"
                  />
                </TouchableOpacity>
              </View>
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
                        backgroundColor: COLORS.primary,
                        borderRadius: 3,
                      }}
                    />
                  )}
                </View>
                <Text className="mb-3 text-md pt-3">Remember me</Text>
              </TouchableOpacity>
              <ButtonPrimary
                Loading={Loading}
                onPress={CreateAccount}
                setLoading={() => { }}
                text="Create an Account"
              />
            </View>


            <View className="w-full flex-row items-center mt-3 px-5">
              <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
              <View className="w-3" />
              <Text className="text-gray-400">Or</Text>
              <View className="w-3" />
              <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
            </View>
            <View className="justify-center mt-3 pb-3 px-5">

              <View className="flex-row justify-center mt-1 px-6">
                <Text className="text-black mb-3 text-base">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={{ color: COLORS.primary }}
                    className="text-center text-[16px] pt-1 text-primary-500">
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            height: 30,
          }}
        />
      </KeyboardAwareScrollView>
    </>

  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

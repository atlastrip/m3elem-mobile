// import {
//   Alert,
//   Image,
//   ImageBackground,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { Navigate, registerForPushNotificationsAsyncBro } from "navigation";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import * as AppleAuthentication from "expo-apple-authentication";
// import { AppleAuthenticationCredential } from "expo-apple-authentication";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useDispatch } from "react-redux";
// import { isLogin, IUser, setUser } from "../../../store/User";
// import { ButtonPrimary } from "../../../components/index";
// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
// import { LoginWithApple } from "@/components/buttons/LoginWithApple";
// import LoadingPage from "@/components/Layout/LoadingPage";
// import * as Device from "expo-device";
// import { COLORS } from "../../../constants/theme";
// import { Button } from "react-native";
// import window from "../../../constants/Layout";
// import Constants from "expo-constants";

// WebBrowser.maybeCompleteAuthSession();

// const GoogleEnv = {
//   clientId:
//     "595961874472-obn3ip8ajojv7dmjia29osu5u9pmaq5u.apps.googleusercontent.com",
//   iosClientId:
//     "595961874472-o02ute49jq85lkt93oi6rhecvao87skc.apps.googleusercontent.com",
//   androidClientId:
//     "595961874472-3pmkc1kskp122fpusqejn3e0i7p824uj.apps.googleusercontent.com",
// };



// const LoginScreen = ({ navigation }: { navigation: Navigate }) => {
//   const insets = useSafeAreaInsets();

//   const [Loading, setLoading] = useState(false);
//   const [username, setUsername] = useState("newAzeddine@gmail.com");
//   const [password, setPassword] = useState("123");
//   const [ShowPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const [identity, setIdentity] = useState<
//     AppleAuthenticationCredential | undefined
//   >(undefined);

//   // useEffect(()=>{
//   //     setUsername('0621664802');
//   //     setPassword('P@ntofit');
//   // },[])

//   const [accessToken, setAccessToken] = React.useState<string | null>(null);
//   const [ERR, setERR] = useState("");
//   const [requestG, responseG, promptAsyncG] = Google.useIdTokenAuthRequest({
//     ...GoogleEnv,
//   });
//   const [ERR_requestG, setERR_requestG] = useState("");

//   const [rememberMe, setRememberMe] = useState(false);


//   const HandleLoginWithGoogle = async (token: string) => {
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     try {
//       const res = await fetch(
//         Constants.expoConfig?.extra?.apiUrl as string,
//         {
//           method: "POST",
//           headers,
//           body: JSON.stringify({
//             query: `mutation Mutation($input: inputLogin) {
//               login(input: $input) {
//                 user {
//                   id
//                   fullName
//                   email
//                   phone
//                 }
//                 token
//               }
//             }`,
//             variables: {
//               email: username,
//               password
//             }
//           }),
//         }
//       );

//       const json = await res.json();
//       console.info({ json: json.data?.login });
//       if (json?.user) {
//         await AsyncStorage.setItem(
//           "@token",
//           json.data?.login?.token
//         );
//         await AsyncStorage.setItem("@user", JSON.stringify(json.data?.login?.user));
//         dispatch(isLogin(true));
//         // const token = await registerForPushNotificationsAsync();
//         console.info({ token });

//       } else {
//         setLoading(false);
//         setERR(JSON.stringify(json, undefined, 2));
//       }
//     } catch (err) {
//       setLoading(false);
//       Alert.alert("error", JSON.stringify(err, undefined, 2));
//       // Alert.alert(json?.detail);
//       setERR(JSON.stringify(err, undefined, 2));
//     }
//   };




//   const FetchAuth = async (em = null, ps = null) => {
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     try {

//       console.log('====================================');
//       console.log('yoooooooooooooo');
//       console.log('====================================');
//       const pushToken = await registerForPushNotificationsAsyncBro();
//       console.log({ pushToken });

//       const res = await fetch(
//         Constants.expoConfig?.extra?.apiUrl as string,
//         {
//           method: "POST",
//           headers,

//           body: JSON.stringify({
//             query: `mutation Mutation($inputLogin: LoginInput) {
//               login(inputLogin: $inputLogin) {
//                 user {
//                   id
//                   firstName
//                   lastName
//                   email
//                   phone
//                   role
//                   imageProfile
//                   pushToken
//                 }
//                 token
//               }
//             }`,
//             variables: {
//               inputLogin: {
//                 email: em || username,
//                 password: ps || password,
//                 pushToken
//               }
//             }
//           }),
//         }
//       );

//       const json = await res.json();
//       if (json.data?.login?.user) {
//         console.info('user', json.data?.login.user);
//         console.info('token', json.data?.login.token);

//         await AsyncStorage.setItem(
//           "@token",
//           json.data?.login?.token
//         );
//         if (json.data?.login?.user?.imageProfile) {
//           await AsyncStorage.setItem("@imageProfile", json.data?.login?.user?.imageProfile);
//         }
//         await AsyncStorage.setItem("@user", JSON.stringify(json.data?.login?.user));
//         await AsyncStorage.setItem("@pushToken", json.data?.login?.user?.pushToken);
//         await AsyncStorage.setItem("@signed-user", JSON.stringify({ email: em || username, password: ps || password }));
//         dispatch(isLogin(true));
//         dispatch(setUser(json.data?.login?.user));
//         // console.log({ user: json.data?.login?.user })
//         // const token = await registerForPushNotificationsAsync();
//         // console.info({ token });

//       } else {
//         setLoading(false);
//         setERR(JSON.stringify(json, undefined, 2));
//       }
//     } catch (err: any) {
//       setLoading(false);
//       Alert.alert("error", JSON.stringify(err, undefined, 2));
//       // Alert.alert(json?.detail);
//       setERR(JSON.stringify(err, undefined, 2));
//     }
//   };

//   const [SignedUser, setSignedUser] = useState<{ email: string, password: string } | null>(null);
//   const getSignedUser = async () => {
//     const stringUser = await AsyncStorage.getItem('@signed-user');
//     if ((stringUser || '')?.length > 0) {
//       setSignedUser(JSON.parse(stringUser || '{}'))
//     } else {
//       null
//     }
//   }


//   useEffect(() => {
//     getSignedUser()
//   }, [])

//   const handleLoginWithSignedUser = () => {
//     setUsername(SignedUser?.email || "")
//     setPassword(SignedUser?.password || "")
//     setLoading(true)
//     // @ts-ignore
//     FetchAuth(SignedUser?.email || '', SignedUser?.password)
//   }



//   return (
//     <View
//       style={{
//         backgroundColor: "white",
//         flex: 1,
//         paddingTop: insets?.top,
//       }}
//     >
//       <TouchableOpacity onPress={() => navigation.goBack()} className="px-4 rounded-full shadow-sm shadow-slate-400">
//         <Ionicons name="chevron-back" color="#2B61E3" size={22} />
//       </TouchableOpacity>
//       <LoadingPage />

//       <KeyboardAwareScrollView
//         style={{
//           flex: 1,
//         }}
//         className="p-3 "
//       >
//         <View
//           style={{
//             flex: 1,
//           }}
//           className=""
//         >
//           <View className="flex-row justify-center flex-1">
//             <Image
//               resizeMode="contain"
//               style={{
//                 width: window.width,
//                 height: window.width
//               }}
//               // source={require('@/assets/png/gift-box.png')}
//               source={require('@/assets/handyman.webp')}

//             />
//           </View>
//           <Text
//             style={{ color: COLORS.primary }}
//             className=" text-2xl font-bold my-4 text-center">
//             Log in again!
//           </Text>
//           {(SignedUser) && (
//             <View className="px-3">
//               <TouchableOpacity
//                 style={{ backgroundColor: COLORS.primary + 20 }}
//                 onPress={handleLoginWithSignedUser}
//                 className="rounded-2xl border-2 border-primary-500 outline-2 outline-offset-2 outline-primary-500 p-3" >
//                 <Text className="text-center text-base text-primary-500 font-semibold">
//                   Log in again with : {SignedUser?.email}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           <View className="px-3">
//             <View>
//               {/* <Text className=" text-black mb-2">Full Name</Text> */}
//               <TextInput
//                 value={username}
//                 onChangeText={setUsername}
//                 style={{
//                   borderColor: "#00000050",
//                 }}
//                 placeholderTextColor={"#00000050"}
//                 className="text-black border-b border-[#2B61E3] text-lg p-3 mb-3"
//                 // keyboardType="number-pad"
//                 placeholder="Enter your full name"
//               />
//             </View>
//             <View className="">
//               <View className="relative">
//                 <TextInput
//                   value={password}
//                   onChangeText={setPassword}
//                   className="text-black border-b border-[#2B61E3] text-lg p-3 mb-3"
//                   keyboardType="default"
//                   placeholderTextColor={"#00000050"}
//                   placeholder="Enter your password"
//                   textContentType="password"
//                   secureTextEntry={!ShowPassword}
//                 // style={{
//                 //   borderColor: Errors?.pass?.length === 0 ? "#00000050" : "red",
//                 // }}
//                 />
//                 {/* {Errors?.pass && (
//           <Text className="text-red-600 mb-3 ml-4">{Errors?.pass}</Text>
//         )} */}
//                 <TouchableOpacity
//                   onPress={() => setShowPassword((v) => !v)}
//                   className="absolute right-3 top-[15%]"
//                 >
//                   <Ionicons
//                     name={!ShowPassword ? "eye-off" : "eye"}
//                     size={24}
//                     color="black"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 onPress={() => setRememberMe(!rememberMe)}
//                 style={{ flexDirection: 'row', alignItems: 'center' }}
//               >
//                 <View
//                   style={{
//                     width: 15,
//                     height: 15,
//                     borderWidth: 1,
//                     borderColor: '#2B61E3',
//                     borderRadius: 4,
//                     marginRight: 5,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   {rememberMe && (
//                     <View
//                       style={{
//                         width: 10,
//                         height: 10,
//                         backgroundColor: '#2B61E3',
//                         borderRadius: 3,
//                       }}
//                     />
//                   )}
//                 </View>
//                 <Text className="mb-6 text-md pt-6">Remember me</Text>
//               </TouchableOpacity>
//               <View className="mt-6">
//                 <Text className="text-[#062265]">Forgot password?</Text>
//               </View>
//             </View>
//             {ERR?.length !== 0 && (
//               <Text className="text-red-600 text-base p-3">{ERR}</Text>
//             )}
//             <ButtonPrimary
//               Loading={Loading}
//               onPress={FetchAuth}
//               setLoading={setLoading}
//               text="Log in"
//             />
//           </View>

//           <View className="w-full hidden flex-row items-center my-3 px-5">
//             <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
//             <View className="w-3" />
//             <Text className="text-gray-500">Or log in with</Text>
//             <View className="w-3" />
//             <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
//           </View>

//           {/* <View className=""> */}
//           <View className="hidden justify-center mt-3 pb-3 px-5">
//             <TouchableOpacity
//               className="bg-white  mr-2 items-center justify-center rounded-xl flex-row"
//               style={[{ width: "100%", height: 50 }]}
//               onPress={() => promptAsyncG()}
//             >
//               <FontAwesome5 name="google" size={15} color="#2B61E3" />
//               <Text
//                 style={{
//                   fontSize: 18,
//                 }}
//                 className=" font-medium text-[#2B61E3]"
//               >
//                 {" "}
//                 Continue with Google
//               </Text>
//             </TouchableOpacity>

//           </View>
//           {/* </View> */}
//           <View className="flex-row justify-center gap-2 mt-1">
//             <View>
//               <Text className="text-center text-[16px]">
//                 New to ServiceDay?
//               </Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('CreateAccount')}
//             >
//               <Text
//                 style={{ color: COLORS.primary }}
//                 className="text-center text-[16px] ">
//                 Sign up here
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               height: 10,
//             }}
//           />
//           <View
//             style={{
//               height: insets?.bottom || 3,
//             }}
//           />
//         </View>
//       </KeyboardAwareScrollView >
//     </View >

//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   between: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//   },
//   // socialIcons: {
//   //   flex: 1,
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   marginTop: 10, // Adjust spacing as needed
//   // },
// });




// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import { isLogin, setUser } from '../../../store/User';
// import Constants from 'expo-constants';
// import { COLORS } from '../../../constants/theme';
// import window from '../../../constants/Layout';

// export default function LoginScreen({ navigation }:any) {
//   const [loading, setLoading] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();

//   const handleLogin = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           query: `
//             mutation Mutation($inputLogin: LoginInput) {
//               login(inputLogin: $inputLogin) {
//                 user {
//                   id
//                   firstName
//                   lastName
//                   email
//                   phone
//                   role
//                   imageProfile
//                   pushToken
//                 }
//                 token
//               }
//             }
//           `,
//           variables: {
//             inputLogin: {
//               email: username,
//               password: password,
//               // Add pushToken here if available
//             }
//           }
//         }),
//       });

//       const json = await response.json();

//       if (json.data?.login?.user) {
//         await AsyncStorage.setItem('@token', json.data.login.token);
//         if (json.data.login.user.imageProfile) {
//           await AsyncStorage.setItem('@imageProfile', json.data.login.user.imageProfile);
//         }
//         await AsyncStorage.setItem('@user', JSON.stringify(json.data.login.user));

//         if (rememberMe) {
//           await AsyncStorage.setItem('@signed-user', JSON.stringify({ email: username, password }));
//         }

//         dispatch(isLogin(true));
//         dispatch(setUser(json.data.login.user));
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="chevron-back" color={COLORS.primary} size={28} />
//         </TouchableOpacity>

//         <Image
//           source={require('@/assets/handyman.webp')}
//           style={styles.image}
//           resizeMode="contain"
//         />

//         <Text style={styles.title}>Welcome Back!</Text>

//         <View style={styles.inputContainer}>
//           <TextInput
//             value={username}
//             onChangeText={setUsername}
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor="#00000050"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//           <View style={styles.passwordContainer}>
//             <TextInput
//               value={password}
//               onChangeText={setPassword}
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#00000050"
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
//               <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#00000050" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.optionsContainer}>
//           <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMe}>
//             <View style={[styles.checkbox, rememberMe && styles.checked]} />
//             <Text style={styles.rememberMeText}>Remember me</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => {/* Handle forgot password */}}>
//             <Text style={styles.forgotPassword}>Forgot password?</Text>
//           </TouchableOpacity>
//         </View>

//         {error ? <Text style={styles.errorText}>{error}</Text> : null}

//         <TouchableOpacity onPress={handleLogin} style={styles.loginButton} disabled={loading}>
//           <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Log in'}</Text>
//         </TouchableOpacity>

//         <View style={styles.signupContainer}>
//           <Text style={styles.signupText}>New to ServiceDay?</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
//             <Text style={styles.signupLink}>Sign up here</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     marginBottom: 20,
//   },
//   image: {
//     width: window.width * 0.8,
//     height: window.width * 0.8,
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.primary,
//     fontSize: 16,
//     paddingVertical: 10,
//     marginBottom: 20,
//   },
//   passwordContainer: {
//     position: 'relative',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 0,
//     top: 10,
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   rememberMe: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   checked: {
//     backgroundColor: COLORS.primary,
//   },
//   rememberMeText: {
//     color: '#000',
//   },
//   forgotPassword: {
//     color: COLORS.primary,
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   loginButton: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signupText: {
//     fontSize: 16,
//   },
//   signupLink: {
//     fontSize: 16,
//     color: COLORS.primary,
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { isLogin, IUser, setUser } from "../../../store/User";
const { width } = Dimensions.get('window');
const COLORS = {
  primary: '#4CAF50',
  secondary: '#45a049',
  background: '#f0f4f0',
};

export default function MagicalLoginScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation Mutation($inputLogin: LoginInput) {
              login(inputLogin: $inputLogin) {
                user {
                  id
                  firstName
                  lastName
                  email
                  phone
                  role
                  imageProfile
                  AccountStatus
                  pushToken
                }
                token
              }
            }
          `,
          variables: {
            inputLogin: {
              email: username,
              password: password,
            }
          }
        }),
      });

      const json = await response.json();

      if (json.data?.login?.user?.AccountStatus == 'Deleted') {
        Alert.alert(
          "Account Deleted",
          "Your account has been deleted. If you believe this is a mistake, please contact our support team for assistance.",
          [{ text: "OK" }]
        );
        return;
      }

      if (json.data?.login?.user) {
        await AsyncStorage.setItem('@token', json.data.login.token);
        if (json.data.login.user.imageProfile) {
          await AsyncStorage.setItem('@imageProfile', json.data.login.user.imageProfile);
        }
        await AsyncStorage.setItem('@user', JSON.stringify(json.data.login.user));

        if (rememberMe) {
          await AsyncStorage.setItem('@signed-user', JSON.stringify({ email: username, password }));
        }

        dispatch(isLogin(true));
        dispatch(setUser(json.data.login.user));
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeIn.delay(200).duration(1000)} style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" color={COLORS.primary} size={28} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.Image
          source={require('@/assets/AHOUSEGURU LOGO.png')}
          style={[styles.image]}
          resizeMode="contain"
          entering={FadeInDown.delay(400).duration(1000)}
          className={"bg-transparent"}
        />

        <Animated.Text entering={FadeInUp.delay(600).duration(1000)} style={styles.title}>
          Welcome Back!
        </Animated.Text>

        <Animated.View entering={FadeInUp.delay(800).duration(1000)} style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color={COLORS.primary} style={styles.inputIcon} />
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#00000050"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color={COLORS.primary} style={styles.inputIcon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#00000050"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#00000050" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMe}>
              <View style={[styles.checkbox, rememberMe && styles.checked]}>
                {rememberMe && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {/* Handle forgot password */ }}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Log in'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Animated.View
            style={styles.signupContainer}
            entering={FadeInUp.delay(1200).duration(1000)}
          >
            <Text style={styles.signupText}>New to A HOUSE GURU?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.signupLink}>Sign up here</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={styles.signupContainer}
            entering={FadeInUp.delay(1200).duration(1000)}
          >
            <Text style={styles.signupText}>Or</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccountForArtisant')}>
              <Text style={styles.signupLink}>Sign up As Pro Here </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: COLORS.primary,
  },
  rememberMeText: {
    color: '#333',
    fontSize: 14,
  },
  forgotPassword: {
    color: COLORS.primary,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#333',
  },
  signupLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
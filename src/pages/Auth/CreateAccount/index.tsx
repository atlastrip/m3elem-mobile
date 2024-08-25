import {
  ActivityIndicator,
  Alert,
  Button,
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
import { Navigate, registerForPushNotificationsAsyncBro } from "navigation";
import * as ImagePicker from 'expo-image-picker';
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
import { isLogin, IUser, setUser, setLoadingPage } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonPrimary } from "@/components/index";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { registerForPushNotificationsAsync } from "@/components/pushNotification";
import { LoginWithApple } from "@/components/buttons/LoginWithApple";
import { FlatList } from "react-native";
import { Video } from "expo-av";
import Constants from "expo-constants";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/index"
WebBrowser.maybeCompleteAuthSession();






const TreeComponent = ({ categories, setCategories }: any) => {
  const toggleSelect = (path: any) => {
    const updateCategories = (items: any, path: any) => {
      if (path.length === 0) return items;

      const [currentId, ...restPath] = path;
      return items.map((item: any) => {
        if (item.id === currentId) {
          if (restPath.length === 0) {
            return { ...item, selected: !item.selected };
          }
          if (item.subcategories) {
            return {
              ...item,
              subcategories: updateCategories(item.subcategories, restPath),
            };
          }
        }
        return item;
      });
    };

    setCategories((prevCategories: any) => updateCategories(prevCategories, path));
  };

  const renderLastElements = (items: any, path = []) => {
    return items.map((item: any) => {
      const newPath: any = [...path, item.id];

      if (!item.subcategories || item.subcategories.length === 0) {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggleSelect(newPath)}
            // style={[
            //   styles.categoryItem,
            //   item.selected ? styles.categoryItemSelected : styles.categoryItemDefault,
            // ]}
            // className="gap-2"
            className={`cursor-pointer flex-row  text-nowrap flex rounded-md ${item.selected ? 'bg-primary-500 text-white' : 'bg-white text-black'} p-2 my-2 border`}

          >
            {/* {item.selected && (
              <Text
              className="text-white hover:bg-white rounded-2xl hover:text-primary-500"
              >✖</Text>
            )} */}
            <Text style={styles.categoryItemText}>{item.name}</Text>
          </TouchableOpacity>
        );
      }
      return renderLastElements(item.subcategories, newPath);
    });
  };

  return <View
    className="flex flex-row gap-3 "
  >{renderLastElements(categories)}</View>
};





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
  // const [User, setUser] = useState<IUser | null>(null);
  const [password, setPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [SelectedAccount, setSelectedAccount] = useState("User");
  const [media, setMedia] = useState<any>([]);
  const [adress, setAdress] = useState("");
  const [aboutYou, setAboutYou] = useState("");


  //login
  const [Loading, setLoading] = useState(false);
  const [LoadingCategories, setLoadingCategories] = useState(false);
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





  const getSelectedSubcategoriesAndProfessionals = (items: any) => {
    let selected: any = []

    items.forEach((item: any) => {
      if (item.selected) {
        selected.push({
          id: item.id,
          professionals: item.professionals || []
        });
      }
      if (item.subcategories) {
        selected = selected.concat(getSelectedSubcategoriesAndProfessionals(item.subcategories));
      }
    });

    return selected;
  };


  const uploadImagesToFirebase = async (media: any) => {
    try {
      console.log('====================================');
      console.log('media', media);
      console.log('====================================');
      let uploadedImages;

      if (media.length > 0) {
        uploadedImages = await Promise.all(
          media.map(async (item: any) => {
            try {
              // Fetch the image from the local URI
              const response = await fetch(item.uri);
              if (!response.ok) throw new Error('Network response was not ok');

              // Convert the image to a blob
              const blob = await response.blob();
              console.log('Blob:', blob);

              // Create a reference to the Firebase Storage location
              const storageRef = ref(storage, `images/${Date.now()}_${item.fileName}`);
              console.log('StorageRef:', storageRef);

              // Upload the blob to Firebase Storage
              const uploadTask = uploadBytesResumable(storageRef, blob);
              console.log('UploadTask:', uploadTask);

              // Monitor the upload progress
              return new Promise((resolve, reject) => {
                uploadTask.on(
                  'state_changed',
                  (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                  },
                  (error) => {
                    console.error('Upload failed', error);
                    reject(error);
                  },
                  async () => {
                    // Get the download URL of the uploaded image
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);
                    const img = {
                      name: item.fileName,
                      size: `${item.fileSize}`,
                      source: downloadURL,
                      current: true,
                    }
                    resolve(img);
                  }
                );
              });
            } catch (error: any) {
              console.error('Error in uploading image:', error.message);
              throw error;
            }
          })
        );
      }

      console.log('Uploaded Images:', uploadedImages);
      return uploadedImages;
    } catch (error) {
      console.error('Error in uploading images:', error);
      throw error;
    }
  };

  const CreateAccount = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    if (LastName.length === 0) {
      setErrors((prev) => ({ ...prev, lastName: "Last name is required" }));
      return;
    }
    if (username.length === 0) {
      setErrors((prev) => ({ ...prev, number: "Phone number is required" }));
      return;
    }
    if (Email.length === 0) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!validateEmail(Email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid Email" }));
      return;
    }

    if (password.length === 0) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }
    if (adress.length === 0) {
      setErrors((prev) => ({ ...prev, adress: "Address is required" }));
      return;
    }

    if (aboutYou.length === 0) {
      setErrors((prev) => ({ ...prev, aboutYou: "About you is required" }));
      return;
    }



    if (SelectedAccount === "Artisan") {
      if (getSelectedSubcategoriesAndProfessionals(categories).length === 0) {
        Alert.alert('Please select at least one category');
        return;
      }
      if (media.length === 0) {
        Alert.alert('Please add at least one media');
        return;
      }
    }




    const selectedCategories = getSelectedSubcategoriesAndProfessionals(categories);
    console.log('Selected categories:', selectedCategories);



    try {
      setLoading(true);

      console.log('====================================');
      console.log('media', media);
      console.log('====================================');
      let uploadedImages;
      if (media.length > 0) {
        uploadedImages = await uploadImagesToFirebase(media);
      }


      console.log('====================================');
      console.log('Uploaded Images:', uploadedImages);
      console.log('====================================');

      const pushToken = await registerForPushNotificationsAsyncBro();
      console.log({ pushToken });
      const role = SelectedAccount === "User" ? "user" : "artisant";
      const categories: any = selectedCategories?.map((e: any) => e.id) || []
      // @ts-ignore
      const professionals = [...new Set(selectedCategories?.map((e: any) => e.professionals).flat()?.map((e: any) => e.id))] || []
      const inputSignUp: any = {
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: password,
        phone: username,
        role: role,
        categories: categories,
        professionals: professionals,
        newImage: media?.length > 0 ? uploadedImages : [],
        adress: adress,
        aboutYou: aboutYou,
        pushToken
      };



      console.log('inputSignUp', inputSignUp);







      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl as string,
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            query: `
                   mutation signUp($inputSignUp: inputSignUp) {
                      signUp(inputSignUp: $inputSignUp) {
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
                    } 
                  `,
            variables: {
              "inputSignUp": inputSignUp
            },

          }),
        }
      );

      const json = await res.json();
      console.log('====================================');
      console.log('signUp', json);
      console.log('====================================');

      if (json.data?.signUp?.user) {

        console.info('user', json.data?.signUp.user);
        console.info('token', json.data?.signUp.token);

        await AsyncStorage.setItem(
          "@token",
          json.data?.signUp?.token
        );
        await AsyncStorage.setItem("@user", JSON.stringify(json.data?.signUp?.user));
        await AsyncStorage.setItem("@pushToken", json.data?.login?.user?.pushToken);

        dispatch(isLogin(true));
        dispatch(setUser(json.data?.signUp?.user));
      } else {
        console.error('Error in signUp:', json);
        setLoading(false);
        return Alert.alert('Error', json?.errors[0]?.message);
      }
      // console.log({ user: json.data?.login?.user })
      // const token = await registerForPushNotificationsAsync();
      // console.info({ token });



    }
    catch (error: any) {
      setLoading(false);
      console.error('Error ', error.message);
      return Alert.alert('Error', error?.errors[0]?.error?.message);
    }
  }

  const [Errors, setErrors] = useState({
    FirstName: "",
    LastName: "",
    number: "",
    email: "",
    password: "",
    adress: "",
    aboutYou: "",
  });

  const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: elementIndex * window.width, animated: true });
    }
  };
  const scrollViewRef1 = useRef<any>(null);

  const pickMedia = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result?.canceled) {
      handleStateChange([...media, ...result.assets], setMedia);
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);



  const handleStateChange = async (newState: any, setState: React.Dispatch<React.SetStateAction<any>>) => {
    setState(newState);
    // saveState();
  };

  const removeMedia = (uri: string) => {
    handleStateChange(media.filter((item: any) => item.uri !== uri), setMedia);
  };

  const moveMedia = (index: number, direction: 'left' | 'right') => {
    const newMedia = [...media];
    if (direction === 'left' && index > 0) {
      [newMedia[index - 1], newMedia[index]] = [newMedia[index], newMedia[index - 1]];
    } else if (direction === 'right' && index < newMedia.length - 1) {
      [newMedia[index + 1], newMedia[index]] = [newMedia[index], newMedia[index + 1]];
    }
    handleStateChange(newMedia, setMedia);
  };


  function generateCategoryQuery(depth: any) {
    let query = `
      query categories {
        categories {
          ...CategoryFields
          ${generateSubcategories(depth)}
        }
      }
  
      fragment CategoryFields on Category {
        id
        name
        icon
        unLockedAmount
        subcategories {
          id
          name
          icon
          unLockedAmount
        }
        professionals {
          id
          text
          img
        }
      }
    `;
    return query;
  }

  function generateSubcategories(depth: any): any {
    if (depth === 0) return '';
    return `
      subcategories {
        ...CategoryFields
        ${generateSubcategories(depth - 1)}
      }
    `;
  }




  const fetchCategoriesManually = async () => {
    try {
      setLoadingCategories(true);
      const depthResponse = await fetch(`${Constants.expoConfig?.extra?.apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query categoryDepth {
              categoryDepth
            }
          `,
        }),
      });
      const depthData = await depthResponse.json();
      console.log('Depth data:', depthData);

      const depth = depthData?.data?.categoryDepth;

      const query = generateCategoryQuery(depth);

      const response = await fetch(`${Constants.expoConfig?.extra?.apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      });
      const result = await response.json();
      console.log('Result data:', result.data.categories);
      setCategories(result.data.categories);
      setLoadingCategories(false);
      // await AsyncStorage.setItem('categories', JSON.stringify(result.data.categories));
      // console.log('Data stored in AsyncStorage');

      // const storedCategories = await AsyncStorage.getItem('categories');
      // if (storedCategories) {
      //   setCategories(storedCategories);
      // }
    } catch (error) {
      setLoadingCategories(false);
      console.error('Error in manual fetch logic:', error);
    }
  };



  useEffect(() => {
    fetchCategoriesManually();
  }, []);








  // console.log('Categories:', categories);




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
                value={FirstName}
                onChangeText={setFirstName}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your First name"
                textContentType="name"
                style={{
                  borderColor: Errors?.FirstName?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.FirstName && (
                <Text className="text-red-600 mb-3 ml-4">{Errors?.FirstName}</Text>
              )}
              <TextInput
                value={LastName}
                onChangeText={setLastName}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your Last name"
                textContentType="name"
                style={{
                  borderColor: Errors?.LastName?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.LastName && (
                <Text className="text-red-600 mb-3 ml-4">{Errors?.LastName}</Text>
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
                  keyboardType="default"
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

              {/* <Text className="text-black ml-2 mb-2">Email</Text> */}
              <TextInput
                value={adress}
                onChangeText={setAdress}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="Your Address"
                textContentType="addressCity"
                style={{
                  borderColor: Errors?.adress?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.email && (
                <Text className="text-primary-500 mb-3 ml-4">{Errors?.adress}</Text>
              )}
              <TextInput
                value={aboutYou}
                onChangeText={setAboutYou}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="About you"
                textContentType="none"
                style={{
                  borderColor: Errors?.aboutYou?.length === 0 ? "#00000050" : "red",
                }}
              />
              {
                Errors?.aboutYou && (
                  <Text className="text-primary-500 mb-3 ml-4">{Errors?.aboutYou}</Text>
                )
              }

              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
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
                value={FirstName}
                onChangeText={setFirstName}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your First name"
                textContentType="name"
                style={{
                  borderColor: Errors?.FirstName?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.FirstName && (
                <Text className="text-red-600 mb-3 ml-4">{Errors?.FirstName}</Text>
              )}
              <TextInput
                value={LastName}
                onChangeText={setLastName}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="Enter your Last name"
                textContentType="name"
                style={{
                  borderColor: Errors?.LastName?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.LastName && (
                <Text className="text-red-600 mb-3 ml-4">{Errors?.LastName}</Text>
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
                  keyboardType="default"
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

              <TextInput
                value={adress}
                onChangeText={setAdress}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="Your Address"
                textContentType="addressCity"
                style={{
                  borderColor: Errors?.adress?.length === 0 ? "#00000050" : "red",
                }}
              />
              {Errors?.email && (
                <Text className="text-primary-500 mb-3 ml-4">{Errors?.adress}</Text>
              )}
              <TextInput
                value={aboutYou}
                onChangeText={setAboutYou}
                className="text-black border-b border-primary-500 text-lg p-3 mb-2"
                placeholderTextColor={"#00000050"}
                placeholder="About you"
                textContentType="none"
                style={{
                  borderColor: Errors?.aboutYou?.length === 0 ? "#00000050" : "red",
                }}
              />
              {
                Errors?.aboutYou && (
                  <Text className="text-primary-500 mb-3 ml-4">{Errors?.aboutYou}</Text>
                )
              }

              {SelectedAccount === "Artisan" && (
                <View>
                  <Text style={{
                    fontSize: 16,
                    marginVertical: 8

                  }}>Choose categories:</Text>
                  {LoadingCategories ? <ActivityIndicator size="large" color="#0000ff" /> :

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ flexDirection: 'row', marginVertical: 8 }}
                    >
                      <TreeComponent categories={categories.reverse()} setCategories={setCategories} />
                    </ScrollView>
                  }
                </View>
              )}
              <View className="mt-4">
                <Text className="text-base font-semibold mb-2">Add media:</Text>
                <FlatList
                  data={media}
                  horizontal
                  keyExtractor={(item) => item.uri}
                  renderItem={({ item, index }) => (
                    <View className="relative rounded-md overflow-hidden w-40 h-40 mr-2">
                      {item.type.startsWith('image') ? (
                        <Image source={{ uri: item.uri }} className="w-full h-full" resizeMode="cover" />
                      ) : (
                        <Video
                          source={{ uri: item.uri }}
                          style={{ width: '100%', height: '100%' }}
                          // @ts-ignore
                          resizeMode="cover"
                          useNativeControls
                        />
                      )}
                      <View style={styles.iconContainer}>
                        {index > 0 && (
                          <TouchableOpacity onPress={() => moveMedia(index, 'left')} className='p-1 rounded-full bg-black/20' style={styles.leftArrow}>
                            <Ionicons name="arrow-back-circle" size={24} color="white" />
                          </TouchableOpacity>
                        )}
                        {index < media.length - 1 && (
                          <TouchableOpacity onPress={() => moveMedia(index, 'right')} className='p-1 rounded-full bg-black/20' style={styles.rightArrow}>
                            <Ionicons name="arrow-forward-circle" size={24} color="white" />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          className='p-1 rounded-full bg-white/80'
                          onPress={() => removeMedia(item.uri)}
                        >
                          <Ionicons name="close-circle" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
                {!media.length ? (

                  <TouchableOpacity
                    onPress={pickMedia}
                    className='border-dashed items-center justify-center  w-40 h-40  border-2 rounded-md border-primary-500' >
                    <Text className='text-xl text-primary-500'>+</Text>
                  </TouchableOpacity>
                ) : (
                  <View className='flex-row justify-end' >
                    <Button
                      title="Add New Media" onPress={pickMedia} />
                  </View>
                )}
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
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftArrow: {
    marginRight: 5,
  },
  rightArrow: {
    marginRight: 5,
  },
  closeButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 2,
  },
  categoryItem: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 4, marginVertical: 4 },
  categoryItemSelected: { backgroundColor: '#6200ea', color: 'white' },
  categoryItemDefault: { backgroundColor: 'white', color: 'black', borderWidth: 1, borderColor: '#ccc' },
  categoryItemText: { marginLeft: 8 },
});


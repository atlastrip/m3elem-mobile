


import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import Constants from 'expo-constants';
const country = Constants?.manifest2?.extra?.expoClient?.extra?.country;
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import window from "../../../constants/Layout";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonPrimary } from "../../../components/index";

import { AnimatePresence, Motion } from "@legendapp/motion";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as ImagePicker from 'expo-image-picker';

import LoadingPage from "@/components/Layout/LoadingPage";
import { getToken, getUser } from "@/helpers/getToken";
import { storage } from "../../../firebase/index";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Menu from "../Menu";

const GestionDeCompte = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [OpenMenu, setOpenMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [FullName, setFullName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [User, setUser] = useState<IUser | null>(null);
  const [Location, setLocation] = useState({ latitude: 33.0, longitude: -7.0 });
  const [Radius, setRadius]: any = useState(0);
  const [ProfilePhoto, setProfilePhoto] = useState("");
  const [Portfolio, setPortfolio] = useState<any[]>([]);
  const IsFocused = useIsFocused();
  const [media, setMedia] = useState<any[]>([]);
  const [checkProfile, setCheckProfile] = useState(false);
  const [LoadingMedia, setLoadingMedia] = useState("");
  const [LoadingUser, setLoadingUser] = useState(false);

  const GetUserFromAsyncStorage = async () => {
    const user: any = await AsyncStorage.getItem("@user");
    const userFromAsyncStorage: IUser = await JSON.parse(user);
    setUser(userFromAsyncStorage);
  };

  useFocusEffect(
    React.useCallback(() => {
      GetUserFromAsyncStorage();
    }, [])
  );

  const handleLogout = () => {
    (async () => {
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@user");
      dispatch(isLogin(false));
    })();
  };

  const showAlertDeconnection = () =>
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCheckProfile(true);
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const pickImagePortfolio = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPortfolio([...Portfolio, result.assets[0].uri]);
    }
  };

  const pickPortfolioImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia([...media, ...result.assets]);
      setPortfolio([...Portfolio, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const EditUser = async () => {
    const token = await getToken();
    const user: any = await getUser();

    if (!token) {
      console.log('====================================');
      console.log('No token found');
      console.log('====================================');
      return;
    }

    setLoadingUser(true);


    if (checkProfile) {
      try {
        const response = await fetch(ProfilePhoto);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();

        const storageRef = ref(storage, `images/${Date.now()}_profile.jpg`);

        const uploadTask = uploadBytesResumable(storageRef, blob);

        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setProfilePhoto(downloadURL);
      } catch (error) {
        console.error('Error in uploading profile image:', error);
        throw error;
      }
    }

    let uploadedImages;
    console.log('media', media);

    if (media.length !== 0) {
      uploadedImages = await Promise.all(
        media.map(async (item) => {
          try {
            const response = await fetch(item.uri);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();

            const storageRef = ref(storage, `images/${Date.now()}_${item.fileName}`);

            const uploadTask = uploadBytesResumable(storageRef, blob);

            return new Promise((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  setLoadingMedia(`Upload is ${Math.round(progress)}% done`);
                },
                (error) => {
                  console.error('Upload failed', error);
                  reject(error);
                },
                async () => {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                  // name: String
                  // size: String
                  // source: String
                  // current: Boolean
                  const image = {
                    name: item.fileName,
                    size: `${item.fileSize}`,
                    source: downloadURL,
                    current: false
                  }
                  resolve(image);
                }
              );
            });
          } catch (error) {
            console.error('Error in uploading image:', error);
            throw error;
          }
        })
      );

      // Save uploaded images to user profile or perform any further actions with them
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const UpdateUserInfo: any = {
      id: JSON.parse(user).id,
      phone: username,
      firstName: FirstName,
      lastName: LastName,
      location: JSON.stringify(Location),
      imageProfile: ProfilePhoto,
      newImage: uploadedImages || [],
      Radius: `${Radius}`,
      categories: [],
    }


    if (media.length == 0) {
      delete UpdateUserInfo.images;
    }

    if (!checkProfile) {
      delete UpdateUserInfo.imageProfile;
    }



    console.log('UpdateUserInfo', UpdateUserInfo);
    try {
      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl as string,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `
              mutation updateUser($input: inputUpdateUser) {
                updateUser(input: $input){
                  id
                  firstName
                  lastName
                  email
                  phone
                  role
                  imageProfile
                  pushToken
                }
              }
            `,
            variables: {
              "input": UpdateUserInfo
            }
          }),
        }
      );

      const json = await res.json();
      console.log('json', json);

      await AsyncStorage.setItem("@user", JSON.stringify(json.data?.updateUser));
      await AsyncStorage.setItem("@imageProfile", json.data?.updateUser?.imageProfile);

      setLoadingMedia("");
      await getInfo();


    } catch (err1: any) {
      console.log('====================================');
      console.log('err1 update', err1.message);
      console.log('====================================');
      Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.", err1.message);
    }
  };

  const getInfo = async () => {
    const token = await getToken();


    if (!token) {
      Alert.alert("Token not found", "Token not found");
      return
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);



    try {
      setLoadingUser(true);
      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl as string,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `
              query user {
                user{
                  id
                  phone
                  email
                  firstName
                  lastName
                  imageProfile
                  location
                  images{
                    id
                    source
                    
                  }
                  Radius
                }
              }
            `,
          }),
        }
      );

      const json = await res.json();
      console.log('====================================');
      console.log('json.data', json?.data?.user);
      console.log('====================================');
      setUsername(json?.data?.user?.phone || "");
      // setFullName(json?.data?.user?.firstName + " " + json?.data?.user?.lastName || "");
      setFirstName(json?.data?.user?.firstName || "");
      setLastName(json?.data?.user?.lastName || "");
      setEmail(json?.data?.user?.email || "");
      setProfilePhoto(json?.data?.user?.imageProfile || "");
      setLocation(json?.data?.user?.location != "" ? JSON.parse(json?.data?.user?.location) : { latitude: 33.0, longitude: -7.0 });
      setPortfolio(json?.data?.user?.images || []);
      setRadius(parseInt(json?.data?.user?.Radius) || 15000);
      setMedia([]);
      setLoadingUser(false);

    } catch (err1: any) {
      console.log('err2', err1.message);
      setLoadingUser(false);

      Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.");
    }
    setLoadingUser(false);

  };

  useEffect(() => {
    getInfo()
  }, [IsFocused]);


  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <LoadingPage />
      <View
        style={{
          paddingTop: insets?.top + 10,
          paddingBottom: 10,
        }}
        className="p-2 flex-row justify-between items-center "
      >
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="chevron-back" color="black" size={24} />
        </TouchableOpacity>
        <View className="p-3">
          <Text className="text-lg font-bold text-black">My Account {country}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setOpenMenu(true)}
            className="p-2 relative"
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              color="black"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <AnimatePresence>
        {OpenMenu && (
          <Motion.View
            style={{
              zIndex: 9999,
            }}
            className="absolute top-0 right-3"
          >
            <TouchableOpacity
              onPress={() => setOpenMenu(false)}
              style={{
                height: insets.top + 60,
              }}
              className="flex-grow"
            ></TouchableOpacity>
            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setOpenMenu(false)}
                className="flex-grow"
              />
              <Motion.View
                initial={{
                  scale: 0,
                }}
                exit={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                style={{
                  backgroundColor: "#23232330",
                }}
                className="rounded-2xl"
              >
                {Menu?.map((menu, idx) => (
                  <View key={idx}>
                    <TouchableOpacity
                      onPress={menu.onPress}
                      className="flex-row justify-between p-2 px-5"
                    >
                      <Text
                        style={{
                          color:
                            menu?.name === "Supprimer mon compte"
                              ? "#d51515"
                              : "black",
                        }}
                        className="text-lg text-white"
                      >
                        {menu.name}
                      </Text>
                    </TouchableOpacity>
                    {idx !== Menu.length - 1 && (
                      <View className="w-full h-[1px] bg-black/10" />
                    )}
                  </View>
                ))}
              </Motion.View>
            </View>

            <TouchableOpacity
              onPress={() => setOpenMenu(false)}
              style={{
                width: window.width,
                height: window.height,
              }}
            ></TouchableOpacity>
          </Motion.View>
        )}
      </AnimatePresence>

      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View className="p-3 mt-3">
          <Text className="text-black ml-2 mb-2">Profile Photo :</Text>
          {ProfilePhoto ? (
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: ProfilePhoto }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              className="border border-black/25 rounded-lg p-10 mb-3 justify-center items-center"
            >
              <Text className="text-black">Add Photo</Text>
            </TouchableOpacity>
          )}

          <Text className="text-black ml-2 mb-2">First Name :</Text>
          <TextInput
            value={FirstName}
            onChangeText={setFirstName}
            className="text-black border border-black/25 rounded-lg text-xl p-3 mb-3"
            placeholder="First Name"
            textContentType="familyName"
          />
          <Text className="text-black ml-2 mb-2">Last Name :</Text>
          <TextInput
            value={LastName}
            onChangeText={setLastName}
            className="text-black border border-black/25 rounded-lg text-xl p-3 mb-3"
            placeholder="Last Name"
            textContentType="familyName"
          />
          <Text className="text-black ml-2 mb-2">Phone number :</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="text-black border border-black/25 rounded-lg text-xl p-3 mb-3"
            keyboardType="number-pad"
            placeholder="Phone number"
            textContentType="telephoneNumber"
          />
          {!User?.email && (
            <>
              <Text className="text-black ml-2 mb-2">Email :</Text>
              <TextInput
                value={Email}
                onChangeText={setEmail}
                className="text-black border border-black/25 rounded-lg text-xl p-3 mb-5"
                keyboardType="email-address"
                placeholder="Email"
                textContentType="emailAddress"
              />
            </>
          )}
          <View className="flex-row justify-between" >
            <Text className="text-black ml-2 mb-2">Location :</Text>

          </View>

          {
            (Location?.latitude && Location?.longitude) ? (


              <>
                <MapView
                  style={{ height: 300, marginBottom: 20 }}
                  initialRegion={{
                    latitude: Location?.latitude,
                    longitude: Location?.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onPress={(e) => setLocation(e.nativeEvent.coordinate)}
                >
                  <Marker coordinate={Location} />
                  <Circle
                    center={Location}
                    radius={typeof Radius == 'string' ? parseInt(Radius) : Radius}
                    strokeColor="rgba(0,112,255,0.5)"
                    fillColor="rgba(0,112,255,0.2)"
                  />
                </MapView>
                <Picker
                  selectedValue={Radius}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log('====================================');
                    console.log('itemValue', itemValue);
                    console.log('====================================');
                    setRadius(itemValue);
                  }}

                >
                  <Picker.Item label="5km" value={5000} />
                  <Picker.Item label="10km" value={10000} />
                  <Picker.Item label="15km" value={15000} />
                  <Picker.Item label="20km" value={20000} />
                </Picker>
              </>

            ) :
              <>
                <MapView
                  style={{ height: 300, marginBottom: 20 }}
                  initialRegion={{
                    latitude: Location?.latitude || 33.0,
                    longitude: Location?.longitude || -7.0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onPress={(e) => setLocation(e.nativeEvent.coordinate)}
                >
                  <Marker coordinate={Location} />
                  <Circle
                    center={Location || { latitude: 33.0, longitude: -7.0 }}
                    radius={typeof Radius == 'string' ? parseInt(Radius) || 15000 : Radius || 15000}
                    strokeColor="rgba(0,112,255,0.5)"
                    fillColor="rgba(0,112,255,0.2)"
                  />
                </MapView>
                <Picker
                  selectedValue={Radius || 15000}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log('====================================');
                    console.log('itemValue', itemValue);
                    console.log('====================================');
                    setRadius(itemValue);
                  }}

                >
                  <Picker.Item label="5km" value={5000} />
                  <Picker.Item label="10km" value={10000} />
                  <Picker.Item label="15km" value={15000} />
                  <Picker.Item label="20km" value={20000} />
                </Picker>
              </>

          }

          <Text className="text-black ml-2 mb-2">Portfolio :</Text>
          <TouchableOpacity
            onPress={() => {
              pickPortfolioImages()
            }}
            className="border border-black/25 rounded-lg p-3 mb-3 justify-center items-center"
          >
            <Text className="text-black">Add Portfolio Images</Text>
          </TouchableOpacity>


          <ScrollView horizontal style={{ marginBottom: 20 }}>
            {
              LoadingMedia ? (
                <Text>{LoadingMedia}</Text>
              ) :

                Portfolio?.map((image, index) => (
                  <TouchableOpacity
                    key={image?.id}

                  >
                    <Image
                      source={{ uri: image?.source }}
                      style={{ width: 100, height: 100, borderRadius: 50, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                ))}
          </ScrollView>


          <ButtonPrimary
            Loading={Loading}
            onPress={() => {
              EditUser()
            }}
            setLoading={() => { }}
            text={LoadingUser ? "Loading..." : "Save"}
          />


        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePicker: {
    marginTop: 8,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  portfolioImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  addPortfolioButton: {
    marginTop: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default GestionDeCompte;

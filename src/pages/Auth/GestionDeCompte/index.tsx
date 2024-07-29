import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Constants from 'expo-constants';

const country = Constants?.manifest2?.extra?.expoClient?.extra?.country;
// console.log(JSON.stringify(country?.expoClient?.extra?.country))
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import window from "../../../constants/Layout";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonPrimary } from "../../../components/index";
import { AnimatePresence, Motion } from "@legendapp/motion";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as ImagePicker from 'expo-image-picker';

import LoadingPage from "@/components/Layout/LoadingPage";

const GestionDeCompte = ({
  navigation,
  route,
}: {
  navigation: Navigate;
  route: any;
}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [OpenMenu, setOpenMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [FullName, setFullName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [User, setUser] = useState<IUser | null>(null);
  const [Location, setLocation] = useState({ latitude: 33.0, longitude: -7.0 });
  const [Radius, setRadius] = useState(15000);
  const [ProfilePhoto, setProfilePhoto] = useState("");
  const [Portfolio, setPortfolio] = useState<string[]>([]);

  const GetUserFromAsyncStorage = async () => {
    const user = await AsyncStorage.getItem("@user");
    // @ts-ignore
    const userFromAsyncStorage: IUser = await JSON.parse(user);
    setUser(userFromAsyncStorage);
  };

  useFocusEffect(
    React.useCallback(() => {
      GetUserFromAsyncStorage();
    }, [])
  );

  useEffect(() => {
    setUsername(User?.phone || "");
    setFullName(User?.fullName || "");
    setEmail(User?.email || "");
  }, [User]);

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
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const pickPortfolioImages = async () => {
    // Logic to pick multiple images
  };

  const EditUser = async () => {
    setLoading(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const accessToken = await AsyncStorage.getItem("@token");
    console.log(accessToken)
    headers.append("Authorization", `Bearer ${accessToken}`);
    try {
      const res = await fetch(
        "https://m3elem-app-ecj9f.ondigitalocean.app/m3elem",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: "mutation UpdateUser($input: inputUpdateUser) {\r\n  updateUser(input: $input) {\r\n    id\r\n    phone\r\n    fullName\r\n  }\r\n}",
            variables: { "input": { "phone": username, "fullName": FullName, id: '' } }
          }),
        }
      );

      const json = await res.json();
      console.log({ json })
      if (json?.data?.updateUser?.id) {
        setLoading(false);
        const UserFromAsyncStorage = await AsyncStorage.getItem("@user");
        const ParsedUser: IUser = await JSON.parse(UserFromAsyncStorage || "");
        ParsedUser.phone = json?.data?.updateUser?.phone;
        ParsedUser.fullName = json?.data?.updateUser?.fullName
        await AsyncStorage.setItem("@user", JSON.stringify(ParsedUser));
        Alert.alert('Updated Successfully!')
        navigation.goBack()
      } else {
        setLoading(false);
        Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.");
        // setERR(json?.detail)
      }
    } catch (err1) {
      setLoading(false);
      Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.");
      console.log({ err1 });
    }
  };

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

          <Text className="text-black ml-2 mb-2">Full name :</Text>
          <TextInput
            value={FullName}
            onChangeText={setFullName}
            className="text-black border border-black/25 rounded-lg text-xl p-3 mb-3"
            placeholder="Full Name"
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
          <MapView
            style={{ height: 300, marginBottom: 20 }}
            initialRegion={{
              latitude: Location.latitude,
              longitude: Location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e) => setLocation(e.nativeEvent.coordinate)}
          >
            <Marker coordinate={Location} />
            <Circle
              center={Location}
              radius={Radius}
              strokeColor="rgba(0,112,255,0.5)"
              fillColor="rgba(0,112,255,0.2)"
            />
          </MapView>
          <Picker
              selectedValue={setRadius}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setRadius(+itemValue)}
            >
              <Picker.Item label="5km" value={5000} />
              <Picker.Item label="10km" value={10000} />
              <Picker.Item label="15km" value={15000} />
              <Picker.Item label="20km" value={20000} />
            </Picker>

          <Text className="text-black ml-2 mb-2">Portfolio :</Text>
          <TouchableOpacity
            onPress={pickPortfolioImages}
            className="border border-black/25 rounded-lg p-3 mb-3 justify-center items-center"
          >
            <Text className="text-black">Add Portfolio Images</Text>
          </TouchableOpacity>
          <ScrollView horizontal style={{ marginBottom: 20 }}>
            {Portfolio.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: 100, height: 100, marginRight: 10 }}
              />
            ))}
          </ScrollView>

          <ButtonPrimary
            Loading={Loading}
            onPress={EditUser}
            setLoading={() => { }}
            text="Save"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GestionDeCompte;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
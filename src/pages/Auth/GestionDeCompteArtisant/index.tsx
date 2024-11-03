


// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image,
//   FlatList,
// } from "react-native";
// import Constants from 'expo-constants';
// const country = Constants?.manifest2?.extra?.expoClient?.extra?.country;
// import { Picker } from '@react-native-picker/picker';
// import React, { useEffect, useState } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import window from "../../../constants/Layout";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { COLORS } from "../../../constants/theme";
// import { useDispatch } from "react-redux";
// import { isLogin, IUser } from "../../../store/User";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ButtonPrimary } from "../../../components/index";

// import { AnimatePresence, Motion } from "@legendapp/motion";
// import { useFocusEffect, useIsFocused } from "@react-navigation/native";
// import MapView, { Marker, Circle } from "react-native-maps";
// import * as ImagePicker from 'expo-image-picker';

// import LoadingPage from "@/components/Layout/LoadingPage";
// import { getToken, getUser } from "@/helpers/getToken";
// import { storage } from "../../../firebase/index";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import Menu from "../Menu";
// import ZipCodeSelector from "@/components/ZipCodeSelector";

// const GestionDeCompte = ({ navigation, route }: any) => {
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();
//   const [Loading, setLoading] = useState(false);
//   const [OpenMenu, setOpenMenu] = useState(false);
//   const [username, setUsername] = useState("");
//   const [FullName, setFullName] = useState("");
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [Email, setEmail] = useState("");
//   const [User, setUser] = useState<IUser | null>(null);
//   const [Location, setLocation] = useState({ latitude: 33.0, longitude: -7.0 });
//   const [Radius, setRadius]: any = useState(0);
//   const [ProfilePhoto, setProfilePhoto] = useState("");
//   const [Portfolio, setPortfolio] = useState<any[]>([]);
//   const IsFocused = useIsFocused();
//   const [media, setMedia] = useState<any[]>([]);
//   const [checkProfile, setCheckProfile] = useState(false);
//   const [LoadingMedia, setLoadingMedia] = useState("");
//   const [LoadingUser, setLoadingUser] = useState(false);
//   const [selectedStates, setSelectedStates] = useState<string[]>([]);
//   const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);

//   const GetUserFromAsyncStorage = async () => {
//     const user: any = await AsyncStorage.getItem("@user");
//     const userFromAsyncStorage: IUser = await JSON.parse(user);
//     setUser(userFromAsyncStorage);
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       GetUserFromAsyncStorage();
//     }, [])
//   );

//   const handleLogout = () => {
//     (async () => {
//       await AsyncStorage.removeItem("@token");
//       await AsyncStorage.removeItem("@user");
//       dispatch(isLogin(false));
//     })();
//   };

//   const showAlertDeconnection = () =>
//     Alert.alert(
//       "Se Déconnecter",
//       "Voulez vous vraiment se déconnecter ?",
//       [
//         {
//           text: "Annuler",
//           onPress: () => { },
//           style: "cancel",
//         },
//         {
//           text: "Déconnexion",
//           onPress: handleLogout,
//           style: "destructive",
//         },
//       ],
//       {
//         cancelable: true,
//         onDismiss: () => { },
//       }
//     );

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setCheckProfile(true);
//       setProfilePhoto(result.assets[0].uri);
//     }
//   };

//   const pickImagePortfolio = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setPortfolio([...Portfolio, result.assets[0].uri]);
//     }
//   };

//   const pickPortfolioImages = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setMedia([...media, ...result.assets]);
//       setPortfolio([...Portfolio, ...result.assets.map(asset => asset.uri)]);
//     }
//   };

//   const EditUser = async () => {
//     const token = await getToken();
//     const user: any = await getUser();

//     if (!token) {
//       console.log('====================================');
//       console.log('No token found');
//       console.log('====================================');
//       return;
//     }

//     setLoadingUser(true);


//     if (checkProfile) {
//       try {
//         const response = await fetch(ProfilePhoto);
//         if (!response.ok) throw new Error('Network response was not ok');

//         const blob = await response.blob();

//         const storageRef = ref(storage, `images/${Date.now()}_profile.jpg`);

//         const uploadTask = uploadBytesResumable(storageRef, blob);

//         await uploadTask;

//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//         setProfilePhoto(downloadURL);
//       } catch (error) {
//         console.error('Error in uploading profile image:', error);
//         throw error;
//       }
//     }

//     let uploadedImages;

//     if (media.length !== 0) {
//       uploadedImages = await Promise.all(
//         media.map(async (item) => {
//           try {
//             const response = await fetch(item.uri);
//             if (!response.ok) throw new Error('Network response was not ok');

//             const blob = await response.blob();

//             const storageRef = ref(storage, `images/${Date.now()}_${item.fileName}`);

//             const uploadTask = uploadBytesResumable(storageRef, blob);

//             return new Promise((resolve, reject) => {
//               uploadTask.on(
//                 'state_changed',
//                 (snapshot) => {
//                   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                   console.log('Upload is ' + progress + '% done');
//                   setLoadingMedia(`Upload is ${Math.round(progress)}% done`);
//                 },
//                 (error) => {
//                   console.error('Upload failed', error);
//                   reject(error);
//                 },
//                 async () => {
//                   const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//                   // name: String
//                   // size: String
//                   // source: String
//                   // current: Boolean
//                   const image = {
//                     name: item.fileName,
//                     size: `${item.fileSize}`,
//                     source: downloadURL,
//                     current: false
//                   }
//                   resolve(image);
//                 }
//               );
//             });
//           } catch (error) {
//             console.error('Error in uploading image:', error);
//             throw error;
//           }
//         })
//       );

//       // Save uploaded images to user profile or perform any further actions with them
//     }

//     console.log('selectedZipCodes', selectedZipCodes);

//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", `Bearer ${token}`);
//     const UpdateUserInfo: any = {
//       phone: username,
//       firstName: FirstName,
//       lastName: LastName,
//       location: JSON.stringify(Location),
//       imageProfile: ProfilePhoto,
//       newImage: uploadedImages || [],
//       Radius: `${Radius}`,
//       zipCodes: selectedZipCodes,
//       states: selectedStates
//     }

//     console.log('UpdateUserInfo', UpdateUserInfo);



//     if (media.length == 0) {
//       delete UpdateUserInfo.images;
//     }

//     if (!checkProfile) {
//       delete UpdateUserInfo.imageProfile;
//     }



//     // console.log('UpdateUserInfo', UpdateUserInfo);
//     try {

//       const res = await fetch(
//         Constants.expoConfig?.extra?.apiUrl as string,
//         {
//           method: "POST",
//           headers,
//           body: JSON.stringify({
//             query: `
//               mutation updateAccountInMobile($input: inputUpdateAccountInMobile) {
//                 updateAccountInMobile(input: $input){
//                   id
//                   firstName
//                   lastName
//                   email
//                   phone
//                   role
//                   imageProfile
//                   pushToken
//                 }
//               }
//             `,
//             variables: {
//               "input": UpdateUserInfo
//             }
//           }),
//         }
//       );

//       const json = await res.json();
//       console.log('json', json.data?.updateAccountInMobile);

//       await AsyncStorage.setItem("@user", JSON.stringify(json.data?.updateAccountInMobile));
//       if (json.data?.updateAccountInMobile?.imageProfile) {
//         await AsyncStorage.setItem("@imageProfile", json.data?.updateAccountInMobile?.imageProfile);
//       }

//       setLoadingMedia("");
//       await getInfo();


//     } catch (err1: any) {
//       console.log('====================================');
//       console.log('err1 update', err1.message);
//       console.log('====================================');
//       Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.", err1.message);
//     }
//   };

//   const getInfo = async () => {
//     const token = await getToken();


//     if (!token) {
//       Alert.alert("Token not found", "Token not found");
//       return
//     }
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", `Bearer ${token}`);



//     try {
//       setLoadingUser(true);
//       const res = await fetch(
//         Constants.expoConfig?.extra?.apiUrl as string,
//         {
//           method: "POST",
//           headers,
//           body: JSON.stringify({
//             query: `
//               query user {
//                 user{
//                   id
//                   phone
//                   email
//                   firstName
//                   lastName
//                   imageProfile
//                   location
//                   images{
//                     id
//                     source

//                   }
//                   Radius
//                   zipCodes 
//                   states
//                 }
//               }
//             `,
//           }),
//         }
//       );

//       const json = await res.json();

//       console.log('====================================');
//       console.log('json', json?.data?.user?.zipCodes);
//       console.log('====================================');
//       setUsername(json?.data?.user?.phone || "");
//       // setFullName(json?.data?.user?.firstName + " " + json?.data?.user?.lastName || "");
//       setFirstName(json?.data?.user?.firstName || "");
//       setLastName(json?.data?.user?.lastName || "");
//       setEmail(json?.data?.user?.email || "");
//       setProfilePhoto(json?.data?.user?.imageProfile || "");
//       setLocation(json?.data?.user?.location != "" ? JSON.parse(json?.data?.user?.location) : { latitude: 33.0, longitude: -7.0 });
//       setPortfolio(json?.data?.user?.images || []);
//       setRadius(parseInt(json?.data?.user?.Radius) || 15000);
//       setMedia([]);
//       setLoadingUser(false);
//       setSelectedStates(json?.data?.user?.states || []);
//       setSelectedZipCodes(json?.data?.user?.zipCodes || []);

//     } catch (err1: any) {
//       console.log('err2', err1.message);
//       setLoadingUser(false);

//       Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.");
//     }
//     setLoadingUser(false);

//   };

//   useEffect(() => {
//     getInfo()
//   }, [IsFocused]);


//   console.log('selectedZipCodes', selectedZipCodes);


//   return (
//     <View
//       style={{
//         backgroundColor: "white",
//         flex: 1,
//       }}
//     >
//       <LoadingPage />
//       <View
//         style={{
//           paddingTop: insets?.top + 10,
//           paddingBottom: 10,
//         }}
//         className="p-2 flex-row justify-between items-center "
//       >
//         <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
//           <Ionicons name="chevron-back" color="black" size={24} />
//         </TouchableOpacity>
//         <View className="p-3">
//           <Text className="text-lg font-bold text-black">My Account {country}</Text>
//         </View>
//         <View>
//           <TouchableOpacity
//             onPress={() => setOpenMenu(true)}
//             className="p-2 relative"
//           >
//             <MaterialCommunityIcons
//               name="dots-vertical"
//               color="black"
//               size={24}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <AnimatePresence>
//         {OpenMenu && (
//           <Motion.View
//             style={{
//               zIndex: 9999,
//             }}
//             className="absolute top-0 right-3"
//           >
//             <TouchableOpacity
//               onPress={() => setOpenMenu(false)}
//               style={{
//                 height: insets.top + 60,
//               }}
//               className="flex-grow"
//             ></TouchableOpacity>
//             <View className="flex-row justify-end">
//               <TouchableOpacity
//                 onPress={() => setOpenMenu(false)}
//                 className="flex-grow"
//               />
//               <Motion.View
//                 initial={{
//                   scale: 0,
//                 }}
//                 exit={{
//                   scale: 0,
//                 }}
//                 animate={{
//                   scale: 1,
//                 }}
//                 style={{
//                   backgroundColor: "#23232330",
//                 }}
//                 className="rounded-2xl"
//               >
//                 {Menu?.map((menu, idx) => (
//                   <View key={idx}>
//                     <TouchableOpacity
//                       onPress={menu.onPress}
//                       className="flex-row justify-between p-2 px-5"
//                     >
//                       <Text
//                         style={{
//                           color:
//                             menu?.name === "Supprimer mon compte"
//                               ? "#d51515"
//                               : "black",
//                         }}
//                         className="text-lg text-white"
//                       >
//                         {menu.name}
//                       </Text>
//                     </TouchableOpacity>
//                     {idx !== Menu.length - 1 && (
//                       <View className="w-full h-[1px] bg-black/10" />
//                     )}
//                   </View>
//                 ))}
//               </Motion.View>
//             </View>

//             <TouchableOpacity
//               onPress={() => setOpenMenu(false)}
//               style={{
//                 width: window.width,
//                 height: window.height,
//               }}
//             ></TouchableOpacity>
//           </Motion.View>
//         )}
//       </AnimatePresence>

//       <ScrollView
//         style={{
//           flex: 1,
//         }}
//       >
//         <View className="p-3 mt-3">
//           <Text className="text-black ml-2 mb-2">Profile Photo :</Text>
//           {ProfilePhoto ? (
//             <TouchableOpacity onPress={pickImage}>
//               <Image
//                 source={{ uri: ProfilePhoto }}
//                 style={{ width: 100, height: 100, borderRadius: 50 }}
//               />
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               onPress={pickImage}
//               className="border border-black/25 rounded-lg p-10 mb-3 justify-center items-center"
//             >
//               <Text className="text-black">Add Photo</Text>
//             </TouchableOpacity>
//           )}

//           <Text className="text-black ml-2 mb-2">First Name :</Text>
//           <TextInput
//             value={FirstName}
//             onChangeText={setFirstName}
//             className="text-black border border-black/25 rounded-lg text-xl p-3 mb-3"
//             placeholder="First Name"
//             textContentType="familyName"
//           />
//           <Text className="text-black ml-2 mb-2">Last Name :</Text>
//           <TextInput
//             value={LastName}
//             onChangeText={setLastName}
//             className="text-black border border-black/25 rounded-lg text-xl p-3 mb-3"
//             placeholder="Last Name"
//             textContentType="familyName"
//           />
//           <Text className="text-black ml-2 mb-2">Phone number :</Text>
//           <TextInput
//             value={username}
//             onChangeText={setUsername}
//             className="text-black border border-black/25 rounded-lg text-xl p-3 mb-3"
//             keyboardType="number-pad"
//             placeholder="Phone number"
//             textContentType="telephoneNumber"
//           />
//           {!User?.email && (
//             <>
//               <Text className="text-black ml-2 mb-2">Email :</Text>
//               <TextInput
//                 value={Email}
//                 onChangeText={setEmail}
//                 className="text-black border border-black/25 rounded-lg text-xl p-3 mb-5"
//                 keyboardType="email-address"
//                 placeholder="Email"
//                 textContentType="emailAddress"
//               />
//             </>
//           )}
//           <View className="flex-row justify-between" >
//             <Text className="text-black ml-2 mb-2">Location :</Text>

//           </View>

//           {
//             (Location?.latitude && Location?.longitude) ? (


//               <>
//                 <MapView
//                   style={{ height: 300, marginBottom: 20 }}
//                   initialRegion={{
//                     latitude: Location?.latitude,
//                     longitude: Location?.longitude,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                   }}
//                   onPress={(e) => setLocation(e.nativeEvent.coordinate)}
//                 >
//                   <Marker coordinate={Location} />
//                   <Circle
//                     center={Location}
//                     radius={typeof Radius == 'string' ? parseInt(Radius) : Radius}
//                     strokeColor="rgba(0,112,255,0.5)"
//                     fillColor="rgba(0,112,255,0.2)"
//                   />
//                 </MapView>
//                 <Picker
//                   selectedValue={Radius}
//                   style={styles.picker}
//                   onValueChange={(itemValue, itemIndex) => {

//                     setRadius(itemValue);
//                   }}

//                 >
//                   <Picker.Item label="5km" value={5000} />
//                   <Picker.Item label="10km" value={10000} />
//                   <Picker.Item label="15km" value={15000} />
//                   <Picker.Item label="20km" value={20000} />
//                 </Picker>
//               </>

//             ) :
//               <>
//                 <MapView
//                   style={{ height: 300, marginBottom: 20 }}
//                   initialRegion={{
//                     latitude: Location?.latitude || 33.0,
//                     longitude: Location?.longitude || -7.0,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                   }}
//                   onPress={(e) => setLocation(e.nativeEvent.coordinate)}
//                 >
//                   <Marker coordinate={Location} />
//                   <Circle
//                     center={Location || { latitude: 33.0, longitude: -7.0 }}
//                     radius={typeof Radius == 'string' ? parseInt(Radius) || 15000 : Radius || 15000}
//                     strokeColor="rgba(0,112,255,0.5)"
//                     fillColor="rgba(0,112,255,0.2)"
//                   />
//                 </MapView>
//                 <Picker
//                   selectedValue={Radius || 15000}
//                   style={styles.picker}
//                   onValueChange={(itemValue, itemIndex) => {

//                     setRadius(itemValue);
//                   }}

//                 >
//                   <Picker.Item label="5km" value={5000} />
//                   <Picker.Item label="10km" value={10000} />
//                   <Picker.Item label="15km" value={15000} />
//                   <Picker.Item label="20km" value={20000} />
//                 </Picker>
//               </>

//           }

//           <Text className="text-black ml-2 mb-2">Portfolio :</Text>
//           <TouchableOpacity
//             onPress={() => {
//               pickPortfolioImages()
//             }}
//             className="border border-black/25 rounded-lg p-3 mb-3 justify-center items-center"
//           >
//             <Text className="text-black">Add Portfolio Images</Text>
//           </TouchableOpacity>


//           <ScrollView horizontal style={{ marginBottom: 20 }}>
//             {
//               LoadingMedia ? (
//                 <Text>{LoadingMedia}</Text>
//               ) :

//                 Portfolio?.map((image, index) => (
//                   <TouchableOpacity
//                     key={image?.id}

//                   >
//                     <Image
//                       key={image?.id + index}
//                       source={{ uri: image?.source }}
//                       style={{ width: 100, height: 100, borderRadius: 50, marginRight: 10 }}
//                     />
//                   </TouchableOpacity>
//                 ))}
//           </ScrollView>

//           <ZipCodeSelector
//             selectedStates={selectedStates}
//             setSelectedStates={setSelectedStates}
//             selectedZipCodes={selectedZipCodes}
//             setSelectedZipCodes={setSelectedZipCodes}
//           />


//           <ButtonPrimary
//             Loading={Loading}
//             onPress={() => {
//               EditUser()
//             }}
//             setLoading={() => { }}
//             text={LoadingUser ? "Loading..." : "Save"}
//           />


//         </View>

//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   profileImagePicker: {
//     marginTop: 8,
//   },
//   map: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//   },
//   portfolioImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   addPortfolioButton: {
//     marginTop: 8,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
// });

// export default GestionDeCompte;




// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, TouchableOpacity, Image, ActivityIndicator, ScrollView, Alert } from "react-native";
// import tw from 'twrnc';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Slider from "@react-native-community/slider";
// import * as ImagePicker from 'expo-image-picker';
// import { useNavigation } from "@react-navigation/native";
// import Constants from 'expo-constants';
// import CategoriesCreateSelector from "@/components/CategorySelector";
// import UploadDocs from "@/components/UploadDocs";
// import { getToken } from "@/helpers/getToken";
// import SearchRequirementChecker from "@/components/SearchRequirementChecker";
// import BusinessForm from "@/components/BusinessForm";
// import AddressAutocomplete from "@/components/AddressAutocomplete";

// export default function ArtisantSettings() {
//   const navigation = useNavigation();
//   const [selectedStates, setSelectedStates] = useState([]);
//   const [selectedZipCodes, setSelectedZipCodes] = useState([]);
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [zipCode, setZipCode] = useState('');
//   const [selectedSuggestion, setSelectedSuggestion]: any = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [selectedCategories, setSelectedCategories]: any = useState([]);
//   const [weeklyBudget, setWeeklyBudget] = useState(30);
//   const [SearchRequirementCheckerState, setSearchRequirementCheckerState] = useState({
//     categories: [],
//     profileCompleted: false,
//     userAmount: "",
//     paymentMethodChoosed: "",
//     minRequiredAmount: 30,
//     acceptedByBO: "",
//     weeklySpent: "",
//     weeklyLimit: "",
//     zipCodes: [],
//   });

//   const [formStateForBusiness, setFormStateForBusiness] = useState({
//     businessName: "",
//     yearFounded: "",
//     numberOfEmployees: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   });

//   const [formState, setFormState] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     imageProfile: '',
//     categories: [],
//     professionals: [],
//     zipCodes: [],
//     states: [],
//     documents: [],

//   });

//   // Load user data from AsyncStorage or an API
//   useEffect(() => {
//     const loadUserData = async () => {
//       const session = await AsyncStorage.getItem("@user");
//       if (session) {
//         const userData = JSON.parse(session);
//         setFormState({
//           ...formState,
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           email: userData.email,
//           phone: userData.phone,
//           imageProfile: userData.imageProfile,
//           categories: userData.categories || [],
//           zipCodes: userData.zipCodes || [],
//           states: userData.states || [],
//         });
//         setSelectedCategories(userData.categories || []);
//         setZipCode(userData.zipCodeHome || '');
//         setIsEnabled(userData.available || false);
//       }
//     };
//     loadUserData();
//   }, []);


//   const fetchUserInfo = async () => {
//     // setLoading(true);
//     const token = await getToken();
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", `Bearer ${token}`);


//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             query userInfo {
//               user {
//     id
//     firstName
//     lastName
//     email
//     phone
//     zipCodes
//     zipCodeHome
//     adress
//     states
//     available
//     weeklyBudget
//     currentWeekSpent
//     paymentMethodChoosed
//     profileCompleted
//     AccountStatus
//     amount
//     businessName
//     yearFounded
//     numberOfEmployees
//     streetAddress
//     suiteNumber
//     city
//     state
//     stateCities {
//       state
//       city
//     }
//     documents {
//       url
//       type
//     }
//     imageProfile
//     categories {
//       id
//       name
//       icon
//     }
//     reviews {
//       id
//       reviewer {
//         id
//         firstName
//         lastName
//         imageProfile
//       }
//       owner {
//         id
//         firstName
//         lastName
//         imageProfile
//       }
//       description
//       rating
//       order {
//         id
//         title
//         professionals {
//           id
//           text
//           img
//         }
//       }
//       createdAt
//     }
//     professionals {
//       id
//       text
//       img
//     }
//   }
// }

//           `,
//         }),
//       });

//       const data = await response.json();
//       const userData = data?.data?.user;
//       // console.log('userData', userData);

//       setFormState({ ...formState, ...userData });

//       setSearchRequirementCheckerState({
//         categories: userData.categories,
//         profileCompleted: userData.profileCompleted,
//         userAmount: userData.amount,
//         paymentMethodChoosed: userData.paymentMethodChoosed,
//         minRequiredAmount: 30,
//         acceptedByBO: userData.AccountStatus,
//         weeklySpent: userData.currentWeekSpent,
//         weeklyLimit: userData.weeklyBudget,
//         zipCodes: userData.zipCodes,
//       });


//       setFormStateForBusiness({
//         businessName: userData?.businessName,
//         yearFounded: userData?.yearFounded,
//         numberOfEmployees: userData?.numberOfEmployees,
//         street: userData?.streetAddress,
//         city: userData?.city,
//         state: userData?.state,
//         zipCode: userData?.suiteNumber,
//       });
//       setSelectedSuggestion(
//         userData?.adress ? JSON.parse(userData?.adress) : null
//       );

//       setWeeklyBudget(userData.weeklyBudget);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       Alert.alert("Error", "Failed to load user data.");
//     } finally {
//       // setLoading(false);
//     }
//   };


//   const updateZipCodes = async () => {
//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           zipCodes: selectedZipCodes,
//           states: selectedStates,
//           stateCities: selectedStates.map(state => ({ state, city: '' })), // Adjust as necessary
//         }),
//       });
//       if (!response.ok) throw new Error("Failed to update zip codes");
//       await fetchUserInfo();
//     } catch (error: any) {
//       Alert.alert("Zip Code Update Failed", error.message);
//     }
//   };





//   const updateWeeklyBudget = async (newBudget: any) => {
//     const token = await getToken();
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", `Bearer ${token}`);


//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `

//   mutation updateWeeklyBudget($input: inputUpdateWeeklyBudget) {
//     updateWeeklyBudget(input: $input) 
//   }
//           `,
//           variables: {
//             "input": {
//               weeklyBudget: newBudget
//             }
//           }
//         }),
//       });

//       const data = await response.json();
//       console.log('====================================');
//       console.log('data', data);
//       console.log('====================================');
//       setWeeklyBudget(newBudget);
//     } catch (error: any) {
//       Alert.alert("Weekly Budget Update Failed", error.message);
//     }
//   };

//   const updateUserInfo = async () => {
//     setUploading(true);
//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: formState.firstName,
//           lastName: formState.lastName,
//           email: formState.email,
//           phone: formState.phone,
//           categories: selectedCategories,
//           professionals: formState.professionals.map((prof: any) => prof.id),
//           imageProfile: formState.imageProfile,
//           zipCodeHome: zipCode,
//           weeklyBudget,
//         }),
//       });
//       if (!response.ok) throw new Error("Failed to update profile");
//       Alert.alert("Profile Updated", "Your settings have been successfully updated.");
//       await fetchUserInfo();
//     } catch (error: any) {
//       Alert.alert("Update Failed", error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleImageUpload = async () => {
//     let result: any = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });
//     if (!result.cancelled) {
//       setUploadingImage(true);
//       const fileUri = result.uri;
//       // Handle upload logic here (e.g., Firebase or direct server upload)
//       setFormState(prev => ({ ...prev, imageProfile: fileUri }));
//       setUploadingImage(false);
//     }
//   };


//   useEffect(() => {
//     fetchUserInfo();
//   }, []);


//   if (uploading) {
//     return (
//       <View style={tw`bg-white h-full justify-center items-center`}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={tw`bg-white`}>
//       <View style={tw`p-4`}>
//         <Text style={tw`text-2xl font-bold mb-4`}>Settings</Text>

//         {/* Profile Image Section */}
//         <View style={tw`mb-6`}>
//           <Text style={tw`text-sm text-gray-700`}>Profile Image</Text>
//           <TouchableOpacity onPress={handleImageUpload} style={tw`mt-1`}>
//             {formState.imageProfile ? (
//               <Image source={{ uri: formState.imageProfile }} style={tw`h-40 w-40 rounded-full`} />
//             ) : (
//               <View style={tw`h-40 w-40 rounded-full bg-gray-100 justify-center items-center`}>
//                 <Text>Upload Image</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Personal Info */}
//         <View style={tw`mb-6`}>
//           <Text style={tw`text-sm text-gray-700`}>First Name</Text>
//           <TextInput
//             style={tw`border border-gray-300 rounded-md p-2`}
//             value={formState.firstName}
//             onChangeText={(text) => setFormState({ ...formState, firstName: text })}
//           />
//         </View>

//         <View style={tw`mb-6`}>
//           <Text style={tw`text-sm text-gray-700`}>Last Name</Text>
//           <TextInput
//             style={tw`border border-gray-300 rounded-md p-2`}
//             value={formState.lastName}
//             onChangeText={(text) => setFormState({ ...formState, lastName: text })}
//           />
//         </View>

//         <View style={tw`mb-6`}>
//           <Text style={tw`text-sm text-gray-700`}>Email</Text>
//           <TextInput
//             style={tw`border border-gray-300 rounded-md p-2`}
//             value={formState.email}
//             editable={false}
//           />
//         </View>

//         <View style={tw`mb-6`}>
//           <Text style={tw`text-sm text-gray-700`}>Phone</Text>
//           <TextInput
//             style={tw`border border-gray-300 rounded-md p-2`}
//             value={formState.phone}
//             onChangeText={(text) => setFormState({ ...formState, phone: text })}
//           />
//         </View>

//         {/* Weekly Budget Slider */}
//         <View style={tw`mb-6`}>
//           <Text style={tw`text-sm text-gray-700`}>Weekly Budget: ${weeklyBudget}</Text>
//           <Slider
//             style={{ width: 200, height: 40 }}
//             minimumValue={0}
//             maximumValue={10000}
//             step={100}
//             value={weeklyBudget}
//             onValueChange={updateWeeklyBudget}
//           />
//         </View>

//         {/* Placeholder Components */}
//         <CategoriesCreateSelector selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
//         <UploadDocs
//           dataDocs={
//             formState.documents
//           }
//         />

//         <SearchRequirementChecker

//           categories={SearchRequirementCheckerState?.categories}
//           isProfileComplete={SearchRequirementCheckerState?.profileCompleted}
//           userAmount={
//             SearchRequirementCheckerState?.paymentMethodChoosed === 'PayAsYouGo' ? 1000 :
//               parseInt(SearchRequirementCheckerState?.userAmount)}
//           paymentMethodChoosed={SearchRequirementCheckerState?.paymentMethodChoosed}
//           minRequiredAmount={30}
//           acceptedByBO={SearchRequirementCheckerState?.acceptedByBO}
//           weeklySpent={SearchRequirementCheckerState?.weeklySpent}
//           weeklyLimit={SearchRequirementCheckerState?.weeklyLimit}
//           zipCodes={SearchRequirementCheckerState?.zipCodes}
//         />

//         <BusinessForm formState={formStateForBusiness} setFormState={setFormStateForBusiness} />
//         {/* <ZipCodeSelector selectedStates={selectedStates} setSelectedStates={setSelectedStates} selectedZipCodes={selectedZipCodes} setSelectedZipCodes={setSelectedZipCodes} /> */}

//         <AddressAutocomplete
//           NewzipCode={zipCode}
//           setNewZipCode={setZipCode}
//           NewselectedSuggestion={selectedSuggestion}
//           setNewSelectedSuggestion={setSelectedSuggestion} />

//         {/* Update Button */}
//         <Button
//           title="Update"
//           onPress={updateUserInfo}
//           disabled={uploading}
//           color="#4CAF50"
//         />
//       </View>
//     </ScrollView>
//   );
// }



import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from 'twrnc';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import CategoriesCreateSelector from "@/components/CategorySelector";
import UploadDocs from "@/components/UploadDocs";
import { getToken } from "@/helpers/getToken";
import SearchRequirementChecker from "@/components/SearchRequirementChecker";
import BusinessForm from "@/components/BusinessForm";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import { storage } from "firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import WhereYourWork from "@/components/WhereYourWork";

const TABS = [
  { key: 'profile', title: 'Profile' },
  { key: 'budget', title: 'Budget' },
  { key: 'categories', title: 'Categories' },
  { key: 'whereuwork', title: 'Where You Work' },
  { key: 'documents', title: 'Get Verified' },
  { key: 'business', title: 'Business' },
  { key: 'address', title: 'Address' },
  { key: 'requirements', title: 'Requirements' }
];

const RenderProfile = ({
  firstNames,
  lastNames,
  emails,
  phones,
  imageProfiles,
  setFirstNames,
  setLastNames,
  setPhones,
  handleImageUpload,
  uploadingImage,
}: any) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView >
      {/* Profile Image Section */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handleImageUpload}>
          {imageProfiles ? (
            <Image source={{ uri: imageProfiles }} style={styles.profileImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Text style={styles.uploadText}>Upload Image</Text>
            </View>
          )}
          {uploadingImage && (
            <ActivityIndicator style={tw`mt-2`} size="small" color="#4CAF50" />
          )}
        </TouchableOpacity>
      </View>

      {/* Personal Info */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstNames}
          onChangeText={setFirstNames}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastNames}
          onChangeText={setLastNames}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={emails}
          editable={false}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phones}
          onChangeText={setPhones}
          keyboardType="phone-pad"
        />
      </View>
    </ScrollView>
  </TouchableWithoutFeedback>
);

export default function GestionDeCompteArtisant() {
  const [currentTab, setCurrentTab] = useState('profile');
  const [selectedCategories, setSelectedCategories]: any = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [selectedSuggestion, setSelectedSuggestion]: any = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [weeklyBudget, setWeeklyBudget] = useState(30);
  const [SearchRequirementCheckerState, setSearchRequirementCheckerState] = useState({
    categories: [],
    profileCompleted: false,
    userAmount: "",
    paymentMethodChoosed: "",
    minRequiredAmount: 30,
    acceptedByBO: "",
    weeklySpent: "",
    weeklyLimit: "",
    zipCodes: [],
  });

  const [formStateForBusiness, setFormStateForBusiness] = useState({
    businessName: "",
    yearFounded: "",
    numberOfEmployees: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [firstNames, setFirstNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [emails, setEmails] = useState('');
  const [phones, setPhones] = useState('');
  const [imageProfiles, setImageProfiles] = useState('');
  const [documents, setDocuments] = useState([]);

  const fetchUserInfo = useCallback(async () => {
    const token = await getToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    try {
      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            query userInfo {
              user {
                id
                firstName
                lastName
                email
                phone
                zipCodes
                zipCodeHome
                adress
                states
                available
                weeklyBudget
                currentWeekSpent
                paymentMethodChoosed
                profileCompleted
                AccountStatus
                amount
                businessName
                yearFounded
                numberOfEmployees
                streetAddress
                suiteNumber
                city
                state
                stateCities {
                  state
                  city
                }
                documents {
                  url
                  type
                }
                imageProfile
                categories {
                  id
                  name
                  icon
                }
                reviews {
                  id
                  reviewer {
                    id
                    firstName
                    lastName
                    imageProfile
                  }
                  owner {
                    id
                    firstName
                    lastName
                    imageProfile
                  }
                  description
                  rating
                  order {
                    id
                    title
                    professionals {
                      id
                      text
                      img
                    }
                  }
                  createdAt
                }
                professionals {
                  id
                  text
                  img
                }
              }
            }
          `,
        }),
      });

      const data = await response.json();
      const userData = data?.data?.user;

      if (userData) {
        setFirstNames(userData.firstName);
        setLastNames(userData.lastName);
        setEmails(userData.email);
        setPhones(userData.phone);
        setImageProfiles(userData.imageProfile);
        setDocuments(userData.documents);
        setSelectedCategories(userData?.categories.map((category: any) => category.id));


        setSearchRequirementCheckerState({
          categories: userData.categories,
          profileCompleted: userData.profileCompleted,
          userAmount: userData.amount,
          paymentMethodChoosed: userData.paymentMethodChoosed,
          minRequiredAmount: 30,
          acceptedByBO: userData.AccountStatus,
          weeklySpent: userData.currentWeekSpent,
          weeklyLimit: userData.weeklyBudget,
          zipCodes: userData.zipCodes,
        });

        setFormStateForBusiness({
          businessName: userData?.businessName || "",
          yearFounded: userData?.yearFounded || "",
          numberOfEmployees: userData?.numberOfEmployees || "",
          street: userData?.streetAddress || "",
          city: userData?.city || "",
          state: userData?.state || "",
          zipCode: userData?.suiteNumber || "",
        });

        setSelectedSuggestion(
          userData?.adress ? JSON.parse(userData?.adress) : null
        );

        setWeeklyBudget(userData.weeklyBudget);
      } else {
        throw new Error("User data not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to load user data.");
    }
  }, []);




  const UpdateCategories = async () => {
    const token = await getToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    try {
      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            mutation updateCategoriesForArtisantInMobile($input: inputUpdateCategoriesForArtisantInMobile) {
              updateCategoriesForArtisantInMobile(input: $input)
            }
          `,
          variables: {
            input: {
              categories: selectedCategories,
            },
          },
        }),
      });

      const data = await response.json();
      console.log('====================================');
      console.log('data', data);
      console.log('====================================');
      Alert.alert("Categories Updated", "Your categories have been successfully updated.");
      await fetchUserInfo();
    } catch (error: any) {
      Alert.alert("Categories Update Failed", error.message);
    }
  }


  const handleUpdateBusiness = async () => {
    const token = await getToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    try {
      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            mutation updateBusinessFormArtisantInMobile($input: inputUpdateBusinessFormArtisantInMobile) {
              updateBusinessFormArtisantInMobile(input: $input)
            }
          `,

          variables: {
            input: {
              businessName: formStateForBusiness.businessName,
              yearFounded: formStateForBusiness.yearFounded,
              numberOfEmployees: formStateForBusiness.numberOfEmployees,
              streetAddress: formStateForBusiness.street,
              city: formStateForBusiness.city,
              state: formStateForBusiness.state,
              suiteNumber: formStateForBusiness.zipCode,
            },
          },
        }),
      });

      const data = await response.json();
      console.log('====================================');
      console.log('data', data);
      console.log('====================================');
      Alert.alert("Business Updated", "Your business information has been successfully updated.");
      await fetchUserInfo();
    } catch (error: any) {
      Alert.alert("Business Update Failed", error.message);
    }
  }

  const updateUserInfo = async () => {
    setUploading(true);
    try {
      const token = await getToken();
      const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      });

      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            mutation updateArtisantInMobile($input: inputUpdateArtisantInMobile) {
              updateArtisantInMobile(input: $input) {
                id
              }
            }

          `,
          variables: {
            input: {
              firstName: firstNames,
              lastName: lastNames,
              phone: phones,
              email: emails,
              // weeklyBudget: weeklyBudget,
            },
          },
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      Alert.alert("Profile Updated", "Your settings have been successfully updated.");
      await fetchUserInfo();
    } catch (error: any) {
      Alert.alert("Update Failed", error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async () => {
    // Launch the image library to pick an image
    const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    // Check if the user canceled the image picker
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUploadingImage(true); // Assuming you have this state to show upload status

      try {
        const asset = result.assets[0];
        const localUri = asset.uri;
        const filename = localUri.split('/').pop() || `image_${Date.now()}`;
        const match = /\.(\w+)$/.exec(filename);
        const fileType = match ? `image/${match[1]}` : `image`;

        // Retrieve the authentication token
        const token = await getToken(); // Ensure getToken is defined and works correctly

        // Create a reference to Firebase Storage
        const storageRef = ref(storage, `images/${filename}`);

        // Fetch the file from the local URI and convert it to a blob
        const response = await fetch(localUri);
        const blob = await response.blob();

        // Upload the blob to Firebase Storage with resumable upload
        const uploadTask = uploadBytesResumable(storageRef, blob, {
          contentType: fileType,
        });

        // Monitor the upload progress and handle completion
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress.toFixed(2)}% done`);
              // Optionally, update a progress state here
              // setUploadProgress(progress);
            },
            (error) => {
              console.error("Error during upload:", error);
              reject(error);
            },
            async () => {
              try {
                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Prepare the GraphQL mutation
                const graphqlQuery = {
                  query: `
                   mutation updateJustArtisantImageProfile($input: inputUpdateArtisantImageProfile) {
  updateJustArtisantImageProfile(input: $input)
}


                  `,
                  variables: {
                    input: {
                      imageProfile: downloadURL,
                    },
                  },
                };

                // Make the POST request to your GraphQL API
                const graphqlResponse = await fetch(Constants.expoConfig?.extra?.apiUrl || '', {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                  },
                  body: JSON.stringify(graphqlQuery),
                });

                // if (!graphqlResponse.ok) {
                //   throw new Error(`GraphQL error: ${graphqlResponse.statusText}`);
                // }

                const graphqlResult = await graphqlResponse.json();

                // if (graphqlResult.errors) {
                //   throw new Error(`GraphQL errors: ${JSON.stringify(graphqlResult.errors)}`);
                // }

                console.log('GraphQL Result:', graphqlResult);

                // Update the image profile state with the new download URL
                setImageProfiles(downloadURL); // Ensure setImageProfiles is defined

                resolve();
              } catch (error) {
                console.error("Error updating image profile:", error);
                reject(error);
              }
            }
          );
        });

        Alert.alert("Success", "Image uploaded successfully!");
      } catch (error: any) {
        console.error("Image Upload Failed:", error);
        Alert.alert("Image Upload Failed", error.message || "An unexpected error occurred.");
      } finally {
        setUploadingImage(false);
      }
    } else {
      console.log("Image selection was canceled.");
    }
  };

  const updateWeeklyBudget = async (newBudget: any) => {
    const token = await getToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    try {
      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            mutation updateWeeklyBudget($input: inputUpdateWeeklyBudget) {
              updateWeeklyBudget(input: $input) 
            }
          `,
          variables: {
            input: {
              weeklyBudget: newBudget,
            },
          },
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      setWeeklyBudget(newBudget);
    } catch (error: any) {
      Alert.alert("Weekly Budget Update Failed", error.message);
    }
  };




  const handleUpdateAddress = async () => {
    const token = await getToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    try {
      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            mutation updateAddressArtisantInMobile($input: inputUpdateAddressArtisantInMobile) {
              updateAddressArtisantInMobile(input: $input)
            }
          `,
          variables: {
            input: {
              zipCodeHome: zipCode,
              adress: selectedSuggestion ? JSON.stringify(selectedSuggestion) : null,
            },
          },
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      Alert.alert("Address Updated", "Your address has been successfully updated.");
      await fetchUserInfo();
    } catch (error: any) {
      Alert.alert("Address Update Failed", error.message);
    }
  }



  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  if (uploading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const renderBudget = () => (
    <View style={styles.scene}>
      {/* Weekly Budget Slider */}
      <Text style={styles.sliderValue}>${weeklyBudget}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10000}
        step={100}
        value={weeklyBudget}
        onValueChange={updateWeeklyBudget}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#4CAF50"
      />
    </View>
  );

  const renderCategories = () => (
    <View style={styles.scene}>
      <CategoriesCreateSelector
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.scene}>
      <UploadDocs />
    </View>
  );

  const renderBusiness = () => (
    <ScrollView style={styles.scene}>
      <BusinessForm
        NewFormState={formStateForBusiness}
        setNewFormState={setFormStateForBusiness}
      />
    </ScrollView>
  );

  const renderAddress = () => (
    <View style={styles.scene}>
      <AddressAutocomplete
        NewzipCode={zipCode}
        setNewZipCode={setZipCode}
        NewselectedSuggestion={selectedSuggestion}
        setNewSelectedSuggestion={setSelectedSuggestion}
      />
    </View>
  );

  const renderSearchRequirementChecker = () => (
    <View style={styles.scene}>
      <SearchRequirementChecker
        categories={SearchRequirementCheckerState?.categories}
        isProfileComplete={SearchRequirementCheckerState?.profileCompleted}
        userAmount={
          SearchRequirementCheckerState?.paymentMethodChoosed === 'PayAsYouGo' ? 1000 :
            parseInt(SearchRequirementCheckerState?.userAmount)
        }
        paymentMethodChoosed={SearchRequirementCheckerState?.paymentMethodChoosed}
        minRequiredAmount={30}
        acceptedByBO={SearchRequirementCheckerState?.acceptedByBO}
        weeklySpent={SearchRequirementCheckerState?.weeklySpent}
        weeklyLimit={SearchRequirementCheckerState?.weeklyLimit}
        zipCodes={SearchRequirementCheckerState?.zipCodes}
      />
    </View>
  );

  const renderProfileComponent = () => (
    <View>
      <RenderProfile
        firstNames={firstNames}
        lastNames={lastNames}
        emails={emails}
        phones={phones}
        imageProfiles={imageProfiles}
        setFirstNames={setFirstNames}
        setLastNames={setLastNames}
        setPhones={setPhones}
        handleImageUpload={handleImageUpload}
        uploadingImage={uploadingImage}
      />
    </View>
  );

  const renderWhereuwork = () => (
    <View style={{ flex: 1 }}>
      <WhereYourWork />
    </View>
  );
  const renderContent = () => {
    switch (currentTab) {
      case 'profile':
        return renderProfileComponent();
      case 'budget':
        return renderBudget();
      case 'categories':
        return renderCategories();
      case 'documents':
        return renderDocuments();
      case 'business':
        return renderBusiness();
      case 'address':
        return renderAddress();
      case 'requirements':
        return renderSearchRequirementChecker();
      case 'whereuwork':
        return renderWhereuwork();
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Fixed Tab Bar */}
          <View style={styles.tabBar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabBarContent}
            >
              {TABS.map((tab: any) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.tabItem,
                    currentTab === tab.key && styles.activeTabItem,
                  ]}
                  onPress={() => setCurrentTab(tab.key)}
                >
                  <Text
                    style={[
                      styles.tabTitle,
                      currentTab === tab.key && styles.activeTabTitle,
                    ]}
                  >
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Tab Content */}
          {/* <View style={styles.contentContainer}>
            <ScrollView>
              {renderContent()}
            </ScrollView>
          </View> */}
          <View style={styles.contentContainer}>
            {currentTab === 'whereuwork' ? (
              renderContent()
            ) : (
              <ScrollView>
                {renderContent()}
              </ScrollView>
            )}
          </View>

          {/* Update Button */}
          {['profile'].includes(currentTab) && (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={updateUserInfo}
              disabled={uploading}
            >
              <Text style={styles.updateButtonText}>Update Settings</Text>
            </TouchableOpacity>
          )}

          {['categories'].includes(currentTab) && (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={UpdateCategories}
              disabled={uploading}
            >
              <Text style={styles.updateButtonText}>Update Categories</Text>
            </TouchableOpacity>
          )}

          {['business'].includes(currentTab) && (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateBusiness}
              disabled={uploading}
            >
              <Text style={styles.updateButtonText}>Update Business</Text>
            </TouchableOpacity>
          )}

          {['address'].includes(currentTab) && (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateAddress}
              disabled={uploading}
            >
              <Text style={styles.updateButtonText}>Update Address</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 8,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  tabBarContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  activeTabItem: {
    backgroundColor: '#4CAF50',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabTitle: {
    fontSize: 16,
    color: '#333',
  },
  activeTabTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scene: {
    // flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  uploadPlaceholder: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#757575',
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#9e9e9e',
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#4CAF50',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

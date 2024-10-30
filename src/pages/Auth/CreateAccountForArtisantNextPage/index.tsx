// import {
//   ActivityIndicator,
//   Alert,
//   Button,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { FC, useEffect, useRef, useState } from "react";
// import { Navigate, registerForPushNotificationsAsyncBro } from "navigation";
// import * as ImagePicker from 'expo-image-picker';
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { IPack } from "../Reservation";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import window from "../../../constants/Layout";
// import {
//   Ionicons,
//   MaterialCommunityIcons,
//   SimpleLineIcons,
//   FontAwesome5,
// } from "@expo/vector-icons";
// import { COLORS } from "../../../constants/theme";
// import { useDispatch } from "react-redux";
// import { isLogin, IUser, setUser, setLoadingPage } from "../../../store/User";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ButtonPrimary } from "@/components/index";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { LoginWithApple } from "@/components/buttons/LoginWithApple";
// import { FlatList } from "react-native";
// import { Video } from "expo-av";
// import Constants from "expo-constants";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../../firebase/index"
// WebBrowser.maybeCompleteAuthSession();





// const TreeComponent = ({ categories, setCategories }: any) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const toggleSelect = (path: any) => {
//     const updateCategories = (items: any, path: any) => {
//       if (path.length === 0) return items;

//       const [currentId, ...restPath] = path;
//       return items.map((item: any) => {
//         if (item.id === currentId) {
//           if (restPath.length === 0) {
//             return { ...item, selected: !item.selected };
//           }
//           if (item.subcategories) {
//             return {
//               ...item,
//               subcategories: updateCategories(item.subcategories, restPath),
//             };
//           }
//         }
//         return item;
//       });
//     };

//     setCategories((prevCategories: any) => updateCategories(prevCategories, path));
//   };

//   // @ts-ignore
//   const renderLastElements = (items: any, path = []) => {
//     // Filter and sort the items
//     const filteredItems = items.filter((item: any) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const selectedItems = filteredItems.filter((item: any) => item.selected);
//     const unselectedItems = filteredItems.filter((item: any) => !item.selected);

//     const sortedItems = [...selectedItems, ...unselectedItems];
//   // @ts-ignore
//     return sortedItems.map((item: any) => {
//       const newPath: any = [...path, item.id];

//       if (!item.subcategories || item.subcategories.length === 0) {
//         return (
//           <TouchableOpacity
//             key={item.id}
//             onPress={() => toggleSelect(newPath)}
//             className={`cursor-pointer flex-row text-nowrap flex rounded-md ${item.selected ? 'bg-primary-500 text-white' : 'bg-white text-black'} p-2 my-2 border`}
//           >
//             <Text style={styles.categoryItemText}>{item.name}</Text>
//           </TouchableOpacity>
//         );
//       }
//       return renderLastElements(item.subcategories, newPath);
//     });
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Search categories..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//         placeholderTextColor={"#00000050"}
//         textContentType="none"
//       />
//       <View className="gap-3">
//         {renderLastElements(categories)}
//       </View>
//     </View>
//   );
// };




// export const getStringProperty = (
//   someUnknown: unknown,
//   propertyName: string
// ): string | unknown => {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const p = (someUnknown as any)[propertyName];
//     if (typeof p === "string") {
//       return p;
//     }
//   } catch {
//     // Ignore.
//   }
//   return undefined;
// };
// const GoogleEnv = {
//   clientId:
//     "595961874472-obn3ip8ajojv7dmjia29osu5u9pmaq5u.apps.googleusercontent.com",
//   iosClientId:
//     "595961874472-o02ute49jq85lkt93oi6rhecvao87skc.apps.googleusercontent.com",
//   androidClientId:
//     "595961874472-3pmkc1kskp122fpusqejn3e0i7p824uj.apps.googleusercontent.com",
// };

// const CreateAccount = ({
//   navigation,
//   route,
// }: {
//   navigation: Navigate;
//   route: any;
// }) => {
//   const dispatch = useDispatch();
//   const insets = useSafeAreaInsets();
//   const [username, setUsername] = useState("");
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [Email, setEmail] = useState("");
//   // const [User, setUser] = useState<IUser | null>(null);
//   const [password, setPassword] = useState("");
//   const [ShowPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [SelectedAccount, setSelectedAccount] = useState("User");
//   const [media, setMedia] = useState<any>([]);
//   const [adress, setAdress] = useState("");
//   const [aboutYou, setAboutYou] = useState("");


//   //login
//   const [Loading, setLoading] = useState(false);
//   const [LoadingCategories, setLoadingCategories] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);


//   const [accessToken, setAccessToken] = React.useState<string | null>(null);


//   const validateEmail = (email: string) => {
//     return String(email)
//       .toLowerCase()
//       .match(
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       );
//   };
//   const validateStrings = (text: string) => {
//     return text.replace(/^a-zA-Z0-9]/g, "");
//   };





//   const getSelectedSubcategoriesAndProfessionals = (items: any) => {
//     let selected: any = []

//     items.forEach((item: any) => {
//       if (item.selected) {
//         selected.push({
//           id: item.id,
//           professionals: item.professionals || []
//         });
//       }
//       if (item.subcategories) {
//         selected = selected.concat(getSelectedSubcategoriesAndProfessionals(item.subcategories));
//       }
//     });

//     return selected;
//   };


// const uploadImagesToFirebase = async (media: any) => {
//   try {
//     console.log('====================================');
//     console.log('media', media);
//     console.log('====================================');
//     let uploadedImages;

//     if (media.length > 0) {
//       uploadedImages = await Promise.all(
//         media.map(async (item: any) => {
//           try {
//             // Fetch the image from the local URI
//             const response = await fetch(item.uri);
//             if (!response.ok) throw new Error('Network response was not ok');

//             // Convert the image to a blob
//             const blob = await response.blob();
//             console.log('Blob:', blob);

//             // Create a reference to the Firebase Storage location
//             const storageRef = ref(storage, `images/${Date.now()}_${item.fileName}`);
//             console.log('StorageRef:', storageRef);

//             // Upload the blob to Firebase Storage
//             const uploadTask = uploadBytesResumable(storageRef, blob);
//             console.log('UploadTask:', uploadTask);

//             // Monitor the upload progress
//             return new Promise((resolve, reject) => {
//               uploadTask.on(
//                 'state_changed',
//                 (snapshot) => {
//                   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                   console.log('Upload is ' + progress + '% done');
//                 },
//                 (error) => {
//                   console.error('Upload failed', error);
//                   reject(error);
//                 },
//                 async () => {
//                   // Get the download URL of the uploaded image
//                   const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//                   console.log('File available at', downloadURL);
//                   const img = {
//                     name: item.fileName,
//                     size: `${item.fileSize}`,
//                     source: downloadURL,
//                     current: true,
//                   }
//                   resolve(img);
//                 }
//               );
//             });
//           } catch (error: any) {
//             console.error('Error in uploading image:', error.message);
//             throw error;
//           }
//         })
//       );
//     }

//     console.log('Uploaded Images:', uploadedImages);
//     return uploadedImages;
//   } catch (error) {
//     console.error('Error in uploading images:', error);
//     throw error;
//   }
// };

//   const CreateAccount = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");


//     if (LastName.length === 0) {
//       setErrors((prev) => ({ ...prev, lastName: "Last name is required" }));
//       return;
//     }
//     if (username.length === 0) {
//       setErrors((prev) => ({ ...prev, number: "Phone number is required" }));
//       return;
//     }
//     if (Email.length === 0) {
//       setErrors((prev) => ({ ...prev, email: "Email is required" }));
//       return;
//     }
//     if (!validateEmail(Email)) {
//       setErrors((prev) => ({ ...prev, email: "Invalid Email" }));
//       return;
//     }

//     if (password.length === 0) {
//       setErrors((prev) => ({ ...prev, password: "Password is required" }));
//       return;
//     }
//     if (adress.length === 0) {
//       setErrors((prev) => ({ ...prev, adress: "Address is required" }));
//       return;
//     }

//     if (aboutYou.length === 0) {
//       setErrors((prev) => ({ ...prev, aboutYou: "About you is required" }));
//       return;
//     }



//     if (SelectedAccount === "Artisan") {
//       if (getSelectedSubcategoriesAndProfessionals(categories).length === 0) {
//         Alert.alert('Please select at least one category');
//         return;
//       }
//       if (media.length === 0) {
//         Alert.alert('Please add at least one media');
//         return;
//       }
//     }




//     const selectedCategories = getSelectedSubcategoriesAndProfessionals(categories);
//     console.log('Selected categories:', selectedCategories);



//     try {
//       setLoading(true);

//       console.log('====================================');
//       console.log('media', media);
//       console.log('====================================');
//       let uploadedImages;
//       if (media.length > 0) {
//         uploadedImages = await uploadImagesToFirebase(media);
//       }


//       console.log('====================================');
//       console.log('Uploaded Images:', uploadedImages);
//       console.log('====================================');

//       const pushToken = await registerForPushNotificationsAsyncBro();
//       console.log({ pushToken });
//       const role = SelectedAccount === "User" ? "user" : "artisant";
//       const categories: any = selectedCategories?.map((e: any) => e.id) || []
//       // @ts-ignore
//       const professionals = [...new Set(selectedCategories?.map((e: any) => e.professionals).flat()?.map((e: any) => e.id))] || []
//       const inputSignUp: any = {
//         firstName: FirstName,
//         lastName: LastName,
//         email: Email,
//         password: password,
//         phone: username,
//         role: role,
//         categories: categories,
//         professionals: professionals,
//         newImage: media?.length > 0 ? uploadedImages : [],
//         adress: adress,
//         aboutYou: aboutYou,
//         pushToken
//       };



//       console.log('inputSignUp', inputSignUp);







//       const res = await fetch(
//         Constants.expoConfig?.extra?.apiUrl as string,
//         {
//           method: "POST",
//           headers: myHeaders,
//           body: JSON.stringify({
//             query: `
//                    mutation signUp($inputSignUp: inputSignUp) {
//                       signUp(inputSignUp: $inputSignUp) {
//                         user {
//                             id
//                           firstName
//                           lastName
//                           email
//                           phone
//                           role
//                           imageProfile
//                         }
//                         token
//                       }
//                     } 
//                   `,
//             variables: {
//               "inputSignUp": inputSignUp
//             },

//           }),
//         }
//       );

//       const json = await res.json();
//       console.log('====================================');
//       console.log('signUp', json);
//       console.log('====================================');

//       if (json.data?.signUp?.user) {

//         console.info('user', json.data?.signUp.user);
//         console.info('token', json.data?.signUp.token);

//         await AsyncStorage.setItem(
//           "@token",
//           json.data?.signUp?.token
//         );
//         await AsyncStorage.setItem("@user", JSON.stringify(json.data?.signUp?.user));
//         await AsyncStorage.setItem("@pushToken", json.data?.login?.user?.pushToken);

//         dispatch(isLogin(true));
//         dispatch(setUser(json.data?.signUp?.user));
//       } else {
//         console.error('Error in signUp:', json);
//         setLoading(false);
//         return Alert.alert('Error', json?.errors[0]?.message);
//       }
//       // console.log({ user: json.data?.login?.user })
//       // const token = await registerForPushNotificationsAsync();
//       // console.info({ token });



//     }
//     catch (error: any) {
//       setLoading(false);
//       console.error('Error ', error.message);
//       return Alert.alert('Error', error?.errors[0]?.error?.message);
//     }
//   }

//   const [Errors, setErrors] = useState({
//     FirstName: "",
//     LastName: "",
//     number: "",
//     email: "",
//     password: "",
//     adress: "",
//     aboutYou: "",
//   });

//   const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({ x: elementIndex * window.width, animated: true });
//     }
//   };
//   const scrollViewRef1 = useRef<any>(null);

//   const pickMedia = async () => {
//     const result: any = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result?.canceled) {
//       handleStateChange([...media, ...result.assets], setMedia);
//     }
//   };

//   const [showDatePicker, setShowDatePicker] = useState(false);



//   const handleStateChange = async (newState: any, setState: React.Dispatch<React.SetStateAction<any>>) => {
//     setState(newState);
//     // saveState();
//   };

//   const removeMedia = (uri: string) => {
//     handleStateChange(media.filter((item: any) => item.uri !== uri), setMedia);
//   };

//   const moveMedia = (index: number, direction: 'left' | 'right') => {
//     const newMedia = [...media];
//     if (direction === 'left' && index > 0) {
//       [newMedia[index - 1], newMedia[index]] = [newMedia[index], newMedia[index - 1]];
//     } else if (direction === 'right' && index < newMedia.length - 1) {
//       [newMedia[index + 1], newMedia[index]] = [newMedia[index], newMedia[index + 1]];
//     }
//     handleStateChange(newMedia, setMedia);
//   };


//   function generateCategoryQuery(depth: any) {
//     let query = `
//       query categories {
//         categories {
//           ...CategoryFields
//           ${generateSubcategories(depth)}
//         }
//       }

//       fragment CategoryFields on Category {
//         id
//         name
//         icon
//         unLockedAmount
//         subcategories {
//           id
//           name
//           icon
//           unLockedAmount
//         }
//         professionals {
//           id
//           text
//           img
//         }
//       }
//     `;
//     return query;
//   }

//   function generateSubcategories(depth: any): any {
//     if (depth === 0) return '';
//     return `
//       subcategories {
//         ...CategoryFields
//         ${generateSubcategories(depth - 1)}
//       }
//     `;
//   }




//   const fetchCategoriesManually = async () => {
//     try {
//       setLoadingCategories(true);
//       const depthResponse = await fetch(`${Constants.expoConfig?.extra?.apiUrl}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: `
//             query categoryDepth {
//               categoryDepth
//             }
//           `,
//         }),
//       });
//       const depthData = await depthResponse.json();
//       console.log('Depth data:', depthData);

//       const depth = depthData?.data?.categoryDepth;

//       const query = generateCategoryQuery(depth);

//       const response = await fetch(`${Constants.expoConfig?.extra?.apiUrl}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: query,
//         }),
//       });
//       const result = await response.json();
//       console.log('Result data:', result.data.categories);
//       setCategories(result.data.categories);
//       setLoadingCategories(false);
//       // await AsyncStorage.setItem('categories', JSON.stringify(result.data.categories));
//       // console.log('Data stored in AsyncStorage');

//       // const storedCategories = await AsyncStorage.getItem('categories');
//       // if (storedCategories) {
//       //   setCategories(storedCategories);
//       // }
//     } catch (error) {
//       setLoadingCategories(false);
//       console.error('Error in manual fetch logic:', error);
//     }
//   };



//   useEffect(() => {
//     fetchCategoriesManually();
//   }, []);








//   // console.log('Categories:', categories);




//   return (
//     <>
//       <View
//         className="flex-row justify-between items-center bg-white"
//         style={{
//           paddingTop: insets.top,
//         }}
//       >
//         <TouchableOpacity onPress={() => navigation.goBack()} className="px-4 rounded-full shadow-sm shadow-slate-400">
//           <Ionicons name="chevron-back" color="#2B61E3" size={22} />
//         </TouchableOpacity>

//         {/* <TouchableOpacity onPress={() => { }} className="p-2">
//       <Ionicons name="chevron-back" color="transparent" size={24} />
//     </TouchableOpacity> */}
//       </View>
//       <KeyboardAwareScrollView
//         style={{
//           flex: 1,
//         }}
//         className=" bg-white pt-10"
//       >
//         <Text
//           style={{ color: COLORS.primary }}
//           className=" text-2xl font-bold my-1  text-center">
//           Create a New Account
//         </Text>
//         <View className="flex-row justify-center">
//           <View className="flex-row justify-center p-1 rounded-full bg-gray-50">
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedAccount('User');
//                 scrollToElement(scrollViewRef1, 0)
//               }}
//               style={(SelectedAccount === "User") ? { backgroundColor: COLORS.primary } : {}}
//               className="w-32 p-1 rounded-full ">
//               <Text className="text-lg font-bold text-center">
//                 User
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedAccount('Artisan');
//                 scrollToElement(scrollViewRef1, 1)
//               }}
//               style={(SelectedAccount === "Artisan") ? { backgroundColor: COLORS.primary } : {}}
//               className="w-32 p-1 rounded-full ">
//               <Text className="text-lg font-bold text-center">
//                 Artisan
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <ScrollView
//           ref={scrollViewRef1}
//           snapToInterval={window?.width} // Snaps at each element width
//           decelerationRate="fast"
//           // scrollEnabled={!!SelectedProfession}
//           onScroll={(event) => {
//             if (event.nativeEvent.contentOffset.x >= window.width) {
//               setSelectedAccount("Artisan")
//             } else {
//               setSelectedAccount("User")
//             }
//           }}
//           style={{}} horizontal >

//           <View style={{ width: window.width }} >
//             <View className="px-5">
//               <TextInput
//                 value={FirstName}
//                 onChangeText={setFirstName}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Enter your First name"
//                 textContentType="name"
//                 style={{
//                   borderColor: Errors?.FirstName?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.FirstName && (
//                 <Text className="text-red-600 mb-3 ml-4">{Errors?.FirstName}</Text>
//               )}
//               <TextInput
//                 value={LastName}
//                 onChangeText={setLastName}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Enter your Last name"
//                 textContentType="name"
//                 style={{
//                   borderColor: Errors?.LastName?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.LastName && (
//                 <Text className="text-red-600 mb-3 ml-4">{Errors?.LastName}</Text>
//               )}
//               {/* <Text className="text-black ml-2 mb-2">Phone Number</Text> */}
//               <TextInput
//                 value={username}
//                 onChangeText={setUsername}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 keyboardType="number-pad"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Enter your phone number"
//                 textContentType="telephoneNumber"
//                 style={{
//                   borderColor: Errors?.number?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.number && (
//                 <Text className="text-red-600 mb-3 ml-4">{Errors?.number}</Text>
//               )}
//               {/* <Text className="text-black ml-2 mb-2">Email</Text> */}
//               <TextInput
//                 value={Email}
//                 onChangeText={setEmail}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 keyboardType="email-address"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Enter your email"
//                 textContentType="emailAddress"
//                 style={{
//                   borderColor: Errors?.email?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.email && (
//                 <Text className="text-primary-500 mb-3 ml-4">{Errors?.email}</Text>
//               )}
//               {/* <Text className="text-black ml-2 mb-2">Password</Text> */}
//               <View className="relative">
//                 <TextInput
//                   value={password}
//                   onChangeText={setPassword}

//                   className="text-black border-b border-primary-500 text-lg p-3 mb-3"
//                   keyboardType="default"
//                   placeholderTextColor={"#00000050"}
//                   placeholder="Enter your password"
//                   textContentType="password"
//                   secureTextEntry={!ShowPassword}
//                   style={{
//                     borderColor: Errors?.password?.length === 0 ? "#00000050" : "red",
//                   }}
//                 />
//                 {Errors?.password && (
//                   <Text className="text-primary-500 mb-3 ml-4">{Errors?.password}</Text>
//                 )}
//                 <TouchableOpacity
//                   onPress={() => setShowPassword((v) => !v)}
//                   className="absolute right-3 top-[15%]"
//                 >
//                   <Ionicons
//                     name={!ShowPassword ? "eye-off" : "eye"}
//                     size={20}
//                     color="black"
//                     className="mt-6"
//                   />
//                 </TouchableOpacity>
//               </View>

//               {/* <Text className="text-black ml-2 mb-2">Email</Text> */}
//               <TextInput
//                 value={adress}
//                 onChangeText={setAdress}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Your Address"
//                 textContentType="addressCity"
//                 style={{
//                   borderColor: Errors?.adress?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.email && (
//                 <Text className="text-primary-500 mb-3 ml-4">{Errors?.adress}</Text>
//               )}
//               <TextInput
//                 value={aboutYou}
//                 onChangeText={setAboutYou}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="About you"
//                 textContentType="none"
//                 style={{
//                   borderColor: Errors?.aboutYou?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {
//                 Errors?.aboutYou && (
//                   <Text className="text-primary-500 mb-3 ml-4">{Errors?.aboutYou}</Text>
//                 )
//               }

//               {/* <TouchableOpacity
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
//                         backgroundColor: COLORS.primary,
//                         borderRadius: 3,
//                       }}
//                     />
//                   )}
//                 </View>
//                 <Text className="mb-3 text-md pt-3">Remember me</Text>
//               </TouchableOpacity> */}
//               <ButtonPrimary
//                 Loading={Loading}
//                 onPress={CreateAccount}
//                 setLoading={() => { }}
//                 text="Create an Account"
//               />
//             </View>


//             <View className="w-full flex-row items-center mt-3 px-5">
//               <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
//               <View className="w-3" />
//               <Text className="text-gray-400">Or</Text>
//               <View className="w-3" />
//               <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
//             </View>
//             <View className="justify-center mt-3 pb-3 px-5">

//               <View className="flex-row justify-center mt-1 px-6">
//                 <Text className="text-black mb-3 text-base">
//                   Already have an account?{" "}
//                 </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//                   <Text
//                     style={{ color: COLORS.primary }}
//                     className="text-center text-[16px] pt-1 text-primary-500">
//                     Log in
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//           <View style={{ width: window.width }} >
//             <View className="px-5">
//               <TextInput
//                 value={FirstName}
//                 onChangeText={setFirstName}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Enter your First name"
//                 textContentType="name"
//                 style={{
//                   borderColor: Errors?.FirstName?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.FirstName && (
//                 <Text className="text-red-600 mb-3 ml-4">{Errors?.FirstName}</Text>
//               )}
//               <TextInput
//                 value={LastName}
//                 onChangeText={setLastName}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Enter your Last name"
//                 textContentType="name"
//                 style={{
//                   borderColor: Errors?.LastName?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.LastName && (
//                 <Text className="text-red-600 mb-3 ml-4">{Errors?.LastName}</Text>
//               )}
//               {/* <Text className="text-black ml-2 mb-2">Phone Number</Text> */}
//               <TextInput
//                 value={username}
//                 onChangeText={setUsername}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 keyboardType="number-pad"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Enter your phone number"
//                 textContentType="telephoneNumber"
//                 style={{
//                   borderColor: Errors?.number?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.number && (
//                 <Text className="text-red-600 mb-3 ml-4">{Errors?.number}</Text>
//               )}
//               {/* <Text className="text-black ml-2 mb-2">Email</Text> */}
//               <TextInput
//                 value={Email}
//                 onChangeText={setEmail}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 keyboardType="email-address"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Enter your email"
//                 textContentType="emailAddress"
//                 style={{
//                   borderColor: Errors?.email?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.email && (
//                 <Text className="text-primary-500 mb-3 ml-4">{Errors?.email}</Text>
//               )}
//               {/* <Text className="text-black ml-2 mb-2">Password</Text> */}
//               <View className="relative">
//                 <TextInput
//                   value={password}
//                   onChangeText={setPassword}

//                   className="text-black border-b border-primary-500 text-lg p-3 mb-3"
//                   keyboardType="default"
//                   placeholderTextColor={"#00000050"}
//                   placeholder="Enter your password"
//                   textContentType="password"
//                   secureTextEntry={!ShowPassword}
//                   style={{
//                     borderColor: Errors?.password?.length === 0 ? "#00000050" : "red",
//                   }}
//                 />
//                 {Errors?.password && (
//                   <Text className="text-primary-500 mb-3 ml-4">{Errors?.password}</Text>
//                 )}
//                 <TouchableOpacity
//                   onPress={() => setShowPassword((v) => !v)}
//                   className="absolute right-3 top-[15%]"
//                 >
//                   <Ionicons
//                     name={!ShowPassword ? "eye-off" : "eye"}
//                     size={20}
//                     color="black"

//                     className="mt-6"
//                   />
//                 </TouchableOpacity>
//               </View>

//               <TextInput
//                 value={adress}
//                 onChangeText={setAdress}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="Your Address"
//                 textContentType="addressCity"
//                 style={{
//                   borderColor: Errors?.adress?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {Errors?.email && (
//                 <Text className="text-primary-500 mb-3 ml-4">{Errors?.adress}</Text>
//               )}
//               <TextInput
//                 value={aboutYou}
//                 onChangeText={setAboutYou}
//                 className="text-black border-b border-primary-500 text-lg p-3 mb-2"
//                 placeholderTextColor={"#00000050"}
//                 placeholder="About you"
//                 textContentType="none"
//                 style={{
//                   borderColor: Errors?.aboutYou?.length === 0 ? "#00000050" : "red",
//                 }}
//               />
//               {
//                 Errors?.aboutYou && (
//                   <Text className="text-primary-500 mb-3 ml-4">{Errors?.aboutYou}</Text>
//                 )
//               }

//               {SelectedAccount === "Artisan" && (
//                 <View>
//                   <Text style={{
//                     fontSize: 16,
//                     marginVertical: 8

//                   }}>Choose categories:</Text>
//                   {LoadingCategories ? <ActivityIndicator size="large" color="#0000ff" /> :

//                     <View


//                     >
//                       <TreeComponent categories={categories.reverse()} setCategories={setCategories} />
//                     </View>
//                   }
//                 </View>
//               )}
//               <View className="mt-4">
//                 <Text className="text-base font-semibold mb-2">Add media:</Text>
//                 <FlatList
//                   data={media}
//                   horizontal
//                   keyExtractor={(item) => item.uri}
//                   renderItem={({ item, index }) => (
//                     <View className="relative rounded-md overflow-hidden w-40 h-40 mr-2">
//                       {item.type.startsWith('image') ? (
//                         <Image source={{ uri: item.uri }} className="w-full h-full" resizeMode="cover" />
//                       ) : (
//                         <Video
//                           source={{ uri: item.uri }}
//                           style={{ width: '100%', height: '100%' }}
//                           // @ts-ignore
//                           resizeMode="cover"
//                           useNativeControls
//                         />
//                       )}
//                       <View style={styles.iconContainer}>
//                         {index > 0 && (
//                           <TouchableOpacity onPress={() => moveMedia(index, 'left')} className='p-1 rounded-full bg-black/20' style={styles.leftArrow}>
//                             <Ionicons name="arrow-back-circle" size={24} color="white" />
//                           </TouchableOpacity>
//                         )}
//                         {index < media.length - 1 && (
//                           <TouchableOpacity onPress={() => moveMedia(index, 'right')} className='p-1 rounded-full bg-black/20' style={styles.rightArrow}>
//                             <Ionicons name="arrow-forward-circle" size={24} color="white" />
//                           </TouchableOpacity>
//                         )}
//                         <TouchableOpacity
//                           className='p-1 rounded-full bg-white/80'
//                           onPress={() => removeMedia(item.uri)}
//                         >
//                           <Ionicons name="close-circle" size={24} color="red" />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   )}
//                 />
//                 {!media.length ? (

//                   <TouchableOpacity
//                     onPress={pickMedia}
//                     className='border-dashed items-center justify-center  w-40 h-40  border-2 rounded-md border-primary-500' >
//                     <Text className='text-xl text-primary-500'>+</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <View className='flex-row justify-end' >
//                     <Button
//                       title="Add New Media" onPress={pickMedia} />
//                   </View>
//                 )}
//               </View>


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
//                         backgroundColor: COLORS.primary,
//                         borderRadius: 3,
//                       }}
//                     />
//                   )}
//                 </View>
//                 <Text className="mb-3 text-md pt-3">Remember me</Text>
//               </TouchableOpacity>
//               <ButtonPrimary
//                 Loading={Loading}
//                 onPress={CreateAccount}
//                 setLoading={() => { }}
//                 text="Create an Account"
//               />
//             </View>


//             <View className="w-full flex-row items-center mt-3 px-5">
//               <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
//               <View className="w-3" />
//               <Text className="text-gray-400">Or</Text>
//               <View className="w-3" />
//               <View className="flex-row flex-1 bg-gray-500 h-[1px]" />
//             </View>
//             <View className="justify-center mt-3 pb-3 px-5">

//               <View className="flex-row justify-center mt-1 px-6">
//                 <Text className="text-black mb-3 text-base">
//                   Already have an account?{" "}
//                 </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//                   <Text
//                     style={{ color: COLORS.primary }}
//                     className="text-center text-[16px] pt-1 text-primary-500">
//                     Log in
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>

//         <View
//           style={{
//             height: 30,
//           }}
//         />
//       </KeyboardAwareScrollView>
//     </>

//   );
// };

// export default CreateAccount;

// const styles = StyleSheet.create({
//   between: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//   },
//   iconContainer: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   leftArrow: {
//     marginRight: 5,
//   },
//   rightArrow: {
//     marginRight: 5,
//   },
//   closeButton: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 2,
//   },
//   categoryItem: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 4, marginVertical: 4 },
//   categoryItemSelected: { backgroundColor: '#6200ea', color: 'white' },
//   categoryItemDefault: { backgroundColor: 'white', color: 'black', borderWidth: 1, borderColor: '#ccc' },
//   categoryItemText: { marginLeft: 8 },
// });


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withTiming, Easing } from 'react-native-reanimated';
// import { Ionicons } from '@expo/vector-icons';

// const formFields = ['firstName', 'lastName', 'phone', 'email', 'password', 'address', 'aboutYou'];

// export default function MagicalArtisanForm() {
//   const [formData, setFormData]:any = useState({});
//   const [errors, setErrors]:any = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading]:any = useState(false);
//   const [categories, setCategories]:any = useState([]);
//   const [selectedCategories, setSelectedCategories]:any = useState([]);
//   const [media, setMedia]:any = useState([]);

//   const buttonScale = useSharedValue(1);
//   const rotation = useSharedValue(0);

//   useEffect(() => {
//     setCategories([
//       { id: '1', name: 'Plumbing' },
//       { id: '2', name: 'Electrical' },
//       { id: '3', name: 'Carpentry' },
//       { id: '4', name: 'Painting' },
//     ]);
//   }, []);

//   const handleInputChange = (name:any, value:any) => {
//     setFormData((prev:any) => ({ ...prev, [name]: value }));
//     setErrors((prev:any) => ({ ...prev, [name]: '' }));
//   };

//   const toggleCategory = (categoryId:any) => {
//     setSelectedCategories((prev:any) =>
//       prev.includes(categoryId)
//         ? prev.filter((id:any) => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   const handleCreateAccount = () => {
//     setLoading(true);
//     rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false);
//     setTimeout(() => {
//       setLoading(false);
//       rotation.value = withTiming(0);
//     }, 2000);
//   };

//   const animatedButtonStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: withSpring(buttonScale.value) }],
//     };
//   });

//   const spinnerStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ rotateZ: `${rotation.value}deg` }],
//     };
//   });

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Ionicons name="chevron-back" size={24} color="#4CAF50" />
//         <Text style={styles.headerTitle}>Create Magical Artisan Account</Text>
//       </View>

//       {formFields.map(field => (
//         <View key={field} style={styles.inputContainer}>
//           <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
//           <TextInput
//             style={styles.input}
//             value={formData[field] || ''}
//             onChangeText={(text) => handleInputChange(field, text)}
//             secureTextEntry={field === 'password' && !showPassword}
//             multiline={field === 'aboutYou'}
//             numberOfLines={field === 'aboutYou' ? 4 : 1}
//           />
//           {field === 'password' && (
//             <TouchableOpacity
//               style={styles.eyeIcon}
//               onPress={() => setShowPassword(!showPassword)}
//             >
//               <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#4CAF50" />
//             </TouchableOpacity>
//           )}
//           {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
//         </View>
//       ))}

//       <Text style={styles.sectionTitle}>Choose categories:</Text>
//       <View style={styles.categoriesContainer}>
//         {categories.map((category:any) => (
//           <TouchableOpacity
//             key={category.id}
//             style={[
//               styles.categoryButton,
//               selectedCategories.includes(category.id) && styles.selectedCategoryButton
//             ]}
//             onPress={() => toggleCategory(category.id)}
//           >
//             <Text style={[
//               styles.categoryButtonText,
//               selectedCategories.includes(category.id) && styles.selectedCategoryButtonText
//             ]}>
//               {category.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Text style={styles.sectionTitle}>Add media:</Text>
//       <ScrollView horizontal style={styles.mediaContainer}>
//         {media.map((item:any, index:any) => (
//           <View key={index} style={styles.mediaItem}>
//             <Image source={{ uri: item }} style={styles.mediaPreview} />
//             <TouchableOpacity
//               style={styles.removeMediaButton}
//               onPress={() => setMedia(media.filter((_:any, i:any) => i !== index))}
//             >
//               <Ionicons name="close-circle" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
//         ))}
//         <TouchableOpacity
//           style={styles.addMediaButton}
//           onPress={() => setMedia([...media, 'https://via.placeholder.com/150'])}
//         >
//           <Ionicons name="add" size={40} color="#4CAF50" />
//         </TouchableOpacity>
//       </ScrollView>

//       <Animated.View style={[styles.createAccountButtonContainer, animatedButtonStyle]}>
//         <TouchableOpacity
//           style={styles.createAccountButton}
//           onPress={handleCreateAccount}
//           onPressIn={() => (buttonScale.value = 0.95)}
//           onPressOut={() => (buttonScale.value = 1)}
//         >
//           {loading ? (
//             <Animated.View style={spinnerStyle}>
//               <Ionicons name="sparkles" size={24} color="white" />
//             </Animated.View>
//           ) : (
//             <Text style={styles.createAccountButtonText}>Create Magical Account</Text>
//           )}
//         </TouchableOpacity>
//       </Animated.View>

//       <View style={styles.loginPrompt}>
//         <Text style={styles.loginPromptText}>Already have an account? </Text>
//         <TouchableOpacity>
//           <Text style={styles.loginLink}>Log in</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8F5E9',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginLeft: 8,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2E7D32',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//     borderRadius: 12,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: 'white',
//     color: '#1B5E20',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 12,
//     top: 40,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   categoriesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 16,
//   },
//   categoryButton: {
//     backgroundColor: '#C8E6C9',
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     margin: 4,
//   },
//   selectedCategoryButton: {
//     backgroundColor: '#4CAF50',
//   },
//   categoryButtonText: {
//     color: '#1B5E20',
//     fontWeight: '600',
//   },
//   selectedCategoryButtonText: {
//     color: 'white',
//   },
//   mediaContainer: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   mediaItem: {
//     marginRight: 8,
//     position: 'relative',
//   },
//   mediaPreview: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   removeMediaButton: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     borderRadius: 12,
//   },
//   addMediaButton: {
//     width: 100,
//     height: 100,
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//     borderStyle: 'dashed',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   createAccountButtonContainer: {
//     marginTop: 24,
//   },
//   createAccountButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//   },
//   createAccountButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   loginPrompt: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
//   loginPromptText: {
//     fontSize: 16,
//     color: '#1B5E20',
//   },
//   loginLink: {
//     fontSize: 16,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
// });


// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import Animated, { FadeIn, FadeOut, Layout, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { Feather } from '@expo/vector-icons';
// import FormCreateArtisanCategories from './FormCreateArtisanCategories';

// const { width, height } = Dimensions.get('window');

// const services = [
//   'Appliance Installation',
//   'Appliance Repair',
//   'Central Vacuum System',
//   'Dishwasher Installation',
//   'Dishwasher Repair',
//   'Dryer Repair',
//   'Garbage Disposal Repair',
//   'Lawn Mower Repair',
//   'Microwave Repair',
//   'Refrigerator Repair',
//   'Washing Machine Repair',
//   'Washer Dryer Hookup',
// ];

// const categories = [
//   'Appliances',
//   'Additions & Remodels',
//   'Carpentry & Woodworking',
//   'Cleaning',
//   'Concrete, Cement & Asphalt',
//   'Countertops',
//   'Design & Decor',
// ];

// const CreateAccountForArtisantNextPage = ({ navigation }: any) => {
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [viewMode, setViewMode] = useState('grid');
//   const buttonScale = useSharedValue(1);

//   const toggleService = (service: string) => {
//     setSelectedServices((prev) =>
//       prev.includes(service)
//         ? prev.filter((s) => s !== service)
//         : [...prev, service]
//     );
//   };

//   const animatedButtonStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: buttonScale.value }],
//     };
//   });

//   const handlePressIn = () => {
//     buttonScale.value = withSpring(0.95);
//   };

//   const handlePressOut = () => {
//     buttonScale.value = withSpring(1);
//   };

//   return (
//     <LinearGradient
//       colors={['#4CAF50', '#2E7D32']}
//       style={styles.container}
//     >
//       <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
//         <BlurView intensity={100} style={styles.blurContainer}>
//           <Text style={styles.title}>Select any other services you do.</Text>
//           <View style={styles.viewToggle}>
//             <TouchableOpacity
//               style={[styles.toggleButton, viewMode === 'grid' && styles.activeToggleButton]}
//               onPress={() => setViewMode('grid')}
//             >
//               <Feather name="grid" size={20} color={viewMode === 'grid' ? '#fff' : '#4CAF50'} />
//               <Text style={[styles.toggleText, viewMode === 'grid' && styles.activeToggleText]}>Grid</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.toggleButton, viewMode === 'list' && styles.activeToggleButton]}
//               onPress={() => setViewMode('list')}
//             >
//               <Feather name="list" size={20} color={viewMode === 'list' ? '#fff' : '#4CAF50'} />
//               <Text style={[styles.toggleText, viewMode === 'list' && styles.activeToggleText]}>List</Text>
//             </TouchableOpacity>
//           </View>
//           <ScrollView style={styles.scrollView}>
//             <FormCreateArtisanCategories 
//               selectedCategories
//               setSelectedCategories,
//               email,
//               setEmail,
//               phone,
//               setPhone,
//               showModal,
//               setShowModal,
//               Done,
//               setDone,
//               handleSignup,
//               setEnableTextMessage,
//               enableTextMessage,
//               Loading
//             />
//           </ScrollView>
//           <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate('FirstScreen')}
//               onPressIn={handlePressIn}
//               onPressOut={handlePressOut}
//             >
//               <LinearGradient
//                 colors={['#4CAF50', '#45a049']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.buttonGradient}
//               >
//                 <Text style={styles.buttonText}>Next</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>
//         </BlurView>
//       </Animated.View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   content: {
//     width: width * 0.9,
//     maxWidth: 400,
//     height: height * 0.9,
//   },
//   blurContainer: {
//     flex: 1,
//     borderRadius: 20,
//     overflow: 'hidden',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#fff',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.1)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   viewToggle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   toggleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     marginHorizontal: 5,
//   },
//   activeToggleButton: {
//     backgroundColor: '#4CAF50',
//   },
//   toggleText: {
//     marginLeft: 5,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   activeToggleText: {
//     color: '#fff',
//   },
//   scrollView: {
//     flex: 1,
//     marginBottom: 20,
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   gridItem: {
//     width: '48%',
//     aspectRatio: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   selectedGridItem: {
//     backgroundColor: '#4CAF50',
//   },
//   gridItemText: {
//     textAlign: 'center',
//     color: '#333',
//     fontWeight: 'bold',
//   },
//   selectedGridItemText: {
//     color: '#fff',
//   },
//   list: {
//     width: '100%',
//   },
//   listItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   listItemText: {
//     fontSize: 16,
//     color: '#333',
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     overflow: 'hidden',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonGradient: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default CreateAccountForArtisantNextPage;






// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, Image, Alert } from 'react-native';
// import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import FormCreateArtisanCategories from './FormCreateArtisanCategories';
// import PhoneInputComponent from '@/components/PhoneInputComponent';
// import { useRoute } from '@react-navigation/native';
// import Constants from 'expo-constants';
// import { getToken } from '@/helpers/getToken';
// const { width, height } = Dimensions.get('window');

// const Logo = () => (
//   <Image source={require('@/assets/handyman.png')} style={styles.logo} />
// );


// // Dummy data for categories
// const dummyCategories = [
//   { id: '1', name: 'Plumbing' },
//   { id: '2', name: 'Electrical' },
//   { id: '3', name: 'Carpentry' },
//   { id: '4', name: 'Painting' },
//   { id: '5', name: 'Landscaping' },
// ];

// const CreateAccountForArtisantNextPage = ({ navigation }: any) => {
//   const [selectedCategories, setSelectedCategories]: any = useState<[]>([]);
//   const [viewMode, setViewMode] = useState('grid');
//   const [email, setEmail] = useState('elhanouniazeddine@gmail.com');
//   const [phone, setPhone] = useState('212659320333');
//   const [showModal, setShowModal] = useState(false);
//   const [done, setDone] = useState(false);
//   const [enableTextMessage, setEnableTextMessage]: any = useState(false);
//   const [loading, setLoading] = useState(false);
//   const buttonScale = useSharedValue(1);
//   const route = useRoute();

//   const { categoryId, zipCode } = route.params as { categoryId: string, zipCode: string };


//   const handleSignup = async () => {
//     // setLoading(true);


//     console.log('Email:', email);
//     console.log('Phone:', phone);
//     console.log('Selected categories:', selectedCategories);
//     console.log('Enable text message:', enableTextMessage);
//     console.log('====================================');
//     console.log('zip code:', zipCode);
//     console.log('====================================');
//     console.log('categoryId:', categoryId);



//     // const categories = JSON.parse(selectedCategories)
//     const categories: any = selectedCategories.find((category: any) => category?.id == categoryId)?.subcategories?.map((e: any) => e?.id)




//     const token = await getToken();
//     const headers = new Headers({
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     });

//     try {
//       setLoading(true);
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `

//     mutation signUpAsPro($inputSignUp: inputSignUp) {
//       signUpAsPro(inputSignUp: $inputSignUp) {
//         user {
//           id
//           firstName
//           lastName
//           email
//           password
//           provider
//           role
//           categories{
//             id
//           }
//         }
//         token
//       }
//     }
//           `,
//           variables: {
//             inputSignUp: {
//               email: email,
//               phone: phone,
//               role: "artisant",
//               categories: [...categories, categoryId],
//               zipCodes: [zipCode],
//               enableTextMessage: enableTextMessage,
//               confirmationResult: null,
//             }
//           }
//         }),
//       });

//       const data = await response.json();
//       console.log('data:', data.errors[0].message);

//       if (data.errors[0].message) {
//         Alert.alert("Error", data.errors[0].message);
//         setLoading(false);
//         return;
//       }

//       setLoading(false);
//     } catch (error: any) {
//       setLoading(false);
//       console.log('====================================');
//       console.log('error:', error.message);
//       console.log('====================================');
//       Alert.alert("Error", error.message);
//     }

//   };

//   const animatedButtonStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: buttonScale.value }],
//     };
//   });

//   const handlePressIn = () => {
//     buttonScale.value = withSpring(0.95);
//   };

//   const handlePressOut = () => {
//     buttonScale.value = withSpring(1);
//   };
//   const modalAnimation = useSharedValue(0);


//   const animatedModalStyle = useAnimatedStyle(() => {
//     return {
//       opacity: modalAnimation.value,
//       transform: [{ scale: modalAnimation.value }],
//     };
//   });


//   useEffect(() => {
//     if (showModal) {
//       modalAnimation.value = withSpring(1);
//     } else {
//       modalAnimation.value = withSpring(0);
//     }
//   }, [showModal]);
//   return (
//     <LinearGradient
//       colors={['#4CAF50', '#2E7D32']}
//       style={styles.container}
//     >
//       <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
//         <BlurView intensity={100} style={styles.blurContainer}>
//           <Text style={styles.title}>Select any other services you do.</Text>
//           {/* <View style={styles.viewToggle}>
//             <TouchableOpacity
//               style={[styles.toggleButton, viewMode === 'grid' && styles.activeToggleButton]}
//               onPress={() => setViewMode('grid')}
//             >
//               <Feather name="grid" size={20} color={viewMode === 'grid' ? '#fff' : '#4CAF50'} />
//               <Text style={[styles.toggleText, viewMode === 'grid' && styles.activeToggleText]}>Grid</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.toggleButton, viewMode === 'list' && styles.activeToggleButton]}
//               onPress={() => setViewMode('list')}
//             >
//               <Feather name="list" size={20} color={viewMode === 'list' ? '#fff' : '#4CAF50'} />
//               <Text style={[styles.toggleText, viewMode === 'list' && styles.activeToggleText]}>List</Text>
//             </TouchableOpacity>
//           </View> */}
//           <ScrollView style={styles.scrollView}>
//             <FormCreateArtisanCategories
//               selectedCategories={selectedCategories}
//               setSelectedCategories={setSelectedCategories}
//               email={email}
//               setEmail={setEmail}
//               phone={phone}
//               setPhone={setPhone}
//               showModal={showModal}
//               setShowModal={setShowModal}
//               Done={done}
//               setDone={setDone}
//               handleSignup={handleSignup}
//               setEnableTextMessage={setEnableTextMessage}
//               enableTextMessage={enableTextMessage}
//               Loading={loading}
//               categories={dummyCategories}
//               SelectedTypeOfView={viewMode}
//             />
//             <Modal

//               visible={showModal} transparent >
//               <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
//                 <View style={styles.modalContent}>
//                   <Logo />
//                   <Text style={styles.modalTitle}>New customers are waiting.</Text>
//                   <Text style={styles.modalSubtitle}>There are 30,000 leads on A HOUSE GURU a day.</Text>

//                   <TextInput
//                     style={styles.input}
//                     placeholder="Email"
//                     value={email}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                   />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Phone"
//                     value={phone}
//                     onChangeText={setPhone}
//                     keyboardType="phone-pad"
//                   />

//                   {/* <PhoneInput
//                             defaultValue={phone}
//                             defaultCode="US"
//                             layout="first"
//                             onChangeText={(text) => {
//                                 setPhone(text);
//                             }}
//                             withDarkTheme
//                             withShadow
//                             autoFocus
//                         /> */}

//                   <View
//                     className='flex-row items-center justify-between my-2'
//                   >
//                     {/* <PhoneInputComponent /> */}
//                   </View>

//                   <Text style={styles.disclaimer}>
//                     We'll text you with a verification code. Carrier rates may apply.
//                   </Text>

//                   <TouchableOpacity
//                     style={styles.checkbox}
//                     onPress={() => setEnableTextMessage(!enableTextMessage)}
//                   >
//                     <Ionicons
//                       name={enableTextMessage ? 'checkbox-outline' : 'square-outline'}
//                       size={24}
//                       color="#007AFF"
//                     />
//                     <Text style={styles.checkboxText}>Enable text messages</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.continueButton}
//                     onPress={async () => {
//                       await handleSignup();
//                       // setShowModal(false);
//                     }}
//                   >
//                     <Text style={styles.continueButtonText}>
//                       {false ? "Loading..." : "Continue"}
//                     </Text>
//                   </TouchableOpacity>

//                   <Text style={styles.termsText}>
//                     By clicking Continue, you agree to the Terms of Use and Privacy Policy.
//                   </Text>

//                   <TouchableOpacity
//                     style={styles.closeButton}
//                     onPress={() => setShowModal(false)}
//                   >
//                     <Ionicons name="close" size={24} color="black" />
//                   </TouchableOpacity>
//                 </View>
//               </Animated.View>
//             </Modal>
//           </ScrollView>


//           <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => {
//                 // handleSignup();
//                 setShowModal(true);
//               }}
//               onPressIn={handlePressIn}
//               onPressOut={handlePressOut}
//             >
//               <LinearGradient
//                 colors={['#4CAF50', '#45a049']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.buttonGradient}
//               >
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Next'}</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>
//           <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate('CreateAccountForArtisant')}
//               onPressIn={handlePressIn}
//               onPressOut={handlePressOut}
//             >
//               <LinearGradient
//                 colors={['#4CAF50', '#45a049']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.buttonGradient}
//               >
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Back'}</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>
//         </BlurView>
//       </Animated.View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   content: {
//     width: width * 0.9,
//     maxWidth: 400,
//     height: height * 0.9,
//   },
//   blurContainer: {
//     flex: 1,
//     borderRadius: 20,
//     overflow: 'hidden',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#fff',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.1)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   viewToggle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   toggleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     marginHorizontal: 5,
//   },
//   activeToggleButton: {
//     backgroundColor: '#4CAF50',
//   },
//   toggleText: {
//     marginLeft: 5,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   activeToggleText: {
//     color: '#fff',
//   },
//   scrollView: {
//     flex: 1,
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     overflow: 'hidden',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonGradient: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 24,
//     borderRadius: 16,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   modalSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 16,
//   },
//   disclaimer: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 8,
//   },
//   checkbox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   checkboxText: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   continueButton: {
//     backgroundColor: '#007AFF',
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 24,
//     alignItems: 'center',
//   },
//   continueButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   termsText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//   },
//   logo: {
//     width: 30,
//     height: 30,
//   },
// });

// export default CreateAccountForArtisantNextPage;



import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, Image, Alert, Animated as RNAnimated } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Feather, Ionicons } from '@expo/vector-icons';
import FormCreateArtisanCategories from './FormCreateArtisanCategories';
import PhoneInputComponent from '@/components/PhoneInputComponent';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { getToken } from '@/helpers/getToken';
import { useFirebaseLogin } from '@itzsunny/firebase-login';
import { firebaseConfig, Newauth } from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const Logo = () => (
  <Image source={require('@/assets/handyman.png')} style={styles.logo} />
);

// Dummy data for categories
const dummyCategories = [
  { id: '1', name: 'Plumbing' },
  { id: '2', name: 'Electrical' },
  { id: '3', name: 'Carpentry' },
  { id: '4', name: 'Painting' },
  { id: '5', name: 'Landscaping' },
];

const CreateAccountForArtisantNextPage = ({ navigation }: any) => {
  const [selectedCategories, setSelectedCategories]: any = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [email, setEmail] = useState('azzeddine.elhanouni@uit.ac.ma');
  const [phone, setPhone] = useState('14045907154');
  const [showModal, setShowModal] = useState(false);
  const [done, setDone] = useState(false);
  const [enableTextMessage, setEnableTextMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // New state for error messages
  const buttonScale = useSharedValue(1);
  const route = useRoute();
  const { recaptcha, recaptchaBanner, sendOtp, verifyOtp } = useFirebaseLogin({ auth: Newauth, firebaseConfig: firebaseConfig });


  const { categoryId, zipCode } = route.params as { categoryId: string, zipCode: string };
  const [country, setCountry] = useState({ name: 'USA', code: '+1', flag: '🇺🇸' });




  const validatePhoneNumber = (phone: any) => {
    // Simple regex patterns for USA and Morocco
    const usaRegex = /^\+1\d{10}$/; // +1 followed by 10 digits
    const marocRegex = /^\+212\d{9}$/; // +212 followed by 9 digits

    if (country.code === '+1') {
      return usaRegex.test(phone);
    } else if (country.code === '+212') {
      return marocRegex.test(phone);
    }
    return false;
  };

  const toggleCountry = () => {
    if (country.code === '+1') {
      setCountry({ name: 'Morocco', code: '+212', flag: '🇲🇦' });
    } else {
      setCountry({ name: 'USA', code: '+1', flag: '🇺🇸' });
    }
  };


  const handleSignup = async () => {
    // Reset error message before new attempt
    setErrorMessage(null);

    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Selected categories:', selectedCategories);
    console.log('Enable text message:', enableTextMessage);
    console.log('====================================');
    console.log('zip code:', zipCode);
    console.log('====================================');
    console.log('categoryId:', categoryId);

    const categories = selectedCategories.find((category: any) => category?.id === categoryId)?.subcategories?.map((e: any) => e?.id) || [];

    try {
      setLoading(true);
      const token = await getToken();
      const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      });



      const fullPhoneNumber = `+${phone}`;

      if (!validatePhoneNumber(fullPhoneNumber)) {
        setLoading(false);
        Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
        return;
      }

      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            mutation signUpAsProInMobile($inputSignUp: inputSignUp) {
              signUpAsProInMobile(inputSignUp: $inputSignUp) {
                user {
                  id
                  firstName
                  lastName
                  email
                  password
                  provider
                  role
                  categories {
                    id
                  }
                }
                token
              }
            }
          `,
          variables: {
            inputSignUp: {
              email: email,
              phone: phone,
              role: "artisant",
              categories: [...categories, categoryId],
              zipCodes: [zipCode],
              enableTextMessage: enableTextMessage,
              confirmationResult: null,
            }
          }
        }),
      });

      const data: any = await response.json();
      console.log('data:', data);

      if (data.errors && data.errors.length > 0) {
        // Set the error message from backend
        setErrorMessage(data.errors[0].message);
        setLoading(false);
        return;
      }


      await AsyncStorage.setItem('@token', data?.data?.signUpAsProInMobile?.token);
      await AsyncStorage.setItem('@user', JSON.stringify(data?.data?.signUpAsProInMobile?.user));





      let id = await sendOtp(fullPhoneNumber);
      console.log('id', id);

      if (id) {

        const newtoken = data?.data?.signUpAsProInMobile?.token;

        const headers = new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${newtoken}`,
        });

        const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: `
    mutation updateVerificationOtpStep($input: inputUpdateVerificationOtpStep) {
        updateVerificationOtpStep(input: $input) 
    }
  `,
            variables: {
              input: {
                confirmationResultInMobile: id,
                phone: fullPhoneNumber,
              }
            }

          }),
        });

        const result = await response.json();
        console.log('result:', result);

        Alert.alert('OTP Sent', 'Please check your phone for the verification code.');
        setLoading(false);

        navigation.navigate('VerificationAccountArtisantScreen');
      }


      // Handle successful signup (e.g., navigate to next screen)
      // You might want to navigate or perform other actions here
      setLoading(false);

    } catch (error: any) {
      setLoading(false);
      console.log('====================================');
      console.log('error:', error.message);
      console.log('====================================');
      setErrorMessage(error.message);
    }
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const modalAnimation = useSharedValue(0);

  const animatedModalStyle = useAnimatedStyle(() => ({
    opacity: modalAnimation.value,
    transform: [{ scale: modalAnimation.value }],
  }));

  useEffect(() => {
    if (showModal) {
      modalAnimation.value = withSpring(1);
    } else {
      modalAnimation.value = withSpring(0);
      setErrorMessage(null); // Clear error message when modal is closed
    }
  }, [showModal]);

  return (
    <LinearGradient
      colors={['#4CAF50', '#2E7D32']}
      style={styles.container}
    >
      {
        recaptcha
      }
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
        <BlurView intensity={100} style={styles.blurContainer}>
          <Text style={styles.title}>Select any other services you do.</Text>
          {/* <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.toggleButton, viewMode === 'grid' && styles.activeToggleButton]}
              onPress={() => setViewMode('grid')}
            >
              <Feather name="grid" size={20} color={viewMode === 'grid' ? '#fff' : '#4CAF50'} />
              <Text style={[styles.toggleText, viewMode === 'grid' && styles.activeToggleText]}>Grid</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, viewMode === 'list' && styles.activeToggleButton]}
              onPress={() => setViewMode('list')}
            >
              <Feather name="list" size={20} color={viewMode === 'list' ? '#fff' : '#4CAF50'} />
              <Text style={[styles.toggleText, viewMode === 'list' && styles.activeToggleText]}>List</Text>
            </TouchableOpacity>
          </View> */}
          <ScrollView style={styles.scrollView}>
            <FormCreateArtisanCategories
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              showModal={showModal}
              setShowModal={setShowModal}
              Done={done}
              setDone={setDone}
              handleSignup={handleSignup}
              setEnableTextMessage={setEnableTextMessage}
              enableTextMessage={enableTextMessage}
              Loading={loading}
              categories={dummyCategories}
              SelectedTypeOfView={viewMode}
            />
            <Modal
              visible={showModal}
              transparent
              animationType="none"
              onRequestClose={() => setShowModal(false)}
            >
              <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
                <View style={styles.modalContent}>
                  <Logo />
                  <Text style={styles.modalTitle}>New customers are waiting.</Text>
                  <Text style={styles.modalSubtitle}>There are 30,000 leads on A HOUSE GURU a day.</Text>

                  {/* Error Message */}
                  {errorMessage && (
                    <Animated.View
                      entering={FadeIn.duration(300)}
                      exiting={FadeOut.duration(300)}
                      style={styles.errorContainer}
                    >
                      <Ionicons name="alert-circle" size={20} color="#D32F2F" />
                      <Text style={styles.errorText}>{errorMessage}</Text>
                      <TouchableOpacity onPress={() => setErrorMessage(null)}>
                        <Ionicons name="close-circle" size={20} color="#D32F2F" style={styles.errorCloseIcon} />
                      </TouchableOpacity>
                    </Animated.View>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                  {/* <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  /> */}

                  <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <TextInput
                      style={{ ...styles.input, flex: 1 }}
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="e.g 15044754720"
                      keyboardType="phone-pad"
                      maxLength={11}
                    />
                  </View>
                  {/* <PhoneInput
                            defaultValue={phone}
                            defaultCode="US"
                            layout="first"
                            onChangeText={(text) => {
                                setPhone(text);
                            }}
                            withDarkTheme
                            withShadow
                            autoFocus
                        /> */}

                  <View className='flex-row items-center justify-between my-2'>
                    {/* <PhoneInputComponent /> */}
                  </View>

                  <Text style={styles.disclaimer}>
                    We'll text you with a verification code. Carrier rates may apply.
                  </Text>

                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setEnableTextMessage(!enableTextMessage)}
                  >
                    <Ionicons
                      name={enableTextMessage ? 'checkbox-outline' : 'square-outline'}
                      size={24}
                      color="#007AFF"
                    />
                    <Text style={styles.checkboxText}>Enable text messages</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleSignup}
                  >
                    <Text style={styles.continueButtonText}>
                      {loading ? "Loading..." : "Continue"}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    By clicking Continue, you agree to the Terms of Use and Privacy Policy.
                  </Text>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Ionicons name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </Modal>
          </ScrollView>

          <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // handleSignup();
                setShowModal(true);
              }}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Next'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CreateAccountForArtisant')}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Back'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </BlurView>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: width * 0.9,
    maxWidth: 400,
    height: height * 0.9,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeToggleButton: {
    backgroundColor: '#4CAF50',
  },
  toggleText: {
    marginLeft: 5,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Removed for animated opacity
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  logo: {
    width: 30,
    height: 30,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCDD2',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    flex: 1,
    color: '#D32F2F',
    marginLeft: 8,
    fontSize: 14,
  },
  errorCloseIcon: {
    marginLeft: 8,
  },
});

export default CreateAccountForArtisantNextPage;

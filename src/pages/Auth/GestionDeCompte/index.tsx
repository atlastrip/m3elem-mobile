// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
//   StyleSheet,
//   Dimensions,
//   TouchableWithoutFeedback,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import tw from 'twrnc';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Slider from "@react-native-community/slider";
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import CategoriesCreateSelector from "@/components/CategorySelector";
// import UploadDocs from "@/components/UploadDocs";
// import { getToken } from "@/helpers/getToken";
// import SearchRequirementChecker from "@/components/SearchRequirementChecker";
// import BusinessForm from "@/components/BusinessForm";
// import AddressAutocomplete from "@/components/AddressAutocomplete";
// import { storage } from "firebase";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const TABS = [
//   { key: 'profile', title: 'Profile' },
//   { key: 'address', title: 'Address' },
// ];

// const RenderProfile = ({
//   firstNames,
//   lastNames,
//   emails,
//   phones,
//   imageProfiles,
//   setFirstNames,
//   setLastNames,
//   setPhones,
//   handleImageUpload,
//   uploadingImage,
// }: any) => (
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     <ScrollView >
//       {/* Profile Image Section */}
//       <View style={styles.profileImageContainer}>
//         <TouchableOpacity onPress={handleImageUpload}>
//           {imageProfiles ? (
//             <Image source={{ uri: imageProfiles }} style={styles.profileImage} />
//           ) : (
//             <View style={styles.uploadPlaceholder}>
//               <Text style={styles.uploadText}>Upload Image</Text>
//             </View>
//           )}
//           {uploadingImage && (
//             <ActivityIndicator style={tw`mt-2`} size="small" color="#4CAF50" />
//           )}
//         </TouchableOpacity>
//       </View>

//       {/* Personal Info */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>First Name</Text>
//         <TextInput
//           style={styles.input}
//           value={firstNames}
//           onChangeText={setFirstNames}
//         />
//       </View>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Last Name</Text>
//         <TextInput
//           style={styles.input}
//           value={lastNames}
//           onChangeText={setLastNames}
//         />
//       </View>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={[styles.input, styles.disabledInput]}
//           value={emails}
//           editable={false}
//         />
//       </View>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Phone</Text>
//         <TextInput
//           style={styles.input}
//           value={phones}
//           onChangeText={setPhones}
//           keyboardType="phone-pad"
//         />
//       </View>
//     </ScrollView>
//   </TouchableWithoutFeedback>
// );

// export default function UserSettings() {
//   const [currentTab, setCurrentTab] = useState('profile');
//   const [selectedCategories, setSelectedCategories]: any = useState([]);
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [zipCode, setZipCode] = useState('');
//   const [selectedSuggestion, setSelectedSuggestion]: any = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
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

//   const [firstNames, setFirstNames] = useState('');
//   const [lastNames, setLastNames] = useState('');
//   const [emails, setEmails] = useState('');
//   const [phones, setPhones] = useState('');
//   const [imageProfiles, setImageProfiles] = useState('');
//   const [documents, setDocuments] = useState([]);

//   const fetchUserInfo = useCallback(async () => {
//     const token = await getToken();
//     const headers = new Headers({
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     });

//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             query userInfo {
//               user {
//                 id
//                 firstName
//                 lastName
//                 email
//                 phone
//                 zipCodes
//                 zipCodeHome
//                 adress
//                 states
//                 available
//                 weeklyBudget
//                 currentWeekSpent
//                 paymentMethodChoosed
//                 profileCompleted
//                 AccountStatus
//                 amount
//                 businessName
//                 yearFounded
//                 numberOfEmployees
//                 streetAddress
//                 suiteNumber
//                 city
//                 state
//                 stateCities {
//                   state
//                   city
//                 }
//                 documents {
//                   url
//                   type
//                 }
//                 imageProfile
//                 categories {
//                   id
//                   name
//                   icon
//                 }
//                 reviews {
//                   id
//                   reviewer {
//                     id
//                     firstName
//                     lastName
//                     imageProfile
//                   }
//                   owner {
//                     id
//                     firstName
//                     lastName
//                     imageProfile
//                   }
//                   description
//                   rating
//                   order {
//                     id
//                     title
//                     professionals {
//                       id
//                       text
//                       img
//                     }
//                   }
//                   createdAt
//                 }
//                 professionals {
//                   id
//                   text
//                   img
//                 }
//               }
//             }
//           `,
//         }),
//       });

//       const data = await response.json();
//       const userData = data?.data?.user;

//       if (userData) {
//         setFirstNames(userData.firstName);
//         setLastNames(userData.lastName);
//         setEmails(userData.email);
//         setPhones(userData.phone);
//         setImageProfiles(userData.imageProfile);
//         setDocuments(userData.documents);
//         setSelectedCategories(userData?.categories.map((category: any) => category.id));


//         setSearchRequirementCheckerState({
//           categories: userData.categories,
//           profileCompleted: userData.profileCompleted,
//           userAmount: userData.amount,
//           paymentMethodChoosed: userData.paymentMethodChoosed,
//           minRequiredAmount: 30,
//           acceptedByBO: userData.AccountStatus,
//           weeklySpent: userData.currentWeekSpent,
//           weeklyLimit: userData.weeklyBudget,
//           zipCodes: userData.zipCodes,
//         });

//         setFormStateForBusiness({
//           businessName: userData?.businessName || "",
//           yearFounded: userData?.yearFounded || "",
//           numberOfEmployees: userData?.numberOfEmployees || "",
//           street: userData?.streetAddress || "",
//           city: userData?.city || "",
//           state: userData?.state || "",
//           zipCode: userData?.suiteNumber || "",
//         });

//         setSelectedSuggestion(
//           userData?.adress ? JSON.parse(userData?.adress) : null
//         );

//         setWeeklyBudget(userData.weeklyBudget);
//       } else {
//         throw new Error("User data not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       Alert.alert("Error", "Failed to load user data.");
//     }
//   }, []);




//   const updateUserInfo = async () => {
//     setUploading(true);
//     try {
//       const token = await getToken();
//       const headers = new Headers({
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       });

//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             mutation updateArtisantInMobile($input: inputUpdateArtisantInMobile) {
//               updateArtisantInMobile(input: $input) {
//                 id
//               }
//             }

//           `,
//           variables: {
//             input: {
//               firstName: firstNames,
//               lastName: lastNames,
//               phone: phones,
//               email: emails,
//               // weeklyBudget: weeklyBudget,
//             },
//           },
//         }),
//       });

//       const data = await response.json();
//       if (data.errors) {
//         throw new Error(data.errors[0].message);
//       }
//       Alert.alert("Profile Updated", "Your settings have been successfully updated.");
//       await fetchUserInfo();
//     } catch (error: any) {
//       Alert.alert("Update Failed", error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleImageUpload = async () => {
//     // Launch the image library to pick an image
//     const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });

//     // Check if the user canceled the image picker
//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setUploadingImage(true); // Assuming you have this state to show upload status

//       try {
//         const asset = result.assets[0];
//         const localUri = asset.uri;
//         const filename = localUri.split('/').pop() || `image_${Date.now()}`;
//         const match = /\.(\w+)$/.exec(filename);
//         const fileType = match ? `image/${match[1]}` : `image`;

//         // Retrieve the authentication token
//         const token = await getToken(); // Ensure getToken is defined and works correctly

//         // Create a reference to Firebase Storage
//         const storageRef = ref(storage, `images/${filename}`);

//         // Fetch the file from the local URI and convert it to a blob
//         const response = await fetch(localUri);
//         const blob = await response.blob();

//         // Upload the blob to Firebase Storage with resumable upload
//         const uploadTask = uploadBytesResumable(storageRef, blob, {
//           contentType: fileType,
//         });

//         // Monitor the upload progress and handle completion
//         await new Promise<void>((resolve, reject) => {
//           uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//               console.log(`Upload is ${progress.toFixed(2)}% done`);
//               // Optionally, update a progress state here
//               // setUploadProgress(progress);
//             },
//             (error) => {
//               console.error("Error during upload:", error);
//               reject(error);
//             },
//             async () => {
//               try {
//                 // Get the download URL of the uploaded image
//                 const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//                 // Prepare the GraphQL mutation
//                 const graphqlQuery = {
//                   query: `
//                           mutation updateJustArtisantImageProfile($input: inputUpdateArtisantImageProfile) {
//                         updateJustArtisantImageProfile(input: $input)
//                       }
//                   `,
//                   variables: {
//                     input: {
//                       imageProfile: downloadURL,
//                     },
//                   },
//                 };

//                 // Make the POST request to your GraphQL API
//                 const graphqlResponse = await fetch(Constants.expoConfig?.extra?.apiUrl || '', {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`,
//                   },
//                   body: JSON.stringify(graphqlQuery),
//                 });

//                 // if (!graphqlResponse.ok) {
//                 //   throw new Error(`GraphQL error: ${graphqlResponse.statusText}`);
//                 // }

//                 const graphqlResult = await graphqlResponse.json();

//                 // if (graphqlResult.errors) {
//                 //   throw new Error(`GraphQL errors: ${JSON.stringify(graphqlResult.errors)}`);
//                 // }

//                 console.log('GraphQL Result:', graphqlResult);

//                 // Update the image profile state with the new download URL
//                 setImageProfiles(downloadURL); // Ensure setImageProfiles is defined

//                 resolve();
//               } catch (error) {
//                 console.error("Error updating image profile:", error);
//                 reject(error);
//               }
//             }
//           );
//         });

//         Alert.alert("Success", "Image uploaded successfully!");
//       } catch (error: any) {
//         console.error("Image Upload Failed:", error);
//         Alert.alert("Image Upload Failed", error.message || "An unexpected error occurred.");
//       } finally {
//         setUploadingImage(false);
//       }
//     } else {
//       console.log("Image selection was canceled.");
//     }
//   };




//   const handleUpdateAddress = async () => {
//     const token = await getToken();
//     const headers = new Headers({
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     });

//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             mutation updateAddressArtisantInMobile($input: inputUpdateAddressArtisantInMobile) {
//               updateAddressArtisantInMobile(input: $input)
//             }
//           `,
//           variables: {
//             input: {
//               zipCodeHome: zipCode,
//               adress: selectedSuggestion ? JSON.stringify(selectedSuggestion) : null,
//             },
//           },
//         }),
//       });

//       const data = await response.json();
//       if (data.errors) {
//         throw new Error(data.errors[0].message);
//       }
//       Alert.alert("Address Updated", "Your address has been successfully updated.");
//       await fetchUserInfo();
//     } catch (error: any) {
//       Alert.alert("Address Update Failed", error.message);
//     }
//   }



//   useEffect(() => {
//     fetchUserInfo();
//   }, [fetchUserInfo]);

//   if (uploading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }


//   const renderAddress = () => (
//     <View >
//       <AddressAutocomplete
//         NewzipCode={zipCode}
//         setNewZipCode={setZipCode}
//         NewselectedSuggestion={selectedSuggestion}
//         setNewSelectedSuggestion={setSelectedSuggestion}
//         />
//     </View>
//   );

//   const renderProfileComponent = () => (
//     <View>
//       <RenderProfile
//         firstNames={firstNames}
//         lastNames={lastNames}
//         emails={emails}
//         phones={phones}
//         imageProfiles={imageProfiles}
//         setFirstNames={setFirstNames}
//         setLastNames={setLastNames}
//         setPhones={setPhones}
//         handleImageUpload={handleImageUpload}
//         uploadingImage={uploadingImage}
//       />
//     </View>
//   );

//   const renderContent = () => {
//     switch (currentTab) {
//       case 'profile':
//         return renderProfileComponent();
//       case 'address':
//         return renderAddress();
//       default:
//         return null;
//     }
//   };
//   const insets = useSafeAreaInsets()

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1, paddingTop: insets.top + 20, backgroundColor: "white" }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           {/* Fixed Tab Bar */}
//           <View style={styles.tabBar}>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.tabBarContent}
//             >
//               {TABS.map((tab: any) => (
//                 <TouchableOpacity
//                   key={tab.key}
//                   style={[
//                     styles.tabItem,
//                     currentTab === tab.key && styles.activeTabItem,
//                   ]}
//                   onPress={() => setCurrentTab(tab.key)} >
//                   <Text
//                     style={[
//                       styles.tabTitle,
//                       currentTab === tab.key && styles.activeTabTitle,
//                     ]}>
//                     {tab.title}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           {/* Tab Content */}
//           <View style={styles.contentContainer}>
//             <ScrollView>
//               {renderContent()}
//             </ScrollView>
//           </View>

//           {/* Update Button */}
//           {['profile'].includes(currentTab) && (
//             <TouchableOpacity
//               style={styles.updateButton}
//               onPress={updateUserInfo}
//               disabled={uploading}
//             >
//               <Text style={styles.updateButtonText}>Update Settings</Text>
//             </TouchableOpacity>
//           )}
//           {/* 
//           {['categories'].includes(currentTab) && (
//             <TouchableOpacity
//               style={styles.updateButton}
//               onPress={UpdateCategories}
//               disabled={uploading}
//             >
//               <Text style={styles.updateButtonText}>Update Categories</Text>
//             </TouchableOpacity>
//           )}
            
//             {['business'].includes(currentTab) && (
//               <TouchableOpacity
//                 style={styles.updateButton}
//                 onPress={handleUpdateBusiness}
//                 disabled={uploading}
//               >
//                 <Text style={styles.updateButtonText}>Update Business</Text>
//               </TouchableOpacity>
//             )}
//                */}
//           {['address'].includes(currentTab) && (
//             <TouchableOpacity
//               style={styles.updateButton}
//               onPress={handleUpdateAddress}
//               disabled={uploading}
//             >
//               <Text style={styles.updateButtonText}>Update Address</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   tabBar: {
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderColor: '#e0e0e0',
//     paddingVertical: 8,
//     elevation: 3,
//   },
//   contentContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   tabBarContent: {
//     paddingHorizontal: 10,
//     alignItems: 'center',
//   },
//   tabItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     marginRight: 8,
//     borderRadius: 20,
//     backgroundColor: '#f1f1f1',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   activeTabItem: {
//     backgroundColor: '#4CAF50',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   tabTitle: {
//     fontSize: 16,
//     color: '#333',
//   },
//   activeTabTitle: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   scene: {
//     // flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//   },
//   profileImageContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   profileImage: {
//     height: 120,
//     width: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//   },
//   uploadPlaceholder: {
//     height: 120,
//     width: 120,
//     borderRadius: 60,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   uploadText: {
//     color: '#757575',
//     fontSize: 16,
//   },
//   inputGroup: {
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 14,
//     color: '#757575',
//     marginBottom: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#bdbdbd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: '#212121',
//     backgroundColor: '#fff',
//   },
//   disabledInput: {
//     backgroundColor: '#f0f0f0',
//     color: '#9e9e9e',
//   },
//   sliderValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     color: '#4CAF50',
//     marginBottom: 8,
//   },
//   slider: {
//     width: '100%',
//     height: 40,
//   },
//   updateButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginHorizontal: 16,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
// });




// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
//   StyleSheet,
//   Dimensions,
//   TouchableWithoutFeedback,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import tw from 'twrnc';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Slider from "@react-native-community/slider";
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import CategoriesCreateSelector from "@/components/CategorySelector";
// import UploadDocs from "@/components/UploadDocs";
// import { getToken } from "@/helpers/getToken";
// import SearchRequirementChecker from "@/components/SearchRequirementChecker";
// import BusinessForm from "@/components/BusinessForm";
// import AddressAutocomplete from "@/components/AddressAutocomplete";
// import { storage } from "firebase";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const TABS = [
//   { key: 'profile', title: 'Profile' },
//   { key: 'address', title: 'Address' },
// ];

// const RenderProfile = ({
//   firstNames,
//   lastNames,
//   emails,
//   phones,
//   imageProfiles,
//   setFirstNames,
//   setLastNames,
//   setPhones,
//   handleImageUpload,
//   uploadingImage,
//   selectedImageUri,
//   handleConfirmUpload,
// }: any) => (
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     <ScrollView >
//       {/* Profile Image Section */}
//       <View style={styles.profileImageContainer}>
//         <TouchableOpacity onPress={handleImageUpload}>
//           {selectedImageUri ? (
//             <Image source={{ uri: selectedImageUri }} style={styles.profileImage} />
//           ) : imageProfiles ? (
//             <Image source={{ uri: imageProfiles }} style={styles.profileImage} />
//           ) : (
//             <View style={styles.uploadPlaceholder}>
//               <Text style={styles.uploadText}>Upload Image</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//         {uploadingImage && (
//           <ActivityIndicator style={tw`mt-2`} size="small" color="#4CAF50" />
//         )}
//         {selectedImageUri && !uploadingImage && (
//           <TouchableOpacity onPress={handleConfirmUpload} style={styles.uploadButton}>
//             <Text style={styles.uploadButtonText}>Upload</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Personal Info */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>First Name</Text>
//         <TextInput
//           style={styles.input}
//           value={firstNames}
//           onChangeText={setFirstNames}
//         />
//       </View>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Last Name</Text>
//         <TextInput
//           style={styles.input}
//           value={lastNames}
//           onChangeText={setLastNames}
//         />
//       </View>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={[styles.input, styles.disabledInput]}
//           value={emails}
//           editable={false}
//         />
//       </View>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Phone</Text>
//         <TextInput
//           style={styles.input}
//           value={phones}
//           onChangeText={setPhones}
//           keyboardType="phone-pad"
//         />
//       </View>
//     </ScrollView>
//   </TouchableWithoutFeedback>
// );

// export default function UserSettings() {
//   const [currentTab, setCurrentTab] = useState('profile');
//   const [selectedCategories, setSelectedCategories]: any = useState([]);
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [zipCode, setZipCode] = useState('');
//   const [selectedSuggestion, setSelectedSuggestion]: any = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
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

//   const [firstNames, setFirstNames] = useState('');
//   const [lastNames, setLastNames] = useState('');
//   const [emails, setEmails] = useState('');
//   const [phones, setPhones] = useState('');
//   const [imageProfiles, setImageProfiles] = useState('');
//   const [documents, setDocuments] = useState([]);

//   const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

//   const fetchUserInfo = useCallback(async () => {
//     const token = await getToken();
//     const headers = new Headers({
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     });

//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             query userInfo {
//               user {
//                 id
//                 firstName
//                 lastName
//                 email
//                 phone
//                 zipCodes
//                 zipCodeHome
//                 adress
//                 states
//                 available
//                 weeklyBudget
//                 currentWeekSpent
//                 paymentMethodChoosed
//                 profileCompleted
//                 AccountStatus
//                 amount
//                 businessName
//                 yearFounded
//                 numberOfEmployees
//                 streetAddress
//                 suiteNumber
//                 city
//                 state
//                 stateCities {
//                   state
//                   city
//                 }
//                 documents {
//                   url
//                   type
//                 }
//                 imageProfile
//                 categories {
//                   id
//                   name
//                   icon
//                 }
//                 reviews {
//                   id
//                   reviewer {
//                     id
//                     firstName
//                     lastName
//                     imageProfile
//                   }
//                   owner {
//                     id
//                     firstName
//                     lastName
//                     imageProfile
//                   }
//                   description
//                   rating
//                   order {
//                     id
//                     title
//                     professionals {
//                       id
//                       text
//                       img
//                     }
//                   }
//                   createdAt
//                 }
//                 professionals {
//                   id
//                   text
//                   img
//                 }
//               }
//             }
//           `,
//         }),
//       });

//       const data = await response.json();
//       const userData = data?.data?.user;

//       if (userData) {
//         setFirstNames(userData.firstName);
//         setLastNames(userData.lastName);
//         setEmails(userData.email);
//         setPhones(userData.phone);
//         setImageProfiles(userData.imageProfile);
//         setDocuments(userData.documents);
//         setSelectedCategories(userData?.categories.map((category: any) => category.id));

//         setSearchRequirementCheckerState({
//           categories: userData.categories,
//           profileCompleted: userData.profileCompleted,
//           userAmount: userData.amount,
//           paymentMethodChoosed: userData.paymentMethodChoosed,
//           minRequiredAmount: 30,
//           acceptedByBO: userData.AccountStatus,
//           weeklySpent: userData.currentWeekSpent,
//           weeklyLimit: userData.weeklyBudget,
//           zipCodes: userData.zipCodes,
//         });

//         setFormStateForBusiness({
//           businessName: userData?.businessName || "",
//           yearFounded: userData?.yearFounded || "",
//           numberOfEmployees: userData?.numberOfEmployees || "",
//           street: userData?.streetAddress || "",
//           city: userData?.city || "",
//           state: userData?.state || "",
//           zipCode: userData?.suiteNumber || "",
//         });

//         setSelectedSuggestion(
//           userData?.adress ? JSON.parse(userData?.adress) : null
//         );

//         setWeeklyBudget(userData.weeklyBudget);
//       } else {
//         throw new Error("User data not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       Alert.alert("Error", "Failed to load user data.");
//     }
//   }, []);

//   const updateUserInfo = async () => {
//     setUploading(true);
//     try {
//       const token = await getToken();
//       const headers = new Headers({
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       });

//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             mutation updateArtisantInMobile($input: inputUpdateArtisantInMobile) {
//               updateArtisantInMobile(input: $input) {
//                 id
//               }
//             }

//           `,
//           variables: {
//             input: {
//               firstName: firstNames,
//               lastName: lastNames,
//               phone: phones,
//               email: emails,
//               // weeklyBudget: weeklyBudget,
//             },
//           },
//         }),
//       });

//       const data = await response.json();
//       if (data.errors) {
//         throw new Error(data.errors[0].message);
//       }
//       Alert.alert("Profile Updated", "Your settings have been successfully updated.");
//       await fetchUserInfo();
//     } catch (error: any) {
//       Alert.alert("Update Failed", error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleImageUpload = async () => {
//     // Launch the image library to pick an image
//     const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
      

//     });

//     // Check if the user canceled the image picker
//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       const asset = result.assets[0];
//       const localUri = asset.uri;

//       // Set the selected image URI to state to preview it
//       setSelectedImageUri(localUri);
//     } else {
//       console.log("Image selection was canceled.");
//     }
//   };

//   const handleConfirmUpload = async () => {
//     if (!selectedImageUri) return;

//     setUploadingImage(true);

//     try {
//       const localUri = selectedImageUri;
//       const filename = localUri.split('/').pop() || `image_${Date.now()}`;
//       const match = /\.(\w+)$/.exec(filename);
//       const fileType = match ? `image/${match[1]}` : `image`;

//       // Retrieve the authentication token
//       const token = await getToken(); // Ensure getToken is defined and works correctly

//       // Create a reference to Firebase Storage
//       const storageRef = ref(storage, `images/${filename}`);

//       // Fetch the file from the local URI and convert it to a blob
//       const response = await fetch(localUri);
//       const blob = await response.blob();

//       // Upload the blob to Firebase Storage with resumable upload
//       const uploadTask = uploadBytesResumable(storageRef, blob, {
//         contentType: fileType,
//       });

//       // Monitor the upload progress and handle completion
//       await new Promise<void>((resolve, reject) => {
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log(`Upload is ${progress.toFixed(2)}% done`);
//             // Optionally, update a progress state here
//             // setUploadProgress(progress);
//           },
//           (error) => {
//             console.error("Error during upload:", error);
//             reject(error);
//           },
//           async () => {
//             try {
//               // Get the download URL of the uploaded image
//               const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//               // Prepare the GraphQL mutation
//               const graphqlQuery = {
//                 query: `
//                         mutation updateJustArtisantImageProfile($input: inputUpdateArtisantImageProfile) {
//                       updateJustArtisantImageProfile(input: $input)
//                     }
//                 `,
//                 variables: {
//                   input: {
//                     imageProfile: downloadURL,
//                   },
//                 },
//               };

//               // Make the POST request to your GraphQL API
//               const graphqlResponse = await fetch(Constants.expoConfig?.extra?.apiUrl || '', {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   "Authorization": `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(graphqlQuery),
//               });

//               const graphqlResult = await graphqlResponse.json();

//               console.log('GraphQL Result:', graphqlResult);

//               // Update the image profile state with the new download URL
//               setImageProfiles(downloadURL);
//               // Clear the selected image
//               setSelectedImageUri(null);

//               resolve();
//             } catch (error) {
//               console.error("Error updating image profile:", error);
//               reject(error);
//             }
//           }
//         );
//       });

//       Alert.alert("Success", "Image uploaded successfully!");
//     } catch (error: any) {
//       console.error("Image Upload Failed:", error);
//       Alert.alert("Image Upload Failed", error.message || "An unexpected error occurred.");
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleUpdateAddress = async () => {
//     const token = await getToken();
//     const headers = new Headers({
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     });

//     try {
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             mutation updateAddressArtisantInMobile($input: inputUpdateAddressArtisantInMobile) {
//               updateAddressArtisantInMobile(input: $input)
//             }
//           `,
//           variables: {
//             input: {
//               zipCodeHome: zipCode,
//               adress: selectedSuggestion ? JSON.stringify(selectedSuggestion) : null,
//             },
//           },
//         }),
//       });

//       const data = await response.json();
//       if (data.errors) {
//         throw new Error(data.errors[0].message);
//       }
//       Alert.alert("Address Updated", "Your address has been successfully updated.");
//       await fetchUserInfo();
//     } catch (error: any) {
//       Alert.alert("Address Update Failed", error.message);
//     }
//   }

//   useEffect(() => {
//     fetchUserInfo();
//   }, [fetchUserInfo]);

//   if (uploading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   const renderAddress = () => (
//     <View >
//       <AddressAutocomplete
//         NewzipCode={zipCode}
//         setNewZipCode={setZipCode}
//         NewselectedSuggestion={selectedSuggestion}
//         setNewSelectedSuggestion={setSelectedSuggestion}
//         />
//     </View>
//   );

//   const renderProfileComponent = () => (
//     <View>
//       <RenderProfile
//         firstNames={firstNames}
//         lastNames={lastNames}
//         emails={emails}
//         phones={phones}
//         imageProfiles={imageProfiles}
//         setFirstNames={setFirstNames}
//         setLastNames={setLastNames}
//         setPhones={setPhones}
//         handleImageUpload={handleImageUpload}
//         uploadingImage={uploadingImage}
//         selectedImageUri={selectedImageUri}
//         handleConfirmUpload={handleConfirmUpload}
//       />
//     </View>
//   );

//   const renderContent = () => {
//     switch (currentTab) {
//       case 'profile':
//         return renderProfileComponent();
//       case 'address':
//         return renderAddress();
//       default:
//         return null;
//     }
//   };
//   const insets = useSafeAreaInsets()

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1, paddingTop: insets.top + 20, backgroundColor: "white" }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           {/* Fixed Tab Bar */}
//           <View style={styles.tabBar}>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.tabBarContent}
//             >
//               {TABS.map((tab: any) => (
//                 <TouchableOpacity
//                   key={tab.key}
//                   style={[
//                     styles.tabItem,
//                     currentTab === tab.key && styles.activeTabItem,
//                   ]}
//                   onPress={() => setCurrentTab(tab.key)} >
//                   <Text
//                     style={[
//                       styles.tabTitle,
//                       currentTab === tab.key && styles.activeTabTitle,
//                     ]}>
//                     {tab.title}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           {/* Tab Content */}
//           <View style={styles.contentContainer}>
//             <ScrollView>
//               {renderContent()}
//             </ScrollView>
//           </View>

//           {/* Update Button */}
//           {['profile'].includes(currentTab) && (
//             <TouchableOpacity
//               style={styles.updateButton}
//               onPress={updateUserInfo}
//               disabled={uploading}
//             >
//               <Text style={styles.updateButtonText}>Update Settings</Text>
//             </TouchableOpacity>
//           )}
//           {['address'].includes(currentTab) && (
//             <TouchableOpacity
//               style={styles.updateButton}
//               onPress={handleUpdateAddress}
//               disabled={uploading}
//             >
//               <Text style={styles.updateButtonText}>Update Address</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   // ... existing styles ...
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   tabBar: {
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderColor: '#e0e0e0',
//     paddingVertical: 8,
//     elevation: 3,
//   },
//   contentContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   tabBarContent: {
//     paddingHorizontal: 10,
//     alignItems: 'center',
//   },
//   tabItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     marginRight: 8,
//     borderRadius: 20,
//     backgroundColor: '#f1f1f1',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   activeTabItem: {
//     backgroundColor: '#4CAF50',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   tabTitle: {
//     fontSize: 16,
//     color: '#333',
//   },
//   activeTabTitle: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   scene: {
//     // flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//   },
//   profileImageContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   profileImage: {
//     height: 120,
//     width: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//   },
//   uploadPlaceholder: {
//     height: 120,
//     width: 120,
//     borderRadius: 60,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   uploadText: {
//     color: '#757575',
//     fontSize: 16,
//   },
//   inputGroup: {
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 14,
//     color: '#757575',
//     marginBottom: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#bdbdbd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: '#212121',
//     backgroundColor: '#fff',
//   },
//   disabledInput: {
//     backgroundColor: '#f0f0f0',
//     color: '#9e9e9e',
//   },
//   sliderValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     color: '#4CAF50',
//     marginBottom: 8,
//   },
//   slider: {
//     width: '100%',
//     height: 40,
//   },
//   updateButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginHorizontal: 16,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4,
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   uploadButton: {
//     marginTop: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//   },
//   uploadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });


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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  { key: 'profile', title: 'Profile' },
  { key: 'address', title: 'Address' },
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
        </TouchableOpacity>
        {uploadingImage && (
          <ActivityIndicator style={tw`mt-2`} size="small" color="#4CAF50" />
        )}
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

export default function UserSettings() {
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
      setUploadingImage(true); // Show upload status

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

                const graphqlResult = await graphqlResponse.json();

                console.log('GraphQL Result:', graphqlResult);

                // Update the image profile state with the new download URL
                setImageProfiles(downloadURL);

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

  const renderAddress = () => (
    <View >
      <AddressAutocomplete
        NewzipCode={zipCode}
        setNewZipCode={setZipCode}
        NewselectedSuggestion={selectedSuggestion}
        setNewSelectedSuggestion={setSelectedSuggestion}
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

  const renderContent = () => {
    switch (currentTab) {
      case 'profile':
        return renderProfileComponent();
      case 'address':
        return renderAddress();
      default:
        return null;
    }
  };
  const insets = useSafeAreaInsets()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: insets.top + 20, backgroundColor: "white" }}
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
                  onPress={() => setCurrentTab(tab.key)} >
                  <Text
                    style={[
                      styles.tabTitle,
                      currentTab === tab.key && styles.activeTabTitle,
                    ]}>
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Tab Content */}
          <View style={styles.contentContainer}>
            <ScrollView>
              {renderContent()}
            </ScrollView>
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

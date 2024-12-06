// // import React, { useEffect, useState } from 'react';
// // import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// // import { WebView } from 'react-native-webview';
// // import Constants from 'expo-constants';
// // import { getToken } from '@/helpers/getToken';
// // import RenderZipCodesFromBackendUI from '../RenderZipCodesFromBackendUI';

// // interface StateType {
// //     state: string;
// //     counties: County[];
// // }

// // interface Area {
// //     name: string;
// //     zipcodes: string[];
// // }

// // interface County {
// //     name: string;
// //     areas: Area[];
// // }

// // interface User {
// //     id: string;
// //     zipCodeUI: string;
// //     miles: string;
// //     zipCodeHome: string;
// // }

// // interface UserData {
// //     user: User;
// // }

// // interface GraphQLResponse<T> {
// //     data: T;
// //     errors?: any;
// // }

// // const WhereYourWork = () => {
// //     const [newToken, setNewToken] = useState('');
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [error, setError]: any = useState(null);
// //     const [data, setData] = useState<StateType[]>([]);
// //     const [userData, setUserData] = useState<UserData | null>(null);

// //     const getUserData = async () => {
// //         try {
// //             const token = await getToken();
// //             const headers = new Headers({
// //                 'Content-Type': 'application/json',
// //                 Authorization: `Bearer ${token}`,
// //             });

// //             const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
// //                 method: 'POST',
// //                 headers,
// //                 body: JSON.stringify({
// //                     query: `
// //             query {
// //               user {
// //                 id
// //                 zipCodeUI
// //                 miles
// //                 zipCodeHome
// //               }
// //             }
// //           `,
// //                 }),
// //             });

// //             const responseData: GraphQLResponse<UserData> = await response.json();
// //             console.log('User data response', responseData.data);

// //             if (responseData.data && responseData.data.user) {
// //                 setUserData(responseData.data);

// //                 const zipCodeUI = responseData.data.user.zipCodeUI;
// //                 if (zipCodeUI) {
// //                     const parsedData: StateType[] = JSON.parse(zipCodeUI);
// //                     setData(parsedData);
// //                 } else {
// //                     console.error('zipCodeUI is undefined');
// //                 }
// //             } else {
// //                 console.error('Invalid response data');
// //             }
// //         } catch (error) {
// //             console.error('Error fetching user data:', error);
// //             setError(error);
// //         }
// //     };

// //     const handleGetToken = async () => {
// //         try {
// //             const token: any = await getToken();
// //             console.log('Token retrieved:', token);
// //             setNewToken(token);
// //         } catch (err: any) {
// //             console.log('Error getting token:', err);
// //             setError(err);
// //         }
// //     };

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             setIsLoading(true);
// //             await Promise.all([handleGetToken(), getUserData()]);
// //             setIsLoading(false);
// //         };
// //         fetchData();
// //     }, []);

// //     if (isLoading) {
// //         return (
// //             <View style={styles.center}>
// //                 <ActivityIndicator size="large" color="#0000ff" />
// //                 <Text>Loading...</Text>
// //             </View>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <View style={styles.center}>
// //                 <Text style={styles.errorText}>
// //                     An error occurred: {error.message || JSON.stringify(error)}
// //                 </Text>
// //             </View>
// //         );
// //     }

// //     if (!newToken) {
// //         return (
// //             <View style={styles.center}>
// //                 <Text style={styles.errorText}>Token not provided.</Text>
// //             </View>
// //         );
// //     }

// //     // Decide whether to show WebView or RenderZipCodesFromBackendUI based on userData
// //     if (userData && userData.user && userData.user.zipCodeUI) {
// //         // zipCodeUI exists, show RenderZipCodesFromBackendUI
// //         return (
// //             <RenderZipCodesFromBackendUI
// //                 data={data}
// //                 userData={userData}
// //             />
// //         );
// //     } else {
// //         // zipCodeUI does not exist, show WebView
// //         return (
// //             <WebView
// //                 style={styles.container}
// //                 source={{
// //                     uri: `https://www.m3alempro.com/en/zipcodes/zip-code-finder?token=${newToken}`,
// //                 }}
// //                 onNavigationStateChange={(navState: any) => {
// //                     const url = navState.url;
// //                     console.log('WebView URL changed to: ', url);
// //                     if (url.includes('thankyou')) {
// //                         // After 'thankyou', refetch user data to update the UI
// //                         getUserData();
// //                     }
// //                 }}
// //                 onError={(syntheticEvent: any) => {
// //                     const { nativeEvent } = syntheticEvent;
// //                     console.error('WebView error: ', nativeEvent);
// //                     setError(nativeEvent);
// //                 }}
// //                 startInLoadingState={true}
// //                 javaScriptEnabled={true}
// //                 domStorageEnabled={true}
// //                 originWhitelist={['https://*', 'http://*']}
// //                 renderLoading={() => (
// //                     <View style={styles.center}>
// //                         <ActivityIndicator size="large" color="#0000ff" />
// //                         <Text>Loading WebView...</Text>
// //                     </View>
// //                 )}
// //             />
// //         );
// //     }
// // };

// // export default WhereYourWork;

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         // marginTop: Constants.statusBarHeight,
// //     },
// //     center: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     errorText: {
// //         color: 'red',
// //         fontSize: 16,
// //     },
// // });


// // WhereYourWork.tsx


// // import React, { useEffect, useState } from 'react';
// // import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
// // import { WebView } from 'react-native-webview';
// // import Constants from 'expo-constants';
// // import { getToken } from '@/helpers/getToken';
// // import RenderZipCodesFromBackendUI from '../RenderZipCodesFromBackendUI';
// // import { useIsFocused } from '@react-navigation/native';

// // interface StateType {
// //   state: string;
// //   counties: County[];
// // }

// // interface Area {
// //   name: string;
// //   zipcodes: string[];
// // }

// // interface County {
// //   name: string;
// //   areas: Area[];
// // }

// // interface User {
// //   id: string;
// //   zipCodeUI: string;
// //   miles: string;
// //   zipCodeHome: string;
// //   zipCodes: string[];
// // }

// // interface UserData {
// //   user: User;
// // }

// // interface GraphQLResponse<T> {
// //   data: T;
// //   errors?: any;
// // }

// // const WhereYourWork = () => {
// //   const [newToken, setNewToken] = useState('');
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError]: any = useState(null);
// //   const [data, setData] = useState<StateType[]>([]);
// //   const [userData, setUserData] = useState<UserData | null>(null);
// //   const [zipCode, setZipcode]: any = useState("")
// //   const isFocused = useIsFocused();

// //   const getUserData = async () => {
// //     try {
// //       const token = await getToken();
// //       const headers = new Headers({
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${token}`,
// //       });

// //       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
// //         method: 'POST',
// //         headers,
// //         body: JSON.stringify({
// //           query: `
// //             query {
// //               user {
// //                 id
// //                 zipCodeUI
// //                 miles
// //                 zipCodeHome
// //                 zipCodes
// //               }
// //             }
// //           `,
// //         }),
// //       });

// //       const responseData: GraphQLResponse<UserData> = await response.json();
// //       console.log('responseData.data', responseData?.data?.user?.zipCodeHome);

// //       setZipcode(responseData?.data?.user?.zipCodeHome)

// //       // if (responseData.data && responseData.data.user) {
// //       setUserData(responseData.data);

// //       const zipCodeUI = responseData.data?.user?.zipCodeUI;
// //       if (zipCodeUI) {
// //         const parsedData: StateType[] = JSON.parse(zipCodeUI);
// //         setData(parsedData);
// //       } else {
// //         //   console.error('zipCodeUI is undefined');
// //       }
// //       // } else {
// //       //   console.error('Invalid response data');
// //       // }
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //       setError(error);
// //     }
// //   };

// //   const handleGetToken = async () => {
// //     try {
// //       const token: any = await getToken();
// //       // console.log('Token retrieved:', token);
// //       setNewToken(token);
// //     } catch (err: any) {
// //       // console.log('Error getting token:', err);
// //       setError(err);
// //     }
// //   };

// //   const fetchData = async () => {
// //     setIsLoading(true);
// //     await Promise.all([handleGetToken(), getUserData()]);
// //     setIsLoading(false);
// //   };
// //   useEffect(() => {
// //     fetchData();
// //   }, [isFocused]);

// //   if (isLoading) {
// //     return (
// //       <View style={styles.center}>
// //         <ActivityIndicator size="large" color="#0000ff" />
// //         <Text>Loading...</Text>
// //       </View>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <View style={styles.center}>
// //         <Text style={styles.errorText}>
// //           An error occurred: {error.message || JSON.stringify(error)}
// //         </Text>
// //       </View>
// //     );
// //   }

// //   if (!newToken) {
// //     return (
// //       <View style={styles.center}>
// //         <Text style={styles.errorText}>Token not provided.</Text>
// //       </View>
// //     );
// //   }

// //   // Decide whether to show WebView or RenderZipCodesFromBackendUI based on userData
// //   if (userData && userData?.user && userData?.user?.zipCodeUI) {
// //     // zipCodeUI exists, show RenderZipCodesFromBackendUI
// //     return (
// //       <RenderZipCodesFromBackendUI
// //         data={data}
// //         userData={userData}
// //         setUserData={setUserData}
// //       />
// //     );
// //   } else {
// //     // zipCodeUI does not exist, show WebView
// //     return (
// //       <WebView
// //         style={styles.container}
// //         source={{
// //           uri: `https://www.m3alempro.com/en/zipcodes/zip-code-finder?token=${newToken}&webView=true&zipcode=${zipCode}&miles=${userData?.user?.miles}`,
// //         }}
// //         onNavigationStateChange={(navState: any) => {
// //           const url = navState.url;
// //           console.log('WebView URL changed to: ', url);
// //           if (url.includes('thankyou')) {
// //             // After 'thankyou', refetch user data to update the UI
// //             getUserData();
// //           }
// //         }}
// //         onError={(syntheticEvent: any) => {
// //           const { nativeEvent } = syntheticEvent;
// //           console.error('WebView error: ', nativeEvent);
// //           setError(nativeEvent);
// //         }}
// //         startInLoadingState={true}
// //         javaScriptEnabled={true}
// //         domStorageEnabled={true}
// //         originWhitelist={['https://*', 'http://*']}
// //         renderLoading={() => (
// //           <View style={styles.center}>
// //             <ActivityIndicator size="large" color="#0000ff" />
// //             <Text>Preparing...</Text>
// //           </View>
// //         )}

// //         cacheEnabled={true}
// //         scrollEnabled={true}
// //         nestedScrollEnabled={true}
// //         androidHardwareAccelerationDisabled={false}
// //         renderToHardwareTextureAndroid={true}
// //         overScrollMode="always"
// //         contentMode="mobile"
// //         allowsInlineMediaPlayback={true}
// //         useWebKit={true}
// //         javaScriptCanOpenWindowsAutomatically={true}
// //       />
// //     );
// //   }
// // };

// // export default WhereYourWork;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     width: '100%',
// //     height: '100%',
// //     // Adjust the background color if needed
// //     backgroundColor: '#fff',
// //   },
// //   center: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   errorText: {
// //     color: 'red',
// //     fontSize: 16,
// //   },
// // });


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, Platform, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
// import { WebView } from 'react-native-webview';
// import Constants from 'expo-constants';
// import { getToken } from '@/helpers/getToken';
// import RenderZipCodesFromBackendUI from '../RenderZipCodesFromBackendUI';
// import { useIsFocused } from '@react-navigation/native';
// import Modal from 'react-native-modal';

// interface StateType {
//   state: string;
//   counties: County[];
// }

// interface Area {
//   name: string;
//   zipcodes: string[];
// }

// interface County {
//   name: string;
//   areas: Area[];
// }

// interface User {
//   id: string;
//   zipCodeUI: string;
//   miles: string;
//   zipCodeHome: string;
//   zipCodes: string[];
// }

// interface UserData {
//   user: User;
// }

// interface GraphQLResponse<T> {
//   data: T;
//   errors?: any;
// }

// const WhereYourWork = () => {
//   const [newToken, setNewToken] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError]: any = useState(null);
//   const [data, setData] = useState<StateType[]>([]);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [zipCode, setZipcode]: any = useState("");
//   const isFocused = useIsFocused();

//   // State variables for modal
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [inputZipCode, setInputZipCode] = useState('');
//   const [inputMiles, setInputMiles] = useState('');

//   const getUserData = async () => {
//     try {
//       const token = await getToken();
//       const headers = new Headers({
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       });

//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             query {
//               user {
//                 id
//                 zipCodeUI
//                 miles
//                 zipCodeHome
//                 zipCodes
//               }
//             }
//           `,
//         }),
//       });

//       const responseData: GraphQLResponse<UserData> = await response.json();
//       console.log('responseData.data', responseData?.data?.user?.zipCodeHome);

//       setZipcode(responseData?.data?.user?.zipCodeHome);

//       setUserData(responseData.data);

//       const zipCodeUI = responseData.data?.user?.zipCodeUI;
//       if (zipCodeUI) {
//         const parsedData: StateType[] = JSON.parse(zipCodeUI);
//         setData(parsedData);
//       }

//       // Check if zipCodeHome or miles are missing
//       const isZipCodeMissing = !responseData.data?.user?.zipCodeHome;
//       const isMilesMissing = !responseData.data?.user?.miles;

//       if (isZipCodeMissing || isMilesMissing) {
//         setIsModalVisible(true);
//       }

//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError(error);
//     }
//   };

//   const handleGetToken = async () => {
//     try {
//       const token: any = await getToken();
//       setNewToken(token);
//     } catch (err: any) {
//       setError(err);
//     }
//   };

//   const fetchData = async () => {
//     setIsLoading(true);
//     await Promise.all([handleGetToken(), getUserData()]);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [isFocused]);

//   // Function to handle submission of zipCode and miles from modal
//   const handleModalSubmit = async () => {
//     if (!inputZipCode || !inputMiles) {
//       Alert.alert('Validation Error', 'Please enter both Zip Code and Miles.');
//       return;
//     }

//     try {
//       // TODO: Implement backend mutation to save zipCode and miles
//       /*
//       const token = await getToken();
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           query: `
//             mutation {
//               updateUser(zipCodeHome: "${inputZipCode}", miles: "${inputMiles}") {
//                 id
//                 zipCodeHome
//                 miles
//               }
//             }
//           `,
//         }),
//       });

//       const responseData = await response.json();
//       if (responseData.errors) {
//         throw new Error('Failed to update user data');
//       }
//       */

//       // For demonstration, we'll just update the state locally
//       setZipcode(inputZipCode);
//       setUserData((prevData) => {
//         if (prevData && prevData.user) {
//           return {
//             user: {
//               ...prevData.user,
//               zipCodeHome: inputZipCode,
//               miles: inputMiles,
//             },
//           };
//         }
//         return prevData;
//       });

//       setIsModalVisible(false);
//       Alert.alert('Success', 'Zip Code and Miles have been updated.');
//     } catch (err) {
//       console.error('Error updating user data:', err);
//       setError(err);
//       Alert.alert('Error', 'Failed to update Zip Code and Miles.');
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>
//           An error occurred: {error.message || JSON.stringify(error)}
//         </Text>
//       </View>
//     );
//   }

//   if (!newToken) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>Token not provided.</Text>
//       </View>
//     );
//   }

//   // Decide whether to show WebView or RenderZipCodesFromBackendUI based on userData
//   if (userData && userData?.user && userData?.user?.zipCodeUI) {
//     // zipCodeUI exists, show RenderZipCodesFromBackendUI
//     return (
//       <>
//         <RenderZipCodesFromBackendUI
//           data={data}
//           userData={userData}
//           setUserData={setUserData}
//         />
//         {/* Modal for input if needed */}
//         <Modal isVisible={isModalVisible}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Enter Required Information</Text>
//             <Text style={styles.label}>Zip Code:</Text>
//             <TextInput
//               style={styles.input}
//               value={inputZipCode}
//               onChangeText={setInputZipCode}
//               placeholder="Zip Code"
//               keyboardType="numeric"
//             />
//             <Text style={styles.label}>Miles:</Text>
//             <TextInput
//               style={styles.input}
//               value={inputMiles}
//               onChangeText={setInputMiles}
//               placeholder="Miles"
//               keyboardType="numeric"
//             />
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 { backgroundColor: inputZipCode && inputMiles ? '#007BFF' : '#A9A9A9' },
//               ]}
//               onPress={handleModalSubmit}
//               disabled={!inputZipCode || !inputMiles}
//             >
//               <Text style={styles.buttonText}>Next</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </>
//     );
//   } else {
//     // zipCodeUI does not exist, show WebView
//     return (
//       <>
//         <WebView
//           style={styles.container}
//           source={{
//             uri: `https://www.m3alempro.com/en/zipcodes/zip-code-finder?token=${newToken}&webView=true&zipcode=${zipCode}&miles=${userData?.user?.miles}`,
//           }}
//           onNavigationStateChange={(navState: any) => {
//             const url = navState.url;
//             console.log('WebView URL changed to: ', url);
//             if (url.includes('thankyou')) {
//               console.log('WebView URL changed to111111: ', url);
//               // After 'thankyou', refetch user data to update the UI
//               getUserData();
//             }
//           }}
//           onError={(syntheticEvent: any) => {
//             const { nativeEvent } = syntheticEvent;
//             console.error('WebView error: ', nativeEvent);
//             setError(nativeEvent);
//           }}
//           startInLoadingState={true}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           originWhitelist={['https://*', 'http://*']}
//           renderLoading={() => (
//             <View style={styles.center}>
//               <ActivityIndicator size="large" color="#0000ff" />
//               <Text>Preparing...</Text>
//             </View>
//           )}
//           cacheEnabled={true}
//           scrollEnabled={true}
//           nestedScrollEnabled={true}
//           androidHardwareAccelerationDisabled={false}
//           renderToHardwareTextureAndroid={true}
//           overScrollMode="always"
//           contentMode="mobile"
//           allowsInlineMediaPlayback={true}
//           useWebKit={true}
//           javaScriptCanOpenWindowsAutomatically={true}
//         />
//         {/* Modal for input if needed */}
//         <Modal isVisible={isModalVisible}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Enter Required Information</Text>
//             <Text style={styles.label}>Zip Code:</Text>
//             <TextInput
//               style={styles.input}
//               value={inputZipCode}
//               onChangeText={setInputZipCode}
//               placeholder="Zip Code"
//               keyboardType="numeric"
//             />
//             <Text style={styles.label}>Miles:</Text>
//             <TextInput
//               style={styles.input}
//               value={inputMiles}
//               onChangeText={setInputMiles}
//               placeholder="Miles"
//               keyboardType="numeric"
//             />
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 { backgroundColor: inputZipCode && inputMiles ? '#007BFF' : '#A9A9A9' },
//               ]}
//               onPress={handleModalSubmit}
//               disabled={!inputZipCode || !inputMiles}
//             >
//               <Text style={styles.buttonText}>Next</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </>
//     );
//   }
// };

// export default WhereYourWork;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#fff',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     padding: 16,
//     textAlign: 'center',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 22,
//     borderRadius: 8,
//     borderColor: 'rgba(0, 0, 0, 0.1)',
//   },
//   modalTitle: {
//     fontSize: 18,
//     marginBottom: 12,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     marginVertical: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: Platform.OS === 'ios' ? 15 : 10,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   button: {
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { getToken } from '@/helpers/getToken';
import RenderZipCodesFromBackendUI from '../RenderZipCodesFromBackendUI';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

interface StateType {
  state: string;
  counties: County[];
}

interface Area {
  name: string;
  zipcodes: string[];
}

interface County {
  name: string;
  areas: Area[];
}

interface User {
  id: string;
  zipCodeUI: string;
  miles: string;
  zipCodeHome: string;
  zipCodes: string[];
}

interface UserData {
  user: User;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: any;
}

const WhereYourWork = () => {
  const [newToken, setNewToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]: any = useState(null);
  const [data, setData] = useState<StateType[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [zipCode, setZipcode]: any = useState('');
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();

  // State variables for modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputZipCode, setInputZipCode] = useState('');
  const [inputMiles, setInputMiles] = useState('');

  const getUserData = async () => {
    try {
      const token = await getToken();
      const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
                query {
                  user {
                    id
                    zipCodeUI
                    miles
                    zipCodeHome
                    zipCodes
                  }
                }
              `,
        }),
      });

      const responseData: GraphQLResponse<UserData> = await response.json();
      console.log('responseData.data', responseData?.data?.user?.zipCodeHome);

      setZipcode(responseData?.data?.user?.zipCodeHome);

      setUserData(responseData.data);

      const zipCodeUI = responseData.data?.user?.zipCodeUI;
      if (zipCodeUI) {
        const parsedData: StateType[] = JSON.parse(zipCodeUI);
        setData(parsedData);
      }

      // Check if zipCodeHome or miles are missing
      const isZipCodeMissing = !responseData.data?.user?.zipCodeHome;
      const isMilesMissing = !responseData.data?.user?.miles;

      if (isZipCodeMissing || isMilesMissing) {
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error);
    }
  };

  const handleGetToken = async () => {
    try {
      const token: any = await getToken();
      setNewToken(token);
    } catch (err: any) {
      setError(err);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([handleGetToken(), getUserData()]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  // Function to handle submission of zipCode and miles from modal
  const handleModalSubmit = async () => {
    if (!inputZipCode || !inputMiles) {
      Alert.alert('Validation Error', 'Please enter both Zip Code and Miles.');
      return;
    }

    try {
      // TODO: Implement backend mutation to save zipCode and miles
      /*
          const token = await getToken();
          const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              query: `
                mutation {
                  updateUser(zipCodeHome: "${inputZipCode}", miles: "${inputMiles}") {
                    id
                    zipCodeHome
                    miles
                  }
                }
              `,
            }),
          });

          const responseData = await response.json();
          if (responseData.errors) {
            throw new Error('Failed to update user data');
          }
          */

      // For demonstration, we'll just update the state locally
      setZipcode(inputZipCode);
      setUserData((prevData) => {
        if (prevData && prevData.user) {
          return {
            user: {
              ...prevData.user,
              zipCodeHome: inputZipCode,
              miles: inputMiles,
            },
          };
        }
        return prevData;
      });

      setIsModalVisible(false);
      Alert.alert('Success', 'Zip Code and Miles have been updated.');
    } catch (err) {
      console.error('Error updating user data:', err);
      setError(err);
      Alert.alert('Error', 'Failed to update Zip Code and Miles.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          An error occurred: {error.message || JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  if (!newToken) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Token not provided.</Text>
      </View>
    );
  }

  // Decide whether to show WebView or RenderZipCodesFromBackendUI based on userData
  if (userData && userData?.user && userData?.user?.zipCodeUI) {
    // zipCodeUI exists, show RenderZipCodesFromBackendUI
    return (
      <>
        <RenderZipCodesFromBackendUI
          data={data}
          userData={userData}
          setUserData={setUserData}
        />
        {/* Modal for input if needed */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Required Information</Text>
            <Text style={styles.label}>Zip Code:</Text>
            <TextInput
              style={styles.input}
              value={inputZipCode}
              onChangeText={setInputZipCode}
              placeholder="Zip Code"
              keyboardType="numeric"
            />
            <Text style={styles.label}>Miles:</Text>
            <TextInput
              style={styles.input}
              value={inputMiles}
              onChangeText={setInputMiles}
              placeholder="Miles"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    inputZipCode && inputMiles ? '#007BFF' : '#A9A9A9',
                },
              ]}
              onPress={handleModalSubmit}
              disabled={!inputZipCode || !inputMiles}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.cancelButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  } else {
    // zipCodeUI does not exist, show WebView
    return (
      <>
        <WebView
          style={styles.container}
          source={{
            uri: `https://www.m3alempro.com/en/zipcodes/zip-code-finder?token=${newToken}&webView=true&zipcode=${zipCode}&miles=${userData?.user?.miles}`,
          }}
          onNavigationStateChange={(navState: any) => {
            const url = navState.url;
            console.log('WebView URL changed to: ', url);
            if (url.includes('thankyou')) {
              console.log('WebView URL changed to111111: ', url);
              // After 'thankyou', refetch user data to update the UI
              getUserData();
            }
          }}
          onError={(syntheticEvent: any) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView error: ', nativeEvent);
            setError(nativeEvent);
          }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['https://*', 'http://*']}
          renderLoading={() => (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Preparing...</Text>
            </View>
          )}
          cacheEnabled={true}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          androidHardwareAccelerationDisabled={false}
          renderToHardwareTextureAndroid={true}
          overScrollMode="always"
          contentMode="mobile"
          allowsInlineMediaPlayback={true}
          useWebKit={true}
          javaScriptCanOpenWindowsAutomatically={true}
        />
        {/* Modal for input if needed */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Required Information</Text>
            <Text style={styles.label}>Zip Code:</Text>
            <TextInput
              style={styles.input}
              value={inputZipCode}
              onChangeText={setInputZipCode}
              placeholder="Zip Code"
              keyboardType="numeric"
            />
            <Text style={styles.label}>Miles:</Text>
            <TextInput
              style={styles.input}
              value={inputMiles}
              onChangeText={setInputMiles}
              placeholder="Miles"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    inputZipCode && inputMiles ? '#007BFF' : '#A9A9A9',
                },
              ]}
              onPress={handleModalSubmit}
              disabled={!inputZipCode || !inputMiles}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.cancelButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  }
};

export default WhereYourWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    padding: 16,
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

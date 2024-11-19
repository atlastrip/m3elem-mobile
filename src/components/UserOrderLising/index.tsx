// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Animate from "react-native-reanimated"
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { COLORS } from 'constants/theme';
// import { getToken, getUser } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';



// const UserOrderListing = ({ navigation, setShowQr, setOrder }: any) => {
//     const [loading, setLoading] = useState(false);
//     const [leads, setLeads]: any = useState([]);
//     const [unlocked, setUnlocked] = useState(false);
//     const [user, setUser]: any = useState(null);
//     const isFocused = useIsFocused();



//     const getLeads = async () => {

//         const token = await getToken();
//         const user: any = await getUser();
//         setUser(user);
//         console.log('====================================');
//         // console.log('token', token);
//         console.log('====================================');
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);
//         try {
//             setLoading(true);
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                         query leads {
//                             leads {
//                                     id
//                                     title
//                                     description
//                                     status
//                                     images
//                                     locationType
//                                     artisantId {
//                                     id
//                                     leads {
//                                         id
//                                     }
//                                     pushToken
//                                     firstName
//                                     lastName
//                                     phone
//                                     imageProfile
//                                 }
//                                     owner {
//                                     id
//                                     leads {
//                                         id
//                                     }

//                                     firstName
//                                     lastName
//                                     phone
//                                     imageProfile
//                                     pushToken
//                                     }
//                                     professionals {
//                                     id
//                                     text
//                                     img
//                                     }
//                                     artisantUnlockedLead {
//                                         id
//                                     firstName
//                                       lastName
//                                       imageProfile
//                                       pushToken
//                                     }
//                                     location
//                                     review{
//                                 id
//                                 description
//                                 rating
//                                 owner{
//                                   id
//                                   firstName
//                                   pushToken
//                                   lastName
//                                   imageProfile
//                                 }

//                               }
//                                 }
//                                 }

//                         `,

//                     }),
//                 }
//             );

//             const json = await res.json();
//             // console.log('json', json);

//             setLeads(json.data.leads || []);

//             setLoading(false);
//         } catch (err: any) {
//             setLoading(false);
//             Alert.alert("error", JSON.stringify(err.message, undefined, 2));
//             // Alert.alert(json?.detail);
//         }
//     }




//     useEffect(() => {
//         getLeads();
//     }, [isFocused]);





//     const HandleUnlock = async (id: any) => {
//         const token = await getToken();
//         const user: any = await getUser();
//         setUser(user);
//         console.log('====================================');
//         // console.log('token', token);
//         console.log('====================================');
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);


//         try {
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                         mutation unlockLead($input: LeadUnlockInput) {
//                                 unlockLead(input: $input) {
//                                     id
//                                 }
//                         }

//                         `,
//                         variables: {
//                             input: {
//                                 id: id
//                             }
//                         }

//                     }),
//                 }
//             );

//             const json = await res.json();
//             // console.log('====================================');
//             // console.log('json', json);
//             // console.log('====================================');
//             await getLeads();
//         } catch (error: any) {
//             return Alert.alert(error.message)
//         }
//     }



//     return (
//         <ScrollView style={styles.container}>
//             {leads.map((order: any) => (
//                 <View key={order?.id} style={styles.orderCard}>
//                     {/* <Text style={styles.orderId}>Order #{order?.id}</Text> */}
//                     <TouchableOpacity
//                     // onPress={() => navigation.navigate('OrderView', { order })}
//                     >
//                         <Text style={styles.orderId}>{order?.title}</Text>
//                         <Text >{order?.description}</Text>
//                         {/* <Text style={styles.label}>Professions:</Text>
//                     <View style={styles.professionList}>
//                         {order?.professions.map((profession) => (
//                             <View key={profession.id} style={styles.professionItem}>
//                                 <View
//                                     style={{ backgroundColor: COLORS.primary }}
//                                     className='p-1 rounded-full px-3'>
//                                     <Text className="text-white font-bold text-lg">{profession.name}</Text>
//                                 </View>
//                             </View>
//                         ))}
//                     </View> */}
//                         <Text style={styles.label}>Images:</Text>
//                         <ScrollView

//                             horizontal>
//                             {order?.images.map((image: any, index: any) => (
//                                 <Image
//                                     key={index + Math.random()} source={{ uri: image }} style={styles.image} />
//                             ))}
//                         </ScrollView>
//                         <Text style={styles.label}>Location:</Text>
//                         <LocationView order={order} />
//                     </TouchableOpacity>


//                     <TouchableOpacity
//                         onPress={() => navigation.navigate('OrderViewUser', { order, user: user })}
//                         className='w-[100%] mt-1 items-center py-2 '
//                     >
//                         <MaterialCommunityIcons name="eye" color="purple" size={28} />
//                     </TouchableOpacity>





//                 </View>
//             ))}
//         </ScrollView>
//     );
// };

// export const LocationView = ({ order, navigation = null }: any) => {

//     if (order?.locationType == 'address') {
//         return <Text style={styles?.locationDetail}>Address: {order?.location}</Text>;
//     } else if (order?.locationType == 'zipCode') {
//         return <Text style={styles?.locationDetail}>Zip Code: {order?.location}</Text>;
//     } else if (order?.locationType == 'currentLocation') {
//         const { latitude, longitude } = JSON.parse(order?.location);
//         return (
//             <TouchableOpacity
//                 onPress={navigation ? () => navigation.navigate('MapViewArtisan', { marker: { latitude, longitude } }) : () => { }}
//             >
//                 <MapView
//                     style={styles?.map}
//                     scrollEnabled={false}
//                     initialRegion={{
//                         latitude: latitude,
//                         longitude: longitude,
//                         latitudeDelta: 0.01,
//                         longitudeDelta: 0.01,
//                     }}
//                 >
//                     <Marker coordinate={{ latitude, longitude }} />
//                 </MapView>
//             </TouchableOpacity>
//         );
//     } else {
//         return <Text style={styles?.locationDetail}>Unknown location type</Text>;
//     }
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#f5f5f5',
//     },
//     orderCard: {
//         backgroundColor: 'white',
//         padding: 16,
//         paddingBottom: 8,
//         borderRadius: 8,
//         marginBottom: 16,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//     },
//     orderId: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginVertical: 8,
//     },
//     professionList: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     professionItem: {
//         marginRight: 12,
//         marginBottom: 12,
//     },
//     professionName: {
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     professionText: {
//         fontSize: 12,
//         color: 'grey',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     locationDetail: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: 'blue',
//     },
//     map: {
//         height: 150,
//         borderRadius: 8,
//         marginVertical: 8,
//     },
// });

// export default UserOrderListing;


// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     ScrollView,
//     StyleSheet,
//     TouchableOpacity,
//     Alert,
//     Dimensions,
//     ActivityIndicator,
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { LinearGradient } from 'expo-linear-gradient';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';
// import { getToken, getUser } from '@/helpers/getToken';

// const { width } = Dimensions.get('window');

// const UserUnlockedOrders = ({ navigation }: any) => {
//     const [loading, setLoading] = useState(false);
//     const [unlockedOrders, setUnlockedOrders]: any = useState([]);
//     const [user, setUser]: any = useState(null);
//     const isFocused = useIsFocused();

//     const [locations, setLocations]: any = useState([]);
//     const [errorLocation, setErrorLocation] = useState<string | null>(null);

//     const getUnlockedOrders = async () => {
//         const token = await getToken();
//         const user: any = await getUser();
//         setUser(user);

//         if (!token) return;

//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);

//         try {
//             setLoading(true);
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `

//                            query leads {
//                                  leads {
//                                      id
//                                      title
//                                      description
//                                      status
//                                      images
//                                      zipCode
//                                      locationType
//                                      artisantId {
//                                      id
//                                      leads {
//                                          id
//                                      }
//                                      pushToken
//                                      firstName
//                                      lastName
//                                      phone
//                                      imageProfile
//                                     }       
//                                     owner {
//                                      id
//                                      leads {
//                                          id
//                                      }

//                                      firstName
//                                      lastName
//                                      phone
//                                      imageProfile
//                                      pushToken
//                                      }

//                                      artisantUnlockedLead {
//                                          id
//                                      firstName
//                                        lastName
//                                        imageProfile
//                                        pushToken
//                                      }
//                                      location
//                                      review{
//                                     id
//                                     description
//                                     rating
//                                     owner{
//                                     id
//                                     firstName
//                                     pushToken
//                                     lastName
//                                     imageProfile
//                                     }


//                                  }
//   }

// }                                
//             `,
//                     }),
//                 }
//             );

//             const json = await res.json();
//             setUnlockedOrders(json.data.leads || []);
//             setLoading(false);
//         } catch (err: any) {
//             setLoading(false);
//             Alert.alert("Error", err.message);
//         }
//     }


//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#414345" />
//                 <Text style={styles.loadingText}>Loading your magical unlocked orders...</Text>
//             </View>
//         );
//     }

//     // Function to fetch location based on zip code
//     const fetchLocation = async (zip: string): Promise<string> => {
//         try {
//             const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
//             if (!response.ok) {
//                 throw new Error("Invalid zip code");
//             }
//             const data = await response.json();
//             const city = data.places[0]["place name"];
//             const state = data.places[0]["state abbreviation"];
//             return `${city}, ${state}`;
//         } catch (err: any) {
//             // Optionally log the error or handle it differently
//             return "Unknown location";
//         }
//     };


//     const handleLeads = async (leads: any) => {
//         try {
//             // Map over leads to create an array of promises
//             const locationPromises = leads?.map(async (lead: any) => {
//                 const location = await fetchLocation(lead?.zipCode);
//                 return { id: lead.id, location };
//             });

//             // Wait for all location fetches to complete
//             const newLocations = await Promise.all(locationPromises);

//             // Update state with the new locations array
//             setLocations(newLocations);
//             setErrorLocation(null); // Clear any previous errors
//         } catch (error: any) {
//             // Handle any unexpected errors
//             setErrorLocation(error.message || "Error fetching locations");
//         }
//     };

//     // useEffect to trigger when leads change



//     useEffect(() => {
//         getUnlockedOrders();
//     }, [isFocused]);



//     useEffect(() => {
//         if (unlockedOrders && unlockedOrders.length > 0) {
//             handleLeads(unlockedOrders);
//         } else {
//             // Optionally handle the case when leads are empty
//             setLocations([]);
//         }
//     }, [unlockedOrders]);


//     return (
//         <ScrollView style={styles.container}>
//             {unlockedOrders.map((order: any, index: number) => (
//                 <Animated.View
//                     key={order?.id}
//                     entering={FadeInDown.delay(index * 100).springify()}
//                     style={styles.orderCard}
//                 >
//                     <LinearGradient
//                         colors={['#414345', '#8b5cf6']}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 1 }}
//                         style={styles.gradientHeader}
//                     >
//                         <Text style={styles.orderId}>{order?.title}</Text>
//                         <View style={styles.statusBadge}>
//                             <Text style={styles.statusText}>{order?.status}</Text>
//                         </View>
//                     </LinearGradient>

//                     <Text style={styles.description}>{order?.description}</Text>

//                     <Text style={styles.label}>Images:</Text>
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
//                         {order?.images.map((image: any, imgIndex: number) => (
//                             <Animated.View key={imgIndex} entering={FadeInRight.delay(imgIndex * 100)}>
//                                 <Image source={{ uri: image }} style={styles.image} />
//                             </Animated.View>
//                         ))}
//                     </ScrollView>

//                     {/* <Text style={styles.label}>Location:</Text>
//                     <LocationView order={order} navigation={navigation} /> */}

//                     <Text style={styles.label}>
//                         Location:{" "}
//                         <Text style={styles.locationDetail}>
//                             {locations?.find((loc: any) => loc?.id === order?.id)?.location}
//                         </Text>
//                     </Text>
//                     {/* <View style={styles.artisanContainer}>
//                         <Text style={styles.label}>Artisan:</Text>
//                         <View style={styles.artisanInfo}>
//                             <Image source={{ uri: order?.artisantId?.imageProfile }} style={styles.artisanImage} />
//                             <Text style={styles.artisanName}>{`${order?.artisantId?.firstName} ${order?.artisantId?.lastName}`}</Text>
//                         </View>
//                     </View> */}

//                     <TouchableOpacity
//                         onPress={() => navigation.navigate('OrderViewUser', { order, user: user })}
//                         style={styles.viewButton}
//                     >
//                         <MaterialCommunityIcons name="eye" color="#fff" size={20} />
//                         <Text style={styles.viewButtonText}>View Details</Text>
//                     </TouchableOpacity>
//                 </Animated.View>
//             ))}
//         </ScrollView>
//     );
// };

// const LocationView = ({ order, navigation }: any) => {
//     if (order?.locationType == 'address' || order?.locationType == 'zipCode') {
//         return <Text style={styles.locationDetail}>{order?.locationType}: {order?.location}</Text>;
//     } else if (order?.locationType == 'currentLocation') {
//         const { latitude, longitude } = JSON.parse(order?.location);
//         return (
//             <TouchableOpacity
//                 onPress={() => navigation.navigate('MapViewArtisan', { marker: { latitude, longitude } })}
//             >
//                 <MapView
//                     style={styles.map}
//                     scrollEnabled={false}
//                     initialRegion={{
//                         latitude,
//                         longitude,
//                         latitudeDelta: 0.01,
//                         longitudeDelta: 0.01,
//                     }}
//                 >
//                     <Marker coordinate={{ latitude, longitude }} />
//                 </MapView>
//             </TouchableOpacity>
//         );
//     } else {
//         return <Text style={styles.locationDetail}>Unknown location type</Text>;
//     }
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f3f4f6',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f3f4f6',
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#414345',
//     },
//     orderCard: {
//         backgroundColor: 'white',
//         borderRadius: 12,
//         marginHorizontal: 16,
//         marginVertical: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//         overflow: 'hidden',
//     },
//     gradientHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 16,
//     },
//     orderId: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     statusBadge: {
//         backgroundColor: 'rgba(255,255,255,0.3)',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//     },
//     statusText: {
//         color: 'white',
//         fontSize: 12,
//         fontWeight: '600',
//     },
//     description: {
//         fontSize: 14,
//         color: '#4b5563',
//         paddingHorizontal: 16,
//         paddingTop: 12,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginVertical: 8,
//         paddingHorizontal: 16,
//         color: '#374151',
//     },
//     imageContainer: {
//         paddingLeft: 16,
//     },
//     image: {
//         width: 120,
//         height: 120,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     locationDetail: {
//         fontSize: 14,
//         color: '#4b5563',
//         paddingHorizontal: 16,
//     },
//     map: {
//         height: 150,
//         marginHorizontal: 16,
//         marginVertical: 8,
//         borderRadius: 8,
//     },
//     professionalContainer: {
//         marginVertical: 8,
//     },
//     professionalBadge: {
//         backgroundColor: '#e5e7eb',
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         marginRight: 8,
//         marginLeft: 16,
//     },
//     professionalText: {
//         fontSize: 12,
//         color: '#4b5563',
//     },
//     artisanContainer: {
//         marginVertical: 8,
//         paddingHorizontal: 16,
//     },
//     artisanInfo: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     artisanImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         marginRight: 8,
//     },
//     artisanName: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#4b5563',
//     },
//     viewButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#414345',
//         marginHorizontal: 16,
//         marginVertical: 12,
//         paddingVertical: 12,
//         borderRadius: 8,
//     },
//     viewButtonText: {
//         color: 'white',
//         marginLeft: 4,
//         fontWeight: '600',
//     },
// });

// export default UserUnlockedOrders;


// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     ScrollView,
//     StyleSheet,
//     TouchableOpacity,
//     Alert,
//     Dimensions,
//     ActivityIndicator,
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { LinearGradient } from 'expo-linear-gradient';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';
// import { getToken, getUser } from '@/helpers/getToken';

// const { width } = Dimensions.get('window');

// // Define TypeScript interfaces for better type safety
// interface Lead {
//     id: string;
//     title: string;
//     description: string;
//     status: string;
//     images: string[];
//     zipCode: string;
//     locationType: string;
//     artisantId: {
//         id: string;
//         leads: { id: string }[];
//         pushToken: string;
//         firstName: string;
//         lastName: string;
//         phone: string;
//         imageProfile: string;
//     };
//     owner: {
//         id: string;
//         leads: { id: string }[];
//         firstName: string;
//         lastName: string;
//         phone: string;
//         imageProfile: string;
//         pushToken: string;
//     };
//     artisantUnlockedLead: {
//         id: string;
//         firstName: string;
//         lastName: string;
//         imageProfile: string;
//         pushToken: string;
//     };
//     location: string;
//     review: {
//         id: string;
//         description: string;
//         rating: number;
//         owner: {
//             id: string;
//             firstName: string;
//             pushToken: string;
//             lastName: string;
//             imageProfile: string;
//         };
//     }[];
// }

// interface Location {
//     id: string;
//     location: string;
// }

// const UserUnlockedOrders = ({ navigation }: any) => {
//     // Correctly type the useState hooks using TypeScript generics
//     const [loading, setLoading] = useState<boolean>(false);
//     const [unlockedOrders, setUnlockedOrders] = useState<Lead[]>([]);
//     const [user, setUser] = useState<any>(null);
//     const isFocused = useIsFocused();

//     const [locations, setLocations] = useState<Location[]>([]);
//     const [errorLocation, setErrorLocation] = useState<string | null>(null);

//     const getUnlockedOrders = async () => {
//         try {
//             const token = await getToken();
//             const userData = await getUser();

//             if (!userData) {
//                 throw new Error("User data not found.");
//             }

//             setUser(userData);

//             if (!token) {
//                 Alert.alert("Error", "Authentication token not found.");
//                 return;
//             }

//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             setLoading(true);
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                             query leads {
//                                 leads {
//                                     id
//                                     title
//                                     description
//                                     status
//                                     images
//                                     zipCode
//                                     locationType
//                                     artisantId {
//                                         id
//                                         leads {
//                                             id
//                                         }
//                                         pushToken
//                                         firstName
//                                         lastName
//                                         phone
//                                         imageProfile
//                                     }
//                                     owner {
//                                         id
//                                         leads {
//                                             id
//                                         }
//                                         firstName
//                                         lastName
//                                         phone
//                                         imageProfile
//                                         pushToken
//                                     }
//                                     artisantUnlockedLead {
//                                         id
//                                         firstName
//                                         lastName
//                                         imageProfile
//                                         pushToken
//                                     }
//                                     location
//                                     review {
//                                         id
//                                         description
//                                         rating
//                                         owner {
//                                             id
//                                             firstName
//                                             pushToken
//                                             lastName
//                                             imageProfile
//                                         }
//                                     }
//                                 }
//                             }
//                         `,
//                     }),
//                 }
//             );

//             if (!res.ok) {
//                 throw new Error(`Network response was not ok: ${res.statusText}`);
//             }

//             const json = await res.json();
//             setUnlockedOrders(json.data.leads || []);
//             setLoading(false);
//         } catch (err: any) {
//             setLoading(false);
//             Alert.alert("Error", err.message || "Something went wrong while fetching orders.");
//         }
//     };

//     // Function to fetch location based on zip code
//     const fetchLocation = async (zip: string): Promise<string> => {
//         try {
//             const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
//             if (!response.ok) {
//                 throw new Error("Invalid zip code");
//             }
//             const data = await response.json();
//             const city = data.places[0]["place name"];
//             const state = data.places[0]["state abbreviation"];
//             return `${city}, ${state}`;
//         } catch (err: any) {
//             // Optionally log the error or handle it differently
//             return "Unknown location";
//         }
//     };

//     const handleLeads = async (leads: Lead[]) => {
//         try {
//             // Map over leads to create an array of promises
//             const locationPromises = leads.map(async (lead: Lead) => {
//                 const location = await fetchLocation(lead.zipCode);
//                 return { id: lead.id, location };
//             });

//             // Wait for all location fetches to complete
//             const newLocations = await Promise.all(locationPromises);

//             // Update state with the new locations array
//             setLocations(newLocations);
//             setErrorLocation(null); // Clear any previous errors
//         } catch (error: any) {
//             // Handle any unexpected errors
//             setErrorLocation(error.message || "Error fetching locations");
//         }
//     };

//     useEffect(() => {
//         getUnlockedOrders();
//     }, [isFocused]);

//     useEffect(() => {
//         if (unlockedOrders.length > 0) {
//             handleLeads(unlockedOrders);
//         } else {
//             // Optionally handle the case when leads are empty
//             setLocations([]);
//         }
//     }, [unlockedOrders]);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#414345" />
//                 <Text style={styles.loadingText}>Loading your unlocked orders...</Text>
//             </View>
//         );
//     }

//     return (
//         <ScrollView style={styles.container}>
//             {unlockedOrders.map((order: any, index: number) => {
//                 const locationObj = locations.find(loc => loc?.id === order?.id);
//                 const location = locationObj ? locationObj.location : "Loading location...";

//                 return (
//                     <Animated.View
//                         key={order?.id}
//                         entering={FadeInDown.delay(index * 100).springify()}
//                         style={styles.orderCard}
//                     >
//                         <LinearGradient
//                             colors={['#73c8a9', '#aaffa9']}
//                             start={{ x: 0, y: 0 }}
//                             end={{ x: 1, y: 1 }}
//                             style={styles.gradientHeader}
//                         >
//                             <Text style={styles.orderId}>{order?.title}</Text>
//                             <View style={styles.statusBadge}>
//                                 <Text style={styles.statusText}>{order?.status}</Text>
//                             </View>
//                         </LinearGradient>

//                         <Text style={styles.description}>{order?.description}</Text>

//                         <Text style={styles.label}>Images:</Text>
//                         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
//                             {order?.images.map((image: string, imgIndex: number) => (
//                                 <Animated.View key={imgIndex} entering={FadeInRight.delay(imgIndex * 100)}>
//                                     <Image source={{ uri: image }} style={styles.image} />
//                                 </Animated.View>
//                             ))}
//                         </ScrollView>

//                         <Text style={styles.label}>
//                             Location:{" "}
//                             <Text style={styles.locationDetail}>
//                                 {location}
//                             </Text>
//                         </Text>

//                         <TouchableOpacity
//                             onPress={() => {
//                                 console.log('Navigating with Order:', order);
//                                 console.log('Navigating with User:', user);
//                                 navigation.navigate('OrderViewUser', { order, user });
//                             }}
//                             style={styles.viewButton}
//                         >
//                             <MaterialCommunityIcons name="eye" color="#fff" size={20} />
//                             <Text style={styles.viewButtonText}>View Details</Text>
//                         </TouchableOpacity>
//                     </Animated.View>
//                 );
//             })}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f3f4f6',
//         width: "100%",
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f3f4f6',
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#414345',
//     },
//     orderCard: {
//         backgroundColor: 'white',
//         borderRadius: 12,
//         marginHorizontal: 16,
//         marginVertical: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//         overflow: 'hidden',
//     },
//     gradientHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 16,
//     },
//     orderId: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',
//         flex: 1, // Ensure the text takes up available space
//     },
//     statusBadge: {
//         backgroundColor: 'rgba(255,255,255,0.3)',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//         marginLeft: 10, // Add some spacing from the orderId
//     },
//     statusText: {
//         color: 'white',
//         fontSize: 12,
//         fontWeight: '600',
//     },
//     description: {
//         fontSize: 14,
//         color: '#4b5563',
//         paddingHorizontal: 16,
//         paddingTop: 12,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginVertical: 8,
//         paddingHorizontal: 16,
//         color: '#374151',
//     },
//     imageContainer: {
//         paddingLeft: 16,
//     },
//     image: {
//         width: 120,
//         height: 120,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     locationDetail: {
//         fontSize: 14,
//         color: '#4b5563',
//     },
//     map: {
//         height: 150,
//         marginHorizontal: 16,
//         marginVertical: 8,
//         borderRadius: 8,
//     },
//     professionalContainer: {
//         marginVertical: 8,
//     },
//     professionalBadge: {
//         backgroundColor: '#e5e7eb',
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         marginRight: 8,
//         marginLeft: 16,
//     },
//     professionalText: {
//         fontSize: 12,
//         color: '#4b5563',
//     },
//     artisanContainer: {
//         marginVertical: 8,
//         paddingHorizontal: 16,
//     },
//     artisanInfo: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     artisanImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         marginRight: 8,
//     },
//     artisanName: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#4b5563',
//     },
//     viewButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#73c8a9',
//         marginHorizontal: 16,
//         marginVertical: 12,
//         paddingVertical: 12,
//         borderRadius: 8,
//     },
//     viewButtonText: {
//         color: 'white',
//         marginLeft: 4,
//         fontWeight: '600',
//     },
// });

// export default UserUnlockedOrders;



// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     ScrollView,
//     StyleSheet,
//     TouchableOpacity,
//     Alert,
//     Dimensions,
//     ActivityIndicator,
// } from 'react-native';
// import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { LinearGradient } from 'expo-linear-gradient';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';
// import { getToken, getUser } from '@/helpers/getToken';

// // Define TypeScript interfaces for better type safety
// interface Lead {
//     id: string;
//     title: string;
//     description: string;
//     status: string;
//     images: string[];
//     zipCode: string;
//     locationType: string;
//     artisantId: {
//         id: string;
//         leads: { id: string }[];
//         pushToken: string;
//         firstName: string;
//         lastName: string;
//         phone: string;
//         imageProfile: string;
//     };
//     owner: {
//         id: string;
//         leads: { id: string }[];
//         firstName: string;
//         lastName: string;
//         phone: string;
//         imageProfile: string;
//         pushToken: string;
//     };
//     artisantUnlockedLead: {
//         id: string;
//         firstName: string;
//         lastName: string;
//         imageProfile: string;
//         pushToken: string;
//     };
//     location: string;
//     review: {
//         id: string;
//         description: string;
//         rating: number;
//         owner: {
//             id: string;
//             firstName: string;
//             pushToken: string;
//             lastName: string;
//             imageProfile: string;
//         };
//     }[];
// }

// interface Location {
//     id: string;
//     location: string;
// }

// interface UserUnlockedOrdersProps {
//     navigation: any;
//     searchQuery?: string; // Optional prop for search functionality
// }

// const { width } = Dimensions.get('window');

// const UserUnlockedOrders: React.FC<UserUnlockedOrdersProps> = ({ navigation, searchQuery = '' }) => {
//     // Correctly type the useState hooks using TypeScript generics
//     const [loading, setLoading] = useState<boolean>(false);
//     const [unlockedOrders, setUnlockedOrders] = useState<Lead[]>([]);
//     const [user, setUser] = useState<any>(null);
//     const isFocused = useIsFocused();

//     const [locations, setLocations] = useState<Location[]>([]);
//     const [errorLocation, setErrorLocation] = useState<string | null>(null);

//     const getUnlockedOrders = async () => {
//         try {
//             const token = await getToken();
//             const userData = await getUser();

//             if (!userData) {
//                 throw new Error("User data not found.");
//             }

//             setUser(userData);

//             if (!token) {
//                 Alert.alert("Error", "Authentication token not found.");
//                 return;
//             }

//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             setLoading(true);
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                             query leads {
//                                 leads {
//                                     id
//                                     title
//                                     description
//                                     status
//                                     images
//                                     zipCode
//                                     locationType
//                                     artisantId {
//                                         id
//                                         leads {
//                                             id
//                                         }
//                                         pushToken
//                                         firstName
//                                         lastName
//                                         phone
//                                         imageProfile
//                                     }
//                                     owner {
//                                         id
//                                         leads {
//                                             id
//                                         }
//                                         firstName
//                                         lastName
//                                         phone
//                                         imageProfile
//                                         pushToken
//                                     }
//                                     artisantUnlockedLead {
//                                         id
//                                         firstName
//                                         lastName
//                                         imageProfile
//                                         pushToken
//                                     }
//                                     location
//                                     review {
//                                         id
//                                         description
//                                         rating
//                                         owner {
//                                             id
//                                             firstName
//                                             pushToken
//                                             lastName
//                                             imageProfile
//                                         }
//                                     }
//                                 }
//                             }
//                         `,
//                     }),
//                 }
//             );

//             if (!res.ok) {
//                 throw new Error(`Network response was not ok: ${res.statusText}`);
//             }

//             const json = await res.json();
//             setUnlockedOrders(json.data.leads || []);
//             setLoading(false);
//         } catch (err: any) {
//             setLoading(false);
//             Alert.alert("Error", err.message || "Something went wrong while fetching orders.");
//         }
//     };

//     // Function to fetch location based on zip code
//     const fetchLocation = async (zip: string): Promise<string> => {
//         try {
//             const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
//             if (!response.ok) {
//                 throw new Error("Invalid zip code");
//             }
//             const data = await response.json();
//             const city = data.places[0]["place name"];
//             const state = data.places[0]["state abbreviation"];
//             return `${city}, ${state}`;
//         } catch (err: any) {
//             // Optionally log the error or handle it differently
//             return "Unknown location";
//         }
//     };

//     const handleLeads = async (leads: Lead[]) => {
//         try {
//             // Map over leads to create an array of promises
//             const locationPromises = leads.map(async (lead: Lead) => {
//                 const location = await fetchLocation(lead.zipCode);
//                 return { id: lead.id, location };
//             });

//             // Wait for all location fetches to complete
//             const newLocations = await Promise.all(locationPromises);

//             // Update state with the new locations array
//             setLocations(newLocations);
//             setErrorLocation(null); // Clear any previous errors
//         } catch (error: any) {
//             // Handle any unexpected errors
//             setErrorLocation(error.message || "Error fetching locations");
//         }
//     };

//     useEffect(() => {
//         getUnlockedOrders();
//     }, [isFocused]);

//     useEffect(() => {
//         if (unlockedOrders.length > 0) {
//             handleLeads(unlockedOrders);
//         } else {
//             // Optionally handle the case when leads are empty
//             setLocations([]);
//         }
//     }, [unlockedOrders]);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#414345" />
//                 <Text style={styles.loadingText}>Loading your unlocked orders...</Text>
//             </View>
//         );
//     }

//     // Filter orders based on searchQuery
//     const filteredOrders = unlockedOrders.filter((order: Lead) =>
//         order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order.status.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <ScrollView style={styles.container}>
//             {filteredOrders.length === 0 ? (
//                 <View style={styles.noResultsContainer}>
//                     <Text style={styles.noResultsText}>No orders found matching your search.</Text>
//                 </View>
//             ) : (
//                 filteredOrders.map((order: Lead, index: number) => {
//                     const locationObj = locations.find(loc => loc?.id === order?.id);
//                     const location = locationObj ? locationObj.location : "Loading location...";

//                     return (
//                         <Animated.View
//                             key={order?.id}
//                             entering={FadeInDown.delay(index * 100).springify()}
//                             style={styles.orderCard}
//                         >
//                             <LinearGradient
//                                 colors={['#73c8a9', '#aaffa9']}
//                                 start={{ x: 0, y: 0 }}
//                                 end={{ x: 1, y: 1 }}
//                                 style={styles.gradientHeader}
//                             >
//                                 <Text style={styles.orderId}>{order?.title}</Text>
//                                 <View style={styles.statusBadge}>
//                                     <Text style={styles.statusText}>{order?.status}</Text>
//                                 </View>
//                             </LinearGradient>

//                             <Text style={styles.description}>{order?.description}</Text>

//                             <Text style={styles.label}>Images:</Text>
//                             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
//                                 {order?.images.map((image: string, imgIndex: number) => (
//                                     <Animated.View key={imgIndex} entering={FadeInRight.delay(imgIndex * 100)}>
//                                         <Image source={{ uri: image }} style={styles.image} />
//                                     </Animated.View>
//                                 ))}
//                             </ScrollView>

//                             <Text style={styles.label}>
//                                 Location:{" "}
//                                 <Text style={styles.locationDetail}>
//                                     {location}
//                                 </Text>
//                             </Text>

//                             <TouchableOpacity
//                                 onPress={() => {
//                                     console.log('Navigating with Order:', order);
//                                     console.log('Navigating with User:', user);
//                                     navigation.navigate('OrderViewUser', { order, user });
//                                 }}
//                                 style={styles.viewButton}
//                             >
//                                 <MaterialCommunityIcons name="eye" color="#fff" size={20} />
//                                 <Text style={styles.viewButtonText}>View Details</Text>
//                             </TouchableOpacity>
//                         </Animated.View>
//                     );
//                 })
//             )}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f3f4f6',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f3f4f6',
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#414345',
//     },
//     orderCard: {
//         backgroundColor: 'white',
//         borderRadius: 12,
//         marginHorizontal: 16,
//         marginVertical: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//         overflow: 'hidden',
//         width: '100%', // Ensure full width
//     },
//     gradientHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 16,
//     },
//     orderId: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',
//         flex: 1, // Ensure the text takes up available space
//     },
//     statusBadge: {
//         backgroundColor: 'rgba(255,255,255,0.3)',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//         marginLeft: 10, // Add some spacing from the orderId
//     },
//     statusText: {
//         color: 'white',
//         fontSize: 12,
//         fontWeight: '600',
//     },
//     description: {
//         fontSize: 14,
//         color: '#4b5563',
//         paddingHorizontal: 16,
//         paddingTop: 12,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginVertical: 8,
//         paddingHorizontal: 16,
//         color: '#374151',
//     },
//     imageContainer: {
//         paddingLeft: 16,
//     },
//     image: {
//         width: 120,
//         height: 120,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     locationDetail: {
//         fontSize: 14,
//         color: '#4b5563',
//     },
//     viewButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#73c8a9',
//         marginHorizontal: 16,
//         marginVertical: 12,
//         paddingVertical: 12,
//         borderRadius: 8,
//     },
//     viewButtonText: {
//         color: 'white',
//         marginLeft: 4,
//         fontWeight: '600',
//     },
//     noResultsContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     noResultsText: {
//         fontSize: 16,
//         color: '#6b7280',
//         textAlign: 'center',
//     },
// });

// export default UserUnlockedOrders;




// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     StyleSheet,
//     TouchableOpacity,
//     Alert,
//     Dimensions,
//     ActivityIndicator,
//     FlatList,
// } from 'react-native';
// import Animated from 'react-native-reanimated';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { LinearGradient } from 'expo-linear-gradient';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';
// import { getToken, getUser } from '@/helpers/getToken';

// interface Lead {
//     id: string;
//     title: string;
//     description: string;
//     status: string;
//     images: string[];
//     zipCode: string;
//     locationType: string;
//     artisantId: any;
//     owner: any;
//     artisantUnlockedLead: any;
//     location: string;
//     review: any[];
// }

// interface UserUnlockedOrdersProps {
//     navigation: any;
//     searchQuery?: string;
// }

// const { width } = Dimensions.get('window');
// const locationCache: { [zip: string]: string } = {};

// const UserUnlockedOrders: React.FC<UserUnlockedOrdersProps> = ({ navigation, searchQuery = '' }) => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [unlockedOrders, setUnlockedOrders] = useState<Lead[]>([]);
//     const [user, setUser] = useState<any>(null);
//     const isFocused = useIsFocused();

//     const [locations, setLocations] = useState<{ [id: string]: string }>({});
//     const [errorLocation, setErrorLocation] = useState<string | null>(null);

//     const getUnlockedOrders = async () => {
//         try {
//             const token = await getToken();
//             const userData = await getUser();

//             if (!userData) {
//                 throw new Error("User data not found.");
//             }

//             setUser(userData);

//             if (!token) {
//                 Alert.alert("Error", "Authentication token not found.");
//                 return;
//             }

//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             setLoading(true);
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                             query leads {
//                                 leads {
//                                     id
//                                     title
//                                     description
//                                     status
//                                     images
//                                     zipCode
//                                     locationType
//                                     artisantId {
//                                         id
//                                         leads {
//                                             id
//                                         }
//                                         pushToken
//                                         firstName
//                                         lastName
//                                         phone
//                                         imageProfile
//                                     }
//                                     owner {
//                                         id
//                                         leads {
//                                             id
//                                         }
//                                         firstName
//                                         lastName
//                                         phone
//                                         imageProfile
//                                         pushToken
//                                     }
//                                     artisantUnlockedLead {
//                                         id
//                                         firstName
//                                         lastName
//                                         imageProfile
//                                         pushToken
//                                     }
//                                     location
//                                     review {
//                                         id
//                                         description
//                                         rating
//                                         owner {
//                                             id
//                                             firstName
//                                             pushToken
//                                             lastName
//                                             imageProfile
//                                         }
//                                     }
//                                 }
//                             }
//                         `,
//                     }),
//                 }
//             );

//             if (!res.ok) {
//                 throw new Error(`Network response was not ok: ${res.statusText}`);
//             }

//             const json = await res.json();
//             setUnlockedOrders(json.data.leads || []);
//             setLoading(false);
//         } catch (err: any) {
//             setLoading(false);
//             Alert.alert("Error", err.message || "Something went wrong while fetching orders.");
//         }
//     };

//     const fetchLocation = async (zip: string): Promise<string> => {
//         if (locationCache[zip]) {
//             return locationCache[zip];
//         }
//         try {
//             const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
//             if (!response.ok) {
//                 throw new Error("Invalid zip code");
//             }
//             const data = await response.json();
//             const city = data.places[0]["place name"];
//             const state = data.places[0]["state abbreviation"];
//             const location = `${city}, ${state}`;
//             locationCache[zip] = location;
//             return location;
//         } catch (err: any) {
//             return "Unknown location";
//         }
//     };

//     useEffect(() => {
//         getUnlockedOrders();
//     }, [isFocused]);

//     const filteredOrders = React.useMemo(() => {
//         return unlockedOrders.filter((order: Lead) =>
//             order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             order.status.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     }, [unlockedOrders, searchQuery]);

//     const renderItem = ({ item: order, index }: { item: Lead; index: number }) => {
//         const [location, setLocation] = useState<string>("Loading location...");

//         useEffect(() => {
//             const loadLocation = async () => {
//                 const loc = await fetchLocation(order.zipCode);
//                 setLocation(loc);
//             };
//             loadLocation();
//         }, [order.zipCode]);

//         return (
//             <Animated.View
//                 // @ts-ignore
//                 entering={Animated.FadeInDown.delay(index * 100).springify()}
//                 style={styles.orderCard}
//             >
//                 <LinearGradient
//                     colors={['#73c8a9', '#aaffa9']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={styles.gradientHeader}
//                 >
//                     <Text style={styles.orderId}>{order?.title}</Text>
//                     <View style={styles.statusBadge}>
//                         <Text style={styles.statusText}>{order?.status}</Text>
//                     </View>
//                 </LinearGradient>

//                 <Text style={styles.description}>{order?.description}</Text>

//                 <Text style={styles.label}>Images:</Text>
//                 <FlatList
//                     data={order?.images}
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     keyExtractor={(item, idx) => idx.toString()}
//                     renderItem={({ item: image, index: imgIndex }) => (

//                         <Animated.View
//                             // @ts-ignore
//                             entering={Animated.FadeInRight.delay(imgIndex * 100)}>
//                             <Image source={{ uri: image }} style={styles.image} />
//                         </Animated.View>
//                     )}
//                     style={styles.imageContainer}
//                 />

//                 <Text style={styles.label}>
//                     Location:{" "}
//                     <Text style={styles.locationDetail}>
//                         {location}
//                     </Text>
//                 </Text>

//                 <TouchableOpacity
//                     onPress={() => {
//                         navigation.navigate('OrderViewUser', { order, user });
//                     }}
//                     style={styles.viewButton}
//                 >
//                     <MaterialCommunityIcons name="eye" color="#fff" size={20} />
//                     <Text style={styles.viewButtonText}>View Details</Text>
//                 </TouchableOpacity>
//             </Animated.View>
//         );
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#414345" />
//                 <Text style={styles.loadingText}>Loading your unlocked orders...</Text>
//             </View>
//         );
//     }

//     return (
//         <FlatList
//             data={filteredOrders}
//             keyExtractor={(item) => item.id}
//             renderItem={renderItem}
//             ListEmptyComponent={
//                 <View style={styles.noResultsContainer}>
//                     <Text style={styles.noResultsText}>No orders found matching your search.</Text>
//                 </View>
//             }
//             contentContainerStyle={styles.container}
//         />
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         paddingBottom: 20,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f3f4f6',
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#414345',
//     },
//     orderCard: {
//         backgroundColor: 'white',
//         borderRadius: 12,
//         marginHorizontal: 16,
//         marginVertical: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//         overflow: 'hidden',
//     },
//     gradientHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 16,
//     },
//     orderId: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',
//         flex: 1,
//     },
//     statusBadge: {
//         backgroundColor: 'rgba(255,255,255,0.3)',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//         marginLeft: 10,
//     },
//     statusText: {
//         color: 'white',
//         fontSize: 12,
//         fontWeight: '600',
//     },
//     description: {
//         fontSize: 14,
//         color: '#4b5563',
//         paddingHorizontal: 16,
//         paddingTop: 12,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginVertical: 8,
//         paddingHorizontal: 16,
//         color: '#374151',
//     },
//     imageContainer: {
//         paddingLeft: 16,
//     },
//     image: {
//         width: 120,
//         height: 120,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     locationDetail: {
//         fontSize: 14,
//         color: '#4b5563',
//     },
//     viewButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#73c8a9',
//         marginHorizontal: 16,
//         marginVertical: 12,
//         paddingVertical: 12,
//         borderRadius: 8,
//     },
//     viewButtonText: {
//         color: 'white',
//         marginLeft: 4,
//         fontWeight: '600',
//     },
//     noResultsContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     noResultsText: {
//         fontSize: 16,
//         color: '#6b7280',
//         textAlign: 'center',
//     },
// });

// export default UserUnlockedOrders;

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';
import { getToken, getUser } from '@/helpers/getToken';

interface Lead {
    id: string;
    title: string;
    description: string;
    status: string;
    images: string[];
    zipCode: string;
    locationType: string;
    artisantId: any;
    owner: any;
    artisantUnlockedLead: any;
    location: string;
    review: any[];
}

interface UserUnlockedOrdersProps {
    navigation: any;
    searchQuery?: string;
}

const { width } = Dimensions.get('window');
const locationCache: { [zip: string]: string } = {};

const UserUnlockedOrders = ({ navigation, searchQuery = '' }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [unlockedOrders, setUnlockedOrders] = useState<Lead[]>([]);
    const [user, setUser] = useState<any>(null);
    const isFocused = useIsFocused();

    const getUnlockedOrders = async () => {
        try {
            const token = await getToken();
            const userData = await getUser();

            if (!userData) {
                throw new Error("User data not found.");
            }

            setUser(userData);

            if (!token) {
                Alert.alert("Error", "Authentication token not found.");
                return;
            }

            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);

            setLoading(true);
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            query leads {
                                leads {
                                    id
                                    title
                                    description
                                    status
                                    images
                                    zipCode
                                    locationType
                                    artisantId {
                                        id
                                        leads {
                                            id
                                        }
                                        pushToken
                                        firstName
                                        lastName
                                        phone
                                        imageProfile
                                    }
                                    owner {
                                        id
                                        leads {
                                            id
                                        }
                                        firstName
                                        lastName
                                        phone
                                        imageProfile
                                        pushToken
                                    }
                                    artisantUnlockedLead {
                                        id
                                        firstName
                                        lastName
                                        imageProfile
                                        pushToken
                                    }
                                    location
                                    review {
                                        id
                                        description
                                        rating
                                        owner {
                                            id
                                            firstName
                                            pushToken
                                            lastName
                                            imageProfile
                                        }
                                    }
                                }
                            }
                        `,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            const json = await res.json();
            setUnlockedOrders(json.data.leads || []);
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            Alert.alert("Error", err.message || "Something went wrong while fetching orders.");
        }
    };

    const fetchLocation = async (zip: string): Promise<string> => {
        if (locationCache[zip]) {
            return locationCache[zip];
        }
        try {
            const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
            if (!response.ok) {
                throw new Error("Invalid zip code");
            }
            const data = await response.json();
            const city = data.places[0]["place name"];
            const state = data.places[0]["state abbreviation"];
            const location = `${city}, ${state}`;
            locationCache[zip] = location;
            return location;
        } catch (err: any) {
            return "Unknown location";
        }
    };

    useEffect(() => {
        getUnlockedOrders();
    }, [isFocused]);

    const filteredOrders = React.useMemo(() => {
        return unlockedOrders.filter((order: Lead) =>
            order?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            order?.description?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            order?.status?.toLowerCase().includes(searchQuery?.toLowerCase())
        );
    }, [unlockedOrders, searchQuery]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#414345" />
                <Text style={styles.loadingText}>Loading your unlocked orders...</Text>
            </View>
        );
    }

    return (
        <View
        style={{
            ...styles.container,
            marginBottom: 20,
        }}
        >
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                renderItem={({ item: order, index }) => (
                    <>
                        <OrderItem
                            order={order}
                            index={index}
                            navigation={navigation}
                            user={user}
                            fetchLocation={fetchLocation}
                        />

                    </>
                )}
                ListEmptyComponent={
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>No orders found matching your search.</Text>
                    </View>
                }
                contentContainerStyle={styles.container}
            />
            
        </View>
    );
};

interface OrderItemProps {
    order: Lead;
    index: number;
    navigation: any;
    user: any;
    fetchLocation: (zip: string) => Promise<string>;
}

const OrderItem = ({ order, index, navigation, user, fetchLocation }: any) => {
    const [location, setLocation] = useState<string>("Loading location...");

    useEffect(() => {
        const loadLocation = async () => {
            const loc = await fetchLocation(order.zipCode);
            setLocation(loc);
        };
        loadLocation();
    }, [order.zipCode]);

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.orderCard}
        >
            <LinearGradient
                colors={['#73c8a9', '#aaffa9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientHeader}
            >
                <Text style={styles.orderId}>{order?.title}</Text>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{order?.status}</Text>
                </View>
            </LinearGradient>

            <Text style={styles.description}>{order?.description}</Text>

            <Text style={styles.label}>Images:</Text>
            <FlatList
                data={order?.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item: image, index: imgIndex }) => (
                    <Animated.View entering={FadeIn.delay(imgIndex * 100)}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </Animated.View>
                )}
                style={styles.imageContainer}
            />

            <Text style={styles.label}>
                Location:{" "}
                <Text style={styles.locationDetail}>
                    {location}
                </Text>
            </Text>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('OrderViewUser', { order, user });
                }}
                style={styles.viewButton}
            >
                <MaterialCommunityIcons name="eye" color="#fff" size={20} />
                <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#414345',
    },
    orderCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    gradientHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    statusBadge: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 10,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        color: '#4b5563',
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 8,
        paddingHorizontal: 16,
        color: '#374151',
    },
    imageContainer: {
        paddingLeft: 16,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginRight: 8,
    },
    locationDetail: {
        fontSize: 14,
        color: '#4b5563',
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#73c8a9',
        marginHorizontal: 16,
        marginVertical: 12,
        paddingVertical: 12,
        borderRadius: 8,
    },
    viewButtonText: {
        color: 'white',
        marginLeft: 4,
        fontWeight: '600',
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noResultsText: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
});

export default UserUnlockedOrders;

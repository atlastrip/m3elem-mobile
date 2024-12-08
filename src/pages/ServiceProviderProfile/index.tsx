// import React, { useState, useEffect } from "react";
// import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Button, StyleSheet, Modal, TouchableWithoutFeedback, Linking, Alert } from "react-native";
// import { FontAwesome } from '@expo/vector-icons'; // Using Expo's icon library for the star ratings
// import MessageOutlinedIcon from '@expo/vector-icons/MaterialIcons';
// import CallOutlinedIcon from '@expo/vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native'; // React Navigation
// import Constants from 'expo-constants';
// import { getToken, getUser } from "@/helpers/getToken";
// import ImageGallery from "@/components/ImageGallery";
// import { Card, Divider, Title } from "react-native-paper";
// import { Ionicons } from '@expo/vector-icons';
// import CheckCircleOutline from 'react-native-vector-icons/MaterialIcons'; // Example icon
// import dayjs from "dayjs";
// import ContactForm from "@/components/ContactForm";
// import ServicesCard from "@/components/ServiceCard";
// import ReviewsCard from "@/components/ReviewsCard";
// import { createOrRetrieveConversation } from "@/helpers/createOrRetrieveConversation";

// export default function ZipCodeForm() {
//     const [zipCode, setZipCode]: any = useState("");
//     const [location, setLocation]: any = useState(null);
//     const [error, setError]: any = useState(null);

//     // Function to fetch city and state based on zip code
//     const fetchLocation = async (zip: any) => {
//         try {
//             const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
//             if (!response.ok) {
//                 throw new Error("Invalid zip code");
//             }
//             const data = await response.json();
//             const city = data.places[0]["place name"];
//             const state = data.places[0]["state abbreviation"];
//             setLocation({ city, state });
//             setError(null);
//         } catch (err: any) {
//             setLocation(null);
//             setError(err?.message);
//         }
//     };

//     // Handle input change and validate zip code
//     const handleZipCodeChange = (zip: any) => {
//         setZipCode(zip);

//         if (zip.length === 5) {
//             fetchLocation(zip);
//         } else {
//             setLocation(null);
//             setError(null);
//         }
//     };

//     return (
//         <View style={{ marginBottom: 16 }}>
//             <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>Zip code</Text>
//             <TextInput
//                 style={{ borderWidth: 1, padding: 8, borderRadius: 8, width: '100%' }}
//                 placeholder="00000"
//                 keyboardType="numeric"
//                 value={zipCode}
//                 onChangeText={handleZipCodeChange}
//             />
//             {location && (
//                 <Text style={{ marginTop: 8, color: 'green' }}>
//                     {location.city}, <Text style={{ fontWeight: 'bold' }}>{location.state}</Text>
//                 </Text>
//             )}
//             {error && (
//                 <Text style={{ marginTop: 8, color: 'red' }}>{error}</Text>
//             )}
//         </View>
//     );
// }


// const DisplayServiceProviders = ({ data, navigation, selectedCategories, title }: any) => {
//     const [viewAllReviews, setViewAllReviews] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [contactOption, setContactOption] = useState('chat');
//     const [userId, setUserId]: any = useState(null);



//     const fetchUserId = async () => {
//         const newUser: any = await getUser();
//         setUserId(JSON.parse(newUser));
//     };
//     useEffect(() => {
//         fetchUserId();
//     }, [])
//     // console.log('data brooooooooooo', data);

//     const handleAddOrder = async (contactType: string) => {
//         setLoading(true);
//         const token = await getToken();
//         const newUser: any = await getUser();

//         if (!token) {
//             return;
//         }

//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);
//         console.log('====================================');
//         console.log('selectedCategories', selectedCategories[0].filters);
//         console.log('====================================');
//         const category = data?.userByPK?.categories?.find((category: any) => category?.id === selectedCategories[0]);
//         console.log('category', category);

//         try {

//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                             mutation addDirectLead($input: directLeadInput) {
//                                 addDirectLead(input: $input){
//                                         id
//                                         owner{
//                                             id
//                                             firstName
//                                             lastName
//                                             pushToken
//                                             imageProfile
//                                             images {
//                                             id 
//                                             source
//                                             }
//                                         }
//                                         artisantUnlockedLead{
//                                             id
//                                             firstName
//                                             lastName
//                                             pushToken
//                                             imageProfile
//                                             images {
//                                             id 
//                                             source
//                                             }
//                                         }
//                                         artisantId{
//                                             id
//                                             firstName
//                                             lastName
//                                             pushToken
//                                             imageProfile
//                                             images {
//                                             id 
//                                             source
//                                             }
//                                         }

//                                     error
//                                     isOkay
//                                 }
//                             }

//                             `,
//                         variables: {
//                             input: {
//                                 title,
//                                 images: data?.userByPK?.images[0]?.source,
//                                 // professionals: category?.professionals[0]?.id,
//                                 categoryId: category?.id,
//                                 directLeadStatus: "PENDING",
//                                 callOrWhatsapp: contactType,
//                                 artisantId: data?.userByPK?.id,
//                             }
//                         }

//                     }),
//                 }
//             );

//             const json = await res.json();

//             console.log('json', json);
//             setLoading(false);
//             return json;



//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     };

//     const makePhoneCall = (phoneNumber: string) => {
//         const phoneURL = `tel:${phoneNumber}`;
//         Linking.canOpenURL(phoneURL)
//             .then((supported) => {
//                 if (supported) {
//                     Linking.openURL(phoneURL); // Initiates the phone call
//                 } else {
//                     console.log('Phone call not supported on this device');
//                 }
//             })
//             .catch((err) => console.error('An error occurred', err));
//     };

//     const handleContact = async (contactType: string) => {

//         if (contactType === 'call') {
//             console.log('call');
//             // go to the phone call
//             makePhoneCall(data?.userByPK.phone);

//         } else if (contactType === 'chat') {
//             const res: any = await handleAddOrder(contactType);
//             console.log('====================================');
//             console.log('userId', userId);
//             console.log('====================================');
//             console.log('res?.data?.addDirectLead?.error', res?.data?.addDirectLead?.error);

//             if (res?.data?.addDirectLead?.id) {
//                 const conversationId = await createOrRetrieveConversation(
//                     res?.data?.addDirectLead?.id,
//                     res?.data?.addDirectLead?.artisantId?.id,
//                     userId?.id
//                 );

//                 setLoading(false);
//                 setModalVisible(false);
//                 navigation.navigate('Chat', {
//                     conversationId,
//                     userId: userId?.id,
//                     userName: userId?.firstName,
//                     order: {
//                         ...res?.data?.addDirectLead,
//                         owner: userId,
//                         artisant: res?.data?.addDirectLead?.artisantId
//                     }
//                 });
//             } else {
//                 setLoading(false);
//                 setModalVisible(false);
//                 return Alert.alert(res?.data?.addDirectLead?.error);
//             }
//         }
//     }


//     const getUserCategory = (createdAt: string) => {
//         const today = dayjs();
//         const createdDate = dayjs(createdAt);
//         const daysDifference = today.diff(createdDate, 'day');
//         const monthsDifference = today.diff(createdDate, 'month');

//         if (daysDifference <= 10) {
//             return { label: 'New in House Guru', color: 'orange' };
//         } else if (monthsDifference >= 1) {
//             return { label: 'Pro House Guru', color: 'purple' };
//         } else {
//             return { label: 'Regular House Guru', color: 'blue' };
//         }
//     };

//     const averageRating = data?.userByPK.reviews?.reduce((acc: any, review: any) => acc + review?.rating, 0) / (data?.userByPK.reviews?.length || 1);
//     const roundedRating = Math.round(averageRating * 10) / 10;

//     // @ts-ignore
//     const sortedReviews = data?.userByPK.reviews?.sort((a: any, b: any) => new Date(b?.createdAt) - new Date(a?.createdAt));

//     return (
//         <ScrollView contentContainerStyle={{ padding: 16 }}>
//             {/* Profile and details */}
//             <View style={{ flexDirection: 'row', marginBottom: 16 }}>
//                 <Image source={{ uri: data?.userByPK.imageProfile }} style={{ width: 64, height: 64, borderRadius: 32 }} />
//                 <View style={{ marginLeft: 16 }}>
//                     <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
//                         {data?.userByPK.firstName} {data?.userByPK.lastName}
//                     </Text>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
//                         <Text style={{ color: 'green', marginRight: 4 }}>{roundedRating}</Text>
//                         {[...Array(5)].map((_, i) => (
//                             <FontAwesome key={i} name="star" size={16} color={i < roundedRating ? 'yellow' : 'gray'} />
//                         ))}
//                         <Text style={{ marginLeft: 8 }}>({data?.userByPK.reviews.length || 0})</Text>
//                     </View>
//                 </View>
//             </View>

//             <View style={{ marginBottom: 16 }}>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Introduction</Text>
//                 <Text>{data?.userByPK.aboutYou}</Text>
//             </View>



//             <Card style={styles.card}>
//                 <Card.Content style={styles.cardContentcardOverView}>
//                     <Text style={styles.titlecardOverView}>Overview</Text>

//                     <View style={styles.infoGrid}>
//                         <View style={styles.infoRow}>
//                             <Ionicons name="location-outline" size={16} color="gray" />
//                             <Text>
//                                 {data?.userByPK?.adress
//                                     ? `${JSON.parse(data?.userByPK?.adress)?.streetLine}, ${JSON.parse(data?.userByPK?.adress)?.city}, ${JSON.parse(data?.userByPK?.adress)?.state} ${JSON.parse(data?.userByPK?.adress)?.zipcode}`
//                                     : 'No address provided'}

//                             </Text>
//                         </View>

//                         <View style={styles.infoRow}>
//                             <Ionicons name="time-outline" size={16} color="gray" />
//                             <Text>{getUserCategory(data?.userByPK.createdAt)?.label}</Text>
//                         </View>

//                         <View style={styles.infoRow}>
//                             <Ionicons name="briefcase-outline" size={16} color="gray" />
//                             <Text>
//                                 {data?.userByPK?.profileCompleted ? (
//                                     <View style={styles.profileStatus}>
//                                         <Text>Profile Completed</Text>
//                                         <CheckCircleOutline name="check-circle-outline" size={16} color="green" />
//                                     </View>
//                                 ) : 'Profile Incomplete'}
//                             </Text>
//                         </View>

//                         <View style={styles.infoRow}>
//                             <Ionicons name="cash-outline" size={16} color="gray" />
//                             <Text>Contact for more info</Text>
//                         </View>
//                     </View>
//                 </Card.Content>
//             </Card>
//             <ServicesCard data={data} />
//             <ReviewsCard sortedReviews={sortedReviews} viewAllReviews={viewAllReviews} setViewAllReviews={setViewAllReviews} data={data} />

//             <View style={styles.card}>
//                 <View style={styles.cardContent}>
//                     <Text style={styles.title}>Gallery</Text>
//                     <ImageGallery images={data?.userByPK?.images || []} />
//                 </View>
//             </View>
//             <Modal
//                 animationType="fade"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//                     <View style={styles.modalBackground}>
//                         <TouchableWithoutFeedback>
//                             <View style={styles.modalView}>
//                                 <Text style={styles.modalTitle}>How would you like to contact?</Text>
//                                 <Divider style={styles.divider} />

//                                 <View
//                                     className="flex-row gap-4 justify-center items-center w-full"
//                                 >
//                                     <TouchableOpacity style={{
//                                         ...styles.contactOption, width: 100,
//                                     }} onPress={() => handleContact('chat')}>
//                                         <Text style={styles.contactOptionText}>Chat</Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity style={{
//                                         ...styles.contactOption, width: 100,
//                                     }} onPress={() => handleContact('call')}>
//                                         <Text style={styles.contactOptionText}>Phone</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </TouchableWithoutFeedback>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>

//             <Button
//                 title={loading ? 'Loading...' : 'Contact Me'}
//                 onPress={() => setModalVisible(true)}
//             />
//         </ScrollView>
//     );
// };





// export function ServiceProviderProfile({ route, navigation }: any) {
//     const { id, selectedCategories, title } = route.params;
//     // console.log('id', id);

//     const [data, setData]: any = useState([]);
//     const [error, setError]: any = useState(null);
//     const [loading, setLoading]: any = useState(false);
//     // const { data, loading, error } = useUserByPkQuery({
//     //     variables: { userByPkId: id },
//     //     skip: !id
//     // });


//     console.log('====================================');
//     console.log('selectedCategories', selectedCategories);
//     console.log('====================================');

//     const getUserByPk = async () => {
//         const token = await getToken();
//         // setUser(user);
//         // console.log('====================================');
//         // console.log('token', token);
//         // console.log('====================================');
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);
//         try {
//             // console.log('====================================');
//             // console.log('filterArray', filterArray);
//             // console.log('================================
//             setLoading(true);
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                             query UserByPK($userByPkId: String) {
//                                 userByPK(id: $userByPkId) {
//                                     id
//                                     firstName
//                                     lastName
//                                     email
//                                     password
//                                     provider
//                                     role
//                                     categories {
//                                     id
//                                     name
//                                     professionals{
//                                         id 
//                                     }
//                                     }
//                                     phone
//                                     amount
//                                     imageProfile
//                                     images {
//                                     id
//                                     source
//                                     }
//                                     reviews {
//                                     createdAt
//                                     description
//                                     id
//                                     rating
//                                     reviewer {
//                                         lastName
//                                         firstName
//                                         id
//                                     }
//                                     owner {
//                                         lastName
//                                         firstName
//                                         id
//                                     }
//                                     }

//                                     location
//                                     Radius
//                                     available
//                                     CashOnDeliveryPayment
//                                     BankTransferPayment
//                                     CheckPayment
//                                     aboutYou
//                                     adress
//                                     pushToken
//                                     pushUsingAppNotification
//                                     pushUsingEmailNotification
//                                     pushUsingPhoneNotification
//                                     currentWeekSpent
//                                     weeklyBudget
//                                     profileCompleted
//                                     createdAt
//                                     updatedAt
//                                 }
//                                 }

//                             `,
//                         variables: {
//                             userByPkId: id,
//                         }


//                     }),
//                 }
//             );


//             const response = await res.json();
//             // console.log('====================================');
//             // console.log('response', response.data.userByPK);
//             // console.log('====================================');
//             setLoading(false);
//             setData(response.data);
//         } catch (error: any) {
//             // console.log('====================================');
//             // console.log('error', error);
//             // console.log('====================================');
//             setLoading(false);
//             setError(error);
//         }


//     };

//     useEffect(() => {
//         getUserByPk();
//     }, []);



//     return (
//         <View style={{ flex: 1, padding: 16 }}>
//             {loading && <Text>Loading...</Text>}
//             {error && <Text>{error?.message}</Text>}
//             {data?.length === 0 ? <Text>No data found</Text> :

//                 <DisplayServiceProviders
//                     data={data}
//                     navigation={navigation}
//                     selectedCategories={selectedCategories}
//                     title={title}
//                 />
//             }

//         </View>
//     );
// }






// const styles = StyleSheet.create({
//     card: {
//         marginBottom: 24,
//         borderRadius: 8,
//         backgroundColor: '#fff',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3, // Shadow for Android
//     },
//     cardContent: {
//         padding: 16,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginBottom: 16,
//     },
//     cardOverView: {
//         marginBottom: 16,
//     },
//     cardContentcardOverView: {
//         padding: 16,
//     },
//     titlecardOverView: {
//         fontWeight: 'bold',
//         fontSize: 18,
//         marginBottom: 16,
//     },
//     infoGrid: {
//         flexDirection: 'column',
//     },
//     infoRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     profileStatus: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     contactOption: {
//         marginVertical: 10,
//         padding: 15,
//         borderRadius: 10,
//         backgroundColor: '#007bff',
//     },
//     contactOptionText: {
//         color: 'white',
//         fontSize: 16,
//         textAlign: 'center',
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     divider: {
//         marginBottom: 20,
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         // alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
//     },
// });


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//     View,
//     Text,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     Button,
//     StyleSheet,
//     Modal,
//     TouchableWithoutFeedback,
//     Linking,
//     Alert,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons"; // Using Expo's icon library for the star ratings
// import MessageOutlinedIcon from "@expo/vector-icons/MaterialIcons";
// import CallOutlinedIcon from "@expo/vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native"; // React Navigation
// import Constants from "expo-constants";
// import { getToken, getUser } from "@/helpers/getToken";
// import ImageGallery from "@/components/ImageGallery";
// import { Card, Divider, Title } from "react-native-paper";
// import { Ionicons } from "@expo/vector-icons";
// import CheckCircleOutline from "react-native-vector-icons/MaterialIcons"; // Example icon
// import dayjs from "dayjs";
// import ContactForm from "@/components/ContactForm";
// import ServicesCard from "@/components/ServiceCard";
// import ReviewsCard from "@/components/ReviewsCard";
// import { createOrRetrieveConversation } from "@/helpers/createOrRetrieveConversation";

// export default function ZipCodeForm() {
//     const [zipCode, setZipCode] = useState("");
//     const [location, setLocation]: any = useState(null);
//     const [error, setError] = useState(null);

//     // Function to fetch city and state based on zip code
//     const fetchLocation = useCallback(async (zip: any) => {
//         try {
//             const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
//             if (!response.ok) {
//                 throw new Error("Invalid zip code");
//             }
//             const data = await response.json();
//             const city: any = data.places[0]["place name"];
//             const state: any = data.places[0]["state abbreviation"];
//             setLocation({ city, state });
//             setError(null);
//         } catch (err: any) {
//             setLocation(null);
//             setError(err?.message);
//         }
//     }, []);

//     // Handle input change and validate zip code
//     const handleZipCodeChange = useCallback(
//         (zip: any) => {
//             setZipCode(zip);

//             if (zip.length === 5) {
//                 fetchLocation(zip);
//             } else {
//                 setLocation(null);
//                 setError(null);
//             }
//         },
//         [fetchLocation]
//     );

//     return (
//         <View style={{ marginBottom: 16 }}>
//             <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8 }}>
//                 Zip code
//             </Text>
//             <TextInput
//                 style={{
//                     borderWidth: 1,
//                     padding: 8,
//                     borderRadius: 8,
//                     width: "100%",
//                 }}
//                 placeholder="00000"
//                 keyboardType="numeric"
//                 value={zipCode}
//                 onChangeText={handleZipCodeChange}
//             />
//             {location && (
//                 <Text style={{ marginTop: 8, color: "green" }}>
//                     {location.city},{" "}
//                     <Text style={{ fontWeight: "bold" }}>{location.state}</Text>
//                 </Text>
//             )}
//             {error && <Text style={{ marginTop: 8, color: "red" }}>{error}</Text>}
//         </View>
//     );
// }

// const DisplayServiceProviders = ({ data, navigation, selectedCategories, title,chatType }: any) => {
//     const [viewAllReviews, setViewAllReviews] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [userId, setUserId]: any = useState(null);
//     const [isServicesCollapsed, setIsServicesCollapsed] = useState(true);

//     const fetchUserId = useCallback(async () => {
//         const newUser: any = await getUser();
//         setUserId(JSON.parse(newUser));
//     }, []);

//     useEffect(() => {
//         fetchUserId();
//     }, [fetchUserId]);

//     const handleAddOrder = useCallback(
//         async (contactType: any) => {
//             setLoading(true);
//             const token = await getToken();
//             const newUser = await getUser();

//             if (!token) {
//                 return;
//             }

//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             const category = data?.userByPK?.categories?.find(
//                 (category: any) => category?.id === selectedCategories[0]
//             );

//             console.log('data?.userByPK?.categories', data?.userByPK?.categories);
//             console.log('category', category);
//             console.log('====================================');
//             console.log('selectedCategories[0]', selectedCategories);
//             console.log('title', title);
//             console.log('====================================');
//             try {
//                 const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//               mutation addDirectLead($input: directLeadInput) {
//                 addDirectLead(input: $input){
//                   id
//                   owner{
//                     id
//                     firstName
//                     lastName
//                     pushToken
//                     imageProfile
//                     images {
//                       id 
//                       source
//                     }
//                   }
//                   artisantUnlockedLead{
//                     id
//                     firstName
//                     lastName
//                     pushToken
//                     imageProfile
//                     images {
//                       id 
//                       source
//                     }
//                   }
//                   artisantId{
//                     id
//                     firstName
//                     lastName
//                     pushToken
//                     imageProfile
//                     images {
//                       id 
//                       source
//                     }
//                   }
//                   error
//                   isOkay
//                 }
//               }
//             `,
//                         variables: {
//                             input: {
//                                 title,
//                                 images: data?.userByPK?.images[0]?.source,
//                                 categoryId: category?.id,
//                                 directLeadStatus: "PENDING",
//                                 callOrWhatsapp: contactType,
//                                 artisantId: data?.userByPK?.id,
//                             },
//                         },
//                     }),
//                 });

//                 const json = await res.json();
//                 setLoading(false);
//                 return json;
//             } catch (error) {
//                 console.log(error);
//                 setLoading(false);
//             }
//         },
//         [data, selectedCategories, title]
//     );

//     const makePhoneCall = useCallback((phoneNumber: any) => {
//         const phoneURL = `tel:${phoneNumber}`;
//         Linking.canOpenURL(phoneURL)
//             .then((supported) => {
//                 if (supported) {
//                     Linking.openURL(phoneURL); // Initiates the phone call
//                 } else {
//                     console.log("Phone call not supported on this device");
//                 }
//             })
//             .catch((err) => console.error("An error occurred", err));
//     }, []);

//     const handleContact = useCallback(
//         async (contactType: any) => {
//             console.log('====================================');
//             console.log('contactType', contactType);
//             console.log('====================================');
//             if (contactType === "call") {
//                 makePhoneCall(data?.userByPK.phone);
//             } else if (contactType === "chat") {
//                 const res = await handleAddOrder(contactType);
//                 console.log('res', res);


//                 // console.log('res?.data?.addDirectLead?.artisantId?.id', res?.data?.addDirectLead?.artisantId?.id);
//                 // console.log('userId?.id', userId);
//                 // return

//                 if (res?.data?.addDirectLead?.id) {
//                     const conversationId: any = await createOrRetrieveConversation(
//                         res?.data?.addDirectLead?.id,
//                         res?.data?.addDirectLead?.artisantId?.id,
//                         userId?.id
//                     );

//                     setLoading(false);
//                     setModalVisible(false);
//                     navigation.navigate("Chat", {
//                         conversationId,
//                         userId: res?.data?.addDirectLead?.artisantId?.id,
//                         userName: userId?.id,
//                         order: {
//                             ...res?.data?.addDirectLead,
//                             owner: userId,
//                             artisant: res?.data?.addDirectLead?.artisantId,
//                         },
//                     });
//                 } else {
//                     setLoading(false);
//                     setModalVisible(false);
//                     return Alert.alert(res?.data?.addDirectLead?.error);
//                 }
//             }
//         },
//         [data, handleAddOrder, makePhoneCall, navigation, userId]
//     );

//     const getUserCategory = useCallback((createdAt: any) => {
//         const today = dayjs();
//         const createdDate = dayjs(createdAt);
//         const daysDifference = today.diff(createdDate, "day");
//         const monthsDifference = today.diff(createdDate, "month");

//         if (daysDifference <= 10) {
//             return { label: "New in House Guru", color: "orange" };
//         } else if (monthsDifference >= 1) {
//             return { label: "Pro House Guru", color: "purple" };
//         } else {
//             return { label: "Regular House Guru", color: "blue" };
//         }
//     }, []);

//     const averageRating = useMemo(() => {
//         const avg =
//             data?.userByPK.reviews?.reduce((acc: any, review: any) => acc + review?.rating, 0) /
//             (data?.userByPK.reviews?.length || 1);
//         return Math.round(avg * 10) / 10;
//     }, [data]);

//     const sortedReviews = useMemo(() => {
//         return data?.userByPK.reviews?.sort(
//             (a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
//         );
//     }, [data]);

//     return (
//         <ScrollView contentContainerStyle={{ padding: 16 }}>
//             {/* Profile and details */}
//             <View style={{ flexDirection: "row", marginBottom: 16 }}>
//                 <Image
//                     source={{ uri: data?.userByPK.imageProfile }}
//                     style={{ width: 64, height: 64, borderRadius: 32 }}
//                 />
//                 <View style={{ marginLeft: 16 }}>
//                     <Text style={{ fontSize: 24, fontWeight: "bold" }}>
//                         {data?.userByPK.firstName} {data?.userByPK.lastName}
//                     </Text>
//                     <View
//                         style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
//                     >
//                         <Text style={{ color: "green", marginRight: 4 }}>
//                             {averageRating}
//                         </Text>
//                         {[...Array(5)].map((_, i) => (
//                             <FontAwesome
//                                 key={i}
//                                 name="star"
//                                 size={16}
//                                 color={i < averageRating ? "yellow" : "gray"}
//                             />
//                         ))}
//                         <Text style={{ marginLeft: 8 }}>
//                             ({data?.userByPK.reviews.length || 0})
//                         </Text>
//                     </View>
//                 </View>
//             </View>

//             <View style={{ marginBottom: 16 }}>
//                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>Introduction</Text>
//                 <Text>{data?.userByPK.aboutYou}</Text>
//             </View>

//             <Card style={styles.card}>
//                 <Card.Content style={styles.cardContentcardOverView}>
//                     <Text style={styles.titlecardOverView}>Overview</Text>

//                     <View style={styles.infoGrid}>
//                         <View style={styles.infoRow}>
//                             <Ionicons name="location-outline" size={16} color="gray" />
//                             <Text>
//                                 {data?.userByPK?.adress
//                                     ? `${JSON.parse(data?.userByPK?.adress)?.streetLine}, ${JSON.parse(data?.userByPK?.adress)?.city
//                                     }, ${JSON.parse(data?.userByPK?.adress)?.state} ${JSON.parse(data?.userByPK?.adress)?.zipcode
//                                     }`
//                                     : "No address provided"}
//                             </Text>
//                         </View>

//                         <View style={styles.infoRow}>
//                             <Ionicons name="time-outline" size={16} color="gray" />
//                             <Text>{getUserCategory(data?.userByPK.createdAt)?.label}</Text>
//                         </View>

//                         <View style={styles.infoRow}>
//                             <Ionicons name="briefcase-outline" size={16} color="gray" />
//                             <View style={styles.profileStatus}>
//                                 {data?.userByPK?.profileCompleted ? (
//                                     <>
//                                         <Text>Profile Completed</Text>
//                                         <CheckCircleOutline
//                                             name="check-circle-outline"
//                                             size={16}
//                                             color="green"
//                                         />
//                                     </>
//                                 ) : (
//                                     <Text>Profile Incomplete</Text>
//                                 )}
//                             </View>
//                         </View>

//                         <View style={styles.infoRow}>
//                             <Ionicons name="cash-outline" size={16} color="gray" />
//                             <Text>Contact for more info</Text>
//                         </View>
//                     </View>
//                 </Card.Content>
//             </Card>

//             {/* Collapsible ServicesCard */}
//             <View style={styles.card}>
//                 <TouchableOpacity
//                     onPress={() => setIsServicesCollapsed(!isServicesCollapsed)}
//                     style={styles.cardHeader}
//                 >
//                     <Text style={styles.title}>Services Offered</Text>
//                     <Ionicons
//                         name={isServicesCollapsed ? "chevron-down" : "chevron-up"}
//                         size={24}
//                         color="black"
//                     />
//                 </TouchableOpacity>
//                 {!isServicesCollapsed && <ServicesCard data={data} />}
//             </View>

//             <ReviewsCard
//                 sortedReviews={sortedReviews}
//                 viewAllReviews={viewAllReviews}
//                 setViewAllReviews={setViewAllReviews}
//                 data={data}
//             />

//             <View style={styles.card}>
//                 <View style={styles.cardContent}>
//                     <Text style={styles.title}>Gallery</Text>
//                     <ImageGallery images={data?.userByPK?.images || []} />
//                 </View>
//             </View>
//             <Modal
//                 animationType="fade"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//                     <View style={styles.modalBackground}>
//                         <TouchableWithoutFeedback>
//                             <View style={styles.modalView}>
//                                 <Text style={styles.modalTitle}>
//                                     How would you like to contact?
//                                 </Text>
//                                 <Divider style={styles.divider} />

//                                 <View
//                                     style={{
//                                         flexDirection: "row",
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         width: "100%",
//                                     }}
//                                 >
//                                     <TouchableOpacity
//                                         style={{ ...styles.contactOption, width: 100 }}
//                                         onPress={() => handleContact("chat")}
//                                     >
//                                         <Text style={styles.contactOptionText}>Chat</Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity
//                                         style={{ ...styles.contactOption, width: 100 }}
//                                         onPress={() => handleContact("call")}
//                                     >
//                                         <Text style={styles.contactOptionText}>Phone</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </TouchableWithoutFeedback>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>

//             <Button
//                 title={loading ? "Loading..." : "Contact Me"}
//                 onPress={() => {
//                     console.log('====================================');
//                     console.log('chatType',chatType);
//                     console.log('====================================');
//                     // handleContact("chat")
//                 }}
//             />
//         </ScrollView>
//     );
// };

// export function ServiceProviderProfile({ route, navigation }: any) {
//     const { id, selectedCategories, title, chatType } = route.params;

//     const [data, setData] = useState([]);
//     const [error, setError]: any = useState(null);
//     const [loading, setLoading]: any = useState(false);

//     const getUserByPk = useCallback(async () => {
//         const token = await getToken();
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);
//         try {
//             setLoading(true);
//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//             query UserByPK($userByPkId: String) {
//               userByPK(id: $userByPkId) {
//                 id
//                 firstName
//                 lastName
//                 email
//                 password
//                 provider
//                 role
//                 categories {
//                   id
//                   name
//                   professionals{
//                       id 
//                   }
//                 }
//                 phone
//                 amount
//                 imageProfile
//                 images {
//                   id
//                   source
//                 }
//                 reviews {
//                   createdAt
//                   description
//                   id
//                   rating
//                   reviewer {
//                     lastName
//                     firstName
//                     id
//                   }
//                   owner {
//                     lastName
//                     firstName
//                     id
//                   }
//                 }
//                 location
//                 Radius
//                 available
//                 CashOnDeliveryPayment
//                 BankTransferPayment
//                 CheckPayment
//                 aboutYou
//                 adress
//                 pushToken
//                 pushUsingAppNotification
//                 pushUsingEmailNotification
//                 pushUsingPhoneNotification
//                 currentWeekSpent
//                 weeklyBudget
//                 profileCompleted
//                 createdAt
//                 updatedAt
//               }
//             }
//           `,
//                     variables: {
//                         userByPkId: id,
//                     },
//                 }),
//             });

//             const response = await res.json();
//             setLoading(false);
//             setData(response.data);
//         } catch (error: any) {
//             setLoading(false);
//             setError(error);
//         }
//     }, [id]);

//     useEffect(() => {
//         getUserByPk();
//     }, [getUserByPk]);

//     return (
//         <View style={{ flex: 1, padding: 16 }}>
//             {loading && <Text>Loading...</Text>}
//             {error && <Text>{error?.message}</Text>}
//             {data?.length === 0 ? (
//                 <Text>No data found</Text>
//             ) : (
//                 <DisplayServiceProviders
//                     data={data}
//                     navigation={navigation}
//                     selectedCategories={selectedCategories}
//                     title={title}
//                     chatType={chatType}
//                 />
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     card: {
//         marginBottom: 24,
//         borderRadius: 8,
//         backgroundColor: "#fff",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3, // Shadow for Android
//     },
//     cardContent: {
//         padding: 16,
//     },
//     cardHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 16,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "600",
//     },
//     cardOverView: {
//         marginBottom: 16,
//     },
//     cardContentcardOverView: {
//         padding: 16,
//     },
//     titlecardOverView: {
//         fontWeight: "bold",
//         fontSize: 18,
//         marginBottom: 16,
//     },
//     infoGrid: {
//         flexDirection: "column",
//     },
//     infoRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 8,
//     },
//     profileStatus: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     contactOption: {
//         marginVertical: 10,
//         padding: 15,
//         borderRadius: 10,
//         backgroundColor: "#007bff",
//     },
//     contactOptionText: {
//         color: "white",
//         fontSize: 16,
//         textAlign: "center",
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     divider: {
//         marginBottom: 20,
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
//     },
// });



// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//     View,
//     Text,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     Linking,
//     Alert,
//     Platform,
//     Share,
//     ActivityIndicator,
// } from "react-native";
// import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import Constants from "expo-constants";
// import { getToken, getUser } from "@/helpers/getToken";
// import ImageGallery from "@/components/ImageGallery";
// import dayjs from "dayjs";
// import { createOrRetrieveConversation } from "@/helpers/createOrRetrieveConversation";
// import { COLORS } from "../../constants/theme";
// import { OverviewCard } from "@/components/OverViewCard";
// import { AirbnbRating } from "react-native-ratings";
// import ServicesCard from "@/components/ServiceCard";

// const ShareLink = ({ url = "" }) => {
//     const shareLink = async () => {
//         if (Platform.OS === 'web') {
//             Alert.alert('Sharing is not supported on web');
//             return;
//         }

//         try {
//             const result = await Share.share({
//                 message: `Check out this user: ${url}`,
//             });

//             if (result.action === Share.sharedAction) {
//                 console.log('Link shared successfully!');
//             } else if (result.action === Share.dismissedAction) {
//                 console.log('Link sharing dismissed');
//             }
//         } catch (error: any) {
//             console.error('Error sharing link:', error);
//             Alert.alert('Error sharing the link:', error.message);
//         }
//     };

//     return (
//         <TouchableOpacity style={styles.shareButton} onPress={shareLink}>
//             <Text style={styles.shareButtonText}>
//                 <FontAwesome name="share" size={14} color="blue" /> Share
//             </Text>
//         </TouchableOpacity>
//     );
// };

// const DisplayServiceProviders = ({ data, navigation, selectedCategories, title, chatType, setData, getUserByPk }: any) => {
//     const [ViewAllReviews, setViewAllReviews] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [loadingConversation, setLoadingConversation] = useState(false)
//     const [userId, setUserId]: any = useState(null);
//     const [isServicesCollapsed, setIsServicesCollapsed] = useState(true);
//     const [selectedChatType, setSelectedChatType] = useState(chatType || "chat");
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentUserReview, setCurrentUserReview]: any = useState(null);
//     const [reviewRating, setReviewRating] = useState(0);
//     const [reviewDescription, setReviewDescription] = useState('');
//     const [addReviewErrorMsg, setAddReviewErrorMsg] = useState('');
//     const [updateReviewError, setUpdateReviewError]: any = useState(null);
//     const [updateReviewLoading, setUpdateReviewLoading] = useState(false);
//     const [addingReview, setAddingReview] = useState(false);
//     const [addReviewLoading, setAddReviewLoading] = useState(false);

//     const fetchUserId = useCallback(async () => {
//         const newUser: any = await getUser();
//         setUserId(JSON.parse(newUser));
//     }, []);

//     useEffect(() => {
//         fetchUserId();
//     }, [fetchUserId]);

//     useEffect(() => {
//         if (data?.userByPK?.reviews && userId) {
//             const review = data?.userByPK?.reviews?.find(
//                 (review: any) => review?.owner?.id === userId?.id
//             );
//             if (review) {
//                 setCurrentUserReview(review);
//             } else {
//                 setCurrentUserReview(null);
//             }
//         }
//     }, [data, userId]);

//     const handleAddReview = useCallback(async () => {
//         setAddingReview(true);
//         try {
//             const token = await getToken();
//             const headers = new Headers();
//             headers.append('Content-Type', 'application/json');
//             headers.append('Authorization', `Bearer ${token}`);

//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                         mutation createReview($input: inputReview) {
//                             createReview(input: $input) {
//                                 id
//                                 rating
//                                 description
//                                 owner {
//                                     id
//                                     firstName
//                                     lastName
//                                 }
//                                 createdAt
//                             }
//                         }
//                     `,
//                     variables: {
//                         input: {
//                             owner: userId.id,
//                             order: userId.id,
//                             rating: `${reviewRating}`,
//                             description: reviewDescription,
//                             reviewer: data?.userByPK?.id
//                         },
//                     },
//                 }),
//             });

//             const response = await res.json();
//             if (response.errors) {
//                 setAddReviewErrorMsg(response.errors[0].message);
//             } else {
//                 // Refresh data
//                 await getUserByPk();
//                 setReviewRating(0);
//                 setReviewDescription('');
//                 setAddReviewErrorMsg('');
//             }
//         } catch (error: any) {
//             setAddReviewErrorMsg(error.message);
//         } finally {
//             setAddingReview(false);
//         }
//     }, [data, reviewRating, reviewDescription, userId, getUserByPk]);

//     const handleUpdateReview = useCallback(async () => {
//         setUpdateReviewLoading(true);
//         try {
//             const token = await getToken();
//             const headers = new Headers();
//             headers.append('Content-Type', 'application/json');
//             headers.append('Authorization', `Bearer ${token}`);

//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                         mutation updateReview($input: inputReview) {
//                             updateReview(input: $input) {
//                                 id
//                                 rating
//                                 description
//                                 owner {
//                                     id
//                                     firstName
//                                     lastName
//                                 }
//                                 createdAt
//                             }
//                         }
//                     `,
//                     variables: {
//                         input: {
//                             id: currentUserReview.id,
//                             rating: `${reviewRating}`,
//                             description: reviewDescription,
//                         },
//                     },
//                 }),
//             });

//             const response = await res.json();
//             if (response.errors) {
//                 setUpdateReviewError(response.errors[0]);
//             } else {
//                 // Refresh data
//                 await getUserByPk();
//                 setIsEditing(false);
//                 setUpdateReviewError(null);
//             }
//         } catch (error: any) {
//             setUpdateReviewError(error);
//         } finally {
//             setUpdateReviewLoading(false);
//         }
//     }, [currentUserReview, reviewRating, reviewDescription, getUserByPk]);

//     const handleDeleteReview = useCallback(async () => {
//         try {
//             const token = await getToken();
//             const headers = new Headers();
//             headers.append('Content-Type', 'application/json');
//             headers.append('Authorization', `Bearer ${token}`);

//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                         mutation deleteReview($id: String) {
//                             deleteReview(id: $id)
//                         }
//                     `,
//                     variables: {
//                         id: currentUserReview.id,
//                     },
//                 }),
//             });

//             const response = await res.json();
//             if (response.errors) {
//                 Alert.alert('Error', response.errors[0].message);
//             } else {
//                 // Refresh data
//                 await getUserByPk();
//             }
//         } catch (error: any) {
//             Alert.alert('Error', error.message);
//         }
//     }, [currentUserReview, getUserByPk]);

//     const handleEditReview = useCallback(() => {
//         setIsEditing(true);
//         setReviewRating(currentUserReview?.rating);
//         setReviewDescription(currentUserReview?.description);
//     }, [currentUserReview]);

//     const makePhoneCall = useCallback((phoneNumber: any) => {
//         const phoneURL = `tel:${phoneNumber}`;
//         Linking.canOpenURL(phoneURL)
//             .then((supported) => {
//                 if (supported) {
//                     Linking.openURL(phoneURL);
//                 } else {
//                     console.log("Phone call not supported on this device");
//                 }
//             })
//             .catch((err) => console.error("An error occurred", err));
//     }, []);

//     const handleAddOrder = useCallback(
//         async (contactType: any) => {
//             // setLoading(true);
//             const token = await getToken();
//             const newUser: any = await getUser();

//             if (!token) {
//                 return;
//             }

//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             const category = data?.userByPK?.categories?.find(
//                 (category: any) => category?.id === selectedCategories[0]
//             );

//             try {
//                 const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                             mutation addDirectLead($input: directLeadInput) {
//                                 addDirectLead(input: $input){
//                                     id
//                                     owner{
//                                         id
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     artisantUnlockedLead{
//                                         id
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     artisantId{
//                                         id
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     error
//                                     isOkay
//                                 }
//                             }
//                         `,
//                         variables: {
//                             input: {
//                                 title,
//                                 images: data?.userByPK?.images[0]?.source,
//                                 categoryId: category?.id,
//                                 directLeadStatus: "PENDING",
//                                 callOrWhatsapp: contactType,
//                                 artisantId: data?.userByPK?.id,
//                                 forTest: JSON.parse(newUser)?.AccountStatus == 'Tester' ? true : false,

//                             },
//                         },
//                     }),
//                 });

//                 const json = await res.json();
//                 // setLoading(false);
//                 return json;
//             } catch (error) {
//                 console.log(error);
//                 // setLoading(false);
//             }
//         },
//         [data, selectedCategories, title]
//     );

//     const handleContact = useCallback(
//         async (contactType: any) => {
//             setLoadingConversation(true)
//             if (contactType === "call") {
//                 makePhoneCall(data?.userByPK.phone);
//                 setLoadingConversation(false)
//             } else if (contactType === "chat") {
//                 const res = await handleAddOrder(contactType);
//                 if (res?.data?.addDirectLead?.id) {
//                     const conversationId: any = await createOrRetrieveConversation(
//                         res?.data?.addDirectLead?.id,
//                         res?.data?.addDirectLead?.artisantId?.id,
//                         userId?.id
//                     );

//                     // setLoading(false);
//                     setLoadingConversation(false)

//                     navigation.navigate("Chat", {
//                         conversationId,
//                         userId: res?.data?.addDirectLead?.artisantId?.id,
//                         userName: userId?.id,
//                         order: {
//                             ...res?.data?.addDirectLead,
//                             owner: userId,
//                             artisant: res?.data?.addDirectLead?.artisantId,
//                         },
//                     });
//                 } else {
//                     // setLoading(false);
//                     setLoadingConversation(false)
//                     return Alert.alert(res?.data?.addDirectLead?.error);
//                 }
//             }
//         },
//         [data, handleAddOrder, makePhoneCall, navigation, userId]
//     );

//     const sortedReviews = useMemo(() => {
//         return data?.userByPK.reviews?.sort(
//             (a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
//         );
//     }, [data]);

//     const getUserCategory = useCallback((createdAt: any) => {
//         const today = dayjs();
//         const createdDate = dayjs(createdAt);
//         const daysDifference = today.diff(createdDate, "day");
//         const monthsDifference = today.diff(createdDate, "month");

//         if (daysDifference <= 10) {
//             return { label: "New in House Guru", color: "orange" };
//         } else if (monthsDifference >= 1) {
//             return { label: "Pro House Guru", color: "purple" };
//         } else {
//             return { label: "Regular House Guru", color: "blue" };
//         }
//     }, []);

//     const userCategory = useMemo(() => getUserCategory(data?.userByPK?.createdAt), [
//         data?.userByPK?.createdAt,
//     ]);



//     if (loadingConversation) {
//         return (
//             <View
//                 className="flex-1"
//             >
//                 <View style={styles.loadingOverlay}>
//                     <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="large" color="black" />
//                         <Text style={styles.loadingText}>Loading...</Text>
//                     </View>
//                 </View>
//             </View>
//         )
//     }


//     return (
//         <ScrollView>
//             {/* Header */}
//             <View style={styles.header}>
//                 <Image
//                     source={{ uri: data?.userByPK?.imageProfile }}
//                     style={styles.profileImage}
//                     resizeMode="cover"
//                 />
//                 <View style={styles.headerTextContainer}>
//                     <Text style={styles.nameText}>
//                         {data?.userByPK?.firstName} {data?.userByPK?.lastName}
//                     </Text>
//                     <View style={styles.categoryBadge}>
//                         <Text style={styles.categoryBadgeText}>
//                             {userCategory.label}
//                         </Text>
//                     </View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <ShareLink url={"https://www.ahouseguru.com/en/profile/pro/" + data?.userByPK?.id} />
//                     </View>
//                 </View>
//             </View>

//             {/* Availability */}
//             {data?.userByPK?.available && (
//                 <View style={styles.availabilityBadge}>
//                     <Text style={styles.availabilityText}>Available now</Text>
//                 </View>
//             )}

//             {/* About Me */}
//             <Text style={styles.aboutText}>
//                 About me: {data?.userByPK?.aboutYou}
//             </Text>
//             <View style={styles.chatCallContainer}>
//                 {/* Chat Button */}
//                 <TouchableOpacity
//                     style={[
//                         styles.chatCallButton,
//                         styles.chatButton,
//                         selectedChatType === "chat" && styles.selectedChatButton,
//                     ]}
//                     onPress={() => handleContact("chat")}
//                 >
//                     <MaterialIcons
//                         name="chat"
//                         size={18}
//                         color="#fff"
//                     />
//                     <Text style={styles.chatButtonText}>
//                         Chat
//                     </Text>
//                 </TouchableOpacity>

//                 {/* Call Button */}
//                 <TouchableOpacity
//                     style={[
//                         styles.chatCallButton,
//                         styles.callButton,
//                         selectedChatType === "call" && styles.selectedCallButton,
//                     ]}
//                     onPress={() => handleContact("call")}
//                 >
//                     <MaterialIcons
//                         name="phone"
//                         size={18}
//                         color="#3a7f41"
//                     />
//                     <Text style={styles.callButtonText}>
//                         Call
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//             {/* <TouchableOpacity
//                 style={[styles.contactButton, loading && styles.buttonDisabled]}
//                 onPress={() => handleContact(selectedChatType)}
//                 disabled={loading}
//             >
//                 {loading ? (
//                     <ActivityIndicator color="#fff" />
//                 ) : (
//                     <Text style={styles.contactButtonText}>Contact Me</Text>
//                 )}
//             </TouchableOpacity> */}

//             {/* OverviewCard */}
//             <OverviewCard data={data} getUserCategory={getUserCategory} />

//             {/* Services Offered */}
//             <View style={styles.card}>
//                 <TouchableOpacity
//                     onPress={() => setIsServicesCollapsed(!isServicesCollapsed)}
//                     style={styles.cardHeader}
//                 >
//                     <Text style={styles.title}>Services Offered</Text>
//                     <Ionicons
//                         name={isServicesCollapsed ? "chevron-down" : "chevron-up"}
//                         size={24}
//                         color="black"
//                     />
//                 </TouchableOpacity>
//                 {!isServicesCollapsed && <ServicesCard data={data} />}
//             </View>

//             {/* Recent Reviews */}
//             <View style={styles.card}>
//                 <View style={styles.cardContent}>
//                     <Text style={styles.title}>Recent Reviews</Text>
//                     {sortedReviews.length === 0 ? (
//                         <Text>No reviews yet, reviews will appear here.</Text>
//                     ) : null}

//                     <View>
//                         {sortedReviews.slice(0, !ViewAllReviews ? 5 : sortedReviews?.length)
//                             .map((review: any) => (
//                                 review?.id &&
//                                 <View key={review?.id} style={styles.reviewContainer}>
//                                     <View style={styles.reviewHeader}>
//                                         <Text style={styles.reviewAuthor}>
//                                             {review?.owner?.firstName} {review?.owner?.lastName}
//                                         </Text>
//                                         <View style={styles.ratingStars}>
//                                             {[...Array(5)].map((_, i) => (
//                                                 <FontAwesome
//                                                     key={i}
//                                                     name={i < review?.rating ? 'star' : 'star-o'}
//                                                     size={16}
//                                                     color={i < review?.rating ? COLORS.primary : 'gray'}
//                                                 />
//                                             ))}
//                                         </View>
//                                     </View>
//                                     <Text style={styles.reviewDescription}>{review?.description}</Text>
//                                     <Text style={styles.reviewDate}>
//                                         {new Date(review?.createdAt).toLocaleDateString()}
//                                     </Text>
//                                 </View>
//                             ))}
//                         {!ViewAllReviews && data?.userByPK?.reviews?.length > 5 && (
//                             <TouchableOpacity
//                                 onPress={() => setViewAllReviews(true)}
//                                 style={styles.viewAllReviewsButton}
//                             >
//                                 <Text style={styles.viewAllReviewsButtonText}>View all reviews</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>

//                     {/* Add or Edit Review Section */}
//                     {userId?.role === 'user' && (
//                         currentUserReview ? (
//                             isEditing ? (
//                                 // Edit Review Form
//                                 <View style={styles.editReviewCard}>
//                                     <Text style={styles.editReviewTitle}>Edit Your Review</Text>
//                                     <View>
//                                         <Text>Rating</Text>
//                                         <AirbnbRating
//                                             count={5}
//                                             reviews={[]}
//                                             defaultRating={reviewRating}
//                                             size={20}
//                                             onFinishRating={(rating: any) => setReviewRating(rating)}
//                                         />
//                                     </View>
//                                     <TextInput
//                                         placeholder="Review Description"
//                                         multiline
//                                         numberOfLines={4}
//                                         style={styles.textInput}
//                                         value={reviewDescription}
//                                         onChangeText={(text) => setReviewDescription(text)}
//                                     />
//                                     {addReviewErrorMsg ? (
//                                         <Text style={styles.errorText}>{addReviewErrorMsg}</Text>
//                                     ) : null}
//                                     {updateReviewError ? (
//                                         <Text style={styles.errorText}>{updateReviewError.message}</Text>
//                                     ) : null}
//                                     <TouchableOpacity
//                                         onPress={handleUpdateReview}
//                                         style={styles.submitButton}
//                                         disabled={updateReviewLoading}
//                                     >
//                                         {updateReviewLoading ? (
//                                             <ActivityIndicator color="#fff" />
//                                         ) : (
//                                             <Text style={styles.submitButtonText}>Update Review</Text>
//                                         )}
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         onPress={() => setIsEditing(false)}
//                                         style={styles.cancelButton}
//                                     >
//                                         <Text style={styles.cancelButtonText}>Cancel</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             ) : (
//                                 // Display User's Existing Review with Edit/Delete Options
//                                 <View style={styles.yourReviewCard}>
//                                     <Text style={styles.yourReviewTitle}>Your Review</Text>
//                                     <View>
//                                         <Text>Rating</Text>
//                                         <AirbnbRating
//                                             count={5}
//                                             reviews={[]}
//                                             defaultRating={currentUserReview?.rating}
//                                             size={20}
//                                             isDisabled
//                                         />
//                                     </View>
//                                     <Text>{currentUserReview?.description}</Text>
//                                     <View style={styles.reviewActions}>
//                                         <TouchableOpacity
//                                             onPress={handleEditReview}
//                                             style={styles.editButton}
//                                         >
//                                             <Text style={styles.editButtonText}>Edit</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             onPress={handleDeleteReview}
//                                             style={styles.deleteButton}
//                                         >
//                                             <Text style={styles.deleteButtonText}>Delete</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             )
//                         ) : (
//                             // Add Review Form
//                             <View style={styles.addReviewCard}>
//                                 <Text style={styles.addReviewTitle}>Add a Review</Text>
//                                 <View>
//                                     <Text>Rating</Text>
//                                     <AirbnbRating
//                                         count={5}
//                                         reviews={[]}
//                                         defaultRating={reviewRating}
//                                         size={20}
//                                         onFinishRating={(rating: any) => setReviewRating(rating)}
//                                     />
//                                 </View>
//                                 <TextInput
//                                     placeholder="Review Description"
//                                     multiline
//                                     numberOfLines={4}
//                                     style={styles.textInput}
//                                     value={reviewDescription}
//                                     onChangeText={(text) => setReviewDescription(text)}
//                                 />
//                                 {addReviewErrorMsg ? (
//                                     <Text style={styles.errorText}>{addReviewErrorMsg}</Text>
//                                 ) : null}
//                                 <TouchableOpacity
//                                     onPress={handleAddReview}
//                                     style={styles.submitButton}
//                                     disabled={addingReview || addReviewLoading}
//                                 >
//                                     {addingReview || addReviewLoading ? (
//                                         <ActivityIndicator color="#fff" />
//                                     ) : (
//                                         <Text style={styles.submitButtonText}>Submit Review</Text>
//                                     )}
//                                 </TouchableOpacity>
//                             </View>
//                         )
//                     )}
//                 </View>
//             </View>

//             {/* Gallery */}
//             <View style={styles.card}>
//                 <View style={styles.cardContent}>
//                     <Text style={styles.title}>Gallery</Text>
//                     <ImageGallery images={data?.userByPK?.images || []} />
//                 </View>
//             </View>

//             {/* Contact Button */}

//         </ScrollView>
//     );
// };

// export function ServiceProviderProfile({ route, navigation }: any) {
//     const { id, selectedCategories, title, chatType } = route.params;

//     const [data, setData]: any = useState([]);
//     const [error, setError]: any = useState(null);
//     const [loading, setLoading]: any = useState(false);

//     const getUserByPk = useCallback(async () => {
//         const token = await getToken();
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);
//         try {
//             setLoading(true);
//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                         query UserByPK($userByPkId: String) {
//                             userByPK(id: $userByPkId) {
//                                 id
//                                 firstName
//                                 lastName
//                                 email
//                                 password
//                                 provider
//                                 role
//                                 categories {
//                                     id
//                                     name
//                                     professionals{
//                                         id 
//                                     }
//                                 }
//                                 phone
//                                 amount
//                                 imageProfile
//                                 images {
//                                     id
//                                     source
//                                 }
//                                 reviews {
//                                     createdAt
//                                     description
//                                     id
//                                     rating
//                                     reviewer {
//                                         lastName
//                                         firstName
//                                         id
//                                     }
//                                     owner {
//                                         lastName
//                                         firstName
//                                         id
//                                     }
//                                 }
//                                 location
//                                 Radius
//                                 available
//                                 CashOnDeliveryPayment
//                                 BankTransferPayment
//                                 CheckPayment
//                                 aboutYou
//                                 adress
//                                 pushToken
//                                 pushUsingAppNotification
//                                 pushUsingEmailNotification
//                                 pushUsingPhoneNotification
//                                 currentWeekSpent
//                                 weeklyBudget
//                                 profileCompleted
//                                 createdAt
//                                 updatedAt
//                             }
//                         }
//                     `,
//                     variables: {
//                         userByPkId: id,
//                     },
//                 }),
//             });

//             const response = await res.json();
//             setLoading(false);
//             setData(response.data);
//         } catch (error: any) {
//             setLoading(false);
//             setError(error);
//         }
//     }, [id]);

//     useEffect(() => {
//         getUserByPk();
//     }, [getUserByPk]);

//     return (
//         <View style={{ flex: 1, padding: 16 }}>
//             {loading && <Text>Loading...</Text>}
//             {error && <Text>{error?.message}</Text>}
//             {data?.length === 0 ? (
//                 <Text>No data found</Text>
//             ) : (
//                 <DisplayServiceProviders
//                     data={data}
//                     navigation={navigation}
//                     selectedCategories={selectedCategories}
//                     title={title}
//                     chatType={chatType}
//                     setData={setData}
//                     getUserByPk={getUserByPk}
//                 />
//             )}
//         </View>
//     );
// }


// const styles = StyleSheet.create({
//     card: {
//         marginBottom: 24,
//         borderRadius: 8,
//         backgroundColor: "#fff",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3, // Shadow for Android
//     },
//     cardContent: {
//         padding: 16,
//     },
//     cardHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 16,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "600",
//     },
//     cardOverView: {
//         marginBottom: 16,
//     },
//     cardContentcardOverView: {
//         padding: 16,
//     },
//     titlecardOverView: {
//         fontWeight: "bold",
//         fontSize: 18,
//         marginBottom: 16,
//     },
//     infoGrid: {
//         flexDirection: "column",
//     },
//     infoRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 8,
//     },
//     profileStatus: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     contactOption: {
//         marginVertical: 10,
//         padding: 15,
//         borderRadius: 10,
//         backgroundColor: "#007bff",
//     },
//     contactOptionText: {
//         color: "white",
//         fontSize: 16,
//         textAlign: "center",
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     divider: {
//         marginBottom: 20,
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
//     },
//     loadingOverlay: {
//         flex: 1,
//         // ...StyleSheet.absoluteFillObject,
//         backgroundColor: 'rgba(0, 0, 0, 0.1)',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000,
//         color: 'black',

//     },
//     loadingContainer: {
//         alignItems: 'center',
//         color: 'black',

//     },
//     loadingText: {
//         // marginTop: 10,
//         color: 'black',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     chatCallContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         // padding: 4,
//         gap: 2,
//         marginBottom: 6
//     },
//     chatCallButton: {
//         flex: 1,
//         // marginHorizontal: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 6,
//         borderWidth: 2,
//         // gap:2
//     },
//     chatButton: {
//         backgroundColor: '#3a7f41',
//         borderColor: 'transparent',
//     },
//     callButton: {
//         backgroundColor: 'white',
//         borderColor: 'transparent',
//     },
//     selectedChatButton: {
//         borderColor: 'white',
//     },
//     selectedCallButton: {
//         borderColor: '#3a7f41',
//     },
//     chatButtonText: {
//         color: 'white',
//         marginLeft: 5,
//         fontWeight: 'bold',
//     },
//     callButtonText: {
//         color: '#3a7f41',
//         // marginLeft: 5,
//         fontWeight: 'bold',
//     },
//     contactButton: {
//         backgroundColor: "#3a7f41", // Desired button color
//         paddingVertical: 12,
//         borderRadius: 5,
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: 8,
//     },
//     contactButtonText: {
//         color: "#fff", // Text color
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     buttonDisabled: {
//         backgroundColor: "#a5a5a5", // Color when button is disabled/loading
//     },
//     actionButton: {
//         borderColor: COLORS.primary,
//         borderWidth: 1,
//         borderRadius: 4,
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1
//     },
//     actionButtonText: {
//         marginLeft: 8,
//         color: COLORS.primary,
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     aboutText: {
//         fontSize: 14,
//         color: '#666',
//         marginBottom: 12,
//     },
//     availabilityText: {
//         fontSize: 12,
//         color: '#388E3C',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//         alignSelf: 'flex-start',
//     },
//     ratingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     ratingLabel: {
//         fontSize: 14,
//         fontWeight: '600',
//         marginRight: 8,
//     },
//     ratingCount: {
//         fontSize: 12,
//         marginLeft: 8,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomColor: '#f0f0f0',
//         borderBottomWidth: 1,
//         paddingBottom: 12,
//         marginBottom: 12,
//     },
//     profileImage: {
//         width: 64,
//         height: 64,
//         borderRadius: 32,
//         backgroundColor: '#e0e0e0',
//     },
//     headerTextContainer: {
//         marginLeft: 16,
//         flex: 1,
//     },
//     nameText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#333',
//     },
//     categoryBadge: {
//         marginTop: 4,
//         backgroundColor: '#E0F7FA',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//         alignSelf: 'flex-start',
//     },
//     categoryBadgeText: {
//         fontSize: 12,
//         color: '#006064',
//     },
//     cardContainer: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         marginBottom: 16,
//         overflow: 'hidden',
//         elevation: 2,

//     },
//     shareButton: {
//         borderColor: 'gray',
//         borderWidth: 1,
//         padding: 5,
//         marginTop: 5,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//     },
//     shareButtonText: {
//         fontSize: 16,
//         color: 'blue',
//     },
//     availabilityBadge: {
//         backgroundColor: '#C8E6C9',
//         marginBottom: 8,
//         borderRadius: 20,
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//         alignSelf: 'flex-start',
//     },
//     reviewContainer: {
//         padding: 16,
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
//         borderRadius: 8,
//         marginBottom: 8,
//     },
//     reviewHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 8,
//     },
//     reviewAuthor: {
//         fontWeight: 'bold',
//     },
//     ratingStars: {
//         flexDirection: 'row',
//     },
//     reviewDescription: {
//         fontSize: 14,
//         color: '#666',
//     },
//     reviewDate: {
//         fontSize: 12,
//         color: '#999',
//         marginTop: 4,
//     },
//     viewAllReviewsButton: {
//         marginTop: 16,
//         padding: 12,
//         backgroundColor: '#f0f0f0',
//         alignItems: 'center',
//         borderRadius: 8,
//     },
//     viewAllReviewsButtonText: {
//         color: COLORS.primary,
//         fontWeight: 'bold',
//     },
//     editReviewCard: {
//         marginTop: 16,
//     },
//     editReviewTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     textInput: {
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
//         borderRadius: 8,
//         padding: 8,
//         marginTop: 8,
//         textAlignVertical: 'top',
//     },
//     submitButton: {
//         backgroundColor: COLORS.primary,
//         padding: 12,
//         alignItems: 'center',
//         borderRadius: 8,
//         marginTop: 16,
//     },
//     submitButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     cancelButton: {
//         marginTop: 8,
//         alignItems: 'center',
//     },
//     cancelButtonText: {
//         color: COLORS.primary,
//         fontWeight: 'bold',
//     },
//     yourReviewCard: {
//         marginTop: 16,
//     },
//     yourReviewTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     reviewActions: {
//         flexDirection: 'row',
//         marginTop: 16,
//     },
//     editButton: {
//         flex: 1,
//         padding: 12,
//         borderColor: COLORS.primary,
//         borderWidth: 1,
//         alignItems: 'center',
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     editButtonText: {
//         color: COLORS.primary,
//         fontWeight: 'bold',
//     },
//     deleteButton: {
//         flex: 1,
//         padding: 12,
//         borderColor: 'red',
//         borderWidth: 1,
//         alignItems: 'center',
//         borderRadius: 8,
//     },
//     deleteButtonText: {
//         color: 'red',
//         fontWeight: 'bold',
//     },
//     addReviewCard: {
//         marginTop: 16,
//     },
//     addReviewTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     errorText: {
//         color: 'red',
//         marginTop: 8,
//     },
// });


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//     View,
//     Text,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     Linking,
//     Alert,
//     Platform,
//     Share,
//     ActivityIndicator,
// } from "react-native";
// import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import Constants from "expo-constants";
// import { getToken, getUser } from "@/helpers/getToken";
// import ImageGallery from "@/components/ImageGallery";
// import dayjs from "dayjs";
// import { createOrRetrieveConversation } from "@/helpers/createOrRetrieveConversation";
// import { COLORS } from "../../constants/theme";
// import { OverviewCard } from "@/components/OverViewCard";
// import { AirbnbRating } from "react-native-ratings";
// import ServicesCard from "@/components/ServiceCard";

// const ShareLink = ({ url = "" }) => {
//     const shareLink = async () => {
//         if (Platform.OS === 'web') {
//             Alert.alert('Sharing is not supported on web');
//             return;
//         }

//         try {
//             const result = await Share.share({
//                 message: `Check out this user: ${url}`,
//             });

//             if (result.action === Share.sharedAction) {
//                 console.log('Link shared successfully!');
//             } else if (result.action === Share.dismissedAction) {
//                 console.log('Link sharing dismissed');
//             }
//         } catch (error: any) {
//             console.error('Error sharing link:', error);
//             Alert.alert('Error sharing the link:', error.message);
//         }
//     };

//     return (
//         <TouchableOpacity style={styles.shareButton} onPress={shareLink}>
//             <Text style={styles.shareButtonText}>
//                 <FontAwesome name="share" size={14} color="blue" /> Share
//             </Text>
//         </TouchableOpacity>
//     );
// };

// const DisplayServiceProviders = ({ data, navigation, selectedCategories, title, chatType, setData, getUserByPk }: any) => {
//     const [ViewAllReviews, setViewAllReviews] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [loadingConversation, setLoadingConversation] = useState(false)
//     const [userId, setUserId]: any = useState(null);
//     const [isServicesCollapsed, setIsServicesCollapsed] = useState(true);
//     const [selectedChatType, setSelectedChatType] = useState(chatType || "chat");
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentUserReview, setCurrentUserReview]: any = useState(null);
//     const [reviewRating, setReviewRating] = useState(0);
//     const [reviewDescription, setReviewDescription] = useState('');
//     const [addReviewErrorMsg, setAddReviewErrorMsg] = useState('');
//     const [updateReviewError, setUpdateReviewError]: any = useState(null);
//     const [updateReviewLoading, setUpdateReviewLoading] = useState(false);
//     const [addingReview, setAddingReview] = useState(false);
//     const [addReviewLoading, setAddReviewLoading] = useState(false);

//     const fetchUserId = useCallback(async () => {
//         const newUser: any = await getUser();
//         setUserId(JSON.parse(newUser));
//     }, []);

//     useEffect(() => {
//         fetchUserId();
//     }, [fetchUserId]);

//     useEffect(() => {
//         if (data?.userByPK?.reviews && userId) {
//             const review = data?.userByPK?.reviews?.find(
//                 (review: any) => review?.owner?.id === userId?.id
//             );
//             if (review) {
//                 setCurrentUserReview(review);
//             } else {
//                 setCurrentUserReview(null);
//             }
//         }
//     }, [data, userId]);

//     const handleAddReview = useCallback(async () => {
//         setAddingReview(true);
//         try {
//             const token = await getToken();
//             const headers = new Headers();
//             headers.append('Content-Type', 'application/json');
//             headers.append('Authorization', `Bearer ${token}`);

//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                         mutation createReview($input: inputReview) {
//                             createReview(input: $input) {
//                                 id
//                                 rating
//                                 description
//                                 owner {
//                                     id
//                                     firstName
//                                     lastName
//                                 }
//                                 createdAt
//                             }
//                         }
//                     `,
//                     variables: {
//                         input: {
//                             owner: userId.id,
//                             order: userId.id,
//                             rating: `${reviewRating}`,
//                             description: reviewDescription,
//                             reviewer: data?.userByPK?.id
//                         },
//                     },
//                 }),
//             });

//             const response = await res.json();
//             if (response.errors) {
//                 setAddReviewErrorMsg(response.errors[0].message);
//             } else {
//                 // Refresh data
//                 await getUserByPk();
//                 setReviewRating(0);
//                 setReviewDescription('');
//                 setAddReviewErrorMsg('');
//             }
//         } catch (error: any) {
//             setAddReviewErrorMsg(error.message);
//         } finally {
//             setAddingReview(false);
//         }
//     }, [data, reviewRating, reviewDescription, userId, getUserByPk]);

//     const handleUpdateReview = useCallback(async () => {
//         setUpdateReviewLoading(true);
//         try {
//             const token = await getToken();
//             const headers = new Headers();
//             headers.append('Content-Type', 'application/json');
//             headers.append('Authorization', `Bearer ${token}`);

//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                         mutation updateReview($input: inputReview) {
//                             updateReview(input: $input) {
//                                 id
//                                 rating
//                                 description
//                                 owner {
//                                     id
//                                     firstName
//                                     lastName
//                                 }
//                                 createdAt
//                             }
//                         }
//                     `,
//                     variables: {
//                         input: {
//                             id: currentUserReview.id,
//                             rating: `${reviewRating}`,
//                             description: reviewDescription,
//                         },
//                     },
//                 }),
//             });

//             const response = await res.json();
//             if (response.errors) {
//                 setUpdateReviewError(response.errors[0]);
//             } else {
//                 // Refresh data
//                 await getUserByPk();
//                 setIsEditing(false);
//                 setUpdateReviewError(null);
//             }
//         } catch (error: any) {
//             setUpdateReviewError(error);
//         } finally {
//             setUpdateReviewLoading(false);
//         }
//     }, [currentUserReview, reviewRating, reviewDescription, getUserByPk]);

//     const handleDeleteReview = useCallback(async () => {
//         try {
//             const token = await getToken();
//             const headers = new Headers();
//             headers.append('Content-Type', 'application/json');
//             headers.append('Authorization', `Bearer ${token}`);

//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                         mutation deleteReview($id: String) {
//                             deleteReview(id: $id)
//                         }
//                     `,
//                     variables: {
//                         id: currentUserReview.id,
//                     },
//                 }),
//             });

//             const response = await res.json();
//             if (response.errors) {
//                 Alert.alert('Error', response.errors[0].message);
//             } else {
//                 // Refresh data
//                 await getUserByPk();
//             }
//         } catch (error: any) {
//             Alert.alert('Error', error.message);
//         }
//     }, [currentUserReview, getUserByPk]);

//     const handleEditReview = useCallback(() => {
//         setIsEditing(true);
//         setReviewRating(currentUserReview?.rating);
//         setReviewDescription(currentUserReview?.description);
//     }, [currentUserReview]);

//     const makePhoneCall = useCallback((phoneNumber: any) => {
//         const phoneURL = `tel:${phoneNumber}`;
//         Linking.canOpenURL(phoneURL)
//             .then((supported) => {
//                 if (supported) {
//                     Linking.openURL(phoneURL);
//                 } else {
//                     console.log("Phone call not supported on this device");
//                 }
//             })
//             .catch((err) => console.error("An error occurred", err));
//     }, []);

//     const handleAddOrder = useCallback(
//         async (contactType: any) => {
//             const token = await getToken();
//             const newUser: any = await getUser();

//             if (!token) {
//                 return;
//             }

//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             const category = data?.userByPK?.categories?.find(
//                 (category: any) => category?.id === selectedCategories[0]
//             );

//             try {
//                 const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                             mutation addDirectLead($input: directLeadInput) {
//                                 addDirectLead(input: $input){
//                                     id
//                                     owner{
//                                         id
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     artisantUnlockedLead{
//                                         id
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     artisantId{
//                                         id
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     error
//                                     isOkay
//                                 }
//                             }
//                         `,
//                         variables: {
//                             input: {
//                                 title,
//                                 images: data?.userByPK?.images[0]?.source,
//                                 categoryId: category?.id,
//                                 directLeadStatus: "PENDING",
//                                 callOrWhatsapp: contactType,
//                                 artisantId: data?.userByPK?.id,
//                                 forTest: JSON.parse(newUser)?.AccountStatus == 'Tester' ? true : false,

//                             },
//                         },
//                     }),
//                 });

//                 const json = await res.json();
//                 return json;
//             } catch (error) {
//                 console.log(error);
//             }
//         },
//         [data, selectedCategories, title]
//     );

//     const handleContact = useCallback(
//         async (contactType: any) => {
//             setLoadingConversation(true)
//             if (contactType === "call") {
//                 makePhoneCall(data?.userByPK.phone);
//                 setLoadingConversation(false)
//             } else if (contactType === "chat") {
//                 const res = await handleAddOrder(contactType);
//                 if (res?.data?.addDirectLead?.id) {
//                     const conversationId: any = await createOrRetrieveConversation(
//                         res?.data?.addDirectLead?.id,
//                         res?.data?.addDirectLead?.artisantId?.id,
//                         userId?.id
//                     );

//                     setLoadingConversation(false)

//                     navigation.navigate("Chat", {
//                         conversationId,
//                         userId: res?.data?.addDirectLead?.artisantId?.id,
//                         userName: userId?.id,
//                         order: {
//                             ...res?.data?.addDirectLead,
//                             owner: userId,
//                             artisant: res?.data?.addDirectLead?.artisantId,
//                         },
//                     });
//                 } else {
//                     setLoadingConversation(false)
//                     return Alert.alert(res?.data?.addDirectLead?.error);
//                 }
//             }
//         },
//         [data, handleAddOrder, makePhoneCall, navigation, userId]
//     );

//     const sortedReviews = useMemo(() => {
//         return data?.userByPK.reviews?.sort(
//             (a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
//         );
//     }, [data]);

//     const getUserCategory = useCallback((createdAt: any) => {
//         const today = dayjs();
//         const createdDate = dayjs(createdAt);
//         const daysDifference = today.diff(createdDate, "day");
//         const monthsDifference = today.diff(createdDate, "month");

//         if (daysDifference <= 10) {
//             return { label: "New in House Guru", color: "orange" };
//         } else if (monthsDifference >= 1) {
//             return { label: "Pro House Guru", color: "purple" };
//         } else {
//             return { label: "Regular House Guru", color: "blue" };
//         }
//     }, []);

//     const userCategory = useMemo(() => getUserCategory(data?.userByPK?.createdAt), [
//         data?.userByPK?.createdAt,
//     ]);

//     if (loadingConversation) {
//         return (
//             <View
//                 className="flex-1"
//             >
//                 <View style={styles.loadingOverlay}>
//                     <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="large" color="black" />
//                         <Text style={styles.loadingText}>Loading...</Text>
//                     </View>
//                 </View>
//             </View>
//         )
//     }


//     return (
//         <ScrollView>
//             {/* Header */}
//             <View style={styles.header}>
//                 <Image
//                     source={{ uri: data?.userByPK?.imageProfile }}
//                     style={styles.profileImage}
//                     resizeMode="cover"
//                 />
//                 <View style={styles.headerTextContainer}>
//                     <Text style={styles.nameText}>
//                         {data?.userByPK?.firstName} {data?.userByPK?.lastName}
//                     </Text>
//                     <View style={styles.categoryBadge}>
//                         <Text style={styles.categoryBadgeText}>
//                             {userCategory.label}
//                         </Text>
//                     </View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <ShareLink url={"https://www.ahouseguru.com/en/profile/pro/" + data?.userByPK?.id} />
//                     </View>
//                 </View>
//             </View>

//             {/* Availability */}
//             {data?.userByPK?.available && (
//                 <View style={styles.availabilityBadge}>
//                     <Text style={styles.availabilityText}>Available now</Text>
//                 </View>
//             )}

//             {/* About Me */}
//             <Text style={styles.aboutText}>
//                 About me: {data?.userByPK?.aboutYou}
//             </Text>
//             <View style={styles.chatCallContainer}>
//                 {/* Chat Button */}
//                 <TouchableOpacity
//                     style={[
//                         styles.chatCallButton,
//                         styles.chatButton,
//                         selectedChatType === "chat" && styles.selectedChatButton,
//                     ]}
//                     onPress={() => handleContact("chat")}
//                 >
//                     <MaterialIcons
//                         name="chat"
//                         size={18}
//                         color="#fff"
//                     />
//                     <Text style={styles.chatButtonText}>
//                         Chat
//                     </Text>
//                 </TouchableOpacity>

//                 {/* Call Button */}
//                 <TouchableOpacity
//                     style={[
//                         styles.chatCallButton,
//                         styles.callButton,
//                         selectedChatType === "call" && styles.selectedCallButton,
//                     ]}
//                     onPress={() => handleContact("call")}
//                 >
//                     <MaterialIcons
//                         name="phone"
//                         size={18}
//                         color="#3a7f41"
//                     />
//                     <Text style={styles.callButtonText}>
//                         Call
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <OverviewCard data={data} getUserCategory={getUserCategory} />

//             {/* Services Offered */}
//             <View style={styles.card}>
//                 <TouchableOpacity
//                     onPress={() => setIsServicesCollapsed(!isServicesCollapsed)}
//                     style={styles.cardHeader}
//                 >
//                     <Text style={styles.title}>Services Offered</Text>
//                     <Ionicons
//                         name={isServicesCollapsed ? "chevron-down" : "chevron-up"}
//                         size={24}
//                         color="black"
//                     />
//                 </TouchableOpacity>
//                 {!isServicesCollapsed && <ServicesCard data={data} />}
//             </View>

//             {/* Recent Reviews */}
//             <View style={styles.card}>
//                 <View style={styles.cardContent}>
//                     <Text style={styles.title}>Recent Reviews</Text>
//                     {sortedReviews.length === 0 ? (
//                         <Text>No reviews yet, reviews will appear here.</Text>
//                     ) : null}

//                     <View>
//                         {sortedReviews.slice(0, !ViewAllReviews ? 5 : sortedReviews?.length)
//                             .map((review: any) => (
//                                 review?.id &&
//                                 <View key={review?.id} style={styles.reviewContainer}>
//                                     <View style={styles.reviewHeader}>
//                                         <Text style={styles.reviewAuthor}>
//                                             {review?.owner?.firstName} {review?.owner?.lastName}
//                                         </Text>
//                                         <View style={styles.ratingStars}>
//                                             {[...Array(5)].map((_, i) => (
//                                                 <FontAwesome
//                                                     key={i}
//                                                     name={i < review?.rating ? 'star' : 'star-o'}
//                                                     size={16}
//                                                     color={i < review?.rating ? COLORS.primary : 'gray'}
//                                                 />
//                                             ))}
//                                         </View>
//                                     </View>
//                                     <Text style={styles.reviewDescription}>{review?.description}</Text>
//                                     <Text style={styles.reviewDate}>
//                                         {new Date(review?.createdAt).toLocaleDateString()}
//                                     </Text>
//                                 </View>
//                             ))}
//                         {!ViewAllReviews && data?.userByPK?.reviews?.length > 5 && (
//                             <TouchableOpacity
//                                 onPress={() => setViewAllReviews(true)}
//                                 style={styles.viewAllReviewsButton}
//                             >
//                                 <Text style={styles.viewAllReviewsButtonText}>View all reviews</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>

//                     {/* Add or Edit Review Section */}
//                     {userId?.role === 'user' && (
//                         currentUserReview ? (
//                             isEditing ? (
//                                 // Edit Review Form
//                                 <View style={styles.editReviewCard}>
//                                     <Text style={styles.editReviewTitle}>Edit Your Review</Text>
//                                     <View>
//                                         <Text>Rating</Text>
//                                         <AirbnbRating
//                                             count={5}
//                                             reviews={[]}
//                                             defaultRating={reviewRating}
//                                             size={20}
//                                             onFinishRating={(rating: any) => setReviewRating(rating)}
//                                         />
//                                     </View>
//                                     <TextInput
//                                         placeholder="Review Description"
//                                         multiline
//                                         numberOfLines={4}
//                                         style={[styles.textInput, {color: '#000'}]}
//                                         value={reviewDescription}
//                                         onChangeText={(text) => setReviewDescription(text)}
//                                     />
//                                     {addReviewErrorMsg ? (
//                                         <Text style={styles.errorText}>{addReviewErrorMsg}</Text>
//                                     ) : null}
//                                     {updateReviewError ? (
//                                         <Text style={styles.errorText}>{updateReviewError.message}</Text>
//                                     ) : null}
//                                     <TouchableOpacity
//                                         onPress={handleUpdateReview}
//                                         style={styles.submitButton}
//                                         disabled={updateReviewLoading}
//                                     >
//                                         {updateReviewLoading ? (
//                                             <ActivityIndicator color="#fff" />
//                                         ) : (
//                                             <Text style={styles.submitButtonText}>Update Review</Text>
//                                         )}
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         onPress={() => setIsEditing(false)}
//                                         style={styles.cancelButton}
//                                     >
//                                         <Text style={styles.cancelButtonText}>Cancel</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             ) : (
//                                 // Display User's Existing Review with Edit/Delete Options
//                                 <View style={styles.yourReviewCard}>
//                                     <Text style={styles.yourReviewTitle}>Your Review</Text>
//                                     <View>
//                                         <Text>Rating</Text>
//                                         <AirbnbRating
//                                             count={5}
//                                             reviews={[]}
//                                             defaultRating={currentUserReview?.rating}
//                                             size={20}
//                                             isDisabled
//                                         />
//                                     </View>
//                                     <Text>{currentUserReview?.description}</Text>
//                                     <View style={styles.reviewActions}>
//                                         <TouchableOpacity
//                                             onPress={handleEditReview}
//                                             style={styles.editButton}
//                                         >
//                                             <Text style={styles.editButtonText}>Edit</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             onPress={handleDeleteReview}
//                                             style={styles.deleteButton}
//                                         >
//                                             <Text style={styles.deleteButtonText}>Delete</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             )
//                         ) : (
//                             // Add Review Form
//                             <View style={styles.addReviewCard}>
//                                 <Text style={styles.addReviewTitle}>Add a Review</Text>
//                                 <View>
//                                     <Text>Rating</Text>
//                                     <AirbnbRating
//                                         count={5}
//                                         reviews={[]}
//                                         defaultRating={reviewRating}
//                                         size={20}
//                                         onFinishRating={(rating: any) => setReviewRating(rating)}
//                                     />
//                                 </View>
//                                 <TextInput
//                                     placeholder="Review Description"
//                                     multiline
//                                     numberOfLines={4}
//                                     style={[styles.textInput, {color: '#000'}]}
//                                     value={reviewDescription}
//                                     onChangeText={(text) => setReviewDescription(text)}
//                                 />
//                                 {addReviewErrorMsg ? (
//                                     <Text style={styles.errorText}>{addReviewErrorMsg}</Text>
//                                 ) : null}
//                                 <TouchableOpacity
//                                     onPress={handleAddReview}
//                                     style={styles.submitButton}
//                                     disabled={addingReview || addReviewLoading}
//                                 >
//                                     {addingReview || addReviewLoading ? (
//                                         <ActivityIndicator color="#fff" />
//                                     ) : (
//                                         <Text style={styles.submitButtonText}>Submit Review</Text>
//                                     )}
//                                 </TouchableOpacity>
//                             </View>
//                         )
//                     )}
//                 </View>
//             </View>

//             {/* Gallery */}
//             <View style={styles.card}>
//                 <View style={styles.cardContent}>
//                     <Text style={styles.title}>Gallery</Text>
//                     <ImageGallery images={data?.userByPK?.images || []} />
//                 </View>
//             </View>

//         </ScrollView>
//     );
// };

// export function ServiceProviderProfile({ route, navigation }: any) {
//     const { id, selectedCategories, title, chatType } = route.params;

//     const [data, setData]: any = useState([]);
//     const [error, setError]: any = useState(null);
//     const [loading, setLoading]: any = useState(false);

//     const getUserByPk = useCallback(async () => {
//         const token = await getToken();
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);
//         try {
//             setLoading(true);
//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                         query UserByPK($userByPkId: String) {
//                             userByPK(id: $userByPkId) {
//                                 id
//                                 firstName
//                                 lastName
//                                 email
//                                 password
//                                 provider
//                                 role
//                                 categories {
//                                     id
//                                     name
//                                     professionals{
//                                         id 
//                                     }
//                                 }
//                                 phone
//                                 amount
//                                 imageProfile
//                                 images {
//                                     id
//                                     source
//                                 }
//                                 reviews {
//                                     createdAt
//                                     description
//                                     id
//                                     rating
//                                     reviewer {
//                                         lastName
//                                         firstName
//                                         id
//                                     }
//                                     owner {
//                                         lastName
//                                         firstName
//                                         id
//                                     }
//                                 }
//                                 location
//                                 Radius
//                                 available
//                                 CashOnDeliveryPayment
//                                 BankTransferPayment
//                                 CheckPayment
//                                 aboutYou
//                                 adress
//                                 pushToken
//                                 pushUsingAppNotification
//                                 pushUsingEmailNotification
//                                 pushUsingPhoneNotification
//                                 currentWeekSpent
//                                 weeklyBudget
//                                 profileCompleted
//                                 createdAt
//                                 updatedAt
//                             }
//                         }
//                     `,
//                     variables: {
//                         userByPkId: id,
//                     },
//                 }),
//             });

//             const response = await res.json();
//             setLoading(false);
//             setData(response.data);
//         } catch (error: any) {
//             setLoading(false);
//             setError(error);
//         }
//     }, [id]);

//     useEffect(() => {
//         getUserByPk();
//     }, [getUserByPk]);

//     return (
//         <View style={{ flex: 1, padding: 16 }}>
//             {loading && <Text>Loading...</Text>}
//             {error && <Text>{error?.message}</Text>}
//             {data?.length === 0 ? (
//                 <Text>No data found</Text>
//             ) : (
//                 <DisplayServiceProviders
//                     data={data}
//                     navigation={navigation}
//                     selectedCategories={selectedCategories}
//                     title={title}
//                     chatType={chatType}
//                     setData={setData}
//                     getUserByPk={getUserByPk}
//                 />
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     card: {
//         marginBottom: 24,
//         borderRadius: 8,
//         backgroundColor: "#fff",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3, // Shadow for Android
//     },
//     cardContent: {
//         padding: 16,
//     },
//     cardHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 16,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "600",
//     },
//     cardOverView: {
//         marginBottom: 16,
//     },
//     cardContentcardOverView: {
//         padding: 16,
//     },
//     titlecardOverView: {
//         fontWeight: "bold",
//         fontSize: 18,
//         marginBottom: 16,
//     },
//     infoGrid: {
//         flexDirection: "column",
//     },
//     infoRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 8,
//     },
//     profileStatus: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     contactOption: {
//         marginVertical: 10,
//         padding: 15,
//         borderRadius: 10,
//         backgroundColor: "#007bff",
//     },
//     contactOptionText: {
//         color: "white",
//         fontSize: 16,
//         textAlign: "center",
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     divider: {
//         marginBottom: 20,
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
//     },
//     loadingOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.1)',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000,
//         color: 'black',

//     },
//     loadingContainer: {
//         alignItems: 'center',
//         color: 'black',

//     },
//     loadingText: {
//         color: 'black',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     chatCallContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         gap: 2,
//         marginBottom: 6
//     },
//     chatCallButton: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 6,
//         borderWidth: 2,
//     },
//     chatButton: {
//         backgroundColor: '#3a7f41',
//         borderColor: 'transparent',
//     },
//     callButton: {
//         backgroundColor: 'white',
//         borderColor: 'transparent',
//     },
//     selectedChatButton: {
//         borderColor: 'white',
//     },
//     selectedCallButton: {
//         borderColor: '#3a7f41',
//     },
//     chatButtonText: {
//         color: 'white',
//         marginLeft: 5,
//         fontWeight: 'bold',
//     },
//     callButtonText: {
//         color: '#3a7f41',
//         fontWeight: 'bold',
//     },
//     contactButton: {
//         backgroundColor: "#3a7f41", 
//         paddingVertical: 12,
//         borderRadius: 5,
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: 8,
//     },
//     contactButtonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     buttonDisabled: {
//         backgroundColor: "#a5a5a5",
//     },
//     actionButton: {
//         borderColor: COLORS.primary,
//         borderWidth: 1,
//         borderRadius: 4,
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1
//     },
//     actionButtonText: {
//         marginLeft: 8,
//         color: COLORS.primary,
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     aboutText: {
//         fontSize: 14,
//         color: '#666',
//         marginBottom: 12,
//     },
//     availabilityText: {
//         fontSize: 12,
//         color: '#388E3C',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//         alignSelf: 'flex-start',
//     },
//     ratingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     ratingLabel: {
//         fontSize: 14,
//         fontWeight: '600',
//         marginRight: 8,
//     },
//     ratingCount: {
//         fontSize: 12,
//         marginLeft: 8,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomColor: '#f0f0f0',
//         borderBottomWidth: 1,
//         paddingBottom: 12,
//         marginBottom: 12,
//     },
//     profileImage: {
//         width: 64,
//         height: 64,
//         borderRadius: 32,
//         backgroundColor: '#e0e0e0',
//     },
//     headerTextContainer: {
//         marginLeft: 16,
//         flex: 1,
//     },
//     nameText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#333',
//     },
//     categoryBadge: {
//         marginTop: 4,
//         backgroundColor: '#E0F7FA',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//         alignSelf: 'flex-start',
//     },
//     categoryBadgeText: {
//         fontSize: 12,
//         color: '#006064',
//     },
//     cardContainer: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         marginBottom: 16,
//         overflow: 'hidden',
//         elevation: 2,
//     },
//     shareButton: {
//         borderColor: 'gray',
//         borderWidth: 1,
//         padding: 5,
//         marginTop: 5,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//     },
//     shareButtonText: {
//         fontSize: 16,
//         color: 'blue',
//     },
//     availabilityBadge: {
//         backgroundColor: '#C8E6C9',
//         marginBottom: 8,
//         borderRadius: 20,
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//         alignSelf: 'flex-start',
//     },
//     reviewContainer: {
//         padding: 16,
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
//         borderRadius: 8,
//         marginBottom: 8,
//     },
//     reviewHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 8,
//     },
//     reviewAuthor: {
//         fontWeight: 'bold',
//     },
//     ratingStars: {
//         flexDirection: 'row',
//     },
//     reviewDescription: {
//         fontSize: 14,
//         color: '#666',
//     },
//     reviewDate: {
//         fontSize: 12,
//         color: '#999',
//         marginTop: 4,
//     },
//     viewAllReviewsButton: {
//         marginTop: 16,
//         padding: 12,
//         backgroundColor: '#f0f0f0',
//         alignItems: 'center',
//         borderRadius: 8,
//     },
//     viewAllReviewsButtonText: {
//         color: COLORS.primary,
//         fontWeight: 'bold',
//     },
//     editReviewCard: {
//         marginTop: 16,
//     },
//     editReviewTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     textInput: {
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
//         borderRadius: 8,
//         padding: 8,
//         marginTop: 8,
//         textAlignVertical: 'top',
//     },
//     submitButton: {
//         backgroundColor: COLORS.primary,
//         padding: 12,
//         alignItems: 'center',
//         borderRadius: 8,
//         marginTop: 16,
//     },
//     submitButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     cancelButton: {
//         marginTop: 8,
//         alignItems: 'center',
//     },
//     cancelButtonText: {
//         color: COLORS.primary,
//         fontWeight: 'bold',
//     },
//     yourReviewCard: {
//         marginTop: 16,
//     },
//     yourReviewTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     reviewActions: {
//         flexDirection: 'row',
//         marginTop: 16,
//     },
//     editButton: {
//         flex: 1,
//         padding: 12,
//         borderColor: COLORS.primary,
//         borderWidth: 1,
//         alignItems: 'center',
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     editButtonText: {
//         color: COLORS.primary,
//         fontWeight: 'bold',
//     },
//     deleteButton: {
//         flex: 1,
//         padding: 12,
//         borderColor: 'red',
//         borderWidth: 1,
//         alignItems: 'center',
//         borderRadius: 8,
//     },
//     deleteButtonText: {
//         color: 'red',
//         fontWeight: 'bold',
//     },
//     addReviewCard: {
//         marginTop: 16,
//     },
//     addReviewTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     errorText: {
//         color: 'red',
//         marginTop: 8,
//     },
// });


import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Linking,
    Alert,
    Platform,
    Share,
    ActivityIndicator,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { getToken, getUser } from "@/helpers/getToken";
import ImageGallery from "@/components/ImageGallery";
import dayjs from "dayjs";
import { createOrRetrieveConversation } from "@/helpers/createOrRetrieveConversation";
import { COLORS } from "../../constants/theme";
import { OverviewCard } from "@/components/OverViewCard";
import { AirbnbRating } from "react-native-ratings";
import ServicesCard from "@/components/ServiceCard";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ShareLink = ({ url = "" }) => {
    const shareLink = async () => {
        if (Platform.OS === 'web') {
            Alert.alert('Sharing is not supported on web');
            return;
        }

        try {
            const result = await Share.share({
                message: `Check out this user: ${url}`,
            });

            if (result.action === Share.sharedAction) {
                console.log('Link shared successfully!');
            } else if (result.action === Share.dismissedAction) {
                console.log('Link sharing dismissed');
            }
        } catch (error: any) {
            console.error('Error sharing link:', error);
            Alert.alert('Error sharing the link:', error.message);
        }
    };

    return (
        <TouchableOpacity style={styles.shareButton} onPress={shareLink}>
            <Text style={styles.shareButtonText}>
                <FontAwesome name="share" size={14} color="blue" /> Share
            </Text>
        </TouchableOpacity>
    );
};

const DisplayServiceProviders = ({ data, navigation, selectedCategories, title, chatType, setData, getUserByPk }: any) => {
    const [ViewAllReviews, setViewAllReviews] = useState(false);
    const [loadingConversation, setLoadingConversation] = useState(false)
    const [userId, setUserId]: any = useState(null);
    const [isServicesCollapsed, setIsServicesCollapsed] = useState(true);
    const [selectedChatType, setSelectedChatType] = useState(chatType || "chat");
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserReview, setCurrentUserReview]: any = useState(null);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewDescription, setReviewDescription] = useState('');
    const [addReviewErrorMsg, setAddReviewErrorMsg] = useState('');
    const [updateReviewError, setUpdateReviewError]: any = useState(null);
    const [updateReviewLoading, setUpdateReviewLoading] = useState(false);
    const [addingReview, setAddingReview] = useState(false);
    const [addReviewLoading, setAddReviewLoading] = useState(false);

    const fetchUserId = useCallback(async () => {
        const newUser: any = await getUser();
        setUserId(JSON.parse(newUser));
    }, []);

    useEffect(() => {
        fetchUserId();
    }, [fetchUserId]);

    useEffect(() => {
        if (data?.userByPK?.reviews && userId) {
            const review = data?.userByPK?.reviews?.find(
                (review: any) => review?.owner?.id === userId?.id
            );
            if (review) {
                setCurrentUserReview(review);
            } else {
                setCurrentUserReview(null);
            }
        }
    }, [data, userId]);

    const handleAddReview = useCallback(async () => {
        setAddingReview(true);
        try {
            const token = await getToken();
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Bearer ${token}`);

            const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
                        mutation createReview($input: inputReview) {
                            createReview(input: $input) {
                                id
                                rating
                                description
                                owner {
                                    id
                                    firstName
                                    lastName
                                }
                                createdAt
                            }
                        }
                    `,
                    variables: {
                        input: {
                            owner: userId.id,
                            order: userId.id,
                            rating: `${reviewRating}`,
                            description: reviewDescription,
                            reviewer: data?.userByPK?.id
                        },
                    },
                }),
            });

            const response = await res.json();
            if (response.errors) {
                setAddReviewErrorMsg(response.errors[0].message);
            } else {
                // Refresh data
                await getUserByPk();
                setReviewRating(0);
                setReviewDescription('');
                setAddReviewErrorMsg('');
            }
        } catch (error: any) {
            setAddReviewErrorMsg(error.message);
        } finally {
            setAddingReview(false);
        }
    }, [data, reviewRating, reviewDescription, userId, getUserByPk]);

    const handleUpdateReview = useCallback(async () => {
        setUpdateReviewLoading(true);
        try {
            const token = await getToken();
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Bearer ${token}`);

            const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
                        mutation updateReview($input: inputReview) {
                            updateReview(input: $input) {
                                id
                                rating
                                description
                                owner {
                                    id
                                    firstName
                                    lastName
                                }
                                createdAt
                            }
                        }
                    `,
                    variables: {
                        input: {
                            id: currentUserReview.id,
                            rating: `${reviewRating}`,
                            description: reviewDescription,
                        },
                    },
                }),
            });

            const response = await res.json();
            if (response.errors) {
                setUpdateReviewError(response.errors[0]);
            } else {
                // Refresh data
                await getUserByPk();
                setIsEditing(false);
                setUpdateReviewError(null);
            }
        } catch (error: any) {
            setUpdateReviewError(error);
        } finally {
            setUpdateReviewLoading(false);
        }
    }, [currentUserReview, reviewRating, reviewDescription, getUserByPk]);

    const handleDeleteReview = useCallback(async () => {
        try {
            const token = await getToken();
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Bearer ${token}`);

            const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
                        mutation deleteReview($id: String) {
                            deleteReview(id: $id)
                        }
                    `,
                    variables: {
                        id: currentUserReview.id,
                    },
                }),
            });

            const response = await res.json();
            if (response.errors) {
                Alert.alert('Error', response.errors[0].message);
            } else {
                // Refresh data
                await getUserByPk();
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    }, [currentUserReview, getUserByPk]);

    const handleEditReview = useCallback(() => {
        setIsEditing(true);
        setReviewRating(currentUserReview?.rating);
        setReviewDescription(currentUserReview?.description);
    }, [currentUserReview]);

    const makePhoneCall = useCallback((phoneNumber: any) => {
        const phoneURL = `tel:${phoneNumber}`;
        Linking.canOpenURL(phoneURL)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(phoneURL);
                } else {
                    console.log("Phone call not supported on this device");
                }
            })
            .catch((err) => console.error("An error occurred", err));
    }, []);

    const handleAddOrder = useCallback(
        async (contactType: any) => {
            const token = await getToken();
            const newUser: any = await getUser();

            if (!token) {
                return;
            }

            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);

            const category = data?.userByPK?.categories?.find(
                (category: any) => category?.id === selectedCategories[0]
            );

            try {
                const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            mutation addDirectLead($input: directLeadInput) {
                                addDirectLead(input: $input){
                                    id
                                    owner{
                                        id
                                        firstName
                                        lastName
                                        pushToken
                                        imageProfile
                                        images {
                                            id 
                                            source
                                        }
                                    }
                                    artisantUnlockedLead{
                                        id
                                        firstName
                                        lastName
                                        pushToken
                                        imageProfile
                                        images {
                                            id 
                                            source
                                        }
                                    }
                                    artisantId{
                                        id
                                        firstName
                                        lastName
                                        pushToken
                                        imageProfile
                                        images {
                                            id 
                                            source
                                        }
                                    }
                                    error
                                    isOkay
                                }
                            }
                        `,
                        variables: {
                            input: {
                                title,
                                images: data?.userByPK?.images[0]?.source,
                                categoryId: category?.id,
                                directLeadStatus: "PENDING",
                                callOrWhatsapp: contactType,
                                artisantId: data?.userByPK?.id,
                                forTest: JSON.parse(newUser)?.AccountStatus == 'Tester' ? true : false,
                            },
                        },
                    }),
                });

                const json = await res.json();
                return json;
            } catch (error) {
                console.log(error);
            }
        },
        [data, selectedCategories, title]
    );

    const handleContact = useCallback(
        async (contactType: any) => {
            setLoadingConversation(true)
            if (contactType === "call") {
                makePhoneCall(data?.userByPK.phone);
                setLoadingConversation(false)
            } else if (contactType === "chat") {
                const res = await handleAddOrder(contactType);
                if (res?.data?.addDirectLead?.id) {
                    const conversationId: any = await createOrRetrieveConversation(
                        res?.data?.addDirectLead?.id,
                        res?.data?.addDirectLead?.artisantId?.id,
                        userId?.id
                    );

                    setLoadingConversation(false)

                    navigation.navigate("Chat", {
                        conversationId,
                        userId: res?.data?.addDirectLead?.artisantId?.id,
                        userName: userId?.id,
                        order: {
                            ...res?.data?.addDirectLead,
                            owner: userId,
                            artisant: res?.data?.addDirectLead?.artisantId,
                        },
                    });
                } else {
                    setLoadingConversation(false)
                    return Alert.alert(res?.data?.addDirectLead?.error);
                }
            }
        },
        [data, handleAddOrder, makePhoneCall, navigation, userId]
    );

    const sortedReviews = useMemo(() => {
        return data?.userByPK.reviews?.sort(
            (a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
        );
    }, [data]);

    const getUserCategory = useCallback((createdAt: any) => {
        const today = dayjs();
        const createdDate = dayjs(createdAt);
        const daysDifference = today.diff(createdDate, "day");
        const monthsDifference = today.diff(createdDate, "month");

        if (daysDifference <= 10) {
            return { label: "New in House Guru", color: "orange" };
        } else if (monthsDifference >= 1) {
            return { label: "Pro House Guru", color: "purple" };
        } else {
            return { label: "Regular House Guru", color: "blue" };
        }
    }, []);

    const userCategory = useMemo(() => getUserCategory(data?.userByPK?.createdAt), [
        data?.userByPK?.createdAt,
    ]);

    if (loadingConversation) {
        return (
            <View
                className="flex-1"
            >
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="black" />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <ScrollView>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: data?.userByPK?.imageProfile }}
                    style={styles.profileImage}
                    resizeMode="cover"
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.nameText}>
                        {data?.userByPK?.firstName} {data?.userByPK?.lastName}
                    </Text>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>
                            {userCategory.label}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ShareLink url={"https://www.ahouseguru.com/en/profile/pro/" + data?.userByPK?.id} />
                    </View>
                </View>
            </View>

            {/* Availability */}
            {data?.userByPK?.available && (
                <View style={styles.availabilityBadge}>
                    <Text style={styles.availabilityText}>Available now</Text>
                </View>
            )}

            {/* About Me */}
            <Text style={styles.aboutText}>
                About me: {data?.userByPK?.aboutYou}
            </Text>
            <View style={styles.chatCallContainer}>
                {/* Chat Button */}
                <TouchableOpacity
                    style={[
                        styles.chatCallButton,
                        styles.chatButton,
                        selectedChatType === "chat" && styles.selectedChatButton,
                    ]}
                    onPress={() => handleContact("chat")}
                >
                    <MaterialIcons
                        name="chat"
                        size={18}
                        color="#fff"
                    />
                    <Text style={styles.chatButtonText}>
                        Chat
                    </Text>
                </TouchableOpacity>

                {/* Call Button */}
                <TouchableOpacity
                    style={[
                        styles.chatCallButton,
                        styles.callButton,
                        selectedChatType === "call" && styles.selectedCallButton,
                    ]}
                    onPress={() => handleContact("call")}
                >
                    <MaterialIcons
                        name="phone"
                        size={18}
                        color="#3a7f41"
                    />
                    <Text style={styles.callButtonText}>
                        Call
                    </Text>
                </TouchableOpacity>
            </View>

            <OverviewCard data={data} getUserCategory={getUserCategory} />

            {/* Services Offered */}
            <View style={styles.card}>
                <TouchableOpacity
                    onPress={() => setIsServicesCollapsed(!isServicesCollapsed)}
                    style={styles.cardHeader}
                >
                    <Text style={styles.title}>Services Offered</Text>
                    <Ionicons
                        name={isServicesCollapsed ? "chevron-down" : "chevron-up"}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
                {!isServicesCollapsed && <ServicesCard data={data} />}
            </View>

            {/* Recent Reviews */}
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Recent Reviews</Text>
                    {sortedReviews.length === 0 ? (
                        <Text>No reviews yet, reviews will appear here.</Text>
                    ) : null}

                    <View>
                        {sortedReviews.slice(0, !ViewAllReviews ? 5 : sortedReviews?.length)
                            .map((review: any) => (
                                review?.id &&
                                <View key={review?.id} style={styles.reviewContainer}>
                                    <View style={styles.reviewHeader}>
                                        <Text style={styles.reviewAuthor}>
                                            {review?.owner?.firstName} {review?.owner?.lastName}
                                        </Text>
                                        <View style={styles.ratingStars}>
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesome
                                                    key={i}
                                                    name={i < review?.rating ? 'star' : 'star-o'}
                                                    size={16}
                                                    color={i < review?.rating ? COLORS.primary : 'gray'}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <Text style={styles.reviewDescription}>{review?.description}</Text>
                                    <Text style={styles.reviewDate}>
                                        {new Date(review?.createdAt).toLocaleDateString()}
                                    </Text>
                                </View>
                            ))}
                        {!ViewAllReviews && data?.userByPK?.reviews?.length > 5 && (
                            <TouchableOpacity
                                onPress={() => setViewAllReviews(true)}
                                style={styles.viewAllReviewsButton}
                            >
                                <Text style={styles.viewAllReviewsButtonText}>View all reviews</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Add or Edit Review Section */}
                    {userId?.role === 'user' && (
                        currentUserReview ? (
                            isEditing ? (
                                // Edit Review Form
                                <View style={styles.editReviewCard}>
                                    <Text style={styles.editReviewTitle}>Edit Your Review</Text>
                                    <View>
                                        <Text>Rating</Text>
                                        <AirbnbRating
                                            count={5}
                                            reviews={[]}
                                            defaultRating={reviewRating}
                                            size={20}
                                            onFinishRating={(rating: any) => setReviewRating(rating)}
                                        />
                                    </View>
                                    <TextInput
                                        placeholder="Review Description"
                                        multiline
                                        numberOfLines={4}
                                        style={[styles.textInput, { color: '#000' }]}
                                        value={reviewDescription}
                                        onChangeText={(text) => setReviewDescription(text)}
                                    />
                                    {addReviewErrorMsg ? (
                                        <Text style={styles.errorText}>{addReviewErrorMsg}</Text>
                                    ) : null}
                                    {updateReviewError ? (
                                        <Text style={styles.errorText}>{updateReviewError.message}</Text>
                                    ) : null}
                                    <TouchableOpacity
                                        onPress={handleUpdateReview}
                                        style={styles.submitButton}
                                        disabled={updateReviewLoading}
                                    >
                                        {updateReviewLoading ? (
                                            <ActivityIndicator color="#fff" />
                                        ) : (
                                            <Text style={styles.submitButtonText}>Update Review</Text>
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setIsEditing(false)}
                                        style={styles.cancelButton}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                // Display User's Existing Review with Edit/Delete Options
                                <View style={styles.yourReviewCard}>
                                    <Text style={styles.yourReviewTitle}>Your Review</Text>
                                    <View>
                                        <Text>Rating</Text>
                                        <AirbnbRating
                                            count={5}
                                            reviews={[]}
                                            defaultRating={currentUserReview?.rating}
                                            size={20}
                                            isDisabled
                                        />
                                    </View>
                                    <Text>{currentUserReview?.description}</Text>
                                    <View style={styles.reviewActions}>
                                        <TouchableOpacity
                                            onPress={handleEditReview}
                                            style={styles.editButton}
                                        >
                                            <Text style={styles.editButtonText}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handleDeleteReview}
                                            style={styles.deleteButton}
                                        >
                                            <Text style={styles.deleteButtonText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        ) : (
                            // Add Review Form
                            <View style={styles.addReviewCard}>
                                <Text style={styles.addReviewTitle}>Add a Review</Text>
                                <View>
                                    <Text>Rating</Text>
                                    <AirbnbRating
                                        count={5}
                                        reviews={[]}
                                        defaultRating={reviewRating}
                                        size={20}
                                        onFinishRating={(rating: any) => setReviewRating(rating)}
                                    />
                                </View>
                                <TextInput
                                    placeholder="Review Description"
                                    multiline
                                    numberOfLines={4}
                                    style={[styles.textInput, { color: '#000' }]}
                                    value={reviewDescription}
                                    onChangeText={(text) => setReviewDescription(text)}
                                />
                                {addReviewErrorMsg ? (
                                    <Text style={styles.errorText}>{addReviewErrorMsg}</Text>
                                ) : null}
                                <TouchableOpacity
                                    onPress={handleAddReview}
                                    style={styles.submitButton}
                                    disabled={addingReview || addReviewLoading}
                                >
                                    {addingReview || addReviewLoading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.submitButtonText}>Submit Review</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )
                    )}
                </View>
            </View>

            {/* Gallery */}
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Gallery</Text>
                    <ImageGallery images={data?.userByPK?.images || []} />
                </View>
            </View>
        </ScrollView>
    );
};

export function ServiceProviderProfile({ route, navigation }: any) {
    const { id, selectedCategories, title, chatType } = route.params;

    const [data, setData]: any = useState([]);
    const [error, setError]: any = useState(null);
    const [loading, setLoading]: any = useState(false);
    const insets = useSafeAreaInsets()

    const getUserByPk = useCallback(async () => {
        const token = await getToken();
        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        try {
            setLoading(true);
            const res = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    query: `
                        query UserByPK($userByPkId: String) {
                            userByPK(id: $userByPkId) {
                                id
                                firstName
                                lastName
                                email
                                password
                                provider
                                role
                                categories {
                                    id
                                    name
                                    professionals{
                                        id 
                                    }
                                }
                                phone
                                amount
                                imageProfile
                                images {
                                    id
                                    source
                                }
                                reviews {
                                    createdAt
                                    description
                                    id
                                    rating
                                    reviewer {
                                        lastName
                                        firstName
                                        id
                                    }
                                    owner {
                                        lastName
                                        firstName
                                        id
                                    }
                                }
                                location
                                Radius
                                available
                                CashOnDeliveryPayment
                                BankTransferPayment
                                CheckPayment
                                aboutYou
                                adress
                                pushToken
                                pushUsingAppNotification
                                pushUsingEmailNotification
                                pushUsingPhoneNotification
                                currentWeekSpent
                                weeklyBudget
                                profileCompleted
                                createdAt
                                updatedAt
                            }
                        }
                    `,
                    variables: {
                        userByPkId: id,
                    },
                }),
            });

            const response = await res.json();
            setLoading(false);
            setData(response.data);
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    }, [id]);

    useEffect(() => {
        getUserByPk();
    }, [getUserByPk]);

    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? insets.top + 10 : 0,


        }}>
            <View style={{ flex: 1, padding: 16 }}>
                {loading && <Text>Loading...</Text>}
                {error && <Text>{error?.message}</Text>}
                {data?.length === 0 ? (
                    <Text>No data found</Text>
                ) : (
                    <DisplayServiceProviders
                        data={data}
                        navigation={navigation}
                        selectedCategories={selectedCategories}
                        title={title}
                        chatType={chatType}
                        setData={setData}
                        getUserByPk={getUserByPk}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 24,
        borderRadius: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
    },
    cardOverView: {
        marginBottom: 16,
    },
    cardContentcardOverView: {
        padding: 16,
    },
    titlecardOverView: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 16,
    },
    infoGrid: {
        flexDirection: "column",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    profileStatus: {
        flexDirection: "row",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    contactOption: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#007bff",
    },
    contactOptionText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    divider: {
        marginBottom: 20,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        color: 'black',
    },
    loadingContainer: {
        alignItems: 'center',
        color: 'black',
    },
    loadingText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
    },
    chatCallContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 2,
        marginBottom: 6
    },
    chatCallButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        borderWidth: 2,
    },
    chatButton: {
        backgroundColor: '#3a7f41',
        borderColor: 'transparent',
    },
    callButton: {
        backgroundColor: 'white',
        borderColor: 'transparent',
    },
    selectedChatButton: {
        borderColor: 'white',
    },
    selectedCallButton: {
        borderColor: '#3a7f41',
    },
    chatButtonText: {
        color: 'white',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    callButtonText: {
        color: '#3a7f41',
        fontWeight: 'bold',
    },
    contactButton: {
        backgroundColor: "#3a7f41",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    contactButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonDisabled: {
        backgroundColor: "#a5a5a5",
    },
    actionButton: {
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    actionButtonText: {
        marginLeft: 8,
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    aboutText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    availabilityText: {
        fontSize: 12,
        color: '#388E3C',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 8,
    },
    ratingCount: {
        fontSize: 12,
        marginLeft: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        paddingBottom: 12,
        marginBottom: 12,
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#e0e0e0',
    },
    headerTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    categoryBadge: {
        marginTop: 4,
        backgroundColor: '#E0F7FA',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    categoryBadgeText: {
        fontSize: 12,
        color: '#006064',
    },
    shareButton: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    shareButtonText: {
        fontSize: 16,
        color: 'blue',
    },
    availabilityBadge: {
        backgroundColor: '#C8E6C9',
        marginBottom: 8,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
    },
    reviewContainer: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 8,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    reviewAuthor: {
        fontWeight: 'bold',
    },
    ratingStars: {
        flexDirection: 'row',
    },
    reviewDescription: {
        fontSize: 14,
        color: '#666',
    },
    reviewDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    viewAllReviewsButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        borderRadius: 8,
    },
    viewAllReviewsButtonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    editReviewCard: {
        marginTop: 16,
    },
    editReviewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 8,
        marginTop: 8,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    yourReviewCard: {
        marginTop: 16,
    },
    yourReviewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    reviewActions: {
        flexDirection: 'row',
        marginTop: 16,
    },
    editButton: {
        flex: 1,
        padding: 12,
        borderColor: COLORS.primary,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 8,
    },
    editButtonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    deleteButton: {
        flex: 1,
        padding: 12,
        borderColor: 'red',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 8,
    },
    deleteButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
    addReviewCard: {
        marginTop: 16,
    },
    addReviewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    errorText: {
        color: 'red',
        marginTop: 8,
    },
});

// import { Ionicons } from '@expo/vector-icons';
// import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button, Alert, Modal, ActivityIndicator } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
// import { Picker } from '@react-native-picker/picker';
// import { ButtonPrimary } from '@/components/index';
// import MapView, { Marker } from 'react-native-maps';
// import { Rating } from 'react-native-ratings';
// import { getToken } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Review } from '../Profession/artisan';
// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';



// const SelectUnlockedArtisan = ({ visible, onClose, artisants, handlePresentModalPress, setChoosedArtisan, goTobottomSheetModalRef, setSelectedProfession, professional }: any) => {
//     return (
//         <Modal
//             visible={visible}
//             transparent={true}
//             animationType="slide"
//         >
//             <View style={styles.modalBackground}>
//                 {/* {artisants.map((artisant: any) => (
//                         <TouchableOpacity
//                             key={artisant.id}
//                             style={styles.artisanOption}
//                             onPress={() => {
//                                 setChoosedArtisan(artisant);
//                                 handlePresentModalPress();
//                                 onClose(false);
//                             }}
//                         >
//                             <Text style={styles.artisanText}>{artisant.firstName} {artisant.lastName}</Text>
//                         </TouchableOpacity>
//                     ))} */}

//                 <View style={styles.modalContainer}>
//                     <Text style={styles.modalTitle}>Select Artisan</Text>

//                     <ScrollView horizontal>
//                         {artisants?.map((lead: any, i: any) => (
//                             <View key={i}>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         setChoosedArtisan(lead);
//                                         // handlePresentModalPress();
//                                         setSelectedProfession(professional?.text);
//                                         goTobottomSheetModalRef?.present();
//                                         onClose(false);
//                                     }}
//                                     key={lead.id} style={styles.leadItem}>
//                                     <Image source={{ uri: lead.imageProfile }} style={styles.leadImage} />
//                                     <Text style={{
//                                         ...styles.leadName,
//                                     }}
//                                         className='text-xs break-words w-20 text-center  '
//                                     >{`${lead.firstName} ${lead.lastName}`}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         ))}
//                     </ScrollView>
//                     <TouchableOpacity
//                         style={styles.cancelButton}
//                         onPress={() => onClose(null)}
//                     >
//                         <Text style={styles.cancelButtonText}>Cancel</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };


// const OrderView = ({ route, navigation }: any) => {
//     const { order, user }: any = route.params;
//     const insets = useSafeAreaInsets();

//     const [reviews, setReviews]: any = useState([]); // Replace with actual reviews if available
//     const [newReview, setNewReview] = useState({ user: '', comment: '', rating: '', professionId: '' });
//     const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//     const [openModal, setOpenModal] = useState(false);
//     const [choosedArtisan, setChoosedArtisan] = useState<any>(null);
//     const snapPoints = useMemo(() => ['50%', '80%'], []);
//     const [artisantInfo, setArtisantInfo] = useState<any>(null);

//     const handlePresentModalPress = useCallback(() => {
//         setSelectedProfession(null);
//         bottomSheetModalRef.current?.present();
//     }, []);



//     const getInfo = async () => {
//         const User = await AsyncStorage.getItem('@user');
//         setArtisantInfo(JSON.parse(User || '{}'));
//     }
//     const handleAddReview = async () => {
//         const token = await getToken();
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
//                         mutation createReview($input: inputReview) {
//                             createReview(input: $input) {
//                                 id
//                             }
//                         }
//                         `,
//                         variables: {
//                             input: {
//                                 reviewer: user?.id ? user?.id : choosedArtisan?.id,
//                                 description: newReview.comment,
//                                 rating: `${rating}`,
//                                 order: order?.id,
//                             }
//                         }
//                     }),
//                 }
//             );

//             const json = await res.json();
//             navigation.goBack();
//         } catch (err: any) {
//             Alert.alert("error", JSON.stringify(err.message, undefined, 2));
//         }
//     };

//     const [SelectedProfession, setSelectedProfession] = useState<any>(null);
//     const [rating, setRating] = useState<number>(3);

//     const handleRating = (newRating: number) => {
//         setRating(newRating);
//     };


//     useEffect(() => {
//         getInfo();
//     }, []);
//     const [Loading, setLoading] = useState(false);

//     const handleCreateConversation = async () => {
//         setLoading(true)

//         const conversationId = await createOrRetrieveConversation(order?.id, artisantInfo?.id, order?.owner?.id);
//         setLoading(false)
//         navigation.navigate('Chat', {
//             conversationId, userId: artisantInfo?.id, userName: artisantInfo?.firstName, order: {
//                 ...order,
//                 artisantId: artisantInfo
//             }
//         });
//     };
//     const handleCreateConversationUser = async (artisan: any) => {
//         setLoading(true)
//         // console.log('order?.id, artisantInfo?.id, order?.owner?.id user', order?.id, artisan?.id, order?.owner?.id);
//         const User: any = await AsyncStorage.getItem('@user');


//         const conversationId = await createOrRetrieveConversation(order?.id, artisan?.id, order?.owner?.id);
//         setLoading(false)

//         if (JSON.parse(User).role === 'user') {
//             navigation.navigate('Chat', {
//                 conversationId, userId: artisan?.id, userName: order?.owner?.id, order: {
//                     ...order,
//                     artisantId: artisan
//                 }

//             });

//         }
//         else {
//             navigation.navigate('Chat', {
//                 conversationId, userId: order?.owner?.id, userName: artisan?.id, order: {
//                     ...order,
//                     artisantId: artisan
//                 }

//             });
//         }

//     };
//     // console.log('order wast orderviweer', order);

//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             {Loading && (

//                 <View style={{
//                     width: WINDOW_WIDTH,
//                     height: WINDOW_HEIGHT
//                 }} className='justify-center absolute top-0 left-0 z-20 items-center bg-black/80'>
//                     <ActivityIndicator size={50} />
//                 </View>
//             )}
//             <BottomSheetModalProvider>
//                 <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
//                     <View className='flex-row items-center gap-2'>
//                         <Text style={styles.title}>Order</Text>
//                         <Text className='text-xl font-semibold'>{order?.title}</Text>
//                     </View>
//                     <Text className='text-lg'>{order?.description}</Text>

//                     <Text style={styles.title}>Professions</Text>
//                     {order?.professionals?.map((profession: any, i: any) => (
//                         <View key={i} style={styles.professionSection}>
//                             {/* <Text style={styles.professionName}>{profession?.text}</Text> */}
//                             <Text style={styles.professionText}>{profession?.text}</Text>

//                         </View>
//                     ))}

//                     <Text style={styles.label}>Images:</Text>
//                     <ScrollView horizontal>
//                         {order?.images?.map((image: any, index: any) => (
//                             <Image key={index} source={{ uri: image }} style={styles.image} />
//                         ))}
//                     </ScrollView>

//                     <Text style={styles.label}>Location:</Text>
//                     {order?.locationType === 'currentLocation' ? (
//                         <View style={styles.mapContainer}>
//                             <MapView
//                                 scrollEnabled={false}
//                                 style={styles.map}
//                                 initialRegion={{
//                                     latitude: JSON.parse(order?.location)?.latitude,
//                                     longitude: JSON.parse(order?.location)?.longitude,
//                                     latitudeDelta: 0.0922,
//                                     longitudeDelta: 0.0421,
//                                 }}
//                             >
//                                 <Marker
//                                     coordinate={{
//                                         latitude: JSON.parse(order?.location)?.latitude,
//                                         longitude: JSON.parse(order?.location)?.longitude,
//                                     }}
//                                     title="My Location"
//                                 />
//                             </MapView>
//                         </View>
//                     ) : (
//                         <Text>Location Details: {order?.location} </Text>
//                     )}

//                     {(user?.id && order?.review == null) &&

//                         <ButtonPrimary
//                             className='mt-3'
//                             Loading={false}
//                             setLoading={() => { }}
//                             onPress={handlePresentModalPress}
//                             text="Add Review"
//                         />
//                     }





//                     {order?.review && (
//                         // <View key={order?.review?.id} style={styles.reviewItem}>
//                         //     <Text style={styles.reviewUser}>{order?.review?.owner?.firstName} + {""}+
//                         //         {order?.review?.owner?.lastName}
//                         //     </Text>
//                         //     <Text style={styles.reviewComment}>{order?.review?.description}</Text>
//                         //     <Text style={styles.reviewRating}>Rating: {order?.review?.rating}</Text>
//                         // </View>

//                         <View
//                             className='  px-3 py-1 rounded-lg my-3'
//                         >
//                             <Review
//                                 key={order?.review?.id}
//                                 name={order?.owner?.firstName + ' ' + order?.owner?.lastName}
//                                 comment={order?.review?.description}
//                                 rating={order?.review?.rating}
//                                 timeAgo={order?.timeAgo}
//                                 image={order?.owner?.imageProfile}
//                             />
//                         </View>
//                     )}



//                     {/* {order?.artisantUnlockedLead?.length > 0 && (
//                         <View style={styles.unlockedLeadsContainer}>
//                             <Text style={styles.title}>Unlocked Leads</Text>
//                             <ScrollView horizontal>
//                                 {order?.artisantUnlockedLead?.map((lead: any) => (
//                                     <>
//                                         <View key={lead?.id} style={styles.leadItem}>
//                                             <Image source={{ uri: lead?.imageProfile }} style={styles.leadImage} />
//                                             <Text style={{
//                                                 ...styles.leadName,
//                                             }}
//                                                 className='text-xs break-words w-20 text-center  '
//                                             >{`${lead?.firstName} ${lead?.lastName}`}</Text>
//                                         </View>

//                                     </>
//                                 ))}
//                             </ScrollView>
//                         </View>
//                     )} */}



//                     {
//                         order?.artisantUnlockedLead?.length > 0 && artisantInfo?.role !== 'artisant' && !order?.review &&
//                         <ButtonPrimary
//                             className='mt-3'
//                             Loading={false}
//                             setLoading={() => { }}
//                             onPress={() => {
//                                 setOpenModal(true)
//                             }}
//                             text="Add Review"
//                         />
//                     }


//                     {artisantInfo?.role === 'user' ? (
//                         <View className="mt-5">
//                             <Text className='text-lg font-bold'>
//                                 Conversations with artisans:
//                             </Text>
//                             {order?.artisantUnlockedLead?.map((artisan: any, i: any) => (
//                                 <TouchableOpacity
//                                     key={i}
//                                     onPress={() => handleCreateConversationUser(artisan)}
//                                     className='p-3  rounded-md  items-between ' >
//                                     <View className='flex-row items-center justify-between'>
//                                         <View className='flex-row items-center '>
//                                             <Image src={artisan?.imageProfile} style={{ width: 50, height: 50, borderRadius: 9999 }} />
//                                             <View >
//                                                 <Text className=' ml-3 font-bold'>
//                                                     {artisan?.firstName}{" "}{artisan?.lastName}
//                                                 </Text>
//                                                 <Text className=' ml-3'>
//                                                     Conversations
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                         <View >
//                                             <Ionicons name="chevron-forward" size={24} color={'gray'} />
//                                         </View>
//                                     </View>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     ) : (
//                         <View className="mt-5">
//                             <Text className='text-lg font-bold'>
//                                 Conversation:
//                             </Text>
//                             <TouchableOpacity

//                                 onPress={handleCreateConversation}
//                                 className='p-3  rounded-md  items-between ' >
//                                 <View className='flex-row items-center justify-between'>
//                                     <View className='flex-row items-center '>
//                                         <Image src={order?.owner?.imageProfile} className='bg-gray-200' style={{ width: 50, height: 50, borderRadius: 9999 }} />
//                                         <View >
//                                             <Text className=' ml-3 font-bold capitalize'>
//                                                 {order?.owner?.firstName}{" "}{order?.owner?.lastName}
//                                             </Text>
//                                             <Text className=' ml-3'>
//                                                 Conversations
//                                             </Text>
//                                         </View>
//                                     </View>
//                                     <View >
//                                         <Ionicons name="chevron-forward" size={24} color={'gray'} />
//                                     </View>
//                                 </View>
//                             </TouchableOpacity>

//                         </View>
//                     )}

//                     <View className='my-20' />
//                     <SelectUnlockedArtisan visible={openModal} onClose={setOpenModal}
//                         setChoosedArtisan={setChoosedArtisan}
//                         handlePresentModalPress={handlePresentModalPress}
//                         artisants={order?.artisantUnlockedLead}
//                         // bottomSheetModalRef.current?.present();

//                         goTobottomSheetModalRef={bottomSheetModalRef.current}
//                         professional={order?.professionals[0]}
//                         setSelectedProfession={setSelectedProfession}
//                     />
//                 </ScrollView>

//                 <BottomSheetModal
//                     snapPoints={snapPoints}
//                     style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
//                     ref={bottomSheetModalRef}
//                 >
//                     <View style={styles.bottomSheetContent}>
//                         <Text className='text-center' style={styles.sheetTitle}>
//                             {SelectedProfession ? SelectedProfession : 'Add Review'}
//                         </Text>
//                         {!SelectedProfession ? (
//                             <View>
//                                 <Text style={styles.label}>Select Professional:</Text>
//                                 <View>
//                                     {order?.professionals?.map((profession: any, i: any) => (
//                                         <TouchableOpacity
//                                             key={i}
//                                             onPress={() => setSelectedProfession(profession?.text)}
//                                             className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100'
//                                         >
//                                             <Text className='text-lg font-bold'>{profession?.text}</Text>
//                                             <Ionicons name="chevron-forward" size={20} />
//                                         </TouchableOpacity>
//                                     ))}
//                                 </View>
//                             </View>
//                         ) : (
//                             <View>
//                                 <TextInput
//                                     placeholderTextColor="black"
//                                     className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
//                                     placeholder="Add my review"
//                                     value={newReview?.comment}
//                                     onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
//                                 />
//                                 <Rating
//                                     type="star"
//                                     startingValue={rating}
//                                     imageSize={30}
//                                     onFinishRating={handleRating}
//                                     style={{ paddingVertical: 10 }}
//                                 />
//                                 <ButtonPrimary
//                                     className='mb-2'
//                                     Loading={false}
//                                     setLoading={() => { }}
//                                     text="Submit Review"
//                                     onPress={handleAddReview}
//                                 />
//                                 <Button title='Cancel' onPress={() => setSelectedProfession(null)} />
//                             </View>
//                         )}
//                     </View>
//                 </BottomSheetModal>
//             </BottomSheetModalProvider>
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#f5f5f5',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 0,
//         marginTop: 20,
//     },
//     label: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginVertical: 8,
//     },
//     professionSection: {
//         marginBottom: 20,
//     },
//     professionName: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     professionText: {
//         fontSize: 16,
//         color: 'grey',
//         marginBottom: 8,
//     },
//     reviewItem: {
//         backgroundColor: '#e9e9e9',
//         padding: 10,
//         borderRadius: 5,
//         marginVertical: 5,
//     },
//     reviewUser: {
//         fontWeight: 'bold',
//         marginBottom: 4,
//     },
//     reviewComment: {
//         fontSize: 14,
//         marginBottom: 4,
//     },
//     reviewRating: {
//         fontSize: 14,
//         color: '#555',
//     },
//     image: {
//         width: 150,
//         height: 150,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     buttonPrimary: {
//         backgroundColor: '#007bff',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginVertical: 10,
//     },
//     buttonPrimaryText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     bottomSheetContent: {
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     sheetTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: 'gray',
//         padding: 8,
//         marginBottom: 10,
//         borderRadius: 5,
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         marginBottom: 16,
//     },
//     mapContainer: {
//         height: 200,
//         borderWidth: 1,
//         borderColor: 'black',
//         borderRadius: 8,
//         overflow: 'hidden',
//     },
//     map: {
//         height: 200,
//         width: "100%",
//     },
//     unlockedLeadsContainer: {
//         marginTop: 20,
//     },
//     leadItem: {
//         alignItems: 'center',
//         marginRight: 10,
//     },
//     leadImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         marginBottom: 5,
//     },
//     leadName: {
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContainer: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     artisanOption: {
//         width: '100%',
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//         alignItems: 'center',
//     },
//     artisanText: {
//         fontSize: 16,
//     },
//     cancelButton: {
//         marginTop: 20,
//         padding: 10,
//         borderRadius: 5,
//         backgroundColor: 'red',
//         alignItems: 'center',
//         width: '100%',
//     },
//     cancelButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });

// export default OrderView;




// OrderView.tsx

// import { Ionicons } from '@expo/vector-icons';
// import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button, Alert, Modal, ActivityIndicator } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
// import { Picker } from '@react-native-picker/picker';
// import { ButtonPrimary } from '@/components/index';
// import MapView, { Marker } from 'react-native-maps';
// import { Rating } from 'react-native-ratings';
// import { getToken } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Review } from '../Profession/artisan';
// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';

// const SelectUnlockedArtisan = ({ visible, onClose, artisants, handlePresentModalPress, setChoosedArtisan, goTobottomSheetModalRef, setSelectedProfession, professional }: any) => {
//     return (
//         <Modal
//             visible={visible}
//             transparent={true}
//             animationType="slide"
//         >
//             <View style={styles.modalBackground}>
//                 <View style={styles.modalContainer}>
//                     <Text style={styles.modalTitle}>Select Artisan</Text>

//                     <ScrollView horizontal>
//                         {artisants?.map((lead: any, i: any) => (
//                             <View key={i}>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         setChoosedArtisan(lead);
//                                         setSelectedProfession(professional?.text);
//                                         goTobottomSheetModalRef?.present();
//                                         onClose(false);
//                                     }}
//                                     key={lead.id} style={styles.leadItem}>
//                                     <Image source={{ uri: lead.imageProfile }} style={styles.leadImage} />
//                                     <Text style={{
//                                         ...styles.leadName,
//                                     }}
//                                         className='text-xs break-words w-20 text-center  '
//                                     >{`${lead.firstName} ${lead.lastName}`}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         ))}
//                     </ScrollView>
//                     <TouchableOpacity
//                         style={styles.cancelButton}
//                         onPress={() => onClose(null)}
//                     >
//                         <Text style={styles.cancelButtonText}>Cancel</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const OrderView = ({ route, navigation }: any) => {
//     const { order, user }: any = route.params;
//     const insets = useSafeAreaInsets();

//     const [reviews, setReviews]: any = useState([]); // Replace with actual reviews if available
//     const [newReview, setNewReview] = useState({ user: '', comment: '', rating: '', professionId: '' });
//     const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//     const [openModal, setOpenModal] = useState(false);
//     const [choosedArtisan, setChoosedArtisan] = useState<any>(null);
//     const snapPoints = useMemo(() => ['50%', '80%'], []);
//     const [artisantInfo, setArtisantInfo] = useState<any>(null);

//     const handlePresentModalPress = useCallback(() => {
//         setSelectedProfession(null);
//         bottomSheetModalRef.current?.present();
//     }, []);

//     const getInfo = async () => {
//         try {
//             const User = await AsyncStorage.getItem('@user');
//             setArtisantInfo(JSON.parse(User || '{}'));
//         } catch (error: any) {
//             console.error('Failed to get user info:', error);
//             Alert.alert('Error', 'Failed to retrieve user information.');
//         }
//     }

//     const handleAddReview = async () => {
//         const token = await getToken();
//         if (!token) {
//             Alert.alert("Error", "Authentication token not found.");
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
//                         mutation createReview($input: inputReview) {
//                             createReview(input: $input) {
//                                 id
//                             }
//                         }
//                         `,
//                         variables: {
//                             input: {
//                                 reviewer: user?.id ? user?.id : choosedArtisan?.id,
//                                 description: newReview.comment,
//                                 rating: rating, // Send as number
//                                 order: order?.id,
//                             }
//                         }
//                     }),
//                 }
//             );

//             if (!res.ok) {
//                 throw new Error(`Network response was not ok: ${res.statusText}`);
//             }

//             const json = await res.json();
//             if (json.errors) {
//                 throw new Error(json.errors[0].message || "Failed to create review.");
//             }

//             Alert.alert("Success", "Review added successfully.");
//             navigation.goBack();
//         } catch (err: any) {
//             Alert.alert("Error", err.message || "Something went wrong while adding the review.");
//         }
//     };

//     const [SelectedProfession, setSelectedProfession] = useState<any>(null);
//     const [rating, setRating] = useState<number>(3);

//     const handleRating = (newRating: number) => {
//         setRating(newRating);
//     };

//     useEffect(() => {
//         getInfo();
//     }, []);

//     const [Loading, setLoading] = useState(false);

//     const handleCreateConversation = async () => {
//         setLoading(true)

//         try {
//             const conversationId = await createOrRetrieveConversation(order?.id, artisantInfo?.id, order?.owner?.id);
//             setLoading(false)
//             navigation.navigate('Chat', {
//                 conversationId, userId: artisantInfo?.id, userName: artisantInfo?.firstName, order: {
//                     ...order,
//                     artisantId: artisantInfo
//                 }
//             });
//         } catch (error: any) {
//             setLoading(false)
//             Alert.alert("Error", "Failed to create conversation.");
//             console.error('Failed to create conversation:', error);
//         }
//     };

//     const handleCreateConversationUser = async (artisan: any) => {
//         setLoading(true)
//         try {
//             const User: any = await AsyncStorage.getItem('@user');
//             const parsedUser = JSON.parse(User || '{}');

//             const conversationId = await createOrRetrieveConversation(order?.id, artisan?.id, order?.owner?.id);
//             setLoading(false)

//             if (parsedUser.role === 'user') {
//                 navigation.navigate('Chat', {
//                     conversationId,
//                     userId: artisan?.id,
//                     userName: `${order?.owner?.firstName} ${order?.owner?.lastName}`,
//                     order: {
//                         ...order,
//                         artisantId: artisan
//                     }
//                 });
//             }
//             else {
//                 navigation.navigate('Chat', {
//                     conversationId,
//                     userId: order?.owner?.id,
//                     userName: `${artisan?.firstName} ${artisan?.lastName}`,
//                     order: {
//                         ...order,
//                         artisantId: artisan
//                     }
//                 });
//             }
//         } catch (error: any) {
//             setLoading(false)
//             Alert.alert("Error", "Failed to create conversation.");
//             console.error('Failed to create conversation:', error);
//         }
//     };

//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             {Loading && (
//                 <View style={styles.loadingOverlay}>
//                     <ActivityIndicator size={50} color="#fff" />
//                 </View>
//             )}
//             <BottomSheetModalProvider>
//                 <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
//                     {/* Order Title */}
//                     <View style={styles.header}>
//                         <Text style={styles.title}>Order</Text>
//                         <Text style={styles.orderTitle}>{order?.title}</Text>
//                     </View>
//                     <Text style={styles.description}>{order?.description}</Text>

//                     {/* Professions */}
//                     <Text style={styles.sectionTitle}>Professions</Text>
//                     {order?.professionals?.map((profession: any, i: any) => (
//                         <View key={i} style={styles.professionSection}>
//                             <Text style={styles.professionText}>{profession?.text}</Text>
//                         </View>
//                     ))}

//                     {/* Images */}
//                     <Text style={styles.sectionTitle}>Images:</Text>
//                     <ScrollView horizontal>
//                         {order?.images?.map((image: any, index: any) => (
//                             <Image key={index} source={{ uri: image }} style={styles.image} />
//                         ))}
//                     </ScrollView>

//                     {/* Location */}
//                     <Text style={styles.sectionTitle}>Location:</Text>
//                     {order?.locationType === 'currentLocation' ? (
//                         (() => {
//                             let coordinates: any = null;
//                             try {
//                                 coordinates = JSON.parse(order?.location);
//                             } catch (error) {
//                                 console.error('Invalid location format:', order?.location);
//                                 coordinates = null;
//                             }

//                             if (coordinates && coordinates.latitude && coordinates.longitude) {
//                                 return (
//                                     <View style={styles.mapContainer}>
//                                         <MapView
//                                             scrollEnabled={false}
//                                             style={styles.map}
//                                             initialRegion={{
//                                                 latitude: coordinates.latitude,
//                                                 longitude: coordinates.longitude,
//                                                 latitudeDelta: 0.0922,
//                                                 longitudeDelta: 0.0421,
//                                             }}
//                                         >
//                                             <Marker
//                                                 coordinate={{
//                                                     latitude: coordinates.latitude,
//                                                     longitude: coordinates.longitude,
//                                                 }}
//                                                 title="My Location"
//                                             />
//                                         </MapView>
//                                     </View>
//                                 );
//                             } else {
//                                 return <Text style={styles.invalidLocationText}>Invalid location data.</Text>;
//                             }
//                         })()
//                     ) : (
//                         <Text style={styles.locationDetail}>Location Details: {order?.location} </Text>
//                     )}

//                     {/* Add Review Button */}
//                     {(user?.id && order?.review == null) &&
//                         <ButtonPrimary
//                             className='mt-3'
//                             Loading={false}
//                             setLoading={() => { }}
//                             onPress={handlePresentModalPress}
//                             text="Add Review"
//                         />
//                     }

//                     {/* Reviews */}
//                     {order?.review && (
//                         <View style={styles.reviewContainer}>
//                             <Review
//                                 key={order?.review?.id}
//                                 name={`${order?.owner?.firstName} ${order?.owner?.lastName}`}
//                                 comment={order?.review?.description}
//                                 rating={order?.review?.rating}
//                                 timeAgo={order?.timeAgo}
//                                 image={order?.owner?.imageProfile || 'https://via.placeholder.com/40'}
//                             />
//                         </View>
//                     )}

//                     {/* Add Review for Unlocked Leads */}
//                     {
//                         order?.artisantUnlockedLead?.length > 0 && artisantInfo?.role !== 'artisant' && !order?.review &&
//                         <ButtonPrimary
//                             className='mt-3'
//                             Loading={false}
//                             setLoading={() => { }}
//                             onPress={() => {
//                                 setOpenModal(true)
//                             }}
//                             text="Add Review"
//                         />
//                     }

//                     {/* Conversations */}
//                     {artisantInfo?.role === 'user' ? (
//                         <View style={styles.conversationContainer}>
//                             <Text style={styles.conversationTitle}>
//                                 Conversations with artisans:
//                             </Text>
//                             {order?.artisantUnlockedLead?.map((artisan: any, i: any) => (
//                                 <TouchableOpacity
//                                     key={i}
//                                     onPress={() => handleCreateConversationUser(artisan)}
//                                     style={styles.conversationButton} >
//                                     <View style={styles.conversationContent}>
//                                         <View style={styles.artisanInfoRow}>
//                                             <Image source={{ uri: artisan?.imageProfile }} style={styles.artisanImage} />
//                                             <View style={styles.artisanTextContainer}>
//                                                 <Text style={styles.artisanName}>
//                                                     {artisan?.firstName} {artisan?.lastName}
//                                                 </Text>
//                                                 <Text style={styles.conversationLabel}>
//                                                     Conversations
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                         <Ionicons name="chevron-forward" size={24} color={'gray'} />
//                                     </View>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     ) : (
//                         <View style={styles.conversationContainer}>
//                             <Text style={styles.conversationTitle}>
//                                 Conversation:
//                             </Text>
//                             <TouchableOpacity
//                                 onPress={handleCreateConversation}
//                                 style={styles.conversationButton} >
//                                 <View style={styles.conversationContent}>
//                                     <View style={styles.artisanInfoRow}>
//                                         <Image source={{ uri: order?.owner?.imageProfile }} style={styles.artisanImage} />
//                                         <View style={styles.artisanTextContainer}>
//                                             <Text style={styles.artisanName}>
//                                                 {order?.owner?.firstName} {order?.owner?.lastName}
//                                             </Text>
//                                             <Text style={styles.conversationLabel}>
//                                                 Conversations
//                                             </Text>
//                                         </View>
//                                     </View>
//                                     <Ionicons name="chevron-forward" size={24} color={'gray'} />
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                     )}

//                     {/* Spacer */}
//                     <View style={styles.spacer} />

//                     {/* Select Unlocked Artisan Modal */}
//                     <SelectUnlockedArtisan
//                         visible={openModal}
//                         onClose={setOpenModal}
//                         setChoosedArtisan={setChoosedArtisan}
//                         handlePresentModalPress={handlePresentModalPress}
//                         artisants={order?.artisantUnlockedLead}
//                         goTobottomSheetModalRef={bottomSheetModalRef.current}
//                         professional={order?.professionals?.[0]}
//                         setSelectedProfession={setSelectedProfession}
//                     />
//                 </ScrollView>

//                 {/* Bottom Sheet Modal */}
//                 <BottomSheetModal
//                     snapPoints={snapPoints}
//                     style={styles.bottomSheetModal}
//                     ref={bottomSheetModalRef}
//                 >
//                     <View style={styles.bottomSheetContent}>
//                         <Text style={styles.sheetTitle}>
//                             {SelectedProfession ? SelectedProfession : 'Add Review'}
//                         </Text>
//                         {!SelectedProfession ? (
//                             <View>
//                                 <Text style={styles.sectionTitle}>Select Professional:</Text>
//                                 <View>
//                                     {order?.professionals?.map((profession: any, i: any) => (
//                                         <TouchableOpacity
//                                             key={i}
//                                             onPress={() => setSelectedProfession(profession?.text)}
//                                             style={styles.professionOption}
//                                         >
//                                             <Text style={styles.professionOptionText}>{profession?.text}</Text>
//                                             <Ionicons name="chevron-forward" size={20} />
//                                         </TouchableOpacity>
//                                     ))}
//                                 </View>
//                             </View>
//                         ) : (
//                             <View>
//                                 <TextInput
//                                     placeholderTextColor="black"
//                                     style={styles.reviewInput}
//                                     placeholder="Add your review"
//                                     value={newReview?.comment}
//                                     onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
//                                 />
//                                 <Rating
//                                     type="star"
//                                     startingValue={rating}
//                                     imageSize={30}
//                                     onFinishRating={handleRating}
//                                     style={{ paddingVertical: 10 }}
//                                 />
//                                 <ButtonPrimary
//                                     // @ts-ignore
//                                     style={styles.submitButton}
//                                     Loading={false}
//                                     setLoading={() => { }}
//                                     text="Submit Review"
//                                     onPress={handleAddReview}
//                                 />
//                                 <Button title='Cancel' onPress={() => setSelectedProfession(null)} />
//                             </View>
//                         )}
//                     </View>
//                 </BottomSheetModal>
//             </BottomSheetModalProvider>
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#f5f5f5',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 2,
//         marginBottom: 10,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     orderTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     description: {
//         fontSize: 16,
//         marginBottom: 20,
//         color: '#4b5563',
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginVertical: 8,
//         color: '#374151',
//     },
//     professionSection: {
//         marginBottom: 20,
//     },
//     professionText: {
//         fontSize: 16,
//         color: 'grey',
//         marginBottom: 8,
//     },
//     image: {
//         width: 150,
//         height: 150,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     mapContainer: {
//         height: 200,
//         borderWidth: 1,
//         borderColor: 'black',
//         borderRadius: 8,
//         overflow: 'hidden',
//         marginBottom: 20,
//     },
//     map: {
//         height: 200,
//         width: "100%",
//     },
//     invalidLocationText: {
//         color: 'red',
//         fontSize: 16,
//         marginBottom: 20,
//     },
//     reviewContainer: {
//         padding: 10,
//         backgroundColor: '#e9e9e9',
//         borderRadius: 5,
//         marginVertical: 10,
//     },
//     conversationContainer: {
//         marginTop: 20,
//     },
//     conversationTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     conversationButton: {
//         padding: 15,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         marginBottom: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     conversationContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     artisanInfoRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     artisanImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     artisanTextContainer: {
//         flexDirection: 'column',
//     },
//     artisanName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#4b5563',
//     },
//     conversationLabel: {
//         fontSize: 14,
//         color: '#4b5563',
//     },
//     spacer: {
//         height: 40,
//     },
//     bottomSheetModal: {
//         // Customize as needed
//     },
//     bottomSheetContent: {
//         padding: 16,
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     sheetTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         textAlign: 'center',
//     },
//     professionOption: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 15,
//         marginVertical: 5,
//         backgroundColor: '#f3f4f6',
//         borderRadius: 10,
//     },
//     professionOptionText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#374151',
//     },
//     reviewInput: {
//         borderWidth: 1,
//         borderColor: 'gray',
//         padding: 8,
//         marginBottom: 10,
//         borderRadius: 5,
//         color: 'black',
//     },
//     submitButton: {
//         marginBottom: 10,
//     },
//     loadingOverlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: WINDOW_WIDTH,
//         height: WINDOW_HEIGHT,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 20,
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContainer: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     leadItem: {
//         alignItems: 'center',
//         marginRight: 10,
//     },
//     leadImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         marginBottom: 5,
//     },
//     leadName: {
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     cancelButton: {
//         marginTop: 20,
//         padding: 10,
//         borderRadius: 5,
//         backgroundColor: 'red',
//         alignItems: 'center',
//         width: '100%',
//     },
//     cancelButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     locationDetail: {
//         fontSize: 16,
//         color: '#4b5563',
//     },
// });

// export default OrderView;


import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';
import { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { getToken } from '@/helpers/getToken';
import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
import { Review } from '../Profession/artisan';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const MagicButton = ({ onPress, text, style }: any) => (
    <TouchableOpacity onPress={onPress} style={[styles.magicButton, style]}>
        <LinearGradient
            colors={['#73c8a9', '#b3ffab']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.magicButtonGradient}
        >
            <Text style={styles.magicButtonText}>{text}</Text>
        </LinearGradient>
    </TouchableOpacity>
);

const SelectUnlockedArtisan = ({ visible, onClose, artisans, handlePresentModalPress, setChoosedArtisan, goTobottomSheetModalRef, setSelectedProfession, professional }: any) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <BlurView intensity={20} style={StyleSheet.absoluteFill}>
                <View style={styles.modalBackground}>
                    <Animated.View
                        //   @ts-ignore
                        entering={FadeInDown.duration(500)} style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select Artisan</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.artisanScrollView}>
                            {artisans?.map((artisan: any, i: number) => (
                                <AnimatedTouchableOpacity
                                    //   @ts-ignore
                                    entering={FadeInRight.delay(i * 100)}
                                    key={i}
                                    onPress={() => {
                                        setChoosedArtisan(artisan);
                                        setSelectedProfession(professional?.text);
                                        goTobottomSheetModalRef?.present();
                                        onClose(false);
                                    }}
                                    style={styles.artisanItem}
                                >
                                    <Image source={{ uri: artisan.imageProfile }} style={styles.artisanImage} />
                                    <Text style={styles.artisanName} numberOfLines={2}>{`${artisan.firstName} ${artisan.lastName}`}</Text>
                                </AnimatedTouchableOpacity>
                            ))}
                        </ScrollView>
                        <MagicButton onPress={() => onClose(false)} text="Cancel" style={styles.cancelButton} />
                    </Animated.View>
                </View>
            </BlurView>
        </Modal>
    );
};

const OrderView = ({ route, navigation }: any) => {
    const { order, user }: any = route.params;
    const insets = useSafeAreaInsets();

    const [newReview, setNewReview] = useState({ comment: '', rating: 3 });
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [openModal, setOpenModal] = useState(false);
    const [choosedArtisan, setChoosedArtisan] = useState<any>(null);
    const snapPoints = useMemo(() => ['50%', '80%'], []);
    const [artisantInfo, setArtisantInfo] = useState<any>(null);
    const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const scrollY = useRef(new Animated.Value(0)).current;
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const handlePresentModalPress = useCallback(() => {
        setSelectedProfession(null);
        bottomSheetModalRef.current?.present();
    }, []);

    const getInfo = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('@user');
            setArtisantInfo(JSON.parse(userInfo || '{}'));
        } catch (error: any) {
            console.error('Failed to get user info:', error);
            Alert.alert('Error', 'Failed to retrieve user information.');
        }
    }

    const handleAddReview = async () => {
        const token = await getToken();
        if (!token) {
            Alert.alert("Error", "Authentication token not found.");
            return;
        }

        try {
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        query: `
              mutation createReview($input: inputReview) {
                createReview(input: $input) {
                  id
                }
              }
            `,
                        variables: {
                            input: {
                                reviewer: user?.id ? user?.id : choosedArtisan?.id,
                                description: newReview.comment,
                                rating: newReview.rating,
                                order: order?.id,
                            }
                        }
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            const json = await res.json();
            if (json.errors) {
                throw new Error(json.errors[0].message || "Failed to create review.");
            }

            Alert.alert("Success", "Review added successfully.");
            navigation.goBack();
        } catch (err: any) {
            Alert.alert("Error", err.message || "Something went wrong while adding the review.");
        }
    };

    const handleCreateConversation = async (artisan?: any) => {
        setLoading(true);
        try {
            const User: any = await AsyncStorage.getItem('@user');
            const parsedUser = JSON.parse(User || '{}');
            const conversationId = await createOrRetrieveConversation(
                order?.id,
                artisan ? artisan.id : artisantInfo?.id,
                order?.owner?.id
            );
            setLoading(false);

            if (parsedUser.role === 'user') {
                navigation.navigate('Chat', {
                    conversationId,
                    userId: artisan ? artisan.id : artisantInfo?.id,
                    userName: artisan ? `${artisan.firstName} ${artisan.lastName}` : `${order?.owner?.firstName} ${order?.owner?.lastName}`,
                    order: {
                        ...order,
                        artisantId: artisan || artisantInfo
                    }
                });
            } else {
                navigation.navigate('Chat', {
                    conversationId,
                    userId: order?.owner?.id,
                    userName: `${artisan ? artisan.firstName : order?.owner?.firstName} ${artisan ? artisan.lastName : order?.owner?.lastName}`,
                    order: {
                        ...order,
                        artisantId: artisan || artisantInfo
                    }
                });
            }
        } catch (error: any) {
            setLoading(false);
            Alert.alert("Error", "Failed to create conversation.");
            console.error('Failed to create conversation:', error);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                        <LinearGradient
                            colors={['#73c8a9', '#b3ffab']}
                            style={styles.headerGradient}
                        >
                            <Text style={styles.headerTitle}>{order?.title}</Text>
                        </LinearGradient>
                    </Animated.View>
                    <Animated.ScrollView
                        style={[styles.scrollView, { paddingTop: insets.top + 60 }]}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true }
                        )}
                        scrollEventThrottle={16}
                    >
                        <Animated.View
                            //   @ts-ignore
                            entering={FadeInDown.duration(500).delay(200)}>
                            <Text style={styles.description}>{order?.description}</Text>

                            

                            <Text style={styles.sectionTitle}>Images</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
                                {order?.images?.map((image: string, index: number) => (
                                    <Animated.Image
                                        key={index}
                                        //   @ts-ignore
                                        entering={FadeInRight.delay(index * 100)}
                                        source={{ uri: image }}
                                        style={styles.image}
                                    />
                                ))}
                            </ScrollView>

                            <Text style={styles.sectionTitle}>Location</Text>
                            {order?.locationType === 'currentLocation' ? (
                                (() => {
                                    let coordinates: any = null;
                                    try {
                                        coordinates = JSON.parse(order?.location);
                                    } catch (error) {
                                        console.error('Invalid location format:', order?.location);
                                        coordinates = null;
                                    }

                                    if (coordinates && coordinates.latitude && coordinates.longitude) {
                                        return (
                                            <View style={styles.mapContainer}>
                                                <MapView
                                                    style={styles.map}
                                                    initialRegion={{
                                                        latitude: coordinates.latitude,
                                                        longitude: coordinates.longitude,
                                                        latitudeDelta: 0.0922,
                                                        longitudeDelta: 0.0421,
                                                    }}
                                                >
                                                    <Marker
                                                        coordinate={{
                                                            latitude: coordinates.latitude,
                                                            longitude: coordinates.longitude,
                                                        }}
                                                        title="Order Location"
                                                    />
                                                </MapView>
                                            </View>
                                        );
                                    } else {
                                        return <Text style={styles.invalidLocationText}>Invalid location data.</Text>;
                                    }
                                })()
                            ) : (
                                <Text style={styles.locationDetail}>{order?.location}</Text>
                            )}

                            {(user?.id && order?.review == null) && (
                                <MagicButton onPress={handlePresentModalPress} text="Add Review" style={styles.addReviewButton} />
                            )}

                            {order?.review && (
                                <Animated.View
                                    //   @ts-ignore
                                    entering={FadeInDown.duration(500)} style={styles.reviewContainer}>
                                    <Review
                                        key={order?.review?.id}
                                        name={`${order?.owner?.firstName} ${order?.owner?.lastName}`}
                                        comment={order?.review?.description}
                                        rating={order?.review?.rating}
                                        timeAgo={order?.timeAgo}
                                        image={order?.owner?.imageProfile || 'https://via.placeholder.com/40'}
                                    />
                                </Animated.View>
                            )}

                            {order?.artisantUnlockedLead?.length > 0 && artisantInfo?.role !== 'artisant' && !order?.review && (
                                <MagicButton onPress={() => setOpenModal(true)} text="Add Review" style={styles.addReviewButton} />
                            )}

                            <Text style={styles.sectionTitle}>
                                {artisantInfo?.role === 'user' ? 'Conversations with artisans:' : 'Conversation:'}
                            </Text>
                            {artisantInfo?.role === 'user' ? (
                                order?.artisantUnlockedLead?.map((artisan: any, i: number) => (
                                    <AnimatedTouchableOpacity
                                        key={i}
                                        //   @ts-ignore
                                        entering={FadeInRight.delay(i * 100)}
                                        onPress={() => handleCreateConversation(artisan)}
                                        style={styles.conversationButton}
                                    >
                                        <LinearGradient
                                            colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.conversationGradient}
                                        >
                                            <View style={styles.conversationContent}>
                                                <View style={styles.artisanInfoRow}>
                                                    <Image source={{ uri: artisan?.imageProfile }} style={styles.conversationImage} />
                                                    <View style={styles.artisanTextContainer}>
                                                        <Text style={styles.artisanName}>{artisan?.firstName} {artisan?.lastName}</Text>
                                                        <Text style={styles.conversationLabel}>Conversation</Text>
                                                    </View>
                                                </View>
                                                <Ionicons name="chevron-forward" size={24} color="#6366f1" />
                                            </View>
                                        </LinearGradient>
                                    </AnimatedTouchableOpacity>
                                ))
                            ) : (
                                <AnimatedTouchableOpacity
                                    //   @ts-ignore
                                    entering={FadeInRight}
                                    onPress={() => handleCreateConversation()}
                                    style={styles.conversationButton}
                                >
                                    <LinearGradient
                                        colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.conversationGradient}
                                    >
                                        <View style={styles.conversationContent}>
                                            <View style={styles.artisanInfoRow}>
                                                <Image source={{ uri: order?.owner?.imageProfile }} style={styles.conversationImage} />
                                                <View style={styles.artisanTextContainer}>
                                                    <Text style={styles.artisanName}>{order?.owner?.firstName} {order?.owner?.lastName}</Text>
                                                    <Text style={styles.conversationLabel}>Conversation</Text>
                                                </View>
                                            </View>
                                            <Ionicons name="chevron-forward" size={24} color="#6366f1" />
                                        </View>
                                    </LinearGradient>
                                </AnimatedTouchableOpacity>
                            )}

                            <View style={styles.spacer} />
                        </Animated.View>
                    </Animated.ScrollView>
                </View>

                <SelectUnlockedArtisan
                    visible={openModal}
                    onClose={setOpenModal}
                    setChoosedArtisan={setChoosedArtisan}
                    handlePresentModalPress={handlePresentModalPress}
                    artisans={order?.artisantUnlockedLead}
                    goTobottomSheetModalRef={bottomSheetModalRef.current}
                    professional={order?.professionals?.[0]}
                    setSelectedProfession={setSelectedProfession}
                />

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backgroundStyle={styles.bottomSheetBackground}
                    handleIndicatorStyle={styles.bottomSheetIndicator}
                >
                    <View style={styles.bottomSheetContent}>
                        <Text style={styles.bottomSheetTitle}>
                            {selectedProfession ? selectedProfession : 'Add Review'}
                        </Text>
                        {!selectedProfession ? (
                            <Animated.View
                                //   @ts-ignore
                                entering={FadeInDown.duration(500)}>
                                <Text style={styles.bottomSheetSubtitle}>Select Professional:</Text>
                                {order?.professionals?.map((profession: any, i: number) => (
                                    <AnimatedTouchableOpacity
                                        key={i}
                                        //   @ts-ignore
                                        entering={FadeInRight.delay(i * 100)}
                                        onPress={() => setSelectedProfession(profession?.text)}
                                        style={styles.professionOption}
                                    >
                                        <Text style={styles.professionOptionText}>{profession?.text}</Text>
                                        <Ionicons name="chevron-forward" size={20} color="#6366f1" />
                                    </AnimatedTouchableOpacity>
                                ))}
                            </Animated.View>
                        ) : (
                            <Animated.View
                                //   @ts-ignore
                                entering={FadeInDown.duration(500)}>
                                <TextInput
                                    style={styles.reviewInput}
                                    placeholder="Add your review"
                                    placeholderTextColor="#9ca3af"
                                    value={newReview.comment}
                                    onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
                                    multiline
                                />
                                <Rating
                                    type="custom"
                                    ratingColor="#6366f1"
                                    ratingBackgroundColor="#e5e7eb"
                                    ratingCount={5}
                                    imageSize={30}
                                    startingValue={newReview.rating}
                                    onFinishRating={(rating: any) => setNewReview({ ...newReview, rating })}
                                    style={styles.ratingContainer}
                                />
                                <MagicButton onPress={handleAddReview} text="Submit Review" style={styles.submitReviewButton} />
                                <TouchableOpacity
                                    style={styles.cancelReviewButton}
                                    onPress={() => setSelectedProfession(null)}
                                >
                                    <Text style={styles.cancelReviewButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    headerGradient: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    description: {
        fontSize: 16,
        color: '#4b5563',
        marginBottom: 20,
        paddingHorizontal: 20,
        marginTop: 70,

    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginTop: 10,
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    professionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
    },
    professionTag: {
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
        marginBottom: 10,
    },
    professionText: {
        color: '#6366f1',
        fontSize: 14,
        fontWeight: '500',
    },
    imageContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginRight: 15,
    },
    mapContainer: {
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    invalidLocationText: {
        color: '#ef4444',
        fontSize: 16,
        paddingHorizontal: 20,
    },
    locationDetail: {
        fontSize: 16,
        color: '#4b5563',
        paddingHorizontal: 20,
    },
    reviewContainer: {
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        borderRadius: 10,
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 20,
    },
    conversationButton: {
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        overflow: 'hidden',
    },
    conversationGradient: {
        padding: 15,
        
    },
    conversationContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    artisanInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    conversationImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    artisanTextContainer: {
        flexDirection: 'column',
    },
    conversationLabel: {
        fontSize: 14,
        color: '#6b7280',
    },
    spacer: {
        height: 40,
        marginBottom: 20,

    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
    },
    artisanScrollView: {
        maxHeight: 300,
    },
    artisanItem: {
        alignItems: 'center',
        marginRight: 20,
        width: 100,
    },
    artisanImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    artisanName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4b5563',
        textAlign: 'center',
    },
    magicButton: {
        borderRadius: 25,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    magicButtonGradient: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    magicButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 20,
    },
    bottomSheetBackground: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomSheetIndicator: {
        backgroundColor: '#6366f1',
    },
    bottomSheetContent: {
        padding: 24,
    },
    bottomSheetTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
        textAlign: 'center',
    },
    bottomSheetSubtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4b5563',
        marginBottom: 15,
    },
    professionOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        borderRadius: 10,
        marginBottom: 10,
    },
    professionOptionText: {
        fontSize: 16,
        color: '#4b5563',
        fontWeight: '500',
    },
    reviewInput: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#111827',
        marginBottom: 20,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    ratingContainer: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    submitReviewButton: {
        marginBottom: 15,
    },
    cancelReviewButton: {
        alignItems: 'center',
    },
    cancelReviewButtonText: {
        color: '#6b7280',
        fontSize: 16,
        fontWeight: '600',
    },
    addReviewButton: {
        marginTop: 20,
    },
});

export default OrderView;
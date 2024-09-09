import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Button, StyleSheet, Modal, TouchableWithoutFeedback, Linking } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // Using Expo's icon library for the star ratings
import MessageOutlinedIcon from '@expo/vector-icons/MaterialIcons';
import CallOutlinedIcon from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // React Navigation
import Constants from 'expo-constants';
import { getToken, getUser } from "@/helpers/getToken";
import ImageGallery from "@/components/ImageGallery";
import { Card, Divider, Title } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import CheckCircleOutline from 'react-native-vector-icons/MaterialIcons'; // Example icon
import dayjs from "dayjs";
import ContactForm from "@/components/ContactForm";
import ServicesCard from "@/components/ServiceCard";
import ReviewsCard from "@/components/ReviewsCard";
import { createOrRetrieveConversation } from "@/helpers/createOrRetrieveConversation";

export default function ZipCodeForm() {
    const [zipCode, setZipCode]: any = useState("");
    const [location, setLocation]: any = useState(null);
    const [error, setError]: any = useState(null);

    // Function to fetch city and state based on zip code
    const fetchLocation = async (zip: any) => {
        try {
            const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
            if (!response.ok) {
                throw new Error("Invalid zip code");
            }
            const data = await response.json();
            const city = data.places[0]["place name"];
            const state = data.places[0]["state abbreviation"];
            setLocation({ city, state });
            setError(null);
        } catch (err: any) {
            setLocation(null);
            setError(err?.message);
        }
    };

    // Handle input change and validate zip code
    const handleZipCodeChange = (zip: any) => {
        setZipCode(zip);

        if (zip.length === 5) {
            fetchLocation(zip);
        } else {
            setLocation(null);
            setError(null);
        }
    };

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>Zip code</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 8, borderRadius: 8, width: '100%' }}
                placeholder="00000"
                keyboardType="numeric"
                value={zipCode}
                onChangeText={handleZipCodeChange}
            />
            {location && (
                <Text style={{ marginTop: 8, color: 'green' }}>
                    {location.city}, <Text style={{ fontWeight: 'bold' }}>{location.state}</Text>
                </Text>
            )}
            {error && (
                <Text style={{ marginTop: 8, color: 'red' }}>{error}</Text>
            )}
        </View>
    );
}


// const DisplayServiceProviders = ({ data, navigation }: any) => {


//     const [viewAllReviews, setViewAllReviews]: any = useState(false);
//     const [loading, setLoading]: any = useState(false);

//     // console.log('====================================');
//     // console.log('data', data);
//     // console.log('====================================');


//     const handleAddOrder = async () => {
//         setLoading(true);

//         const token: any = await getToken();
//         const newUser: any = await getUser();
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

//             // console.log('filterArray', filterArray);
//             console.log('====================================');
//             console.log('JSON.parse(user)?.id',JSON.parse(newUser).id);
//             console.log('data?.userByPK?.id',data?.userByPK.id);
//             console.log('====================================');
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                                  mutation createorderForChat($input: orderForChatInput) {
//                                     createorderForChat(input: $input) {
//                                         id
//                                             callOrWhatsappOrChat
//                                             owner{
//                                                 id
//                                                 firstName
//                                                 lastName
//                                             }
//                                             artisant{
//                                                 id
//                                                 firstName
//                                                 lastName
//                                             }
//                                     }
//                                 }

//                             `,
//                         variables: {
//                             input: {
//                                 callOrWhatsappOrChat: "chat",
//                                 locationType: "home",
//                                 title: "chat",
//                                 owner: JSON.parse(newUser)?.id,
//                                 artisant: data?.userByPK?.id,
//                             }
//                         }


//                     }),
//                 }
//             );

//             const response = await res.json();

//             return response;

//         } catch (error) {
//             console.log(error);
//             setLoading(false);
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
//             return { label: 'Regular House Guru', color: 'blue' }; // Optional fallback category
//         }
//     };
//     const averageRating: any = data?.userByPK.reviews?.reduce((acc: any, review: any) => acc + review?.rating, 0) / (data?.userByPK.reviews?.length || 1);
//     const roundedRating: any = Math.round(averageRating * 10) / 10;

//     // @ts-ignore
//     const sortedReviews = data?.userByPK.reviews?.sort((a: any, b: any) => new Date(b?.createdAt) - new Date(a?.createdAt));

//     return (
//         <ScrollView contentContainerStyle={{ padding: 16 }}>
//             <View style={{ flexDirection: 'row', marginBottom: 16 }}>
//                 <Image
//                     source={{ uri: data?.userByPK.imageProfile }}
//                     style={{ width: 64, height: 64, borderRadius: 32 }}
//                 />
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

// <View style={{ marginBottom: 16 }}>
//     <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Introduction</Text>
//     <Text>{data?.userByPK.aboutYou}</Text>
// </View>
//             {/* 
//             <View style={{ marginBottom: 16 }}>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Overview</Text>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
//                     <Text><FontAwesome name="map-marker" size={16} /> {data?.userByPK.location || 'Address'}</Text>
//                     <Text><FontAwesome name="clock-o" size={16} /> {data?.userByPK.createdAt}</Text>
//                 </View>
//             </View> */}

// <Card style={styles.card}>
//     <Card.Content style={styles.cardContentcardOverView}>
//         <Text style={styles.titlecardOverView}>Overview</Text>

//         <View style={styles.infoGrid}>
//             <View style={styles.infoRow}>
//                 <Ionicons name="location-outline" size={16} color="gray" />
//                 <Text>{data?.userByPK?.adress || data?.userByPK?.location || 'Address'}</Text>
//             </View>

//             <View style={styles.infoRow}>
//                 <Ionicons name="time-outline" size={16} color="gray" />
//                 <Text>{getUserCategory(data?.userByPK.createdAt)?.label}</Text>
//             </View>

//             <View style={styles.infoRow}>
//                 <Ionicons name="briefcase-outline" size={16} color="gray" />
//                 <Text>
//                     {data?.userByPK?.profileCompleted ? (
//                         <View style={styles.profileStatus}>
//                             <Text>Profile Completed</Text>
//                             <CheckCircleOutline name="check-circle-outline" size={16} color="green" />
//                         </View>
//                     ) : 'Profile Incomplete'}
//                 </Text>
//             </View>

//             <View style={styles.infoRow}>
//                 <Ionicons name="cash-outline" size={16} color="gray" />
//                 <Text>Contact for more info</Text>
//             </View>
//         </View>
//     </Card.Content>
// </Card>
//             <ServicesCard data={data} />
//             <ReviewsCard sortedReviews={sortedReviews} viewAllReviews={viewAllReviews} setViewAllReviews={setViewAllReviews} data={data} />

// <View style={styles.card}>
//     <View style={styles.cardContent}>
//         <Text style={styles.title}>Gallery</Text>
//         <ImageGallery images={data?.userByPK?.images || []} />
//     </View>
// </View>


//             <ContactForm
//                 role="artisant"
//                 pathName="Chat"

//             />
//             <Button
//                 title={
//                     loading ? 'Loading...' : 'Contact Me'
//                 }
//                 onPress={async () => {

//                     const res = await handleAddOrder();
//                     // console.log('res', res);


//                     console.log('res?.data?.createorderForChat?.artisant?.id',res?.data?.createorderForChat?.artisant?.id);
//                     console.log('res?.data?.createorderForChat?.owner?.id',res?.data?.createorderForChat?.owner?.id);

//                     const conversationId = await createOrRetrieveConversation(res?.data?.createorderForChat?.id, res?.data?.createorderForChat?.artisant?.id, res?.data?.createorderForChat?.owner?.id);
//                     setLoading(false);
//                     // navigation.navigate('Chat');
//                     navigation.navigate('Chat', { conversationId, userId: res?.data?.createorderForChat?.owner?.id, userName: res?.data?.createorderForChat?.owner?.firstName, order: res?.data?.createorderForChat });

//                 }} // Use React Navigation to navigate
//             />
//         </ScrollView>
//     )
// }


const DisplayServiceProviders = ({ data, navigation }: any) => {
    const [viewAllReviews, setViewAllReviews] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [contactOption, setContactOption] = useState('chat');

    const handleAddOrder = async (contactType: string) => {
        setLoading(true);
        const token = await getToken();
        const newUser: any = await getUser();

        if (!token) {
            return;
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        try {
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                mutation createorderForChat($input: orderForChatInput) {
                  createorderForChat(input: $input) {
                    id
                    callOrWhatsappOrChat
                    owner {
                      id
                      firstName
                      lastName
                      imageProfile
                      pushToken
                      images{
                        id 
                        source
                      }
                    }
                    artisant {
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
                  }
                }
              `,
                        variables: {
                            input: {
                                callOrWhatsappOrChat: contactType,  // Use the contact type here
                                locationType: "home",
                                title: contactType,
                                owner: JSON.parse(newUser)?.id,
                                artisant: data?.userByPK?.id,
                            }
                        }
                    }),
                }
            );

            const response = await res.json();
            return response;

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const makePhoneCall = (phoneNumber: string) => {
        const phoneURL = `tel:${phoneNumber}`;
        Linking.canOpenURL(phoneURL)
          .then((supported) => {
            if (supported) {
              Linking.openURL(phoneURL); // Initiates the phone call
            } else {
              console.log('Phone call not supported on this device');
            }
          })
          .catch((err) => console.error('An error occurred', err));
      };

    const handleContact = async (contactType: string) => {

        if (contactType === 'call') {
            console.log('call');
            // go to the phone call
            makePhoneCall(data?.userByPK.phone);

        } else if (contactType === 'chat') {
            const res = await handleAddOrder(contactType);
            console.log('chat',res?.data?.createorderForChat);

            if (res?.data?.createorderForChat) {
                const conversationId = await createOrRetrieveConversation(
                    res?.data?.createorderForChat?.id,
                    res?.data?.createorderForChat?.artisant?.id,
                    res?.data?.createorderForChat?.owner?.id
                );

                setLoading(false);
                setModalVisible(false);
                navigation.navigate('Chat', {
                    conversationId,
                    userId: res?.data?.createorderForChat?.owner?.id,
                    userName: res?.data?.createorderForChat?.owner?.firstName,
                    order: res?.data?.createorderForChat
                });
            }
        }
    };

    const getUserCategory = (createdAt: string) => {
        const today = dayjs();
        const createdDate = dayjs(createdAt);
        const daysDifference = today.diff(createdDate, 'day');
        const monthsDifference = today.diff(createdDate, 'month');

        if (daysDifference <= 10) {
            return { label: 'New in House Guru', color: 'orange' };
        } else if (monthsDifference >= 1) {
            return { label: 'Pro House Guru', color: 'purple' };
        } else {
            return { label: 'Regular House Guru', color: 'blue' };
        }
    };

    const averageRating = data?.userByPK.reviews?.reduce((acc: any, review: any) => acc + review?.rating, 0) / (data?.userByPK.reviews?.length || 1);
    const roundedRating = Math.round(averageRating * 10) / 10;

    // @ts-ignore
    const sortedReviews = data?.userByPK.reviews?.sort((a: any, b: any) => new Date(b?.createdAt) - new Date(a?.createdAt));

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            {/* Profile and details */}
            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Image source={{ uri: data?.userByPK.imageProfile }} style={{ width: 64, height: 64, borderRadius: 32 }} />
                <View style={{ marginLeft: 16 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                        {data?.userByPK.firstName} {data?.userByPK.lastName}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                        <Text style={{ color: 'green', marginRight: 4 }}>{roundedRating}</Text>
                        {[...Array(5)].map((_, i) => (
                            <FontAwesome key={i} name="star" size={16} color={i < roundedRating ? 'yellow' : 'gray'} />
                        ))}
                        <Text style={{ marginLeft: 8 }}>({data?.userByPK.reviews.length || 0})</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Introduction</Text>
                <Text>{data?.userByPK.aboutYou}</Text>
            </View>



            <Card style={styles.card}>
                <Card.Content style={styles.cardContentcardOverView}>
                    <Text style={styles.titlecardOverView}>Overview</Text>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoRow}>
                            <Ionicons name="location-outline" size={16} color="gray" />
                            <Text>{data?.userByPK?.adress || data?.userByPK?.location || 'Address'}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Ionicons name="time-outline" size={16} color="gray" />
                            <Text>{getUserCategory(data?.userByPK.createdAt)?.label}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Ionicons name="briefcase-outline" size={16} color="gray" />
                            <Text>
                                {data?.userByPK?.profileCompleted ? (
                                    <View style={styles.profileStatus}>
                                        <Text>Profile Completed</Text>
                                        <CheckCircleOutline name="check-circle-outline" size={16} color="green" />
                                    </View>
                                ) : 'Profile Incomplete'}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Ionicons name="cash-outline" size={16} color="gray" />
                            <Text>Contact for more info</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <ServicesCard data={data} />
            <ReviewsCard sortedReviews={sortedReviews} viewAllReviews={viewAllReviews} setViewAllReviews={setViewAllReviews} data={data} />

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Gallery</Text>
                    <ImageGallery images={data?.userByPK?.images || []} />
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>How would you like to contact?</Text>
                                <Divider style={styles.divider} />

                                <View
                                className="flex-row gap-4 justify-center items-center w-full"
                                >
                                    <TouchableOpacity style={{
                                        ...styles.contactOption, width: 100,
                                    }} onPress={() => handleContact('chat')}>
                                        <Text style={styles.contactOptionText}>Chat</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        ...styles.contactOption, width: 100,
                                    }} onPress={() => handleContact('call')}>
                                        <Text style={styles.contactOptionText}>Phone</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Button
                title={loading ? 'Loading...' : 'Contact Me'}
                onPress={() => setModalVisible(true)}
            />
        </ScrollView>
    );
};


export function ServiceProviderProfile({ route, navigation }: any) {
    const { id } = route.params;
    // console.log('id', id);

    const [data, setData]: any = useState([]);
    const [error, setError]: any = useState(null);
    const [loading, setLoading]: any = useState(false);
    // const { data, loading, error } = useUserByPkQuery({
    //     variables: { userByPkId: id },
    //     skip: !id
    // });


    const getUserByPk = async () => {
        const token = await getToken();
        // setUser(user);
        // console.log('====================================');
        // console.log('token', token);
        // console.log('====================================');
        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        try {
            // console.log('====================================');
            // console.log('filterArray', filterArray);
            // console.log('================================
            setLoading(true);
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
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
                        }


                    }),
                }
            );


            const response = await res.json();
            // console.log('====================================');
            // console.log('response', response.data.userByPK);
            // console.log('====================================');
            setLoading(false);
            setData(response.data);
        } catch (error: any) {
            // console.log('====================================');
            // console.log('error', error);
            // console.log('====================================');
            setLoading(false);
            setError(error);
        }


    };

    useEffect(() => {
        getUserByPk();
    }, []);



    return (
        <View style={{ flex: 1, padding: 16 }}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>{error?.message}</Text>}
            {data?.length === 0 ? <Text>No data found</Text> :

                <DisplayServiceProviders
                    navigation={navigation}
                    data={data} />
            }

        </View>
    );
}






const styles = StyleSheet.create({
    card: {
        marginBottom: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    cardContent: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    cardOverView: {
        marginBottom: 16,
    },
    cardContentcardOverView: {
        padding: 16,
    },
    titlecardOverView: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16,
    },
    infoGrid: {
        flexDirection: 'column',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    profileStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contactOption: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#007bff',
    },
    contactOptionText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    divider: {
        marginBottom: 20,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
    },
});
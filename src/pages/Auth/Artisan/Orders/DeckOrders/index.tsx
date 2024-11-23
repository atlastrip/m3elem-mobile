// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Alert,
//     ScrollView,
//     Image,
//     Dimensions,
//     ActivityIndicator
// } from 'react-native';
// import Swiper from 'react-native-deck-swiper';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import ConfettiCannon from 'react-native-confetti-cannon';
// import ImageViewing from 'react-native-image-viewing';
// import Constants from 'expo-constants';
// import { getToken, getUser } from '@/helpers/getToken';
// import { useIsFocused } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width, height } = Dimensions.get('window');

// const COLORS = {
//     primary: '#8A2BE2',
//     secondary: '#4B0082',
//     accent: '#FF69B4',
//     success: '#00FA9A',
//     danger: '#FF4500',
//     warning: '#FFD700',
//     info: '#1E90FF',
//     light: '#F0F8FF',
//     dark: '#191970',
//     magicalPurple: '#7F00FF',
//     mysticalBlue: '#1E3A8A',
//     enchantedPink: '#FF6EC7',
// };


// function formatJoinDate(createdAt: any) {
//     const date = new Date(createdAt);
//     const year = date.getFullYear();
//     const now = new Date();

//     // Calculate the difference in months
//     const months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
//     if (months === 0) return `Joined this month`;
//     return `Joined ${year} (${months} months)`;
// }


// export default function EnchantedSwiperComponent({ navigation }: { navigation: any }) {
//     const [showConfetti, setShowConfetti] = useState(false);
//     const [leads, setLeads] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [currentLead, setCurrentLead] = useState<any>(null);
//     const [loadingUnlock, setLoadingUnlock] = useState(false);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const isFocused = useIsFocused();

//     const zipCodeCache: { [key: string]: { city: string; state: string } } = {};

//     const handleUnlock = async (id: string) => {
//         const token = await getToken();
//         if (!token) return;
//         // console.log('====================================');
//         // console.log('currentLead', currentLead);
//         // console.log('====================================');
//         // return
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);

//         try {
//             setLoadingUnlock(true);
//             setShowConfetti(true);

//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                 mutation unlockLead($input: LeadUnlockInput) {
//                     unlockLead(input: $input) {
//                         id
//                     }
//                 }
//           `,
//                     variables: {
//                         input: {
//                             id,
//                             categoryId: currentLead.categoryId.id,

//                         }
//                     }
//                 }),
//             });

//             if (!res.ok) {
//                 const errorText = await res.text();
//                 throw new Error(`HTTP Error: ${res.status} - ${errorText}`);
//             }

//             const json = await res.json();

//             if (json.errors && json.errors.length > 0) {
//                 throw new Error(json.errors[0].message);
//             }

//             setShowConfetti(false);
//             setLoadingUnlock(false);
//             Alert.alert("Success", "You have successfully unlocked the magical lead!");
//             navigation.goBack();
//         } catch (error: any) {
//             setShowConfetti(false);
//             setLoadingUnlock(false);
//             Alert.alert("Error", error.message);
//         }
//     };

//     const fetchLocation = async (zip: string) => {
//         if (zipCodeCache[zip]) return zipCodeCache[zip];

//         try {
//             const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
//             if (!response.ok) throw new Error("Invalid zip code");

//             const data = await response.json();
//             const location = {
//                 city: data.places[0]["place name"],
//                 state: data.places[0]["state abbreviation"]
//             };

//             zipCodeCache[zip] = location;
//             return location;
//         } catch (err: any) {
//             console.error(`Error fetching location for zip ${zip}:`, err.message);
//             return null;
//         }
//     };

//     const getLeads = async () => {
//         const token = await getToken();
//         const user: any = await getUser();
//         if (!token) return;

//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);

//         try {
//             setLoading(true);
//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//             query getLeadsThatMatchUserCategories {
//               getLeadsThatMatchUserCategories {
//                 id
//                 title
//                 zipCode
//                 categoryId {
//                   id
//                   name
//                   unLockedAmount
//                 }
//                 createdAt
//                 description
//                 status
//                 images
//                 locationType
//                 owner {
//                   id
//                   leads { id }
//                   pushToken
//                   firstName
//                   lastName
//                   phone
//                   imageProfile
//                   adress
//                   email
//                 }
//                 artisantId {
//                   id
//                   pushToken
//                   firstName
//                   lastName
//                   phone
//                   imageProfile
//                 }
//                 professionals {
//                   id
//                   text
//                   img
//                 }
//                 artisantUnlockedLead {
//                   id
//                   firstName
//                   lastName
//                   pushToken
//                   imageProfile
//                 }
//                 location
//                 review {
//                   id
//                   description
//                   rating
//                   owner {
//                     id
//                     pushToken
//                     firstName
//                     lastName
//                     imageProfile
//                   }
//                 }
//               }
//             }
//           `,
//                 }),
//             });

//             if (!res.ok) {
//                 const errorText = await res.text();
//                 throw new Error(`HTTP Error: ${res.status} - ${errorText}`);
//             }

//             const json = await res.json();
//             const filteredLeads = json?.data?.getLeadsThatMatchUserCategories?.filter((lead: any) => {
//                 const unlockedLeads = lead?.artisantUnlockedLead?.map((l: any) => l?.id) || [];
//                 return !unlockedLeads.includes(JSON.parse(user)?.id);
//             }) || [];

//             const leadsWithLocations = await Promise.all(filteredLeads.map(async (lead: any) => ({
//                 ...lead,
//                 newLocations: await fetchLocation(lead.zipCode),
//                 userId: JSON.parse(user)?.id,
//             })));

//             setLeads(leadsWithLocations);
//             setLoading(false);
//         } catch (err: any) {
//             setLoading(false);
//             Alert.alert("Error", err.message);
//         }
//     };

//     useEffect(() => {
//         getLeads();
//     }, [isFocused]);

//     useEffect(() => {
//         if (leads.length > 0) {
//             setCurrentLead(leads[0]);
//         }
//     }, [leads]);

//     const handleAlert = () => {
//         Alert.alert(
//             "Unlock Magical Opportunity",
//             "Are you ready to reveal this enchanted lead?",
//             [
//                 { text: "Not Yet", style: "cancel" },
//                 { text: "Reveal Magic", onPress: () => handleUnlock(currentLead.id) }
//             ]
//         );
//     };

//     let swiperRef: any = null;

//     const renderCard = (lead: any) => (
//         <View style={styles.card} className='rounded-lg shadow-lg bg-gray-50'>
//             <ImageViewing
//                 images={lead?.images.map((uri: string) => ({ uri }))}
//                 imageIndex={currentImageIndex}
//                 visible={isModalVisible}
//                 onRequestClose={() => setIsModalVisible(false)}
//             />
//             <Image source={{ uri: lead?.images?.[0] }} style={styles.cardImage} />
//             <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradient} />
//             <ScrollView style={styles.cardContent}>
//                 <Text style={styles.orderId}>{lead.title}</Text>
//                 <Text style={styles.description}>{lead.description}</Text>

//                 <Text style={styles.label}>Location:
//                     {lead.newLocations ? (
//                         <Text style={styles.locationText}>
//                             {lead.newLocations.city}, {lead.newLocations.state} {lead.zipCode}
//                         </Text>
//                     ) : (
//                         <Text style={styles.locationText}>Location shrouded in mystery</Text>
//                     )}
//                 </Text>

//                 <Text style={styles.label}>Images:</Text>
//                 <ScrollView horizontal style={styles.imageScroll}>
//                     {[...lead?.images, ...lead?.images, ...lead?.images, ...lead?.images]?.map((uri: string, index: number) => (
//                         <TouchableOpacity key={index} onPress={() => { setCurrentImageIndex(index); setIsModalVisible(true); }}>
//                             <Image source={{ uri }} style={styles.thumbnail} />
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//                 <Text style={styles.label}>Client's Essence:</Text>
//                 {
//                     lead?.artisantUnlockedLead?.includes(lead.userId) ? (
//                         <View style={styles.ownerInfo}>
//                             <Image source={{ uri: lead.owner.imageProfile }} style={styles.ownerImage} />
//                             <View>
//                                 <Text style={styles.ownerName}>{lead.owner.firstName} {lead.owner.lastName}</Text>
//                                 <Text style={styles.ownerEmail}>{lead.owner.email}</Text>
//                             </View>
//                         </View>
//                     ) : (
//                         <View style={styles.ownerInfo}>
//                             <Image source={{ uri: lead.owner.imageProfile }} style={styles.ownerImage} />
//                             <View>
//                                 <Text style={styles.ownerName}>{
//                                     formatJoinDate(lead.createdAt)
//                                 }</Text>
//                                 <Text style={styles.ownerEmail}></Text>

//                                 <Text className="text-nowrap font-bold">
//                                     &nbsp;{
//                                         lead?.owner?.leads?.length && lead?.owner?.leads?.length + ' orders'
//                                     }
//                                 </Text>
//                             </View>
//                         </View>
//                     )
//                 }
//             </ScrollView>
//         </View>
//     );

//     const onSwiped = (cardIndex: number) => {
//         if (cardIndex < leads.length - 1) {
//             setCurrentLead(leads[cardIndex + 1]);
//         } else {
//             navigation.goBack();
//         }
//     };

//     if (loadingUnlock) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color={'white'} />
//                 <Text style={styles.loadingText}>Unlocking magical opportunity...</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             {leads.length === 0 && !loading ? (
//                 <Text style={styles.loadingText}>No magical opportunities found...</Text>
//             ) : (
//                 <>
//                     {loading ? (
//                         <View style={styles.loadingContainer}>
//                             <ActivityIndicator size="large" color={'white'} />
//                             <Text style={styles.loadingText}>Summoning magical opportunities...</Text>
//                         </View>
//                     ) : (
//                         <>
//                             <Swiper
//                                 ref={(swiper) => { swiperRef = swiper }}
//                                 cards={leads}
//                                 renderCard={renderCard}
//                                 onSwipedLeft={onSwiped}
//                                 onSwipedRight={onSwiped}
//                                 cardIndex={0}
//                                 backgroundColor={'transparent'}
//                                 stackSize={3}
//                                 cardVerticalMargin={40}
//                                 cardHorizontalMargin={20}
//                                 animateOverlayLabelsOpacity
//                                 animateCardOpacity
//                                 swipeBackCard
//                                 containerStyle={styles.swiperContainer}
//                                 cardStyle={styles.card}
//                             />
//                             <View style={styles.buttonsContainer}>
//                                 <TouchableOpacity
//                                     style={[styles.button, styles.rejectButton]}
//                                     onPress={() => swiperRef.swipeLeft()}
//                                 >
//                                     <MaterialCommunityIcons name="close-circle-outline" color="white" size={30} />
//                                     <Text style={styles.buttonText}>Pass</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     style={[styles.button, styles.unlockButton]}
//                                     onPress={handleAlert}
//                                 >
//                                     <MaterialCommunityIcons name="key-variant" color="white" size={30} />
//                                     <Text style={styles.buttonText}>Unlock</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     style={[styles.button, styles.acceptButton]}
//                                     onPress={() => swiperRef.swipeRight()}
//                                 >
//                                     <MaterialCommunityIcons name="star" color="white" size={30} />
//                                     <Text style={styles.buttonText}>Interested</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </>
//                     )}
//                 </>
//             )}
//             {showConfetti && <ConfettiCannon count={200} origin={{ x: width / 2, y: -10 }} fallSpeed={2500} fadeOut={true} />}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     swiperContainer: {
//         flex: 1,
//     },
//     card: {
//         width: width * 0.9,
//         height: height * 0.85,
//         // borderRadius: 20,
//         // backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         // shadowColor: 'white',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 8,
//         elevation: 5,
//         overflow: 'hidden',
//         // borderWidth: 1,
//         // borderColor: 'rgba(255, 255, 255, 0.2)',
//     },
//     cardImage: {
//         width: '100%',
//         height: 200,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//     },
//     gradient: {
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 150,
//         height: 100,
//     },
//     cardContent: {
//         padding: 20,
//         flex: 1,
//     },
//     buttonsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         width: '100%',
//         paddingHorizontal: 20,
//         paddingBottom: 10,
//         position: 'absolute',
//         bottom: 5,
//         // backgroundColor: 'red',
//     },
//     button: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         shadowColor: 'white',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.8,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     buttonText: {
//         color: 'white',
//         marginTop: 5,
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     rejectButton: {
//         backgroundColor: COLORS.danger,
//     },
//     unlockButton: {
//         backgroundColor: COLORS.warning,
//     },
//     acceptButton: {
//         backgroundColor: COLORS.success,
//     },
//     orderId: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         color: 'black',
//         textShadowColor: 'rgba(0, 0, 0, 0.75)',
//         textShadowOffset: { width: -1, height: 1 },
//         textShadowRadius: 10,
//     },
//     description: {
//         fontSize: 16,
//         marginBottom: 8,
//         color: 'black',
//         lineHeight: 24,
//     },
//     label: {
//         fontSize: 20,
//         fontWeight: '600',
//         marginVertical: 10,
//         color: 'white',
//         textShadowColor: 'rgba(0, 0, 0, 0.75)',
//         textShadowOffset: { width: -1, height: 1 },
//         textShadowRadius: 10,
//     },
//     locationText: {
//         fontSize: 14,
//         color: 'black',
//         marginBottom: 16,
//         fontStyle: 'italic',
//     },
//     imageScroll: {
//         flexDirection: 'row',
//         marginBottom: 16,
//     },
//     thumbnail: {
//         width: 80,
//         height: 80,
//         borderRadius: 10,
//         marginRight: 10,
//         borderWidth: 2,
//         borderColor: 'white',
//     },
//     loadingText: {
//         fontSize: 22,
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginTop: 20,
//         textShadowColor: 'rgba(0, 0, 0, 0.75)',
//         textShadowOffset: { width: -1, height: 1 },
//         textShadowRadius: 10,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     ownerInfo: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10,
//         backgroundColor: 'rgba(0, 0, 0, 0.1)',
//         borderRadius: 15,
//         padding: 10,
//         color: 'white',
//     },
//     ownerImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         marginRight: 15,
//         borderWidth: 2,
//         borderColor: 'black',
//     },
//     ownerName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     ownerEmail: {
//         fontSize: 16,
//         color: 'black',
//     },
// });

import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    Image,
    Dimensions,
    ActivityIndicator,
    Platform,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Feather } from "@expo/vector-icons";
import ConfettiCannon from 'react-native-confetti-cannon';
import ImageViewing from 'react-native-image-viewing';
import Constants from 'expo-constants';
import { getToken, getUser } from '@/helpers/getToken';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const COLORS = {
    primary: '#2C3E50',
    secondary: '#34495E',
    accent: '#2980B9',
    success: '#27AE60',
    danger: '#E74C3C',
    warning: '#F39C12',
    info: '#3498DB',
    light: '#F5F5F5',
    dark: '#2C3E50',
    gray: '#BDC3C7',
    white: '#FFFFFF',
};

const formatJoinDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
    return months === 0 ? `Joined this month` : `Joined ${date.getFullYear()} (${months} months ago)`;
};

export default function EnchantedSwiperComponent({ navigation }: { navigation: any }) {
    const [showConfetti, setShowConfetti] = useState(false);
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentLead, setCurrentLead] = useState<any>(null);
    const [loadingUnlock, setLoadingUnlock] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const isFocused = useIsFocused();

    const zipCodeCache: { [key: string]: { city: string; state: string } } = {};

    const handleUnlock = useCallback(async (id: string) => {
        const token = await getToken();
        if (!token) return;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        try {
            setLoadingUnlock(true);
            setShowConfetti(true);

            const res = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    query: `
                        mutation unlockLead($input: LeadUnlockInput) {
                            unlockLead(input: $input) {
                                id
                            }
                        }
                    `,
                    variables: {
                        input: {
                            id,
                            categoryId: currentLead.categoryId.id,
                        }
                    }
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP Error: ${res.status} - ${errorText}`);
            }

            const json = await res.json();

            if (json.errors && json.errors.length > 0) {
                throw new Error(json.errors[0].message);
            }

            setShowConfetti(false);
            setLoadingUnlock(false);
            Alert.alert("Success", "You have successfully unlocked this lead.");
            navigation.goBack();
        } catch (error: any) {
            setShowConfetti(false);
            setLoadingUnlock(false);
            Alert.alert("Error", error.message);
        }
    }, [currentLead, navigation]);

    const fetchLocation = useCallback(async (zip: string) => {
        if (zipCodeCache[zip]) return zipCodeCache[zip];

        try {
            const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
            if (!response.ok) throw new Error("Invalid zip code");

            const data = await response.json();
            const location = {
                city: data.places[0]["place name"],
                state: data.places[0]["state abbreviation"]
            };

            zipCodeCache[zip] = location;
            return location;
        } catch (err: any) {
            console.error(`Error fetching location for zip ${zip}:`, err.message);
            return null;
        }
    }, []);

    const getLeads = useCallback(async () => {
        const token = await getToken();
        const user: any = await getUser();
        if (!token) return;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        try {
            setLoading(true);
            const res = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    query: `
                        query getLeadsThatMatchUserCategories {
                            getLeadsThatMatchUserCategories {
                                id
                                title
                                zipCode
                                categoryId {
                                    id
                                    name
                                    unLockedAmount
                                }
                                createdAt
                                description
                                status
                                images
                                locationType
                                owner {
                                    id
                                    leads { id }
                                    pushToken
                                    firstName
                                    lastName
                                    phone
                                    imageProfile
                                    adress
                                    email
                                }
                                artisantId {
                                    id
                                    pushToken
                                    firstName
                                    lastName
                                    phone
                                    imageProfile
                                }
                                professionals {
                                    id
                                    text
                                    img
                                }
                                artisantUnlockedLead {
                                    id
                                    firstName
                                    lastName
                                    pushToken
                                    imageProfile
                                }
                                location
                                review {
                                    id
                                    description
                                    rating
                                    owner {
                                        id
                                        pushToken
                                        firstName
                                        lastName
                                        imageProfile
                                    }
                                }
                            }
                        }
                    `,
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP Error: ${res.status} - ${errorText}`);
            }

            const json = await res.json();
            const filteredLeads = json?.data?.getLeadsThatMatchUserCategories?.filter((lead: any) => {
                const unlockedLeads = lead?.artisantUnlockedLead?.map((l: any) => l?.id) || [];
                return !unlockedLeads.includes(JSON.parse(user)?.id);
            }) || [];

            const leadsWithLocations = await Promise.all(filteredLeads.map(async (lead: any) => ({
                ...lead,
                newLocations: await fetchLocation(lead.zipCode),
                userId: JSON.parse(user)?.id,
            })));

            setLeads(leadsWithLocations);
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            Alert.alert("Error", err.message);
        }
    }, [fetchLocation]);

    useEffect(() => {
        getLeads();
    }, [isFocused, getLeads]);

    useEffect(() => {
        if (leads.length > 0) {
            setCurrentLead(leads[0]);
        }
    }, [leads]);

    const handleAlert = useCallback(() => {
        Alert.alert(
            "Unlock Lead",
            "Are you sure you want to unlock this lead?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Unlock", onPress: () => handleUnlock(currentLead.id) }
            ]
        );
    }, [currentLead, handleUnlock]);

    const renderCard = useCallback((lead: any) => (
        <View style={styles.card}>
            <ImageViewing
                images={lead?.images.map((uri: string) => ({ uri }))}
                imageIndex={currentImageIndex}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            />
            <Image source={{ uri: lead?.images?.[0] }} style={styles.cardImage} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.gradient} />
            <ScrollView
                contentContainerStyle={styles.cardContent}
                nestedScrollEnabled={true}
                scrollEnabled={true}
            >
                <Text style={styles.orderId}>{lead.title}</Text>
                <Text style={styles.description}>{lead.description}</Text>

                <Text style={styles.label}>Location</Text>
                {lead.newLocations ? (
                    <Text style={styles.locationText}>
                        {lead.newLocations.city}, {lead.newLocations.state} {lead.zipCode}
                    </Text>
                ) : (
                    <Text style={styles.locationText}>Location unavailable</Text>
                )}

                <Text style={styles.label}>Images</Text>
                <ScrollView horizontal style={styles.imageScroll}>
                    {lead?.images?.map((uri: string, index: number) => (
                        <TouchableOpacity key={index} onPress={() => { setCurrentImageIndex(index); setIsModalVisible(true); }}>
                            <Image source={{ uri }} style={styles.thumbnail} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={styles.label}>Client Information</Text>
                {
                    lead?.artisantUnlockedLead?.some((l: any) => l.id === lead.userId) ? (
                        <View style={styles.ownerInfo}>
                            <Image source={{ uri: lead.owner.imageProfile }} style={styles.ownerImage} />
                            <View>
                                <Text style={styles.ownerName}>{lead.owner.firstName} {lead.owner.lastName}</Text>
                                <Text style={styles.ownerEmail}>{lead.owner.email}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.ownerInfo}>
                            <Image source={{ uri: lead.owner.imageProfile }} style={styles.ownerImage} />
                            <View>
                                <Text style={styles.ownerName}>{formatJoinDate(lead.createdAt)}</Text>
                                <Text style={styles.orderCount}>
                                    {lead?.owner?.leads?.length ? `${lead.owner.leads.length} orders` : 'No orders yet'}
                                </Text>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    ), [currentImageIndex, isModalVisible]);

    const onSwiped = useCallback((cardIndex: number) => {
        if (cardIndex < leads.length - 1) {
            setCurrentLead(leads[cardIndex + 1]);
        } else {
            navigation.goBack();
        }
    }, [leads, navigation]);

    if (loadingUnlock) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.accent} />
                <Text style={styles.loadingText}>Unlocking lead...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {leads.length === 0 && !loading ? (
                <Text style={styles.loadingText}>No leads found</Text>
            ) : (
                <>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={COLORS.accent} />
                            <Text style={styles.loadingText}>Loading leads...</Text>
                        </View>
                    ) : (
                        <>
                            <Swiper
                                cards={leads}
                                renderCard={renderCard}
                                onSwipedLeft={onSwiped}
                                onSwipedRight={onSwiped}
                                cardIndex={0}
                                backgroundColor={COLORS.light}
                                stackSize={3}
                                cardVerticalMargin={40}
                                cardHorizontalMargin={20}
                                animateOverlayLabelsOpacity
                                animateCardOpacity
                                swipeBackCard
                                containerStyle={styles.swiperContainer}
                                cardStyle={styles.card}
                                verticalSwipe={false}
                                disableTopSwipe={true}
                                disableBottomSwipe={true}
                            />
                            <BlurView intensity={80} tint="dark" style={styles.buttonsContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.rejectButton]}
                                    onPress={() => onSwiped(leads.indexOf(currentLead))}
                                >
                                    <Feather name="x" color={COLORS.white} size={24} />
                                    <Text style={styles.buttonText}>Pass</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.unlockButton]}
                                    onPress={handleAlert}
                                >
                                    <Feather name="unlock" color={COLORS.white} size={24} />
                                    <Text style={styles.buttonText}>Unlock</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.acceptButton]}
                                    onPress={() => onSwiped(leads.indexOf(currentLead))}
                                >
                                    <Feather name="check" color={COLORS.white} size={24} />
                                    <Text style={styles.buttonText}>Interested</Text>
                                </TouchableOpacity>
                            </BlurView>
                        </>
                    )}
                </>
            )}
            {showConfetti && <ConfettiCannon count={200} origin={{ x: width / 2, y: -10 }} fallSpeed={2500} fadeOut={true} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light,
    },
    swiperContainer: {
        flex: 1,
    },
    card: {
        width: width * 0.9,
        height: height * 0.75,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 250,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        height: 100,
    },
    cardContent: {
        padding: 20,
        paddingBottom: 80, // Extra padding to ensure content isn't hidden behind buttons
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: COLORS.white,
        marginTop: 5,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    rejectButton: {
        backgroundColor: COLORS.danger,
    },
    unlockButton: {
        backgroundColor: COLORS.warning,
    },
    acceptButton: {
        backgroundColor: COLORS.success,
    },
    orderId: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        color: COLORS.dark,
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
        color: COLORS.secondary,
        lineHeight: 22,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        color: COLORS.dark,
    },
    locationText: {
        fontSize: 14,
        color: COLORS.secondary,
        marginBottom: 16,
    },
    imageScroll: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
    },
    loadingText: {
        fontSize: 18,
        color: COLORS.secondary,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light,
    },
    ownerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        padding: 12,
        shadowColor: COLORS.dark,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    ownerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        borderWidth: 1,
        borderColor: COLORS.gray,
    },
    ownerName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.dark,
    },
    ownerEmail: {
        fontSize: 14,
        color: COLORS.secondary,
    },
    orderCount: {
        fontSize: 14,
        color: COLORS.secondary,
        marginTop: 5,
    },
});

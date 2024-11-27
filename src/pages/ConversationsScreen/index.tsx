// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
// import { getToken, getUser } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';

// const ConversationsScreen = ({ navigation }: any) => {
//     const [conversations, setConversations] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [role, setRole] = useState('');
//     const isFocused = useIsFocused();

//     useEffect(() => {
//         const fetchConversations = async () => {
//             setLoading(true);
//             const token = await getToken();
//             const newUser: any = await getUser();
//             setRole(JSON.parse(newUser)?.role);
//             console.log('role', role);

//             if (!token) return;

//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             try {
//                 const res = await fetch(
//                     Constants.expoConfig?.extra?.apiUrl as string,
//                     {
//                         method: "POST",
//                         headers,
//                         body: JSON.stringify({
//                             query: `
//                             query getDirectedLeads {
//                                 getDirectedLeads {
//                                     id
//                                     title
//                                     description
//                                     status
//                                     directLeadStatus
//                                     images
//                                     owner {
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
//                                     professionals {
//                                         id
//                                         text
//                                         img
//                                     }
//                                     artisantId {
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
//                                     artisantUnlockedLead {
//                                         id
//                                     }
//                                     location
//                                 }
//                             }
//                             `,
//                         }),
//                     }
//                 );

//                 const response = await res.json();
//                 setConversations(response?.data?.getDirectedLeads);
//                 setLoading(false); // Turn off loading
//             } catch (error) {
//                 console.log(error);
//                 setLoading(false);
//             }
//         };

//         fetchConversations();
//     }, [isFocused]);

//     const renderConversationItem = ({ item }: any) => {
//         const profileImage = item?.images[0];
//         const name = item?.title;

//         return (
//             <TouchableOpacity
//                 style={styles.conversationItem}
//                 onPress={async () => {
//                     try {
//                         const conversationId: any = await createOrRetrieveConversation(
//                             item?.id,
//                             item?.artisantId?.id,
//                             item?.owner?.id
//                         );

//                         if (role === 'user') {
//                             navigation.navigate('Chat', {
//                                 conversationId,
//                                 userId: item?.owner?.id,
//                                 userName: item?.owner?.firstName,
//                                 order: item
//                             });
//                         } else {
//                             navigation.navigate('Chat', {
//                                 conversationId,
//                                 userId: item?.artisantId?.id,
//                                 userName: item?.artisantId.firstName,
//                                 order: item
//                             });
//                         }
//                     } catch (error) {
//                         console.log('error', error);
//                     }
//                 }}
//             >
//                 <View style={styles.profileContainer}>
//                     {profileImage ? (
//                         <Image
//                             source={{ uri: profileImage }}
//                             style={styles.profileImage}
//                         />
//                     ) : (
//                         <View style={styles.defaultProfileImage}>
//                             <Text style={styles.defaultProfileText}>
//                                 {name?.charAt(0)}
//                             </Text>
//                         </View>
//                     )}

//                     <View style={styles.conversationTextContainer}>
//                         <Text style={styles.conversationTitle}>
//                             {name}
//                         </Text>
//                         <Text style={styles.lastMessage}>
//                             {item?.lastMsg || 'No recent message'}
//                         </Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             {/* Professional Header for Orders */}
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>
//                     Direct Leads
//                 </Text>
//             </View>

//             {/* Loading Indicator */}
//             {loading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : conversations?.length > 0 ? (
//                 <FlatList
//                     data={conversations}
//                     renderItem={renderConversationItem}
//                     keyExtractor={(item: any) => item.id.toString()}
//                 />
//             ) : (
//                 <Text style={styles.noConversationsText}>No conversations available.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     header: {
//         padding: 16,
//         backgroundColor: '#f4f4f4',
//         alignItems: 'flex-start',
//         marginBottom: 16,

//     },
//     headerText: {
//         fontSize: 22,
//         fontWeight: 'bold',
//     },
//     conversationItem: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//     },
//     conversationTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     lastMessage: {
//         fontSize: 14,
//         color: '#777',
//     },
//     profileContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     profileImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 15,
//     },
//     defaultProfileImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: '#ddd',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 15,
//     },
//     defaultProfileText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     conversationTextContainer: {
//         flex: 1,
//     },
//     noConversationsText: {
//         textAlign: 'center',
//         marginTop: 20,
//         fontSize: 16,
//         color: '#777',
//     },
// });

// export default ConversationsScreen;


// import React, { useEffect, useState, useCallback } from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     TouchableOpacity,
//     StyleSheet,
//     Image,
//     ActivityIndicator,
//     RefreshControl,
//     Dimensions,
//     Animated,
// } from 'react-native';
// import { useNavigation, useIsFocused } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Constants from 'expo-constants';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
// import { getToken, getUser } from '@/helpers/getToken';
// import { BlurView } from 'expo-blur';

// // Types
// interface ConversationItem {
//     id: string;
//     title: string;
//     description: string;
//     status: string;
//     directLeadStatus: string;
//     images: string[];
//     owner: {
//         id: string;
//         firstName: string;
//         lastName: string;
//         pushToken: string;
//         imageProfile: string;
//         phone: string;
//         images: { id: string; source: string }[];
//     };
//     professionals: {
//         id: string;
//         text: string;
//         img: string;
//     }[];
//     artisantId: {
//         id: string;
//         firstName: string;
//         lastName: string;
//         pushToken: string;
//         imageProfile: string;
//         images: { id: string; source: string }[];
//     };
//     artisantUnlockedLead: {
//         id: string;
//     };
//     location: string;
//     lastMsg?: string;
// }

// // Theme
// const theme = {
//     colors: {
//         primary: "#6200EE",
//         secondary: '#03DAC6',
//         background: '#121212',
//         surface: '#1E1E1E',
//         text: '#FFFFFF',
//         textSecondary: '#B0B0B0',
//         border: '#2C2C2C',
//         white: '#FFFFFF',
//         error: '#CF6679',
//         success: '#4CAF50',
//         gradient: ['#6200EE', '#3700B3', '#03DAC6'],
//     },
//     fonts: {
//         regular: 'System',
//         medium: 'System',
//         bold: 'System',
//     },
// };

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// const EnhancedMagicalConversationsV3 = () => {
//     const [conversations, setConversations] = useState<ConversationItem[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [role, setRole] = useState('');
//     const isFocused = useIsFocused();
//     const navigation = useNavigation();
//     const scrollY = new Animated.Value(0);

//     const fetchConversations = useCallback(async (token: string) => {
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);

//         const res = await fetch(
//             Constants.expoConfig?.extra?.apiUrl as string,
//             {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//             query getDirectedLeads {
//               getDirectedLeads {
//                 id
//                 title
//                 description
//                 status
//                 directLeadStatus
//                 images
//                 owner {
//                   id
//                   firstName
//                   lastName
//                   pushToken
//                   imageProfile
//                   phone
//                   images {
//                     id 
//                     source
//                   }
//                 }
//                 professionals {
//                   id
//                   text
//                   img
//                 }
//                 artisantId {
//                   id
//                   firstName
//                   lastName
//                   pushToken
//                   imageProfile
//                   images {
//                     id 
//                     source
//                   }
//                 }
//                 artisantUnlockedLead {
//                   id
//                 }
//                 location
//               }
//             }
//           `,
//                 }),
//             }
//         );

//         const response = await res.json();
//         if (response.errors) {
//             throw new Error(response.errors[0].message);
//         }
//         return response?.data?.getDirectedLeads;
//     }, []);

//     const loadConversations = useCallback(async () => {
//         setLoading(true);
//         try {
//             const token = await getToken();
//             const user: any = await getUser();
//             setRole(JSON.parse(user)?.role);

//             if (!token) {
//                 throw new Error('No token available');
//             }

//             const fetchedConversations = await fetchConversations(token);
//             setConversations(fetchedConversations);
//         } catch (error) {
//             console.error('Failed to fetch conversations:', error);
//             // Consider adding a user-friendly error message here
//         } finally {
//             setLoading(false);
//         }
//     }, [fetchConversations]);

//     useEffect(() => {
//         if (isFocused) {
//             loadConversations();
//         }
//     }, [isFocused, loadConversations]);

//     const onRefresh = useCallback(async () => {
//         setRefreshing(true);
//         await loadConversations();
//         setRefreshing(false);
//     }, [loadConversations]);

//     const handleConversationPress = useCallback(async (item: ConversationItem) => {
//         try {
//             const conversationId = await createOrRetrieveConversation(
//                 item.id,
//                 item.artisantId?.id,
//                 item.owner?.id
//             );

//             const navigationParams: any = {
//                 conversationId,
//                 userId: role === 'user' ? item.owner?.id : item.artisantId?.id,
//                 userName: role === 'user' ? item.owner?.firstName : item.artisantId?.firstName,
//                 order: item
//             };
//             //@ts-ignore
//             navigation.navigate('Chat', navigationParams);
//         } catch (error) {
//             console.error('Error navigating to chat:', error);
//             // Consider adding a user-friendly error message here
//         }
//     }, [navigation, role]);

//     const renderConversationItem = useCallback(({ item, index }: { item: ConversationItem; index: number }) => {
//         const profileImage = item.images[0];
//         const name = `${item.owner.firstName} ${item.owner.lastName}`;

//         const inputRange = [
//             -1,
//             0,
//             (index * 140) + 140,
//             (index + 2) * 140
//         ];

//         const scale = scrollY.interpolate({
//             inputRange,
//             outputRange: [1, 1, 1, 0.9]
//         });

//         const opacity = scrollY.interpolate({
//             inputRange,
//             outputRange: [1, 1, 1, 0.7]
//         });

//         return (
//             <Animated.View style={[styles.conversationItem, { transform: [{ scale }], opacity }]}>
//                 <TouchableOpacity onPress={() => handleConversationPress(item)}>
//                     <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
//                         <LinearGradient
//                             colors={theme.colors.gradient}
//                             start={{ x: 0, y: 0 }}
//                             end={{ x: 1, y: 1 }}
//                             style={styles.gradientBackground}
//                         >
//                             <View style={styles.profileContainer}>
//                                 {profileImage ? (
//                                     <Image
//                                         source={{ uri: profileImage }}
//                                         style={styles.profileImage}
//                                     />
//                                 ) : (
//                                     <View style={styles.defaultProfileImage}>
//                                         <Text style={styles.defaultProfileText}>
//                                             {name.charAt(0).toUpperCase()}
//                                         </Text>
//                                     </View>
//                                 )}

//                                 <View style={styles.conversationTextContainer}>
//                                     <Text style={styles.conversationTitle} numberOfLines={1}>
//                                         {item.title}
//                                     </Text>
//                                     <Text style={styles.userName} numberOfLines={1}>
//                                         {name}
//                                     </Text>
//                                     <View style={styles.infoContainer}>
//                                         <MaterialCommunityIcons name="phone" size={14} color={theme.colors.secondary} style={styles.icon} />
//                                         <Text style={styles.userPhone} numberOfLines={1}>
//                                             {item.owner.phone}
//                                         </Text>
//                                     </View>
//                                     <View style={styles.infoContainer}>
//                                         <MaterialCommunityIcons name="map-marker" size={14} color={theme.colors.secondary} style={styles.icon} />
//                                         <Text style={styles.location} numberOfLines={1}>
//                                             {item.location}
//                                         </Text>
//                                     </View>
//                                 </View>
//                                 <View style={styles.statusContainer}>
//                                     <Text style={[styles.status, { color: item.status === 'Active' ? theme.colors.success : theme.colors.error }]}>
//                                         {item.status}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </LinearGradient>
//                     </BlurView>
//                 </TouchableOpacity>
//             </Animated.View>
//         );
//     }, [handleConversationPress, scrollY]);

//     const headerOpacity = scrollY.interpolate({
//         inputRange: [0, 100],
//         outputRange: [1, 0],
//         extrapolate: 'clamp',
//     });

//     return (
//         <View style={styles.container}>
//             <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
//                 <LinearGradient
//                     colors={theme.colors.gradient}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={styles.headerGradient}
//                 >
//                     <Text style={styles.headerText}>Conversations</Text>
//                 </LinearGradient>
//             </Animated.View>

//             {loading && !refreshing ? (
//                 <ActivityIndicator size="large" color={theme.colors.secondary} style={styles.loader} />
//             ) : conversations.length > 0 ? (
//                 <Animated.FlatList
//                     data={conversations}
//                     renderItem={renderConversationItem}
//                     keyExtractor={(item) => item.id.toString()}
//                     refreshControl={
//                         <RefreshControl
//                             refreshing={refreshing}
//                             onRefresh={onRefresh}
//                             colors={[theme.colors.secondary]}
//                             tintColor={theme.colors.secondary}
//                         />
//                     }
//                     contentContainerStyle={styles.listContent}
//                     onScroll={Animated.event(
//                         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                         { useNativeDriver: true }
//                     )}
//                 />
//             ) : (
//                 <View style={styles.emptyStateContainer}>
//                     <MaterialCommunityIcons name="magic-staff" size={80} color={theme.colors.secondary} />
//                     <Text style={styles.noConversationsText}>No magical conversations yet</Text>
//                     <Text style={styles.noConversationsSubText}>Your enchanted dialogues will appear here</Text>
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: theme.colors.background,
//     },
//     header: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 10,
//     },
//     headerGradient: {
//         padding: 16,
//         paddingTop: Constants.statusBarHeight + 16,
//     },
//     headerText: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: theme.colors.white,
//         textAlign: 'center',
//         textShadowColor: 'rgba(0, 0, 0, 0.3)',
//         textShadowOffset: { width: 0, height: 2 },
//         textShadowRadius: 4,
//     },
//     listContent: {
//         paddingTop: Constants.statusBarHeight + 60,
//         paddingHorizontal: 16,
//     },
//     conversationItem: {
//         // marginBottom: 6,
//         borderRadius: 16,
//         overflow: 'hidden',
//         // elevation: 5,
//         shadowColor: theme.colors.primary,
//         // shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//         marginTop:20
//     },
//     blurContainer: {
//         borderRadius: 16,
//         overflow: 'hidden',
//     },
//     gradientBackground: {
//         borderRadius: 16,
//     },
//     profileContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//     },
//     profileImage: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         marginRight: 16,
//         borderWidth: 2,
//         borderColor: theme.colors.secondary,
//     },
//     defaultProfileImage: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: theme.colors.secondary,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 16,
//     },
//     defaultProfileText: {
//         color: theme.colors.primary,
//         fontSize: 28,
//         fontWeight: 'bold',
//     },
//     conversationTextContainer: {
//         flex: 1,
//     },
//     conversationTitle: {
//         fontSize: 20,
//         fontWeight: '600',
//         color: theme.colors.white,
//         marginBottom: 4,
//     },
//     userName: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: theme.colors.textSecondary,
//         marginBottom: 4,
//     },
//     infoContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 2,
//     },
//     icon: {
//         marginRight: 6,
//     },
//     userPhone: {
//         fontSize: 14,
//         color: theme.colors.textSecondary,
//     },
//     location: {
//         fontSize: 14,
//         color: theme.colors.textSecondary,
//     },
//     statusContainer: {
//         position: 'absolute',
//         top: 12,
//         right: 12,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         borderRadius: 12,
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//     },
//     status: {
//         fontSize: 12,
//         fontWeight: '600',
//     },
//     noConversationsText: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: theme.colors.textSecondary,
//         textAlign: 'center',
//         marginTop: 24,
//     },
//     noConversationsSubText: {
// fontSize: 18,
//         color: theme.colors.textSecondary,
//         textAlign: 'center',
//         marginTop: 12,
//     },
//     emptyStateContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: 32,
//     },
//     loader: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default EnhancedMagicalConversationsV3;



import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    RefreshControl,
    Dimensions,
    Animated,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
import { getToken, getUser } from '@/helpers/getToken';
import { BlurView } from 'expo-blur';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';

// Types
interface ConversationItem {
    id: string;
    title: string;
    description: string;
    status: string;
    directLeadStatus: string;
    images: string[];
    zipCode: string;
    newLocation: string;
    owner: {
        id: string;
        firstName: string;
        lastName: string;
        pushToken: string;
        imageProfile: string;
        phone: string;
        images: { id: string; source: string }[];
    };
    professionals: {
        id: string;
        text: string;
        img: string;
    }[];
    artisantId: {
        id: string;
        firstName: string;
        lastName: string;
        pushToken: string;
        imageProfile: string;
        images: { id: string; source: string }[];
    };
    artisantUnlockedLead: {
        id: string;
    };
    location: string;
    lastMsg?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const EnhancedMagicalConversationsV3 = ({navigation}:any) => {
    const [conversations, setConversations] = useState<ConversationItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [role, setRole] = useState('');
    const isFocused = useIsFocused();
    // const navigation = useNavigation();
    const scrollY = new Animated.Value(0);

    const fetchConversations = useCallback(async (token: string) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        const res = await fetch(
            Constants.expoConfig?.extra?.apiUrl as string,
            {
                method: "POST",
                headers,
                body: JSON.stringify({
                    query: `
            query getDirectedLeads {
              getDirectedLeads {
                id
                title
                description
                status
                directLeadStatus
                images
                zipCode
                owner {
                  id
                  firstName
                  lastName
                  pushToken
                  imageProfile
                  phone
                  images {
                    id 
                    source
                  }
                }
                professionals {
                  id
                  text
                  img
                }
                artisantId {
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
                artisantUnlockedLead {
                  id
                }
                location
              }
            }
          `,
                }),
            }
        );

        const response = await res.json();
        if (response.errors) {
            throw new Error(response.errors[0].message);
        }

        console.log('====================================');
        console.log('response?.data?.getDirectedLeads',response?.data?.getDirectedLeads);
        console.log('====================================');
        const locationPromises = response?.data?.getDirectedLeads?.map(async (lead: any) => {
            const location = await fetchLocation(lead?.zipCode);
            return {
                ...lead,
                newLocation: location
            }
        });

        // Wait for all location fetches to complete
        const newLocations = await Promise.all(locationPromises);
        return newLocations
    }, []);

    const loadConversations = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const user: any = await getUser();
            setRole(JSON.parse(user)?.role);

            if (!token) {
                throw new Error('No token available');
            }

            const fetchedConversations = await fetchConversations(token);
            setConversations(fetchedConversations);
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
            // Consider adding a user-friendly error message here
        } finally {
            setLoading(false);
        }
    }, [fetchConversations]);

    useEffect(() => {
        if (isFocused) {
            loadConversations();
        }
    }, [isFocused, loadConversations]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadConversations();
        setRefreshing(false);
    }, [loadConversations]);


    const fetchLocation = async (zip: string): Promise<string> => {
        try {
            const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
            if (!response.ok) {
                throw new Error("Invalid zip code");
            }
            const data = await response.json();
            const city = data.places[0]["place name"];
            const state = data.places[0]["state abbreviation"];
            return `${city}, ${state}`;
        } catch (err: any) {
            // Optionally log the error or handle it differently
            return "Unknown location";
        }
    };
    const handleConversationPress = useCallback(async (item: ConversationItem) => {
        try {
            // const conversationId = await createOrRetrieveConversation(
            //     item.id,
            //     item.artisantId?.id,
            //     item.owner?.id
            // );

            // const navigationParams: any = {
            //     conversationId,
            //     userId: role === 'user' ? item.owner?.id : item.artisantId?.id,
            //     userName: role === 'user' ? item.owner?.firstName : item.artisantId?.firstName,
            //     order: item
            // };
            // //@ts-ignore
            // navigation.navigate('Chat', navigationParams);

            if (role === 'user') {
                const conversationId: any = await createOrRetrieveConversation(
                    item.id,
                    item.artisantId?.id,
                    item.owner?.id
                );

                navigation.navigate('Chat', {
                    conversationId,
                    userId: item.artisantId?.id,
                    userName: item.owner?.id,
                    order: {
                        ...item, artisantId: item.artisantId
                    }
                });
                return;
            } else {
                const conversationId: any = await createOrRetrieveConversation(
                    item.id,
                    item.artisantId?.id,
                    item.owner?.id
                );

                navigation.navigate('Chat', {
                    conversationId,
                    userId: item.owner?.id,
                    userName: item.artisantId?.id,
                    order: {
                        ...item, artisantId: item.artisantId
                    }
                });
                return;
            }
        } catch (error) {
            console.error('Error navigating to chat:', error);
            // Consider adding a user-friendly error message here
        }
    }, [navigation, role]);

    const renderConversationItem = useCallback(({ item, index }: { item: ConversationItem; index: number }) => {
        const profileImage = item.images[0];
        const name = `${item.owner.firstName} ${item.owner.lastName}`;

        const inputRange = [
            -1,
            0,
            (index * 140) + 140,
            (index + 2) * 140
        ];

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.9]
        });

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.7]
        });

        return (
            <Animated.View
                // className="" make mb-12 to the last item only
                style={[{
                    ...styles.conversationItem,
                }, { transform: [{ scale }], opacity }]}>
                <TouchableOpacity onPress={() => handleConversationPress(item)}>
                    <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientBackground}
                        >
                            <View style={styles.profileContainer}>
                                {profileImage ? (
                                    <Image
                                        source={{ uri: profileImage }}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <View style={styles.defaultProfileImage}>
                                        <Text style={styles.defaultProfileText}>
                                            {name.charAt(0).toUpperCase()}
                                        </Text>
                                    </View>
                                )}

                                <View style={styles.conversationTextContainer}>
                                    <Text style={styles.conversationTitle} numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.userName} numberOfLines={1}>
                                        {name}
                                    </Text>
                                    <View style={styles.infoContainer}>
                                        <MaterialCommunityIcons name="phone" size={14} color={COLORS.white} style={styles.icon} />
                                        <Text style={styles.userPhone} numberOfLines={1}>
                                            {item.owner.phone}
                                        </Text>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <MaterialCommunityIcons name="map-marker" size={14} color={COLORS.white} style={styles.icon} />
                                        <Text style={styles.location} numberOfLines={1}>
                                            {item?.newLocation}
                                        </Text>
                                    </View>
                                </View>
                                {/* <View style={styles.statusContainer}>
                                    <Text style={[styles.status, { color: item.status === 'Active' ? COLORS.primary : COLORS.secondary }]}>
                                        {item.status}
                                    </Text>
                                </View> */}
                            </View>
                        </LinearGradient>
                    </BlurView>
                </TouchableOpacity>
            </Animated.View>
        );
    }, [handleConversationPress, scrollY]);

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerGradient}
                >
                    <Text style={styles.headerText}>Conversations</Text>
                </LinearGradient>
            </Animated.View>

            {loading && !refreshing ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
            ) : conversations.length > 0 ? (
                <Animated.FlatList
                    data={conversations}
                    renderItem={renderConversationItem}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[COLORS.primary]}
                            tintColor={COLORS.primary}
                        />
                    }
                    contentContainerStyle={{
                        ...styles.listContent,
                        // width: "100%"
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}

                />
            ) : (
                <View style={styles.emptyStateContainer}>
                    <MaterialCommunityIcons name="magic-staff" size={80} color={COLORS.primary} />
                    <Text style={styles.noConversationsText}>No magical conversations yet</Text>
                    <Text style={styles.noConversationsSubText}>Your enchanted dialogues will appear here</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: "100%"
        // backgroundColor: COLORS.black.dark,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    headerGradient: {
        padding: SIZES.padding,
        paddingTop: Constants.statusBarHeight + SIZES.padding,
    },
    headerText: {
        ...FONTS.h1,
        color: COLORS.white,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    listContent: {
        paddingTop: Constants.statusBarHeight + 60,
        paddingHorizontal: SIZES.padding,
        marginTop: 20,
    },
    conversationItem: {
        // marginBottom: SIZES.padding,
        // borderRadius: SIZES.radius,
        overflow: 'hidden',
        ...SHADOWS.medium,
        marginTop: 10,
    },
    blurContainer: {
        borderRadius: SIZES.radius,
        overflow: 'hidden',
    },
    gradientBackground: {
        borderRadius: SIZES.radius,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: SIZES.padding,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    defaultProfileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.padding,
    },
    defaultProfileText: {
        ...FONTS.h2,
        color: COLORS.primary,
    },
    conversationTextContainer: {
        flex: 1,
    },
    conversationTitle: {
        ...FONTS.h3,
        color: COLORS.white,
        marginBottom: 4,
    },
    userName: {
        ...FONTS.body4,
        color: COLORS.white,
        marginBottom: 4,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    icon: {
        marginRight: 6,
    },
    userPhone: {
        ...FONTS.body5,
        color: COLORS.white,
    },
    location: {
        ...FONTS.body5,
        color: COLORS.white,
    },
    statusContainer: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    status: {
        ...FONTS.body5,
        fontWeight: '600',
    },
    noConversationsText: {
        ...FONTS.h2,
        color: COLORS.white,
        textAlign: 'center',
        marginTop: SIZES.padding,
    },
    noConversationsSubText: {
        ...FONTS.body3,
        color: COLORS.white,
        textAlign: 'center',
        marginTop: SIZES.base,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EnhancedMagicalConversationsV3;

